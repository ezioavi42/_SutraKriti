# 📦 SutraKriti Product Catalog Management Guide

Complete guide for adding, updating, and managing products with images and attributes.

---

## Table of Contents

1. [Product Data Structure](#product-data-structure)
2. [Method 1: Using Admin Dashboard](#method-1-admin-dashboard)
3. [Method 2: Using API (Recommended)](#method-2-using-api)
4. [Method 3: Using MongoDB Directly](#method-3-mongodb-directly)
5. [Method 4: Bulk Import Script](#method-4-bulk-import-script)
6. [Image Management](#image-management)
7. [Product Attributes Reference](#product-attributes-reference)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Product Data Structure

Each product in the catalog has the following structure:

```javascript
{
  id: "unique-uuid",                    // Auto-generated
  slug: "product-url-friendly-name",    // Auto-generated from name
  name: "Product Display Name",         // Required
  description: "Detailed description",  // Required
  price: 1299,                         // Required (in rupees)
  category: "Category Name",           // Required
  images: [                            // Array of image URLs
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  featured: true,                      // Optional (default: false)
  inStock: true,                       // Optional (default: true)
  materials: "Premium cotton yarn",    // Optional
  dimensions: "30cm x 20cm",          // Optional
  careInstructions: "Hand wash only", // Optional
  productionTime: "3-4 days",         // Optional
  customizable: true,                  // Optional (default: false)
  createdAt: ISODate,                 // Auto-generated
  updatedAt: ISODate                  // Auto-generated
}
```

---

## Method 1: Admin Dashboard

### Step-by-Step Guide

#### 1. Access Admin Dashboard

```
URL: https://craft-boutique-26.preview.emergentagent.com/admin
```

**Note:** Currently no authentication - add NextAuth.js for production security.

#### 2. Navigate to Products Tab

Click on the **"Products"** tab to view all existing products.

#### 3. Add New Product (Current Limitation)

⚠️ **Current Status:** The admin dashboard currently supports:
- ✅ View all products
- ✅ Delete products
- ❌ Add new products (UI not implemented)
- ❌ Edit products (UI not implemented)

**Recommendation:** Use Method 2 (API) or Method 4 (Script) to add products until admin UI is enhanced.

#### 4. Future Enhancement

To add product management UI:
1. Add a form modal/page
2. Include image upload functionality (Cloudinary integration)
3. Connect to POST/PUT API endpoints

---

## Method 2: Using API (Recommended)

### Add New Product via API

#### Option A: Using curl (Command Line)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Beautiful Crochet Flower Bouquet",
    "description": "A stunning handcrafted crochet flower bouquet perfect for gifting. Made with premium cotton yarn in vibrant colors.",
    "price": 1499,
    "category": "Crochet Flower Bouquets",
    "images": [
      "https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg",
      "https://images.pexels.com/photos/20865317/pexels-photo-20865317.jpeg"
    ],
    "featured": true,
    "inStock": true,
    "materials": "Premium cotton yarn, wire stems",
    "dimensions": "Bouquet height: 35cm, Flower diameter: 10cm",
    "careInstructions": "Keep away from moisture. Dust with soft cloth.",
    "productionTime": "3-4 days",
    "customizable": true
  }'
```

#### Option B: Using JavaScript/Node.js

```javascript
const addProduct = async () => {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: "Beautiful Crochet Flower Bouquet",
      description: "A stunning handcrafted crochet flower bouquet...",
      price: 1499,
      category: "Crochet Flower Bouquets",
      images: [
        "https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg"
      ],
      featured: true,
      inStock: true,
      materials: "Premium cotton yarn",
      dimensions: "35cm height",
      careInstructions: "Keep dry",
      productionTime: "3-4 days",
      customizable: true
    })
  });

  const data = await response.json();
  console.log('Product added:', data);
};

addProduct();
```

### Update Existing Product

```bash
# Update product by ID
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1599,
    "inStock": false,
    "description": "Updated description"
  }'
```

### Delete Product

```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID
```

### Get All Products

```bash
# Get all products
curl http://localhost:3000/api/products

# Get featured products
curl http://localhost:3000/api/products?featured=true

# Get by category
curl "http://localhost:3000/api/products?category=Crochet%20Flower%20Bouquets"

# Search products
curl "http://localhost:3000/api/products?search=bouquet"
```

---

## Method 3: MongoDB Directly

### Using MongoDB Shell

#### 1. Connect to MongoDB

```bash
mongosh mongodb://localhost:27017/sutrakriti
```

#### 2. Add New Product

```javascript
use sutrakriti

db.products.insertOne({
  id: "unique-uuid-here",  // Use UUID library or generate manually
  slug: "crochet-sunflower-bouquet",
  name: "Crochet Sunflower Bouquet",
  description: "Bright and cheerful sunflower bouquet that never wilts. Perfect for home décor.",
  price: 1399,
  category: "Crochet Flower Bouquets",
  images: [
    "https://images.pexels.com/photos/20865317/pexels-photo-20865317.jpeg"
  ],
  featured: true,
  inStock: true,
  materials: "Premium cotton yarn, decorative pot",
  dimensions: "Height: 35cm, Diameter: 12cm",
  careInstructions: "Dust with soft cloth. Keep in dry place.",
  productionTime: "4-5 days",
  customizable: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### 3. Update Product

```javascript
db.products.updateOne(
  { slug: "crochet-sunflower-bouquet" },
  { 
    $set: { 
      price: 1299,
      inStock: false,
      updatedAt: new Date()
    }
  }
)
```

#### 4. Delete Product

```javascript
db.products.deleteOne({ slug: "crochet-sunflower-bouquet" })
```

#### 5. View All Products

```javascript
db.products.find().pretty()
```

---

## Method 4: Bulk Import Script

### Create a Product Import Script

Create a file: `/app/scripts/add-products.js`

```javascript
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sutrakriti';

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Define your products array
const newProducts = [
  {
    name: "Crochet Tulip Bouquet",
    description: "Elegant tulip bouquet in soft pastel colors. Each flower is carefully handcrafted with premium yarn.",
    price: 1199,
    category: "Crochet Flower Bouquets",
    images: [
      "https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg"
    ],
    featured: true,
    inStock: true,
    materials: "Premium cotton yarn, wire stems, decorative wrapping",
    dimensions: "Bouquet height: 30cm, Tulip length: 25cm",
    careInstructions: "Keep away from direct sunlight and moisture. Dust gently.",
    productionTime: "3-4 days",
    customizable: true
  },
  {
    name: "Crochet Crossbody Bag - Navy Blue",
    description: "Stylish navy blue crossbody bag perfect for everyday use. Features adjustable strap and secure zipper closure.",
    price: 849,
    category: "Crochet Sling Bags",
    images: [
      "https://images.pexels.com/photos/10820408/pexels-photo-10820408.jpeg"
    ],
    featured: true,
    inStock: true,
    materials: "Premium cotton yarn, cotton lining, metal zipper",
    dimensions: "Width: 22cm, Height: 18cm, Depth: 8cm",
    careInstructions: "Spot clean only. Avoid soaking.",
    productionTime: "4-5 days",
    customizable: true
  },
  {
    name: "Crochet Baby Blanket - Pastel Rainbow",
    description: "Soft and cozy baby blanket in beautiful pastel rainbow colors. Perfect for newborns and infants.",
    price: 1899,
    category: "Baby Collection",
    images: [
      "https://images.pexels.com/photos/9173523/pexels-photo-9173523.jpeg"
    ],
    featured: false,
    inStock: true,
    materials: "Soft baby-friendly acrylic yarn",
    dimensions: "90cm x 90cm",
    careInstructions: "Machine washable on gentle cycle. Lay flat to dry.",
    productionTime: "7-10 days",
    customizable: true
  }
  // Add more products here...
];

async function addProducts() {
  console.log('Connecting to database...');
  
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  try {
    console.log(`Adding ${newProducts.length} products...`);
    
    // Process each product
    const productsToInsert = newProducts.map(product => ({
      id: uuidv4(),
      slug: generateSlug(product.name),
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert products
    const result = await db.collection('products').insertMany(productsToInsert);
    
    console.log(`✓ Successfully added ${result.insertedCount} products`);
    
    // Show inserted products
    console.log('\nInserted products:');
    productsToInsert.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug})`);
    });
    
    console.log('\n✅ Product import complete!');

  } catch (error) {
    console.error('❌ Error adding products:', error);
  } finally {
    await client.close();
  }
}

