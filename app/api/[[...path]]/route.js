import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// GET / - Health check
export async function GET(request, { params }) {
  const urlPath = request.nextUrl.pathname.replace('/api', '');
  const { searchParams } = new URL(request.url);

  // Root health check
  if (!urlPath || urlPath === '/' || urlPath === '') {
    return NextResponse.json({
      message: 'SutraKriti API is running',
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  }

  // Products endpoints
  if (urlPath === '/products') {
    return handleGetProducts(searchParams);
  }

  if (urlPath.startsWith('/products/')) {
    const slug = urlPath.split('/products/')[1];
    return handleGetProductBySlug(slug);
  }

  // Categories
  if (urlPath === '/categories') {
    return handleGetCategories();
  }

  // Orders/Enquiries
  if (urlPath === '/orders') {
    return handleGetOrders();
  }

  // Blog
  if (urlPath === '/blog') {
    return handleGetBlogPosts();
  }

  if (urlPath.startsWith('/blog/')) {
    const slug = urlPath.split('/blog/')[1];
    return handleGetBlogPostBySlug(slug);
  }

  // Settings
  if (urlPath === '/settings') {
    return handleGetSettings();
  }

  return NextResponse.json(
    { error: 'Endpoint not found', path: urlPath },
    { status: 404 }
  );
}

// POST handler
export async function POST(request) {
  try {
    const urlPath = request.nextUrl.pathname.replace('/api', '');
    const body = await request.json();

    // Products
    if (urlPath === '/products') {
      return handleCreateProduct(body);
    }

    // Orders/Enquiries
    if (urlPath === '/orders') {
      return handleCreateOrder(body);
    }

    // Custom orders
    if (urlPath === '/custom-orders') {
      return handleCreateCustomOrder(body);
    }

    // Newsletter
    if (urlPath === '/newsletter') {
      return handleNewsletterSignup(body);
    }

    // Contact
    if (urlPath === '/contact') {
      return handleContactSubmission(body);
    }

    // Blog
    if (urlPath === '/blog') {
      return handleCreateBlogPost(body);
    }

    // Settings
    if (urlPath === '/settings') {
      return handleUpdateSettings(body);
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(request) {
  try {
    const urlPath = request.nextUrl.pathname.replace('/api', '');
    const body = await request.json();

    if (urlPath.startsWith('/products/')) {
      const id = urlPath.split('/products/')[1];
      return handleUpdateProduct(id, body);
    }

    if (urlPath.startsWith('/blog/')) {
      const id = urlPath.split('/blog/')[1];
      return handleUpdateBlogPost(id, body);
    }

    if (urlPath === '/settings') {
      return handleUpdateSettings(body);
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(request) {
  try {
    const urlPath = request.nextUrl.pathname.replace('/api', '');

    if (urlPath.startsWith('/products/')) {
      const id = urlPath.split('/products/')[1];
      return handleDeleteProduct(id);
    }

    if (urlPath.startsWith('/blog/')) {
      const id = urlPath.split('/blog/')[1];
      return handleDeleteBlogPost(id);
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Product handlers
async function handleGetProducts(searchParams) {
  try {
    const collection = await getCollection('products');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 0;
    const search = searchParams.get('search');

    let query = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let cursor = collection.find(query, {
      projection: {
        name: 1,
        slug: 1,
        price: 1,
        images: 1,
        category: 1,
        featured: 1,
        inStock: 1,
        description: 1
      }
    }).sort({ createdAt: -1 });

    if (limit > 0) {
      cursor = cursor.limit(limit);
    }

    const products = await cursor.toArray();

    return NextResponse.json({
      products,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', message: error.message },
      { status: 500 }
    );
  }
}

async function handleGetProductBySlug(slug) {
  try {
    const collection = await getCollection('products');
    const product = await collection.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', message: error.message },
      { status: 500 }
    );
  }
}

async function handleCreateProduct(data) {
  try {
    const collection = await getCollection('products');

    const product = {
      id: uuidv4(),
      slug: generateSlug(data.name),
      name: data.name,
      description: data.description || '',
      price: data.price,
      category: data.category,
      images: data.images || [],
      featured: data.featured || false,
      inStock: data.inStock !== undefined ? data.inStock : true,
      materials: data.materials || '',
      dimensions: data.dimensions || '',
      careInstructions: data.careInstructions || '',
      productionTime: data.productionTime || '',
      customizable: data.customizable || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await collection.insertOne(product);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', message: error.message },
      { status: 500 }
    );
  }
}

async function handleUpdateProduct(id, data) {
  try {
    const collection = await getCollection('products');

    const updateData = {
      ...data,
      updatedAt: new Date()
    };

    if (data.name) {
      updateData.slug = generateSlug(data.name);
    }

    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product', message: error.message },
      { status: 500 }
    );
  }
}

async function handleDeleteProduct(id) {
  try {
    const collection = await getCollection('products');
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product', message: error.message },
      { status: 500 }
    );
  }
}

// Categories handler
async function handleGetCategories() {
  try {
    const collection = await getCollection('products');
    const categories = await collection.distinct('category');

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', message: error.message },
      { status: 500 }
    );
  }
}

// Order handlers
async function handleCreateOrder(data) {
  try {
    const collection = await getCollection('orders');

    const order = {
      id: uuidv4(),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      productId: data.productId,
      productName: data.productName,
      message: data.message || '',
      status: 'pending',
      createdAt: new Date()
    };

    await collection.insertOne(order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error.message },
      { status: 500 }
    );
  }
}

async function handleGetOrders() {
  try {
    const collection = await getCollection('orders');
    const orders = await collection
      .find({}, { 
        projection: { 
          customerName: 1, 
          customerEmail: 1,
          customerPhone: 1,
          productName: 1, 
          status: 1, 
          createdAt: 1,
          message: 1
        } 
      })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', message: error.message },
      { status: 500 }
    );
  }
}

// Custom order handler
async function handleCreateCustomOrder(data) {
  try {
    const collection = await getCollection('customOrders');

    const customOrder = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      productType: data.productType,
      description: data.description,
      colors: data.colors || '',
      budget: data.budget || '',
      deliveryDate: data.deliveryDate || '',
      referenceImages: data.referenceImages || [],
      status: 'pending',
      createdAt: new Date()
    };

    await collection.insertOne(customOrder);

    return NextResponse.json(customOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating custom order:', error);
    return NextResponse.json(
      { error: 'Failed to create custom order', message: error.message },
      { status: 500 }
    );
  }
}

// Newsletter handler
async function handleNewsletterSignup(data) {
  try {
    const collection = await getCollection('newsletter');

    // Check if email already exists
    const existing = await collection.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const subscriber = {
      id: uuidv4(),
      email: data.email,
      subscribedAt: new Date()
    };

    await collection.insertOne(subscriber);

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe', message: error.message },
      { status: 500 }
    );
  }
}

// Contact handler
async function handleContactSubmission(data) {
  try {
    const collection = await getCollection('contacts');

    const contact = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      message: data.message,
      status: 'new',
      createdAt: new Date()
    };

    await collection.insertOne(contact);

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form', message: error.message },
      { status: 500 }
    );
  }
}

// Blog handlers
async function handleGetBlogPosts() {
  try {
    const collection = await getCollection('blog');
    const posts = await collection
      .find({ published: true }, {
        projection: {
          title: 1,
          slug: 1,
          excerpt: 1,
          featuredImage: 1,
          author: 1,
          createdAt: 1
        }
      })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', message: error.message },
      { status: 500 }
    );
  }
}

async function handleGetBlogPostBySlug(slug) {
  try {
    const collection = await getCollection('blog');
    const post = await collection.findOne({ slug, published: true });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', message: error.message },
      { status: 500 }
    );
  }
}

async function handleCreateBlogPost(data) {
  try {
    const collection = await getCollection('blog');

    const post = {
      id: uuidv4(),
      slug: generateSlug(data.title),
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || '',
      featuredImage: data.featuredImage || '',
      author: data.author || 'SutraKriti Team',
      published: data.published || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await collection.insertOne(post);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', message: error.message },
      { status: 500 }
    );
  }
}

async function handleUpdateBlogPost(id, data) {
  try {
    const collection = await getCollection('blog');

    const updateData = {
      ...data,
      updatedAt: new Date()
    };

    if (data.title) {
      updateData.slug = generateSlug(data.title);
    }

    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', message: error.message },
      { status: 500 }
    );
  }
}

async function handleDeleteBlogPost(id) {
  try {
    const collection = await getCollection('blog');
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', message: error.message },
      { status: 500 }
    );
  }
}

// Settings handlers
async function handleGetSettings() {
  try {
    const collection = await getCollection('settings');
    let settings = await collection.findOne({ type: 'site' });

    if (!settings) {
      // Initialize default settings
      settings = {
        id: uuidv4(),
        type: 'site',
        whatsappNumber: '917777932385',
        instagramHandle: 'sutrakriti',
        email: 'orders@sutrakriti.com',
        updatedAt: new Date()
      };
      await collection.insertOne(settings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings', message: error.message },
      { status: 500 }
    );
  }
}

async function handleUpdateSettings(data) {
  try {
    const collection = await getCollection('settings');

    const updateData = {
      ...data,
      type: 'site',
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { type: 'site' },
      { $set: updateData },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings', message: error.message },
      { status: 500 }
    );
  }
}