import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhereClause } from '../lib/db.js';

test('buildWhereClause handles simple equality filters', () => {
  const result = buildWhereClause({ slug: 'demo' });
  assert.equal(result.sql, "WHERE JSON_UNQUOTE(JSON_EXTRACT(payload, '$.slug')) = ?");
  assert.deepEqual(result.values, ['demo']);
});

test('buildWhereClause handles OR and regex filters', () => {
  const result = buildWhereClause({
    $or: [
      { name: { $regex: 'test', $options: 'i' } },
      { description: { $regex: 'demo', $options: 'i' } },
    ],
  });
  assert.equal(result.sql, "WHERE (LOWER(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.name'))) REGEXP ?) OR (LOWER(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.description'))) REGEXP ?)");
  assert.deepEqual(result.values, ['test', 'demo']);
});
