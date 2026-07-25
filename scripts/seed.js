const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const MYSQL_HOST = process.env.MYSQL_HOST || process.env.DB_HOST || '127.0.0.1';
const MYSQL_PORT = Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306);
const MYSQL_USER = process.env.MYSQL_USER || process.env.DB_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || process.env.DB_NAME || 'sutrakriti';

const products = [
  {
    id: uuidv4(),
    slug: 'handmade-rose-bouquet',
    name: 'Handmade Rose Bouquet',
    description: 'A beautiful handcrafted crochet rose bouquet perfect for gifting or home décor. Each rose is meticulously crafted with premium cotton yarn.',
    price: 1299,
    category: 'Crochet Flower Bouquets',
    images: ['https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg', 'https://images.pexels.com/photos/20865317/pexels-photo-20865317.jpeg'],
    featured: true,
    inStock: true,
    materials: 'Premium cotton yarn, wire stems, decorative wrapping',
    dimensions: 'Bouquet height: 30cm, Rose diameter: 8-10cm',
    careInstructions: 'Keep away from moisture. Dust gently with a soft cloth.',
    productionTime: '3-4 days',
    customizable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    slug: 'crochet-tote-bag-beige',
    name: 'Crochet Tote Bag - Beige',
    description: 'Elegant and spacious crochet tote bag perfect for everyday use. Handcrafted with durable cotton yarn and features comfortable handles.',
    price: 899,
    category: 'Crochet Tote Bags',
    images: ['https://images.pexels.com/photos/10820408/pexels-photo-10820408.jpeg'],
    featured: true,
    inStock: true,
    materials: 'Premium cotton yarn, cotton lining',
    dimensions: 'Width: 35cm, Height: 30cm, Depth: 10cm',
    careInstructions: 'Hand wash with cold water. Air dry flat.',
    productionTime: '5-7 days',
    customizable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const blogPosts = [
  {
    id: uuidv4(),
    slug: 'crochet-care-guide',
    title: 'The Ultimate Crochet Care Guide',
    content: '## How to Care for Your Handmade Crochet Items',
    excerpt: 'Learn how to properly care for your handmade crochet items to keep them beautiful for years to come.',
    featuredImage: 'https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg',
    author: 'SutraKriti Team',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  console.log('Starting database seed...');
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

  try {
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

    await connection.query('DELETE FROM app_data WHERE collection_name IN (?, ?)', ['products', 'blog']);

    for (const product of products) {
      await connection.query(
        'INSERT INTO app_data (id, collection_name, slug, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?)',
        [product.id, 'products', product.slug, product.createdAt, product.updatedAt, JSON.stringify(product)]
      );
    }

    for (const post of blogPosts) {
      await connection.query(
        'INSERT INTO app_data (id, collection_name, slug, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?)',
        [post.id, 'blog', post.slug, post.createdAt, post.updatedAt, JSON.stringify(post)]
      );
    }

    const settings = {
      id: uuidv4(),
      type: 'site',
      whatsappNumber: '917777932385',
      instagramHandle: '_sutrakriti',
      email: 'sutrakriti.help@outlook.com',
      updatedAt: new Date()
    };

    await connection.query(
      'INSERT INTO app_data (id, collection_name, slug, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE slug = VALUES(slug), updated_at = VALUES(updated_at), payload = VALUES(payload)',
      [settings.id, 'settings', null, settings.updatedAt, settings.updatedAt, JSON.stringify(settings)]
    );

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seed();