addProducts();
```

### Run the Script

```bash
cd /app
node scripts/add-products.js
```

### Expected Output

```
Connecting to database...
Adding 3 products...
✓ Successfully added 3 products

Inserted products:
1. Crochet Tulip Bouquet (crochet-tulip-bouquet)
2. Crochet Crossbody Bag - Navy Blue (crochet-crossbody-bag-navy-blue)
3. Crochet Baby Blanket - Pastel Rainbow (crochet-baby-blanket-pastel-rainbow)

✅ Product import complete!
```

---

## Image Management

### Image URL Options

#### Option 1: External Image Hosting (Current Method)

Use free image hosting services:

**Pexels (Free Stock Photos):**
```
https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg
```

**Unsplash:**
```
https://images.unsplash.com/photo-xyz?w=800
```

**ImgBB (Free Image Hosting):**
1. Go to https://imgbb.com/
2. Upload your image
3. Copy the direct link
4. Use in product images array

**Imgur:**
1. Upload to https://imgur.com/
2. Get direct link
3. Use in product

#### Option 2: Cloudinary (Recommended for Production)

**Setup:**
1. Create free account at https://cloudinary.com/
2. Get your API credentials
3. Install Cloudinary SDK:
   ```bash
   yarn add cloudinary
   ```

**Upload Script Example:**
```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

