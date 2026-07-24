'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit, Package, ShoppingBag, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const endpoint = activeTab === 'orders' ? '/api/orders' : '/api/products';
      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load dashboard data');
      const data = await response.json();
      if (activeTab === 'orders') setOrders(data.orders || []);
      else setProducts(data.products || []);
    } catch (error) {
      toast.error(error.message || 'Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function deleteProduct(id) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Unable to delete product');
      toast.success('Product deleted');
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Unable to delete product');
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF8EF] p-4 md:p-8">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage products and customer enquiries.</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="products"><Package className="mr-2 h-4 w-4" />Products</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingBag className="mr-2 h-4 w-4" />Enquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            {loading ? <p>Loading products…</p> : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="border-[#E9DCC9]">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-semibold text-lg">{product.name}</h2>
                          <Badge className="mt-2 bg-[#C8A95A]">{product.category}</Badge>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                      <p className="mb-4 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#C8A95A]">₹{product.price}</span>
                        <Badge variant={product.inStock ? 'default' : 'secondary'}>{product.inStock ? 'In stock' : 'Out of stock'}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            {loading ? <p>Loading enquiries…</p> : orders.length === 0 ? (
              <Card className="border-[#E9DCC9]"><CardContent className="p-12 text-center text-gray-600">No enquiries yet.</CardContent></Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-[#E9DCC9]">
                    <CardContent className="grid gap-4 p-6 md:grid-cols-4">
                      <div><p className="text-sm text-gray-500">Customer</p><p className="font-semibold">{order.customerName}</p></div>
                      <div><p className="text-sm text-gray-500">Product</p><p className="font-semibold">{order.productName}</p></div>
                      <div><p className="text-sm text-gray-500">Contact</p><p className="font-semibold">{order.customerPhone}</p></div>
                      <div><p className="text-sm text-gray-500">Status</p><Badge>{order.status}</Badge></div>
                      {order.message && <div className="md:col-span-4"><p className="text-sm text-gray-500">Message</p><p>{order.message}</p></div>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-[#E9DCC9]">
          <CardHeader><CardTitle className="flex items-center gap-2"><Edit className="h-4 w-4" />Administrative API</CardTitle></CardHeader>
          <CardContent className="text-sm text-gray-600">Product, blog, and site-setting changes are protected by the same browser authentication as this page.</CardContent>
        </Card>
      </div>
    </main>
  );
}
