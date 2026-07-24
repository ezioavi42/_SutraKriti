import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCollection } from '@/lib/db';
import { getAdminAuthState } from '@/lib/admin-auth';
import { consumeRateLimit } from '@/lib/rate-limit';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';

const DEFAULT_SETTINGS = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917777932385',
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '_sutrakriti',
  email: process.env.NEXT_PUBLIC_EMAIL || 'orders@sutrakriti.com',
};

const text = (max, min = 0) => z.string().trim().min(min).max(max);
const phone = text(32, 7).regex(/^[0-9+()\s-]+$/, 'Enter a valid phone number');
const email = z.string().trim().email().max(254);

const productSchema = z.object({
  name: text(160, 1),
  description: text(5000).default(''),
  price: z.coerce.number().finite().nonnegative().max(10000000),
  category: text(100, 1),
  images: z.array(text(2048, 1)).max(10).default([]),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
  materials: text(1000).default(''),
  dimensions: text(500).default(''),
  careInstructions: text(2000).default(''),
  productionTime: text(200).default(''),
  customizable: z.boolean().default(false),
}).strict();

const productUpdateSchema = productSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Provide at least one field to update'
);

const orderSchema = z.object({
  customerName: text(160, 1),
  customerEmail: email,
  customerPhone: phone,
  productId: text(100, 1),
  productName: text(160, 1),
  message: text(3000).default(''),
}).strict();

const customOrderSchema = z.object({
  name: text(160, 1),
  email,
  phone,
  whatsapp: text(32).regex(/^[0-9+()\s-]*$/, 'Enter a valid WhatsApp number').default(''),
  productType: text(100, 1),
  description: text(5000, 1),
  colors: text(500).default(''),
  budget: text(100).default(''),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')).default(''),
  referenceImages: z.array(text(2048, 1)).max(5).default([]),
}).strict();

const contactSchema = z.object({
  name: text(160, 1),
  email,
  phone: text(32).regex(/^[0-9+()\s-]*$/, 'Enter a valid phone number').default(''),
  subject: text(200, 1),
  message: text(5000, 1),
}).strict();

const newsletterSchema = z.object({ email }).strict();

const blogSchema = z.object({
  title: text(200, 1),
  content: text(30000, 1),
  excerpt: text(500).default(''),
  featuredImage: text(2048).default(''),
  author: text(120).default('SutraKriti Team'),
  published: z.boolean().default(false),
}).strict();

const blogUpdateSchema = blogSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Provide at least one field to update'
);

const settingsSchema = z.object({
  whatsappNumber: text(32).regex(/^[0-9+()\s-]+$/, 'Enter a valid WhatsApp number').optional(),
  instagramHandle: text(100).regex(/^[A-Za-z0-9._]+$/, 'Enter a valid Instagram handle').optional(),
  email: email.optional(),
}).strict().refine((data) => Object.keys(data).length > 0, 'Provide at least one field to update');

function generateSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function apiError(message, status) {
  return NextResponse.json({ error: message }, { status });
}

function unauthorized(request) {
  const auth = getAdminAuthState(request);
  if (!auth.configured) {
    return apiError('Admin access is not configured', 503);
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="SutraKriti Admin", charset="UTF-8"' },
  });
}

function requireAdmin(request) {
  return getAdminAuthState(request).authenticated ? null : unauthorized(request);
}

function rateLimit(request, key, limit) {
  const result = consumeRateLimit(request, key, limit);
  if (result.allowed) return null;

  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(result.retryAfterSeconds) } }
  );
}

async function readJson(request, schema) {
  try {
    return { data: schema.parse(await request.json()) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { response: NextResponse.json({ error: 'Invalid request data', details: error.flatten().fieldErrors }, { status: 400 }) };
    }
    return { response: apiError('Request body must be valid JSON', 400) };
  }
}

function logAndRespond(action, error) {
  console.error(`API ${action} failed`, error);
  return apiError('Unable to process your request right now', 500);
}

