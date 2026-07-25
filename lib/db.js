import mysql from 'mysql2/promise';
import { randomUUID } from 'node:crypto';

const MYSQL_HOST = process.env.MYSQL_HOST || process.env.DB_HOST || '127.0.0.1';
const MYSQL_PORT = Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306);
const MYSQL_USER = process.env.MYSQL_USER || process.env.DB_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || process.env.DB_NAME || 'sutrakriti';
const globalForDb = globalThis;

if (!MYSQL_HOST && process.env.NODE_ENV === 'production') {
  throw new Error('MYSQL_HOST must be configured in production');
}

let poolPromise;

function normalizeSort(sortSpec) {
  if (!sortSpec || typeof sortSpec !== 'object') return null;
  const entries = Object.entries(sortSpec);
  if (entries.length === 0) return null;
  const [field, direction] = entries[0];
  return { field, direction: direction === -1 ? 'DESC' : 'ASC' };
}

function fieldReference(field) {
  const safeField = String(field).replace(/[^a-zA-Z0-9_]/g, '');
  return safeField ? `JSON_UNQUOTE(JSON_EXTRACT(payload, '$.${safeField}'))` : 'payload';
}

export function buildWhereClause(filter = {}) {
  const clauses = [];
  const values = [];

  const appendCondition = (condition, field, value) => {
    if (condition === '$regex') {
      const regexValue = String(value.$regex || '');
      const caseInsensitive = String(value.$options || '').includes('i');
      const fieldSql = fieldReference(field);
      clauses.push(`${caseInsensitive ? `LOWER(${fieldSql})` : fieldSql} REGEXP ?`);
      values.push(caseInsensitive ? regexValue.toLowerCase() : regexValue);
      return;
    }

    clauses.push(`${fieldReference(field)} = ?`);
    values.push(value);
  };

  if (!filter || (typeof filter === 'object' && !Array.isArray(filter) && Object.keys(filter).length === 0)) {
    return { sql: '', values: [] };
  }

  if (filter.$or && Array.isArray(filter.$or)) {
    const subClauses = filter.$or.map((entry) => {
      const sub = buildWhereClause(entry);
      return sub.sql ? `(${sub.sql.replace(/^WHERE /, '').replace(/\s+/g, ' ').trim()})` : '(1=1)';
    });
    clauses.push(subClauses.join(' OR '));
    values.push(...filter.$or.flatMap((entry) => buildWhereClause(entry).values));
    return { sql: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', values };
  }

  Object.entries(filter).forEach(([field, value]) => {
    if (field === '$or') return;
    if (value && typeof value === 'object' && !Array.isArray(value) && ('$regex' in value || '$options' in value)) {
      appendCondition('$regex', field, value);
      return;
    }
    appendCondition('equal', field, value);
  });

  return { sql: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', values };
}

async function initializeDatabase(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_data (
      id VARCHAR(255) PRIMARY KEY,
      collection_name VARCHAR(100) NOT NULL,
      slug VARCHAR(255) DEFAULT NULL,
      created_at DATETIME DEFAULT NULL,
      updated_at DATETIME DEFAULT NULL,
      payload JSON NOT NULL,
      INDEX idx_collection_name (collection_name),
      INDEX idx_slug (slug),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

export async function connectToDatabase() {
  if (!poolPromise) {
    poolPromise = (async () => {
      const pool = mysql.createPool({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      await initializeDatabase(pool);
      return pool;
    })();
  }
  return poolPromise;
}

function createCursor(pool, collectionName, query, options = {}) {
  let cursorQuery = query || {};
  let cursorOptions = options || {};
  let sortSpec = null;
  let limitValue = null;

  return {
    sort(sort) {
      sortSpec = sort;
      return this;
    },
    limit(limit) {
      limitValue = Number(limit);
      return this;
    },
    async toArray() {
      const rows = await executeFind(pool, collectionName, cursorQuery, { ...cursorOptions, sort: sortSpec, limit: limitValue });
      return rows;
    },
  };
}

async function executeFind(pool, collectionName, query, options = {}) {
  const { sql, values } = buildWhereClause(query || {});
  const whereSql = sql || '';
  const sort = normalizeSort(options.sort || null);
  const limit = Number.isFinite(options.limit) && options.limit > 0 ? options.limit : null;
  const clauses = [`WHERE collection_name = ?`];
  const params = [collectionName];

  if (whereSql) {
    clauses.push(whereSql.replace(/^WHERE\s+/, ''));
  }

  const orderBy = sort ? ` ORDER BY ${sort.field} ${sort.direction}` : '';
  const limitClause = limit ? ` LIMIT ${limit}` : '';
  const [rows] = await pool.query(`SELECT payload FROM app_data ${clauses.join(' AND ')}${orderBy}${limitClause}`, [...params, ...values]);
  return rows.map((row) => JSON.parse(row.payload));
}

export async function getCollection(collectionName) {
  const pool = await connectToDatabase();

  return {
    find(query, options = {}) {
      return createCursor(pool, collectionName, query, options);
    },
    async findOne(query, options = {}) {
      const rows = await executeFind(pool, collectionName, query, { ...options, limit: 1 });
      return rows[0] || null;
    },
    async insertOne(document) {
      const record = {
        id: document.id || randomUUID(),
        ...document,
        createdAt: document.createdAt || new Date(),
        updatedAt: document.updatedAt || new Date(),
      };
      const slug = record.slug || null;
      const payload = JSON.stringify(record);
      await pool.query('INSERT INTO app_data (id, collection_name, slug, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?)', [record.id, collectionName, slug, record.createdAt, record.updatedAt, payload]);
      return { insertedId: record.id, acknowledged: true };
    },
    async updateOne(filter, update, options = {}) {
      const existing = await this.findOne(filter);
      let record = existing ? { ...existing } : {};
      const setValues = update?.$set || {};
      const setOnInsert = update?.$setOnInsert || {};

      if (!existing) {
        Object.assign(record, filter, setValues, setOnInsert);
        record.id = record.id || randomUUID();
        record.createdAt = new Date();
        record.updatedAt = new Date();
      } else {
        Object.assign(record, setValues, setOnInsert);
        record.updatedAt = new Date();
      }

      if (!existing && !options.upsert) {
        return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
      }

      const payload = JSON.stringify(record);
      const slug = record.slug || null;
      await pool.query(
        'INSERT INTO app_data (id, collection_name, slug, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE slug = VALUES(slug), updated_at = VALUES(updated_at), payload = VALUES(payload)',
        [record.id, collectionName, slug, record.createdAt || new Date(), record.updatedAt, payload]
      );

      return {
        matchedCount: existing ? 1 : 0,
        modifiedCount: existing ? 1 : 0,
        upsertedCount: existing ? 0 : 1,
      };
    },
    async deleteOne(filter) {
      const existing = await this.findOne(filter);
      if (!existing) {
        return { deletedCount: 0 };
      }
      await pool.query('DELETE FROM app_data WHERE collection_name = ? AND id = ?', [collectionName, existing.id]);
      return { deletedCount: 1 };
    },
    async distinct(fieldName) {
      const rows = await executeFind(pool, collectionName, {});
      return [...new Set(rows.map((row) => row[fieldName]).filter((value) => value !== undefined && value !== null))];
    },
  };
}
