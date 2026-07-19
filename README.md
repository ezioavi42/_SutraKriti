# SutraKriti - Premium Handmade Crochet Boutique

**Tagline:** *Threads of Art. Handmade with Heart.*

A beautiful, conversion-focused luxury e-commerce website for SutraKriti - a premium handmade crochet brand that celebrates craftsmanship, creativity, and sustainable living.

## 🌟 Live Demo

Visit: https://craft-boutique-26.preview.emergentcf.cloud

## ✨ Key Features

### 🛍️ Customer Experience
- **Premium Homepage** - Stunning hero section, featured categories, best sellers, our story, testimonials
- **Product Collections** - Advanced filtering by category, search, and sorting options
- **Product Detail Pages** - Beautiful galleries, detailed information, materials, care instructions
- **Direct Ordering** - No payment gateway - customers order via:
  - 📱 **WhatsApp Business** (Primary CTA)
  - 📷 **Instagram DM**
  - 📧 **Email**
- **Floating WhatsApp Button** - Sticky button for quick customer contact
- **Custom Orders** - Complete form for personalized crochet creations
- **Contact Page** - Multiple ways to reach the brand
- **About/Our Story** - Brand storytelling and values

### 🎨 Design Excellence
- **Premium Brand Colors:**
  - Primary: Warm Ivory (#F8F6F2), Cream (#FFF8EF), Soft Beige (#E9DCC9)
  - Secondary: Sage Green (#8CA98D), Lavender (#B7A5D8), Dusty Rose (#D8A7A1)
  - Accent: Gold (#C8A95A)
- **Typography:**
  - Headings: Playfair Display (Elegant Serif)
  - Body: Inter (Modern Sans-serif)
- **Animations:** Subtle Framer Motion animations for premium feel
- **Responsive Design:** Mobile, tablet, and desktop optimized
- **shadcn/ui Components:** Professional, accessible UI components

### 🔧 Admin Dashboard
- **Product Management** - View, edit, delete products
- **Order Management** - Track customer enquiries
- **Custom Order Requests** - Manage personalized orders
- **Settings** - Configure WhatsApp, Instagram, Email

### 🗄️ Database & Backend
- **MongoDB** - Fast, flexible NoSQL database
- **Next.js API Routes** - RESTful endpoints for all operations
- **Collections:**
  - Products (6 sample products included)
  - Orders & Enquiries
  - Custom Orders
  - Newsletter Subscribers
  - Contact Form Submissions
  - Blog Posts
  - Settings

## 📁 Project Structure

```
/app
├── app/
│   ├── page.js                 # Homepage
│   ├── layout.js               # Root layout with fonts & metadata
│   ├── globals.css             # Global styles & design tokens
│   ├── collections/page.js     # Product catalog with filters
│   ├── products/[slug]/page.js # Dynamic product detail pages
│   ├── custom-orders/page.js   # Custom order form
│   ├── contact/page.js         # Contact page
│   ├── about/page.js           # Our story page
│   ├── admin/page.js           # Admin dashboard
│   └── api/[[...path]]/route.js # Backend API
├── components/
│   ├── Header.jsx              # Navigation header
│   ├── Footer.jsx              # Footer with newsletter
│   └── WhatsAppFloat.jsx       # Floating WhatsApp button
├── lib/
│   ├── db.js                   # MongoDB connection
│   └── config.js               # Site configuration
├── scripts/
│   └── seed.js                 # Database seeding script
└── public/
    └── logo.png                # SutraKriti logo
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running on localhost:27017
- Yarn package manager

### Installation

1. **Install Dependencies**
```bash
yarn install
```

2. **Configure Environment**
The `.env` file is already configured:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=sutrakriti
NEXT_PUBLIC_BASE_URL=https://craft-boutique-26.preview.emergentagent.com
```

3. **Seed Database**
```bash
node scripts/seed.js
```

This will populate the database with:
- 6 sample products (bouquets, bags)
- 2 blog posts
- Default settings

4. **Start Development Server**
```bash
yarn dev
```

Visit http://localhost:3000

## 📱 Order Flow (No Payment Gateway)

SutraKriti uses a **direct order approach** instead of online payments:

1. **Customer browses products** → Collections or Homepage
2. **Clicks on product** → Product Detail Page
3. **Orders via:**
   - **WhatsApp** - Opens chat with pre-filled message
   - **Instagram** - Redirects to brand profile
   - **Email** - Opens email client with order details
4. **Admin receives enquiry** → Manually processes order

### WhatsApp Integration
```javascript
// Example WhatsApp URL generated
https://wa.me/917777932385?text=Hi%20SutraKriti,%20I%20would%20like%20to%20order...
```

## 🗂️ API Endpoints

### Products
- `GET /api/products` - List all products (supports ?category, ?featured, ?limit, ?search)
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order enquiry
- `POST /api/custom-orders` - Create custom order request

### Others
- `GET /api/categories` - List unique categories
- `POST /api/newsletter` - Newsletter signup
- `POST /api/contact` - Contact form submission
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update settings

## 🎯 Key Product Categories

1. Crochet Flower Bouquets
2. Crochet Tote Bags
3. Crochet Sling Bags
4. Crochet Potli Bags
5. Home Décor
6. Gift Collections
7. Baby Collection
8. Seasonal Collection

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Language:** JavaScript (React 18.3)
- **Styling:** Tailwind CSS 3.4 + shadcn/ui
- **Animations:** Framer Motion 11.18
- **Database:** MongoDB 6.6
- **UI Components:** Radix UI primitives
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Notifications:** Sonner (toast)

## 🎨 Design System

### Colors
```css
--primary: #C8A95A (Gold)
--cream: #FFF8EF
--beige: #E9DCC9
--sage: #8CA98D
--lavender: #B7A5D8
--dusty-rose: #D8A7A1
```

### Typography
```css
font-serif: 'Playfair Display', serif;
font-sans: 'Inter', sans-serif;
```

## 📊 Sample Products Included

1. **Handmade Rose Bouquet** - ₹1299
2. **Crochet Tote Bag - Beige** - ₹899
3. **Sunflower Crochet Bouquet** - ₹1499
4. **Crochet Sling Bag - Pastel Mix** - ₹749
5. **Lavender Dream Bouquet** - ₹1399
6. **Crochet Potli Bag - Golden Hour** - ₹649

## 🔒 Admin Access

Visit `/admin` to access the admin dashboard.

**Note:** Authentication is not implemented in MVP. Add authentication (e.g., NextAuth.js) for production.

## 📝 Customization

### Update Contact Information

Edit settings via Admin Dashboard or directly update MongoDB:

```javascript
// Update WhatsApp number, Instagram handle, Email
await db.collection('settings').updateOne(
  { type: 'site' },
  { $set: {
    whatsappNumber: '917777932385',
    instagramHandle: 'sutrakriti',
    email: 'orders@_sutrakriti.com'
  }}
);
```

### Add New Products

1. Via Admin Dashboard (`/admin`)
2. Or use API:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "price": 999,
    "category": "Crochet Bags",
    "description": "Beautiful handmade bag",
    "images": ["https://..."],
    "featured": true
  }'
```

## 🌐 Deployment

The site is deployed and accessible at:
**https://craft-boutique-26.preview.emergentcf.cloud**

For production deployment:
1. Set up MongoDB Atlas (cloud database)
2. Update MONGO_URL in environment
3. Deploy to Vercel, Netlify, or your preferred host
4. Update NEXT_PUBLIC_BASE_URL

## ✅ MVP Features Completed

- ✅ Premium homepage with hero, categories, features, testimonials
- ✅ Product collections with filtering and search
- ✅ Product detail pages with image galleries
- ✅ WhatsApp/Instagram/Email ordering (NO payment gateway)
- ✅ Floating WhatsApp button
- ✅ Custom order request form
- ✅ Contact page
- ✅ About/Our Story page
- ✅ Newsletter signup
- ✅ Admin dashboard (basic)
- ✅ MongoDB database with seed data
- ✅ RESTful API
- ✅ Responsive design
- ✅ Premium brand styling
- ✅ SEO-friendly metadata

## 🚀 Future Enhancements

**Phase 2 (Not in MVP):**
- [ ] Authentication for admin dashboard
- [ ] Image upload functionality (Cloudinary integration)
- [ ] Email notifications (Resend integration)
- [ ] Blog system (full CMS)
- [ ] AI-powered product descriptions
- [ ] Gallery page
- [ ] Instagram feed integration
- [ ] Google Analytics
- [ ] Product reviews system
- [ ] Wishlist functionality
- [ ] Advanced search with facets
- [ ] Multi-language support

## 📄 License

Copyright © 2026 SutraKriti. All rights reserved.

## 🙏 Credits

- **Design Inspiration:** Anthropologie, Etsy Premium Stores
- **Images:** Pexels (royalty-free)
- **Fonts:** Google Fonts (Playfair Display, Inter)
- **UI Components:** shadcn/ui

---

**Built with ❤️ for SutraKriti - Where Every Stitch Tells a Story**

*Handmade with Love. Crafted to Last.*
