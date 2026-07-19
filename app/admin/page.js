'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, ShoppingBag, Mail, Settings } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products || []);
      } else if (activeTab === 'orders') {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchData();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className=\"min-h-screen bg-[#FFF8EF] p-8\">
      <Toaster position=\"top-center\" richColors />

      <div className=\"container mx-auto\">
        <div className=\"mb-8\">
          <h1 className=\"text-4xl font-serif font-bold mb-2\">Admin Dashboard</h1>
          <p className=\"text-gray-600\">Manage your SutraKriti store</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className=\"grid grid-cols-4 w-full max-w-2xl\">
            <TabsTrigger value=\"products\">
              <Package className=\"w-4 h-4 mr-2\" />
              Products
            </TabsTrigger>
            <TabsTrigger value=\"orders\">
              <ShoppingBag className=\"w-4 h-4 mr-2\" />
              Orders
            </TabsTrigger>
            <TabsTrigger value=\"custom\">
              <Edit className=\"w-4 h-4 mr-2\" />
              Custom Orders
            </TabsTrigger>
            <TabsTrigger value=\"settings\">
              <Settings className=\"w-4 h-4 mr-2\" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value=\"products\" className=\"mt-6\">
            <div className=\"flex justify-between items-center mb-6\">
              <h2 className=\"text-2xl font-serif font-bold\">Products</h2>
              <Button className=\"bg-[#C8A95A] hover:bg-[#B89850]\">
                <Plus className=\"w-4 h-4 mr-2\" />
                Add Product
              </Button>
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
                {products.map((product) => (
                  <Card key={product.id} className=\"border-[#E9DCC9]\">
                    <CardContent className=\"p-6\">
                      <div className=\"flex items-start justify-between mb-4\">
                        <div>
                          <h3 className=\"font-semibold text-lg mb-1\">{product.name}</h3>
                          <Badge className=\"bg-[#C8A95A]\">{product.category}</Badge>
                        </div>
                        <div className=\"flex gap-2\">
                          <Button size=\"sm\" variant=\"outline\">
                            <Edit className=\"w-4 h-4\" />
                          </Button>
                          <Button
                            size=\"sm\"
                            variant=\"outline\"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className=\"w-4 h-4 text-red-500\" />
                          </Button>
                        </div>
                      </div>
                      <p className=\"text-gray-600 text-sm mb-4 line-clamp-2\">{product.description}</p>
                      <div className=\"flex items-center justify-between\">
                        <p className=\"text-2xl font-bold text-[#C8A95A]\">₹{product.price}</p>
                        <Badge variant={product.inStock ? 'default' : 'secondary'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value=\"orders\" className=\"mt-6\">
            <div className=\"mb-6\">
              <h2 className=\"text-2xl font-serif font-bold\">Orders</h2>
              <p className=\"text-gray-600\">Manage customer orders and enquiries</p>
            </div>

            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length > 0 ? (
              <div className=\"space-y-4\">
                {orders.map((order) => (
                  <Card key={order.id} className=\"border-[#E9DCC9]\">
                    <CardContent className=\"p-6\">
                      <div className=\"grid grid-cols-1 md:grid-cols-4 gap-4\">
                        <div>
                          <p className=\"text-sm text-gray-500\">Customer</p>
                          <p className=\"font-semibold\">{order.customerName}</p>
                        </div>
                        <div>
                          <p className=\"text-sm text-gray-500\">Product</p>
                          <p className=\"font-semibold\">{order.productName}</p>
                        </div>
                        <div>
                          <p className=\"text-sm text-gray-500\">Contact</p>
                          <p className=\"font-semibold\">{order.customerPhone}</p>
                        </div>
                        <div>
                          <p className=\"text-sm text-gray-500\">Status</p>
                          <Badge>{order.status}</Badge>
                        </div>
                      </div>
                      {order.message && (
                        <div className=\"mt-4 pt-4 border-t border-[#E9DCC9]\">
                          <p className=\"text-sm text-gray-500 mb-1\">Message</p>
                          <p className=\"text-sm\">{order.message}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className=\"border-[#E9DCC9]\">
                <CardContent className=\"p-12 text-center\">
                  <ShoppingBag className=\"w-16 h-16 mx-auto mb-4 text-gray-400\" />
                  <p className=\"text-gray-600\">No orders yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Custom Orders Tab */}
          <TabsContent value=\"custom\" className=\"mt-6\">
            <div className=\"mb-6\">
              <h2 className=\"text-2xl font-serif font-bold\">Custom Orders</h2>
              <p className=\"text-gray-600\">Personalized order requests from customers</p>
            </div>
            <Card className=\"border-[#E9DCC9]\">
              <CardContent className=\"p-12 text-center\">
                <Edit className=\"w-16 h-16 mx-auto mb-4 text-gray-400\" />
                <p className=\"text-gray-600\">No custom orders yet</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value=\"settings\" className=\"mt-6\">
            <div className=\"mb-6\">
              <h2 className=\"text-2xl font-serif font-bold\">Settings</h2>
              <p className=\"text-gray-600\">Configure your store settings</p>
            </div>
            <Card className=\"border-[#E9DCC9] max-w-2xl\">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className=\"space-y-4\">
                <div>
                  <label className=\"block text-sm font-medium mb-2\">WhatsApp Number</label>
                  <Input placeholder=\"919876543210\" className=\"border-[#E9DCC9]\" />
                </div>
                <div>
                  <label className=\"block text-sm font-medium mb-2\">Instagram Handle</label>
                  <Input placeholder=\"sutrakriti\" className=\"border-[#E9DCC9]\" />
                </div>
                <div>
                  <label className=\"block text-sm font-medium mb-2\">Email Address</label>
                  <Input placeholder=\"orders@sutrakriti.com\" className=\"border-[#E9DCC9]\" />
                </div>
                <Button className=\"bg-[#C8A95A] hover:bg-[#B89850]\">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
