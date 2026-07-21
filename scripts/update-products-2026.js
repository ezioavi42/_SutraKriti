const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    process.env[key.trim()] = valueParts.join('=').trim();
  }
});

const products = [
  // GAJRA - Traditional Crochet Flower Garland
  {
    slug: 'handmade-crochet-gajra-white',
    name: 'Handmade Crochet Gajra - Classic White',
    description: 'Traditional handcrafted crochet gajra (flower garland) perfect for weddings, festivals, and special occasions. Made with premium white cotton yarn, each flower is meticulously crafted to create an elegant and timeless accessory. Can be worn as a hair accessory or used as home décor.',
    price: 599,
    category: 'Crochet Flower Bouquets',
    images: [
      '/products/Gajra/Gajra1.jpg',
      '/products/Gajra/Gajra2.png',
      '/products/Gajra/Gajra3.png',
      '/products/Gajra/Gajra4.png',
      '/products/Gajra/Gajra5.png',
      '/products/Gajra/Gajra6.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Soft filling', 'Durable thread'],
    features: [
      'Traditional Indian gajra design',
      'Perfect for weddings and festivals',
      'Lightweight and comfortable',
      'Can be customized in different colors',
      'Reusable and long-lasting'
    ],
    dimensions: {
      length: 'Approx 50-60 cm (customizable)',
      weight: '50g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Spot clean only. Store in a dry place away from moisture. Handle with care to maintain shape.'
  },

  // POTLI BAGS
  {
    slug: 'crochet-potli-bag-multicolor-1',
    name: 'Crochet Potli Bag - Vibrant Multicolor',
    description: 'Beautifully handcrafted crochet potli bag with vibrant multicolor stripes. Perfect for weddings, festivals, parties, or as an everyday statement accessory. Features a drawstring closure and spacious interior to hold your essentials.',
    price: 799,
    category: 'Crochet Bags',
    images: [
      '/products/Potli_Bags/Bag1/Bag1.jpeg',
      '/products/Potli_Bags/Bag1/Bag1_1.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Cotton lining', 'Drawstring closure'],
    features: [
      'Vibrant multicolor design',
      'Spacious interior',
      'Drawstring closure for security',
      'Perfect for weddings and festivals',
      'Lightweight and easy to carry'
    ],
    dimensions: {
      height: 'Approx 20 cm',
      width: 'Approx 18 cm',
      weight: '150g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash with cold water and mild detergent. Air dry flat. Avoid machine wash.'
  },
  {
    slug: 'crochet-potli-bag-navy-classic',
    name: 'Crochet Potli Bag - Classic Navy Blue',
    description: 'Elegant handmade crochet potli bag in rich navy blue with beautiful texture. Perfect for traditional events, weddings, or adding a sophisticated touch to your outfit. Features secure drawstring closure and comfortable carrying.',
    price: 849,
    category: 'Crochet Bags',
    images: [
      '/products/Potli_Bags/Bag4/Bag4.jpeg',
      '/products/Potli_Bags/Bag4/Image1.png',
      '/products/Potli_Bags/Bag4/Image2.png',
      '/products/Potli_Bags/Bag4/Image3.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Cotton lining', 'Drawstring closure'],
    features: [
      'Rich navy blue color',
      'Perfect for traditional and formal wear',
      'Secure drawstring closure',
      'Compact yet spacious',
      'Handcrafted with love'
    ],
    dimensions: {
      height: 'Approx 20 cm',
      width: 'Approx 18 cm',
      weight: '140g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash with cold water. Air dry away from direct sunlight. Handle with care.'
  },
  {
    slug: 'crochet-potli-bag-beige-natural',
    name: 'Crochet Potli Bag - Natural Beige',
    description: 'Stunning handcrafted crochet potli bag in natural beige/tan color. Perfect for weddings, festive occasions, or as a versatile everyday accessory. Features intricate crochet work and secure drawstring closure.',
    price: 899,
    category: 'Crochet Bags',
    images: [
      '/products/Potli_Bags/Bag5/Bag5.jpeg',
      '/products/Potli_Bags/Bag5/Image1.png',
      '/products/Potli_Bags/Bag5/Image2.png',
      '/products/Potli_Bags/Bag5/Image3.png',
      '/products/Potli_Bags/Bag5/Image4.png',
      '/products/Potli_Bags/Bag5/Image5.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Cotton lining', 'Drawstring closure'],
    features: [
      'Natural beige/tan color',
      'Perfect for traditional and contemporary looks',
      'Durable and long-lasting',
      'Spacious interior',
      'Neutral tone matches any outfit'
    ],
    dimensions: {
      height: 'Approx 22 cm',
      width: 'Approx 19 cm',
      weight: '160g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash gently with cold water. Do not wring. Air dry flat in shade.'
  },

  // SLING BAGS
  {
    slug: 'crochet-sling-bag-colorful-boho',
    name: 'Crochet Sling Bag - Colorful Boho',
    description: 'Trendy handmade crochet sling bag with vibrant bohemian colors. Perfect for casual outings, beach days, or adding a pop of color to your outfit. Features adjustable strap and secure closure.',
    price: 1099,
    category: 'Crochet Bags',
    images: [
      '/products/Sling_Bags/Bag1/Image0.jpeg',
      '/products/Sling_Bags/Bag1/image1.png',
      '/products/Sling_Bags/Bag1/image2.png',
      '/products/Sling_Bags/Bag1/image3.png',
      '/products/Sling_Bags/Bag1/image4.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Adjustable strap', 'Button closure'],
    features: [
      'Vibrant bohemian design',
      'Adjustable shoulder strap',
      'Perfect for casual wear',
      'Lightweight and comfortable',
      'Spacious main compartment'
    ],
    dimensions: {
      height: 'Approx 20 cm',
      width: 'Approx 25 cm',
      depth: 'Approx 8 cm',
      weight: '200g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash with cold water. Air dry flat. Avoid heavy loads to maintain shape.'
  },
  {
    slug: 'crochet-sling-bag-pastel-mint',
    name: 'Crochet Sling Bag - Pastel Mint',
    description: 'Chic handcrafted crochet sling bag in soothing pastel mint color. Perfect for everyday use, shopping, or casual outings. Features comfortable strap and spacious interior.',
    price: 1149,
    category: 'Crochet Bags',
    images: [
      '/products/Sling_Bags/Bag2/Image0.jpeg',
      '/products/Sling_Bags/Bag2/image1.png',
      '/products/Sling_Bags/Bag2/image2.png',
      '/products/Sling_Bags/Bag2/image3.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Adjustable strap', 'Secure closure'],
    features: [
      'Soft pastel mint color',
      'Perfect for summer outfits',
      'Adjustable and comfortable strap',
      'Compact yet spacious',
      'Versatile design'
    ],
    dimensions: {
      height: 'Approx 20 cm',
      width: 'Approx 24 cm',
      depth: 'Approx 8 cm',
      weight: '190g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash with mild detergent. Air dry in shade. Do not bleach.'
  },
  {
    slug: 'crochet-sling-bag-rainbow-stripes',
    name: 'Crochet Sling Bag - Rainbow Stripes',
    description: 'Eye-catching handmade crochet sling bag with colorful rainbow stripes. A fun and cheerful accessory perfect for festivals, beach trips, or adding personality to any outfit.',
    price: 1199,
    category: 'Crochet Bags',
    images: [
      '/products/Sling_Bags/Bag3/Image0.jpeg',
      '/products/Sling_Bags/Bag3/image1.png',
      '/products/Sling_Bags/Bag3/image2.png',
      '/products/Sling_Bags/Bag3/image3.png',
      '/products/Sling_Bags/Bag3/image4.png',
      '/products/Sling_Bags/Bag3/image5.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Adjustable strap', 'Zipper closure'],
    features: [
      'Bold rainbow stripe design',
      'Perfect for festivals and beach',
      'Secure zipper closure',
      'Adjustable strap length',
      'Sturdy and durable'
    ],
    dimensions: {
      height: 'Approx 22 cm',
      width: 'Approx 26 cm',
      depth: 'Approx 9 cm',
      weight: '210g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash gently. Do not soak for long periods. Air dry flat away from direct heat.'
  },
  {
    slug: 'crochet-sling-bag-beige-classic',
    name: 'Crochet Sling Bag - Classic Beige',
    description: 'Timeless handcrafted crochet sling bag in neutral beige. A versatile accessory that pairs perfectly with any outfit. Features comfortable strap and practical design.',
    price: 1099,
    category: 'Crochet Bags',
    images: [
      '/products/Sling_Bags/Bag4/PHOTO-2026-03-08-12-17-58.jpg'
    ],
    featured: false,
    inStock: true,
    materials: ['Premium cotton yarn', 'Adjustable strap', 'Button closure'],
    features: [
      'Neutral beige color',
      'Matches any outfit',
      'Lightweight and practical',
      'Perfect for daily use',
      'Timeless design'
    ],
    dimensions: {
      height: 'Approx 20 cm',
      width: 'Approx 24 cm',
      depth: 'Approx 8 cm',
      weight: '180g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash with cold water. Air dry flat. Avoid exposure to direct sunlight for extended periods.'
  },

  // TOTE BAG
  {
    slug: 'crochet-tote-bag-multicolor-everyday',
    name: 'Crochet Tote Bag - Multicolor Everyday',
    description: 'Spacious handmade crochet tote bag with beautiful multicolor design. Perfect for grocery shopping, beach trips, work, or everyday errands. Features sturdy handles and large capacity.',
    price: 1299,
    category: 'Crochet Bags',
    images: [
      '/products/Tote_Bags/Bag1/Image0.jpeg',
      '/products/Tote_Bags/Bag1/image2.png',
      '/products/Tote_Bags/Bag1/image3.png',
      '/products/Tote_Bags/Bag1/image4.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Reinforced handles', 'Cotton lining'],
    features: [
      'Large capacity for shopping',
      'Sturdy and durable handles',
      'Colorful and cheerful design',
      'Eco-friendly alternative to plastic bags',
      'Versatile for multiple uses'
    ],
    dimensions: {
      height: 'Approx 35 cm',
      width: 'Approx 40 cm',
      depth: 'Approx 12 cm',
      weight: '300g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Hand wash with mild soap. Air dry completely before storage. Can handle moderate weight.'
  },

  // iPAD SLEEVES
  {
    slug: 'crochet-ipad-sleeve-sage-green',
    name: 'Crochet iPad Sleeve - Sage Green Premium',
    description: 'Premium handmade crochet sleeve for iPad and tablets. Features beautiful sage green and cream color combination with wooden button closure. Soft padding protects your device while adding artisan style to your tech accessories.',
    price: 899,
    category: 'Tech Accessories',
    images: [
      '/products/iPad_Sleeve/Sleeve1/image0.jpeg',
      '/products/iPad_Sleeve/Sleeve1/image1.png',
      '/products/iPad_Sleeve/Sleeve1/image2.png',
      '/products/iPad_Sleeve/Sleeve1/image3.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Soft padding', 'Wooden button', 'Cotton lining'],
    features: [
      'Fits most iPads and tablets up to 11 inches',
      'Soft padding for device protection',
      'Elegant sage green and cream design',
      'Secure wooden button closure',
      'Lightweight and slim profile'
    ],
    dimensions: {
      height: 'Approx 28 cm',
      width: 'Approx 22 cm',
      weight: '120g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Wipe with damp cloth. Do not machine wash. Store in dry place when not in use.'
  },
  {
    slug: 'crochet-ipad-sleeve-beige-classic',
    name: 'Crochet iPad Sleeve - Classic Beige',
    description: 'Elegant handcrafted crochet tablet sleeve in classic beige tone. Perfect protection for your iPad with a touch of handmade charm. Features button closure and soft interior padding.',
    price: 849,
    category: 'Tech Accessories',
    images: [
      '/products/iPad_Sleeve/Sleeve2/image0.jpeg',
      '/products/iPad_Sleeve/Sleeve2/image1.png',
      '/products/iPad_Sleeve/Sleeve2/image2.png',
      '/products/iPad_Sleeve/Sleeve2/image3.png'
    ],
    featured: true,
    inStock: true,
    materials: ['Premium cotton yarn', 'Soft padding', 'Button closure', 'Cotton lining'],
    features: [
      'Universal fit for tablets and iPads',
      'Neutral beige color',
      'Padded for protection',
      'Secure button closure',
      'Sleek and professional look'
    ],
    dimensions: {
      height: 'Approx 28 cm',
      width: 'Approx 22 cm',
      weight: '115g'
    },
    deliveryTime: '10-15 days',
    careInstructions: 'Spot clean with damp cloth. Avoid soaking. Keep away from sharp objects.'
  }
];

async function updateProducts() {
  const client = new MongoClient(process.env.MONGO_URL);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const dbName = process.env.DB_NAME || 'sutrakriti';
    const db = client.db(dbName);
    console.log(`✓ Using database: ${dbName}`);
    
    const productsCollection = db.collection('products');

    // Delete all existing products
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`✓ Deleted ${deleteResult.deletedCount} existing products`);

    // Insert new products
    const insertResult = await productsCollection.insertMany(products);
    console.log(`✓ Inserted ${insertResult.insertedCount} new products`);

    // Create indexes
    await productsCollection.createIndex({ slug: 1 }, { unique: true });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ featured: 1 });
    console.log('✓ Created indexes');

    // Display summary
    console.log('\n=== Product Summary ===');
    const categories = await productsCollection.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]).toArray();
    
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} products`);
    });

    console.log('\n✓ Product database updated successfully!');
    console.log(`Total products: ${products.length}`);

  } catch (error) {
    console.error('❌ Error updating products:', error);
    throw error;
  } finally {
    await client.close();
  }
}

updateProducts();