// Upload image
const uploadImage = async (imagePath) => {
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: 'sutrakriti/products'
  });
  return result.secure_url;
};

// Use in product
const imageUrl = await uploadImage('./product-photo.jpg');
```

#### Option 3: Public Folder (For Small Sites)

1. Place images in `/app/public/products/`
2. Use relative URLs:
   ```javascript
   images: ["/products/bouquet-1.jpg"]
   ```

**Limitations:**
- Not scalable for many images
- No CDN benefits
- Takes up server space

---

## Product Attributes Reference

### Required Attributes

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `name` | String | Product display name | "Crochet Rose Bouquet" |
| `description` | String | Detailed description | "Handcrafted bouquet..." |
| `price` | Number | Price in rupees | 1299 |
| `category` | String | Product category | "Crochet Flower Bouquets" |

### Optional Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `images` | Array | `[]` | Array of image URLs |
| `featured` | Boolean | `false` | Show on homepage? |
| `inStock` | Boolean | `true` | Product availability |
| `materials` | String | `""` | Materials used |
| `dimensions` | String | `""` | Product size |
| `careInstructions` | String | `""` | How to care for product |
| `productionTime` | String | `""` | Time to make |
| `customizable` | Boolean | `false` | Can be personalized? |

### Valid Categories

Currently supported categories:
- `Crochet Bouquet Blankets`
- `Crochet Flower Bouquets`
- `Crochet Sling Bags`
- `Crochet Potli Bags`
- `Crochet Tote Bags`
- `Tech Accessories`
- `Home Décor`
- `Baby Collection`
- `Gift Collections`
- `Seasonal Collection`

**To add new category:**
1. Just use it in a product - it will automatically appear in filters
2. Or update `/app/lib/config.js` to add it to the predefined list

---

## Best Practices

### 1. Image Guidelines

**Recommended Specifications:**
- **Format:** JPEG or WebP
- **Size:** Max 500KB per image
- **Dimensions:** 800x800px to 1200x1200px
- **Aspect Ratio:** Square (1:1) or portrait (3:4)
- **Quality:** High quality, well-lit photos
- **Background:** Clean, uncluttered

**Multiple Images:**
```javascript
images: [
  "main-product-photo.jpg",      // Hero image
  "detail-shot.jpg",             // Close-up of craftsmanship
  "lifestyle-photo.jpg",         // Product in use
  "size-comparison.jpg"          // Size reference
]
```

### 2. Product Naming

**Good Examples:**
- ✅ "Crochet Rose Bouquet - Red"
- ✅ "Handmade iPad Sleeve - Sage Green"
- ✅ "Crochet Beach Tote Bag"

**Avoid:**
- ❌ "Product 1"
- ❌ "Untitled"
- ❌ "IMG_1234"

### 3. Descriptions

**Write compelling descriptions:**
```
✅ Good:
"A stunning handcrafted crochet rose bouquet featuring 12 premium 
cotton roses in vibrant red. Each flower is meticulously crafted 
with attention to detail, creating a timeless piece that will 
never wilt. Perfect for anniversaries, Valentine's Day, or home 
décor. Comes with gift-ready packaging."

