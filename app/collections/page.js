'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Star, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    'All',
    'Crochet Flower Bouquets',
    'Crochet Bags',
    'Crochet Tote Bags',
    'Crochet Sling Bags',
    'Crochet Potli Bags',
    'Home Décor',
    'Gift Collections'
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products';
      const params = new URLSearchParams();

      if (selectedCategory !== 'all' && selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      let sortedProducts = data.products || [];

      // Sort products
      if (sortBy === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'latest') {
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setProducts(sortedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Toaster position="top-center" richColors />
      <Header />

      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/9173523/pexels-photo-9173523.jpeg"
            alt="Collections"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        </div>
        <motion.div
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-serif font-bold mb-4">Our Collections</h1>
          <p className="text-xl">Discover handcrafted crochet artistry</p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <Card className="border-[#E9DCC9] sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-bold mb-4">Filters</h3>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-[#E9DCC9]"
                    />
                    <Button type="submit" size="icon" className="bg-[#C8A95A] hover:bg-[#B89850]">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </form>

                {/* Categories */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          selectedCategory === category || (selectedCategory === 'all' && category === 'All')
                            ? 'bg-[#C8A95A] text-white'
                            : 'bg-white hover:bg-[#F8F6F2] text-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-[#E9DCC9]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-9">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{products.length}</span> products
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                    >
                      <Link href={`/products/${product.slug}`}>
                        <Card className="group overflow-hidden cursor-pointer border-[#E9DCC9] hover:shadow-xl transition-all duration-300 h-full">
                          <div className="relative h-80 overflow-hidden">
                            <Image
                              src={product.images?.[0] || 'https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg'}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {!product.inStock && (
                              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Out of Stock
                              </div>
                            )}
                            {product.featured && (
                              <div className="absolute top-4 left-4 bg-[#C8A95A] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Featured
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-[#C8A95A] transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold text-[#C8A95A]">₹{product.price}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-[#C8A95A] text-[#C8A95A]" />
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-[#C8A95A] hover:bg-[#B89850]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg text-gray-600 mb-6">We'd love to create something special just for you!</p>
          <Button size="lg" className="bg-[#C8A95A] hover:bg-[#B89850]" asChild>
            <Link href="/custom-orders">Request Custom Order</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}