export async function GET(request) {
  const urlPath = request.nextUrl.pathname.replace('/api', '') || '/';
  const { searchParams } = request.nextUrl;

  if (urlPath === '/') {
    return NextResponse.json({ status: 'healthy', timestamp: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store' } });
  }
  if (urlPath === '/products') return handleGetProducts(searchParams);
  if (urlPath.startsWith('/products/')) return handleGetProductBySlug(decodeURIComponent(urlPath.slice('/products/'.length)));
  if (urlPath === '/categories') return handleGetCategories();
  if (urlPath === '/orders') {
    const response = requireAdmin(request);
    return response || handleGetOrders();
  }
  if (urlPath === '/blog') return handleGetBlogPosts();
  if (urlPath.startsWith('/blog/')) return handleGetBlogPostBySlug(decodeURIComponent(urlPath.slice('/blog/'.length)));
  if (urlPath === '/settings') return handleGetSettings();

  return apiError('Endpoint not found', 404);
}

export async function POST(request) {
  const urlPath = request.nextUrl.pathname.replace('/api', '');
  const adminOnly = new Set(['/products', '/blog', '/settings']);
  if (adminOnly.has(urlPath)) {
    const response = requireAdmin(request);
    if (response) return response;
  }

  if (urlPath === '/products') return withBody(request, productSchema, handleCreateProduct);
  if (urlPath === '/orders') return withPublicBody(request, 'orders', 8, orderSchema, handleCreateOrder);
  if (urlPath === '/custom-orders') return withPublicBody(request, 'custom-orders', 5, customOrderSchema, handleCreateCustomOrder);
  if (urlPath === '/newsletter') return withPublicBody(request, 'newsletter', 5, newsletterSchema, handleNewsletterSignup);
  if (urlPath === '/contact') return withPublicBody(request, 'contact', 5, contactSchema, handleContactSubmission);
  if (urlPath === '/blog') return withBody(request, blogSchema, handleCreateBlogPost);
  if (urlPath === '/settings') return withBody(request, settingsSchema, handleUpdateSettings);

  return apiError('Endpoint not found', 404);
}

export async function PUT(request) {
  const response = requireAdmin(request);
  if (response) return response;

  const urlPath = request.nextUrl.pathname.replace('/api', '');
  if (urlPath.startsWith('/products/')) return withBody(request, productUpdateSchema, (data) => handleUpdateProduct(urlPath.slice('/products/'.length), data));
  if (urlPath.startsWith('/blog/')) return withBody(request, blogUpdateSchema, (data) => handleUpdateBlogPost(urlPath.slice('/blog/'.length), data));
  if (urlPath === '/settings') return withBody(request, settingsSchema, handleUpdateSettings);

  return apiError('Endpoint not found', 404);
}

export async function DELETE(request) {
  const response = requireAdmin(request);
  if (response) return response;

  const urlPath = request.nextUrl.pathname.replace('/api', '');
  if (urlPath.startsWith('/products/')) return handleDeleteProduct(urlPath.slice('/products/'.length));
  if (urlPath.startsWith('/blog/')) return handleDeleteBlogPost(urlPath.slice('/blog/'.length));

  return apiError('Endpoint not found', 404);
}

async function withBody(request, schema, handler) {
  const parsed = await readJson(request, schema);
  return parsed.response || handler(parsed.data);
}

async function withPublicBody(request, key, limit, schema, handler) {
  const response = rateLimit(request, key, limit);
  if (response) return response;
  return withBody(request, schema, handler);
}

async function handleGetProducts(searchParams) {
  try {
    const collection = await getCollection('products');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const requestedLimit = Number.parseInt(searchParams.get('limit') || '', 10);
    const limit = Number.isFinite(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, 100) : 100;
    const search = searchParams.get('search')?.trim().slice(0, 100);
    const query = {};

    if (category) query.category = category.slice(0, 100);
    if (featured === 'true') query.featured = true;
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: escapedSearch, $options: 'i' } },
        { description: { $regex: escapedSearch, $options: 'i' } },
      ];
    }

    const products = await collection.find(query, {
      projection: { _id: 0, id: 1, name: 1, slug: 1, price: 1, images: 1, category: 1, featured: 1, inStock: 1, description: 1 },
    }).sort({ createdAt: -1 }).limit(limit).toArray();

    return NextResponse.json({ products, total: products.length }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
  } catch (error) {
    return logAndRespond('fetch products', error);
  }
}

async function handleGetProductBySlug(slug) {
  try {
    const product = await (await getCollection('products')).findOne({ slug }, { projection: { _id: 0 } });
    return product ? NextResponse.json(product, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }) : apiError('Product not found', 404);
  } catch (error) {
    return logAndRespond('fetch product', error);
  }
}

async function handleCreateProduct(data) {
  try {
    const collection = await getCollection('products');
    const slug = generateSlug(data.name);
    if (await collection.findOne({ slug }, { projection: { _id: 1 } })) return apiError('A product with this name already exists', 409);
    const product = { id: uuidv4(), slug, ...data, createdAt: new Date(), updatedAt: new Date() };
    await collection.insertOne(product);
    return NextResponse.json({ product: { ...product, _id: undefined } }, { status: 201 });
  } catch (error) {
    return logAndRespond('create product', error);
  }
}

async function handleUpdateProduct(id, data) {
  try {
    const collection = await getCollection('products');
    const update = { ...data, updatedAt: new Date() };
    if (data.name) {
      update.slug = generateSlug(data.name);
      const existing = await collection.findOne({ slug: update.slug, id: { $ne: id } }, { projection: { _id: 1 } });
      if (existing) return apiError('A product with this name already exists', 409);
    }
    const result = await collection.updateOne({ id }, { $set: update });
    return result.matchedCount ? NextResponse.json({ message: 'Product updated successfully' }) : apiError('Product not found', 404);
  } catch (error) {
    return logAndRespond('update product', error);
  }
}

async function handleDeleteProduct(id) {
  try {
    const result = await (await getCollection('products')).deleteOne({ id });
    return result.deletedCount ? NextResponse.json({ message: 'Product deleted successfully' }) : apiError('Product not found', 404);
  } catch (error) {
    return logAndRespond('delete product', error);
  }
}