❌ Bad:
"Rose bouquet. Red color. Handmade."
```

### 4. Pricing Strategy

- Use whole numbers: `1299` instead of `1299.99`
- Price in rupees (₹)
- Maintain consistent pricing tiers:
  - Small items: ₹599-899
  - Medium items: ₹899-1499
  - Large items: ₹1499-2999
  - Premium items: ₹2999+

### 5. Inventory Management

**Mark out of stock:**
```javascript
{
  inStock: false  // Product card will show "Out of Stock" badge
}
```

**Featured products:**
```javascript
{
  featured: true  // Appears on homepage "Best Sellers" section
}
```

### 6. SEO Optimization

**Product names should include:**
- Product type
- Key features
- Color/variant

**Example:**
```javascript
name: "Handmade Crochet iPad Sleeve - Sage Green with Button Closure"
```

This helps with:
- Search engine ranking
- Product discovery
- Customer clarity

---

## Complete Example: Adding a New Product

### Scenario: Adding a "Crochet Laptop Sleeve"

**Step 1: Prepare Product Images**

Upload 3 images to Imgur/ImgBB:
1. Main product photo
2. Detail shot showing craftsmanship
3. Size comparison with laptop

**Step 2: Create Product Data**

```javascript
const newProduct = {
  name: "Crochet Laptop Sleeve - 13 inch - Beige",
  description: "Protect your laptop in style with this handcrafted crochet sleeve. Features soft padded interior, secure button closure, and premium beige cotton yarn. Perfect fit for 13-inch laptops including MacBook Air and similar devices. Each sleeve is individually handmade with care.",
  price: 1199,
  category: "Tech Accessories",
  images: [
    "https://i.imgur.com/abc123.jpg",  // Main photo
    "https://i.imgur.com/def456.jpg",  // Detail shot
    "https://i.imgur.com/ghi789.jpg"   // With laptop
  ],
  featured: true,
  inStock: true,
  materials: "Premium cotton yarn, soft padding, wooden button",
  dimensions: "Fits 13-inch laptops (33cm x 23cm)",
  careInstructions: "Spot clean with damp cloth. Do not machine wash. Air dry flat.",
  productionTime: "4-5 days",
  customizable: true
};
```

**Step 3: Add to Database**

Method A - Via API:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Crochet Laptop Sleeve - 13 inch - Beige",
    "description": "Protect your laptop in style...",
    "price": 1199,
    "category": "Tech Accessories",
    "images": ["https://i.imgur.com/abc123.jpg", "https://i.imgur.com/def456.jpg"],
    "featured": true,
    "inStock": true,
    "materials": "Premium cotton yarn, soft padding",
    "dimensions": "Fits 13-inch laptops",
    "careInstructions": "Spot clean with damp cloth",
    "productionTime": "4-5 days",
    "customizable": true
  }'
```

