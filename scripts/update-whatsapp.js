const mysql = require('mysql2/promise');

const MYSQL_HOST = process.env.MYSQL_HOST || process.env.DB_HOST || '127.0.0.1';
const MYSQL_PORT = Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306);
const MYSQL_USER = process.env.MYSQL_USER || process.env.DB_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || process.env.DB_NAME || 'sutrakriti';

async function updateWhatsAppNumber() {
  console.log('Connecting to database...');

  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

  try {
    console.log('Updating WhatsApp number...');

    await connection.query(`
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

    const [rows] = await connection.query('SELECT payload FROM app_data WHERE collection_name = ? LIMIT 1', ['settings']);
    const existing = rows[0] ? JSON.parse(rows[0].payload) : {};
    const payload = {
      ...existing,
      whatsappNumber: '917777932385',
      updatedAt: new Date()
    };

    await connection.query(
      'INSERT INTO app_data (id, collection_name, slug, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE slug = VALUES(slug), updated_at = VALUES(updated_at), payload = VALUES(payload)',
      [payload.id || 'site-settings', 'settings', null, payload.updatedAt, payload.updatedAt, JSON.stringify(payload)]
    );

    console.log('✓ WhatsApp number updated');
    console.log('\nNew WhatsApp number: +91 77779 32385');
    console.log('WhatsApp link: https://wa.me/917777932385');
    console.log('\n✅ WhatsApp number updated successfully!');
  } catch (error) {
    console.error('❌ Error updating WhatsApp number:', error);
  } finally {
    await connection.end();
  }
}

updateWhatsAppNumber();