async function handleGetCategories() {
  try {
    const categories = await (await getCollection('products')).distinct('category');
    return NextResponse.json({ categories }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch (error) {
    return logAndRespond('fetch categories', error);
  }
}

async function handleCreateOrder(data) {
  try {
    const order = { id: uuidv4(), ...data, status: 'pending', createdAt: new Date() };
    await (await getCollection('orders')).insertOne(order);
    return NextResponse.json({ message: 'Order enquiry received' }, { status: 201 });
  } catch (error) {
    return logAndRespond('create order', error);
  }
}

async function handleGetOrders() {
  try {
    const orders = await (await getCollection('orders')).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ orders }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return logAndRespond('fetch orders', error);
  }
}

async function handleCreateCustomOrder(data) {
  try {
    await (await getCollection('customOrders')).insertOne({ id: uuidv4(), ...data, status: 'pending', createdAt: new Date() });
    return NextResponse.json({ message: 'Custom order request received' }, { status: 201 });
  } catch (error) {
    return logAndRespond('create custom order', error);
  }
}

async function handleNewsletterSignup(data) {
  try {
    const collection = await getCollection('newsletter');
    const result = await collection.updateOne({ email: data.email }, { $setOnInsert: { id: uuidv4(), email: data.email, subscribedAt: new Date() } }, { upsert: true });
    return NextResponse.json({ message: result.upsertedCount ? 'Subscription created' : 'Already subscribed' }, { status: result.upsertedCount ? 201 : 200 });
  } catch (error) {
    return logAndRespond('subscribe newsletter', error);
  }
}

async function handleContactSubmission(data) {
  try {
    await (await getCollection('contacts')).insertOne({ id: uuidv4(), ...data, status: 'new', createdAt: new Date() });
    return NextResponse.json({ message: 'Message received' }, { status: 201 });
  } catch (error) {
    return logAndRespond('create contact', error);
  }
}

async function handleGetBlogPosts() {
  try {
    const posts = await (await getCollection('blog')).find({ published: true }, { projection: { _id: 0, id: 1, title: 1, slug: 1, excerpt: 1, featuredImage: 1, author: 1, createdAt: 1 } }).sort({ createdAt: -1 }).limit(50).toArray();
    return NextResponse.json({ posts }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch (error) {
    return logAndRespond('fetch blog posts', error);
  }
}

async function handleGetBlogPostBySlug(slug) {
  try {
    const post = await (await getCollection('blog')).findOne({ slug, published: true }, { projection: { _id: 0 } });
    return post ? NextResponse.json(post, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }) : apiError('Blog post not found', 404);
  } catch (error) {
    return logAndRespond('fetch blog post', error);
  }
}

async function handleCreateBlogPost(data) {
  try {
    const collection = await getCollection('blog');
    const slug = generateSlug(data.title);
    if (await collection.findOne({ slug }, { projection: { _id: 1 } })) return apiError('A blog post with this title already exists', 409);
    await collection.insertOne({ id: uuidv4(), slug, ...data, createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ message: 'Blog post created successfully' }, { status: 201 });
  } catch (error) {
    return logAndRespond('create blog post', error);
  }
}

async function handleUpdateBlogPost(id, data) {
  try {
    const collection = await getCollection('blog');
    const update = { ...data, updatedAt: new Date() };
    if (data.title) {
      update.slug = generateSlug(data.title);
      const existing = await collection.findOne({ slug: update.slug, id: { $ne: id } }, { projection: { _id: 1 } });
      if (existing) return apiError('A blog post with this title already exists', 409);
    }
    const result = await collection.updateOne({ id }, { $set: update });
    return result.matchedCount ? NextResponse.json({ message: 'Blog post updated successfully' }) : apiError('Blog post not found', 404);
  } catch (error) {
    return logAndRespond('update blog post', error);
  }
}

async function handleDeleteBlogPost(id) {
  try {
    const result = await (await getCollection('blog')).deleteOne({ id });
    return result.deletedCount ? NextResponse.json({ message: 'Blog post deleted successfully' }) : apiError('Blog post not found', 404);
  } catch (error) {
    return logAndRespond('delete blog post', error);
  }
}

async function handleGetSettings() {
  try {
    const settings = await (await getCollection('settings')).findOne({ type: 'site' }, { projection: { _id: 0, whatsappNumber: 1, instagramHandle: 1, email: 1 } });
    return NextResponse.json({ ...DEFAULT_SETTINGS, ...settings }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch (error) {
    return logAndRespond('fetch settings', error);
  }
}

async function handleUpdateSettings(data) {
  try {
    await (await getCollection('settings')).updateOne(
      { type: 'site' },
      { $set: { ...data, updatedAt: new Date() }, $setOnInsert: { id: uuidv4(), type: 'site' } },
      { upsert: true }
    );
    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    return logAndRespond('update settings', error);
  }
}