Method B - Via Script:
```bash
# Add to scripts/add-products.js
# Run: node scripts/add-products.js
```

**Step 4: Verify**

1. Visit: `https://craft-boutique-26.preview.emergentagent.com/collections`
2. Filter by "Tech Accessories"
3. Product should appear
4. Click to verify all details

**Step 5: Test Order Flow**

1. Click product
2. Click "Order on WhatsApp"
3. Verify WhatsApp opens with product details
4. Test Instagram and Email buttons

---

## Troubleshooting

### Issue: Product not appearing on website

**Solutions:**
1. Check if product was added successfully:
   ```bash
   curl http://localhost:3000/api/products | jq '.products[] | .name'
   ```

2. Verify slug is unique:
   ```bash
   mongosh
   use sutrakriti
   db.products.find({slug: "your-product-slug"})
   ```

3. Check if images are loading:
   - Open image URL in browser
   - Verify it's publicly accessible
   - Check for HTTPS (not HTTP)

4. Restart Next.js if needed:
   ```bash
   sudo supervisorctl restart nextjs
   ```

### Issue: Images not displaying

**Solutions:**
1. Verify image URLs are public and accessible
2. Check for CORS issues (some hosts block hotlinking)
3. Use HTTPS URLs (not HTTP)
4. Test image URL directly in browser
5. Try alternative hosting (Cloudinary, ImgBB)

### Issue: Product update not reflecting

**Solutions:**
1. Clear browser cache (Ctrl+F5)
2. Check if update was successful:
   ```bash
   curl http://localhost:3000/api/products/PRODUCT_SLUG
   ```
3. Verify updatedAt timestamp changed
4. Restart Next.js server

### Issue: Slug conflicts

**Error:** "Product with this slug already exists"

**Solution:**
```javascript
// Products must have unique slugs
// Change product name slightly:
"Crochet Bouquet"  -> "Crochet Bouquet Red"
// This generates different slug:
"crochet-bouquet"  -> "crochet-bouquet-red"
```

---

## Quick Reference Commands

### View all products
```bash
curl http://localhost:3000/api/products
```

### Add product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Product Name", "price":999, "category":"Category", "description":"..."}'
```

### Update product
```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"price":1099}'
```

### Delete product
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID
```

### MongoDB commands
```javascript
// Connect
mongosh mongodb://localhost:27017/sutrakriti

// View all
db.products.find().pretty()

// Count
db.products.countDocuments()

// Find by category
db.products.find({category: "Tech Accessories"})

// Update price
db.products.updateOne({slug: "product-slug"}, {$set: {price: 1299}})
```

---

## Summary

**Recommended Workflow:**

1. **Prepare Product Data**
   - Take high-quality photos
   - Upload to image hosting
   - Write compelling description

2. **Choose Method**
   - For 1-2 products: Use API (curl/Postman)
   - For 3+ products: Use bulk script
   - For quick edits: Use MongoDB shell

3. **Add Product**
   - Use curl command or script
   - Verify in database

4. **Test**
   - Check website
   - Test order buttons
   - Verify on mobile

5. **Repeat**
   - Add more products as needed
   - Update inventory status
   - Mark best sellers as featured

---

## Need Help?

**Resources:**
- API Documentation: `/app/app/api/[[...path]]/route.js`
- Product Schema: See "Product Data Structure" section above
- Example Products: Check `/app/scripts/seed.js`
- Current Products: Visit `/admin` to see existing items

**Contact:**
- GitHub Issues: https://github.com/ezioavi42/_SutraKriti/issues
- Check logs: `tail -f /var/log/supervisor/nextjs.out.log`

---

**Your SutraKriti product catalog is ready to be filled with beautiful handmade creations!** 🎨
