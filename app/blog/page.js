'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowRight, Heart, Sparkles, Scissors, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Crochet: A Timeless Craft',
      excerpt: 'Discover the rich history and intricate techniques behind the ancient art of crochet. From its humble beginnings to modern luxury fashion, crochet has woven its way into our hearts.',
      image: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
      category: 'Craft & Tradition',
      date: 'May 15, 2025',
      author: 'SutraKriti Team',
      readTime: '5 min read',
      icon: Scissors,
      color: 'bg-purple-500'
    },
    {
      id: 2,
      title: 'Behind the Scenes: How Your Crochet Bag is Made',
      excerpt: 'Take a journey through the creation process of a handmade crochet bag. From selecting the perfect yarn to the final stitch, every step is filled with care and craftsmanship.',
      image: 'https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg',
      category: 'Craftsmanship',
      date: 'May 10, 2025',
      author: 'Artisan Stories',
      readTime: '7 min read',
      icon: Heart,
      color: 'bg-rose-500'
    },
    {
      id: 3,
      title: 'Sustainable Fashion: Why Handmade Matters',
      excerpt: 'In a world of fast fashion, handmade crochet stands as a beacon of sustainability. Learn why choosing handcrafted products makes a difference for the planet and communities.',
      image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg',
      category: 'Sustainability',
      date: 'May 5, 2025',
      author: 'Eco Stories',
      readTime: '6 min read',
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: '10 Ways to Style Your Crochet Accessories',
      excerpt: 'Crochet isn\'t just for grandmas anymore! Discover trendy and chic ways to incorporate handmade crochet accessories into your everyday wardrobe.',
      image: 'https://images.pexels.com/photos/7148445/pexels-photo-7148445.jpeg',
      category: 'Style & Fashion',
      date: 'April 28, 2025',
      author: 'Style Guide',
      readTime: '4 min read',
      icon: Sparkles,
      color: 'bg-amber-500'
    },
    {
      id: 5,
      title: 'The Perfect Crochet Gift Guide',
      excerpt: 'Searching for a meaningful, unique gift? Handmade crochet items make heartfelt presents for every occasion. From birthdays to weddings, find the perfect piece.',
      image: 'https://images.pexels.com/photos/5868728/pexels-photo-5868728.jpeg',
      category: 'Gift Ideas',
      date: 'April 20, 2025',
      author: 'Gift Guide',
      readTime: '5 min read',
      icon: Heart,
      color: 'bg-pink-500'
    },
    {
      id: 6,
      title: 'Caring for Your Crochet: A Complete Guide',
      excerpt: 'Make your handmade treasures last a lifetime with proper care. Learn the do\'s and don\'ts of maintaining your crochet items in pristine condition.',
      image: 'https://images.pexels.com/photos/6474520/pexels-photo-6474520.jpeg',
      category: 'Care & Maintenance',
      date: 'April 15, 2025',
      author: 'Care Tips',
      readTime: '8 min read',
      icon: Sparkles,
      color: 'bg-blue-500'
    }
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5560021/pexels-photo-5560021.jpeg"
            alt="Blog"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-[#C8A95A]" />
          <h1 className="text-5xl font-serif font-bold mb-4">Our Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">Stories, tips, and inspiration from the world of handmade crochet</p>
        </motion.div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-[#C8A95A]" />
            <h2 className="text-2xl font-serif font-bold text-gray-800">Featured Article</h2>
          </div>
          
          <Card className="border-[#E9DCC9] overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute top-4 left-4 ${featuredPost.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                  {featuredPost.category}
                </div>
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <span>• {featuredPost.readTime}</span>
                </div>
                
                <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                
                <button className="inline-flex items-center gap-2 text-[#C8A95A] font-semibold hover:gap-4 transition-all group">
                  Read Full Article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 lg:px-8 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => {
              const Icon = post.icon;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-[#E9DCC9] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-56">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute top-4 right-4 ${post.color} text-white p-2 rounded-full`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="text-xs font-semibold text-[#C8A95A] mb-2 uppercase tracking-wide">
                        {post.category}
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <button className="mt-4 inline-flex items-center gap-2 text-[#C8A95A] font-semibold text-sm hover:gap-4 transition-all group">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-[#F8F6F2] to-[#E9DCC9]">
        <motion.div
          className="container mx-auto px-4 lg:px-8 text-center max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-[#C8A95A]" />
          <h2 className="text-4xl font-serif font-bold mb-4">Never Miss a Story</h2>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to our newsletter for exclusive behind-the-scenes content, new product launches, and crochet inspiration delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 rounded-lg border-2 border-[#C8A95A] focus:outline-none focus:ring-2 focus:ring-[#C8A95A]"
            />
            <button className="px-8 py-3 bg-[#C8A95A] hover:bg-[#B89850] text-white rounded-lg font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </section>

      {/* Coming Soon Notice */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="border-[#C8A95A] border-2 bg-gradient-to-r from-[#FFF8EF] to-[#F8F6F2]">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-[#C8A95A]" />
              <h3 className="text-2xl font-serif font-bold mb-3">More Stories Coming Soon!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're currently crafting more amazing content for you. Check back soon for new articles about crochet techniques, artisan stories, and style inspiration. In the meantime, follow us on Instagram for daily updates!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
