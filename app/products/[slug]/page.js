'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Phone, Instagram, Mail, Package, Clock, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (params.slug) {
      fetchProduct();
      fetchSettings();
    }
  }, [params.slug]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleWhatsAppOrder = () => {
    const number = settings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = `Hi SutraKriti, I would like to order: ${product.name} (₹${product.price}). Product link: ${window.location.href}`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleInstagramOrder = () => {
    const handle = settings?.instagramHandle || process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE;
    window.open(`https://www.instagram.com/${handle}`, '_blank');
  };

  const handleEmailOrder = () => {
    const email = settings?.email || process.env.NEXT_PUBLIC_EMAIL;
    const subject = `Order Inquiry: ${product.name}`;
    const body = `Hi SutraKriti,\n\nI would like to order:\n\nProduct: ${product.name}\nPrice: ₹${product.price}\nProduct Link: ${window.location.href}\n\nPlease let me know the next steps.\n\nThank you!`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFF8EF]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild className="bg-[#C8A95A] hover:bg-[#B89850]">
            <Link href="/collections">Browse Collections</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Toaster position="top-center" richColors />
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-12 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="relative h-[500px] mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={product.images?.[selectedImage] || product.images?.[0] || 'https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-[#C8A95A]' : 'border-[#E9DCC9]'
                      }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Badge className="mb-4 bg-[#C8A95A] hover:bg-[#B89850]">{product.category}</Badge>
            <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C8A95A] text-[#C8A95A]" />
                ))}
              </div>
              <span className="text-gray-600">(5.0)</span>
            </div>

            <div className="mb-8">
              <p className="text-5xl font-bold text-[#C8A95A] mb-2">₹{product.price}</p>
              {!product.inStock && (
                <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
              )}
            </div>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Order Buttons */}
            <div className="space-y-4 mb-8">
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                onClick={handleWhatsAppOrder}
              >
                <Phone className="w-5 h-5 mr-2" />
                Order on WhatsApp
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#C8A95A] text-[#C8A95A] hover:bg-[#C8A95A] hover:text-white"
                  onClick={handleInstagramOrder}
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#C8A95A] text-[#C8A95A] hover:bg-[#C8A95A] hover:text-white"
                  onClick={handleEmailOrder}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <Card className="border-[#E9DCC9] mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.customizable && (
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#C8A95A] mt-1" />
                      <div>
                        <p className="font-semibold">Customizable</p>
                        <p className="text-sm text-gray-600">Personalize colors & design</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-[#C8A95A] mt-1" />
                    <div>
                      <p className="font-semibold">Gift-Ready</p>
                      <p className="text-sm text-gray-600">Beautiful packaging included</p>
                    </div>
                  </div>
                  {product.deliveryTime && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#C8A95A] mt-1" />
                      <div>
                        <p className="font-semibold">Delivery Time</p>
                        <p className="text-sm text-gray-600">{product.deliveryTime}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-[#C8A95A] mt-1" />
                    <div>
                      <p className="font-semibold">Handmade</p>
                      <p className="text-sm text-gray-600">Crafted with care by artisans</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="care" className="flex-1">Care Guide</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="space-y-4">
                  {product.materials && (
                    <div>
                      <h3 className="font-semibold mb-2">Materials</h3>
                      {Array.isArray(product.materials) ? (
                        <ul className="text-gray-600 list-disc list-inside">
                          {product.materials.map((material, idx) => (
                            <li key={idx}>{material}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">{product.materials}</p>
                      )}
                    </div>
                  )}
                  {product.features && Array.isArray(product.features) && (
                    <div>
                      <h3 className="font-semibold mb-2">Features</h3>
                      <ul className="text-gray-600 list-disc list-inside">
                        {product.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <h3 className="font-semibold mb-2">Dimensions</h3>
                      {typeof product.dimensions === 'object' && !Array.isArray(product.dimensions) ? (
                        <ul className="text-gray-600">
                          {Object.entries(product.dimensions).map(([key, value]) => (
                            <li key={key}><span className="font-medium capitalize">{key}:</span> {value}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">{product.dimensions}</p>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="care" className="mt-6">
                {product.careInstructions ? (
                  <p className="text-gray-600">{product.careInstructions}</p>
                ) : (
                  <p className="text-gray-600">Keep away from moisture. Dust gently with a soft cloth.</p>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}