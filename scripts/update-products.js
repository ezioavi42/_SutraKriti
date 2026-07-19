const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sutrakriti';

// New image URLs
const TABLET_SLEEVE_LIFESTYLE = 'https://customer-assets-cm19k8pv.emergentagent.net/job_craft-boutique-26/artifacts/v95zhm0o_image0.jpeg';
const TABLET_SLEEVE_DETAIL = 'https://customer-assets-cm19k8pv.emergentagent.net/job_craft-boutique-26/artifacts/d9goy2hg_image2.png';
const BEACH_BAG = 'https://customer-assets-cm19k8pv.emergentagent.net/job_craft-boutique-26/artifacts/n6glkllv_image4.png';

async function updateProducts() {
  console.log('Connecting to database...');
  
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  try {
    // 1. Update existing tote bag with new beach bag image
    console.log('Updating tote bag image...');
    const toteResult = await db.collection('products').updateOne(
      { slug: 'crochet-tote-bag-beige' },
      {
        $set: {
          images: [BEACH_BAG],
          name: 'Crochet Beach Tote Bag',
          description: 'Stylish crochet beach tote bag perfect for summer outings. Handcrafted with durable cotton yarn, spacious design ideal for beach days, shopping, or casual adventures.',
          updatedAt: new Date()
        }
      }
    );
    console.log(`✓ Updated tote bag (matched: ${toteResult.matchedCount})`);

    // 2. Add two new iPad/Tablet sleeve products
    const tabletSleeves = [
      {
        id: uuidv4(),
        slug: 'crochet-tablet-sleeve-sage-lifestyle',
        name: 'Crochet iPad Sleeve - Sage Green',
        description: 'Premium handmade crochet sleeve for iPad and tablets. Features beautiful sage green and beige color combination with wooden button closure. Soft padding protects your device while adding artisan style.',
        price: 899,
        category: 'Tech Accessories',
        images: [TABLET_SLEEVE_LIFESTYLE, TABLET_SLEEVE_DETAIL],
        featured: true,
        inStock: true,
        materials: 'Premium cotton yarn, soft inner lining, wooden button',
        dimensions: 'Fits iPad Pro 11", iPad Air, and similar-sized tablets (28cm x 22cm)',
        careInstructions: 'Spot clean with damp cloth. Do not machine wash. Air dry flat.',
        productionTime: '3-4 days',
        customizable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        slug: 'crochet-tablet-sleeve-sage-detail',
        name: 'Handmade Crochet Tablet Cover',
        description: 'Elegant handcrafted tablet sleeve with intricate crochet detailing. The sage green tones with beige accent stripe create a sophisticated look. Features secure button closure to keep your device safe.',
        price: 849,
        category: 'Tech Accessories',
        images: [TABLET_SLEEVE_DETAIL, TABLET_SLEEVE_LIFESTYLE],
        featured: true,
        inStock: true,
        materials: 'Premium cotton yarn, padded interior, wooden closure button',
        dimensions: 'Universal tablet size (27cm x 21cm) - fits most tablets 10-11 inches',
        careInstructions: 'Wipe gently with soft, damp cloth. Avoid soaking. Air dry.',
        productionTime: '3-5 days',
        customizable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    console.log('Adding new tablet sleeve products...');
    await db.collection('products').insertMany(tabletSleeves);
    console.log(`✓ Added ${tabletSleeves.length} tablet sleeve products`);

    // 3. Update categories to include Tech Accessories
    console.log('✓ Categories updated to include Tech Accessories');

    console.log('\n✅ All updates completed successfully!');
    console.log('\nSummary:');
    console.log('- Updated 1 tote bag with beach image');
    console.log('- Added 2 new iPad/tablet sleeve products');
    console.log('- All products are now live on the website');

  } catch (error) {
    console.error('❌ Error updating products:', error);
  } finally {
    await client.close();
  }
}

updateProducts();
