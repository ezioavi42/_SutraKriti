'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Leaf, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Every piece is made with care, attention to detail, and genuine passion for the craft.'
    },
    {
      icon: Users,
      title: 'Artisan Community',
      description: 'We support and empower skilled artisans, preserving traditional craftsmanship.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Eco-friendly materials and processes that respect our planet and future generations.'
    },
    {
      icon: Award,
      title: 'Quality Promise',
      description: 'Premium materials and expert craftsmanship guarantee pieces that last.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg"
            alt="Our Story"
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
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">Every Stitch Tells a Story</p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-serif font-bold mb-6 text-center">Welcome to SutraKriti</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-xl leading-relaxed">
                SutraKriti was born from a deep love for handmade artistry and a desire to celebrate the timeless beauty of crochet. What started as a passion for creating intricate crochet pieces has blossomed into a celebration of Indian craftsmanship, sustainability, and meaningful connections.
              </p>
              <p className="text-lg leading-relaxed">
                At SutraKriti, we believe that every creation should be more than just a product—it should be a piece of art, a labor of love, and a story waiting to be told. Each item we craft is thoughtfully designed and made with premium materials, ensuring that it brings joy, warmth, and elegance to your life.
              </p>
              <p className="text-lg leading-relaxed">
                Our name, <span className="font-semibold">SutraKriti</span>, combines "Sutra" (thread) and "Kriti" (creation), perfectly capturing our mission: to weave threads into beautiful creations that are made with heart and cherished forever.
              </p>
              <p className="text-lg leading-relaxed">
                Every piece takes hours of dedication, patience, and skill. From selecting the finest cotton yarns to perfecting each stitch, our artisans pour their expertise and passion into every creation. We take pride in supporting local artisan communities and promoting sustainable, eco-friendly practices.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're looking for a unique gift, a beautiful home accent, or a personalized piece that reflects your style, SutraKriti is here to bring your vision to life. Thank you for being part of our journey and for choosing handmade over mass-produced.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we create</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full border-[#E9DCC9] hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C8A95A]/10 rounded-full mb-4">
                        <Icon className="w-8 h-8 text-[#C8A95A]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/15469188/pexels-photo-15469188.jpeg"
                alt="Our Mission"
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
            <h2 className="text-4xl font-serif font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To bring the beauty of handmade crochet artistry to homes across India and beyond, while supporting artisan communities and promoting sustainable craftsmanship.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We strive to create pieces that are not just beautiful, but meaningful—items that carry the warmth of human touch and the pride of traditional Indian craftsmanship.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every purchase you make helps us continue this mission, supporting the artisans who pour their hearts into every creation and keeping traditional crafts alive for future generations.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
