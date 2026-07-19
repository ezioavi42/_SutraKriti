'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Heart, Sparkles, Package, Leaf, Users, Award, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { Toaster } from 'sonner';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=4');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Crochet Flower Bouquets', image: 'https://images.pexels.com/photos/20865317/pexels-photo-20865317.jpeg', slug: 'flower-bouquets' },
    { name: 'Crochet Bags', image: 'https://images.pexels.com/photos/10820408/pexels-photo-10820408.jpeg', slug: 'bags' },
    { name: 'Home Décor', image: 'https://images.pexels.com/photos/9173523/pexels-photo-9173523.jpeg', slug: 'home-decor' },
    { name: 'Gift Collections', image: 'https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg', slug: 'gifts' }
  ];

  const features = [
    { icon: Heart, title: 'Handmade with Care', description: 'Every piece lovingly crafted by skilled artisans' },
    { icon: Sparkles, title: 'Premium Quality', description: 'Only the finest cotton materials used' },
    { icon: Leaf, title: 'Eco-Friendly', description: 'Sustainable crafting practices' },
    { icon: Package, title: 'Gift-Ready', description: 'Beautiful packaging included' },
    { icon: Users, title: 'Made in India', description: 'Supporting local artisan communities' },
    { icon: Gift, title: 'Custom Designs', description: 'Personalized creations available' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Absolutely beautiful! The crochet bouquet I ordered was even more stunning in person. Perfect gift for my sister\'s wedding.',
      product: 'Crochet Flower Bouquet'
    },
    {
      name: 'Ananya Patel',
      rating: 5,
      text: 'The quality is outstanding. You can see the care and craftsmanship in every stitch. Highly recommend!',
      product: 'Crochet Tote Bag'
    },
    {
      name: 'Riya Verma',
      rating: 5,
      text: 'I love my custom crochet bag! The team was so helpful in bringing my vision to life. Will definitely order again.',
      product: 'Custom Sling Bag'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Toaster position="top-center" richColors />
      <Header />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg"
            alt="Handmade Crochet Creations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            variants={fadeInUp}
          >
            Handmade with Love.
            <br />
            <span className="text-[#C8A95A]">Crafted to Last.</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light"
            variants={fadeInUp}
          >
            Discover beautifully handcrafted crochet creations designed to bring warmth, elegance, and joy to every occasion.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
            <Button
              size="lg"
              className="bg-[#C8A95A] hover:bg-[#B89850] text-white px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="/collections">Shop Collections</Link>
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#C8A95A] px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="/custom-orders">Custom Orders</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each piece is a unique work of art, handcrafted with premium materials and boundless creativity.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link href={`/collections?category=${category.slug}`}>
                <Card className="group overflow-hidden cursor-pointer border-[#E9DCC9] hover:shadow-xl transition-all duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose SutraKriti */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Why Choose SutraKriti?
            </h2>
            <p className="text-lg text-gray-600">
              Every creation is a testament to our commitment to quality and craftsmanship.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-[#E9DCC9] hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C8A95A]/10 rounded-full mb-4">
                        <Icon className="w-8 h-8 text-[#C8A95A]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600">
            Discover our most-loved handcrafted pieces.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <Link href={`/products/${product.slug}`}>
                  <Card className="group overflow-hidden cursor-pointer border-[#E9DCC9] hover:shadow-xl transition-all duration-300">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={product.images?.[0] || 'https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
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
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Our beautiful collections are coming soon!</p>
            <Button asChild className="bg-[#C8A95A] hover:bg-[#B89850]">
              <Link href="/custom-orders">Order a Custom Piece</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Our Story Preview */}
      <section className="py-20 bg-gradient-to-br from-[#F8F6F2] to-[#E9DCC9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg"
                  alt="Artisan at work"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                Every Stitch Tells a Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At SutraKriti, we believe in the power of handmade artistry. Each crochet creation is born from the skilled hands of our artisans, who pour their heart and soul into every stitch.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started as a passion for crochet has blossomed into a celebration of Indian craftsmanship, sustainability, and timeless beauty. Every piece we create is unique, thoughtfully designed, and made to be treasured forever.
              </p>
              <Button size="lg" className="bg-[#C8A95A] hover:bg-[#B89850]" asChild>
                <Link href="/about">Read Our Story</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Loved by Our Customers
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it – hear what our customers have to say.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-[#E9DCC9] hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C8A95A] text-[#C8A95A]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.product}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#C8A95A] text-white">
        <motion.div
          className="container mx-auto px-4 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Own a Handmade Masterpiece?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our collections or create something uniquely yours with our custom order service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#C8A95A] px-8 py-6 font-semibold"
              asChild
            >
              <Link href="/collections">Browse Collections</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-[#C8A95A] hover:bg-gray-100 px-8 py-6 font-semibold"
              asChild
            >
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                Order on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}