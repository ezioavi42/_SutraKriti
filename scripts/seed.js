const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sutrakriti';

const products = [
  {
    id: uuidv4(),
    slug: 'handmade-rose-bouquet',
    name: 'Handmade Rose Bouquet',
    description: 'A beautiful handcrafted crochet rose bouquet perfect for gifting or home décor. Each rose is meticulously crafted with premium cotton yarn.',
    price: 1299,
    category: 'Crochet Flower Bouquets',
    images: [
      'https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg',
      'https://images.pexels.com/photos/20865317/pexels-photo-20865317.jpeg'
    ],
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
    images: [
      'https://images.pexels.com/photos/10820408/pexels-photo-10820408.jpeg'
    ],
    featured: true,
    inStock: true,
    materials: 'Premium cotton yarn, cotton lining',
    dimensions: 'Width: 35cm, Height: 30cm, Depth: 10cm',
    careInstructions: 'Hand wash with cold water. Air dry flat.',
    productionTime: '5-7 days',
    customizable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    slug: 'sunflower-crochet-bouquet',
    name: 'Sunflower Crochet Bouquet',
    description: 'Bright and cheerful sunflower bouquet that never wilts. Perfect gift for birthdays, anniversaries, or home decoration.',
    price: 1499,
    category: 'Crochet Flower Bouquets',
    images: [
      'https://images.pexels.com/photos/20865317/pexels-photo-20865317.jpeg'
    ],
    featured: true,
    inStock: true,
    materials: 'Premium cotton yarn, decorative pot (optional)',
    dimensions: 'Bouquet height: 35cm, Sunflower diameter: 12cm',
    careInstructions: 'Dust with soft cloth. Keep in dry place.',
    productionTime: '4-5 days',
    customizable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    slug: 'crochet-sling-bag-pastel',
    name: 'Crochet Sling Bag - Pastel Mix',
    description: 'Trendy crochet sling bag with adjustable strap. Perfect for casual outings and adds a bohemian touch to any outfit.',
    price: 749,
    category: 'Crochet Sling Bags',
    images: [
      'https://images.pexels.com/photos/10820408/pexels-photo-10820408.jpeg'
    ],
    featured: true,
    inStock: true,
    materials: 'Premium cotton yarn, metal clasp, adjustable strap',
    dimensions: 'Width: 20cm, Height: 18cm, Depth: 8cm',
    careInstructions: 'Spot clean only. Avoid soaking.',
    productionTime: '3-4 days',
    customizable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    slug: 'lavender-crochet-bouquet',
    name: 'Lavender Dream Bouquet',
    description: 'Soothing lavender-colored crochet flower bouquet. Elegant and timeless, perfect for weddings or special occasions.',
    price: 1399,
    category: 'Crochet Flower Bouquets',
    images: [
      'https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg'
    ],
    featured: false,
    inStock: true,
    materials: 'Premium cotton yarn, ribbon wrapping',
    dimensions: 'Bouquet height: 28cm',
    careInstructions: 'Keep away from direct sunlight and moisture.',
    productionTime: '3-4 days',
    customizable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    slug: 'crochet-potli-bag-gold',
    name: 'Crochet Potli Bag - Golden Hour',
    description: 'Traditional Indian potli bag with a modern crochet twist. Perfect for weddings and festive occasions.',
    price: 649,
    category: 'Crochet Potli Bags',
    images: [
      'https://images.pexels.com/photos/10820408/pexels-photo-10820408.jpeg'
    ],
    featured: false,
    inStock: true,
    materials: 'Premium cotton yarn, silk lining, drawstring closure',
    dimensions: 'Diameter: 15cm, Height: 18cm',
    careInstructions: 'Spot clean with damp cloth.',
    productionTime: '2-3 days',
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
    content: `## How to Care for Your Handmade Crochet Items\n\nYour beautiful handmade crochet pieces deserve proper care to last for years. Here's our comprehensive guide...\n\n### Cleaning\n- Hand wash in cold water with mild detergent\n- Never use bleach or harsh chemicals\n- Gently squeeze out excess water\n\n### Drying\n- Lay flat on a clean towel\n- Reshape while damp\n- Air dry away from direct sunlight\n\n### Storage\n- Store in a cool, dry place\n- Use breathable fabric bags\n- Avoid plastic containers`,
    excerpt: 'Learn how to properly care for your handmade crochet items to keep them beautiful for years to come.',
    featuredImage: 'https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg',
    author: 'SutraKriti Team',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    slug: 'why-choose-handmade',
    title: 'Why Choose Handmade? The Beauty of Artisan Crafts',
    content: `## The Value of Handmade Artistry\n\nIn a world of mass production, handmade items stand out for their uniqueness and quality...\n\n### Each Piece is Unique\nNo two handmade items are exactly alike. The slight variations add character and authenticity.\n\n### Supporting Artisans\nWhen you buy handmade, you're supporting skilled craftspeople and preserving traditional techniques.\n\n### Quality Over Quantity\nHandmade items are crafted with attention to detail and quality materials.`,
    excerpt: 'Discover why handmade crochet items are worth the investment and how they differ from mass-produced alternatives.',
    featuredImage: 'https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg',
    author: 'SutraKriti Team',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  console.log('Starting database seed...');
  
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.collection('products').deleteMany({});
    await db.collection('blog').deleteMany({});

    // Insert products
    console.log('Inserting products...');
    await db.collection('products').insertMany(products);
    console.log(`✓ Inserted ${products.length} products`);

    // Insert blog posts
    console.log('Inserting blog posts...');
    await db.collection('blog').insertMany(blogPosts);
    console.log(`✓ Inserted ${blogPosts.length} blog posts`);

    // Initialize settings
    console.log('Initializing settings...');
    await db.collection('settings').updateOne(
      { type: 'site' },
      {
        $set: {
          id: uuidv4(),
          type: 'site',
          whatsappNumber: '919876543210',
          instagramHandle: '_sutrakriti',
          email: 'sutrakriti.help@outlook.com',
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log('✓ Settings initialized');

    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seed();
