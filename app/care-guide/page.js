'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Sun, Wind, Shirt, AlertCircle, Sparkles, Heart, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CareGuidePage() {
  const careCategories = [
    {
      icon: Droplets,
      title: 'Washing & Cleaning',
      color: 'bg-blue-500',
      tips: [
        {
          do: 'Hand wash with cold water and mild detergent',
          dont: 'Never use hot water or harsh chemicals'
        },
        {
          do: 'Gently squeeze excess water without wringing',
          dont: 'Avoid machine washing or spinning'
        },
        {
          do: 'Use baby shampoo or wool-specific detergent for delicate items',
          dont: 'Never use bleach or fabric softeners'
        },
        {
          do: 'For bags and accessories, spot clean when possible',
          dont: 'Avoid soaking for extended periods'
        }
      ]
    },
    {
      icon: Wind,
      title: 'Drying',
      color: 'bg-cyan-500',
      tips: [
        {
          do: 'Lay flat on a clean towel to air dry',
          dont: 'Never use a dryer or direct heat'
        },
        {
          do: 'Reshape items while damp to maintain form',
          dont: 'Avoid hanging heavy items (prevents stretching)'
        },
        {
          do: 'Dry in a well-ventilated area away from direct sunlight',
          dont: 'Never place on radiators or heaters'
        },
        {
          do: 'Allow 24-48 hours for complete drying',
          dont: 'Do not store until completely dry'
        }
      ]
    },
    {
      icon: Sun,
      title: 'Storage',
      color: 'bg-amber-500',
      tips: [
        {
          do: 'Store in a cool, dry place away from direct sunlight',
          dont: 'Avoid damp or humid storage areas'
        },
        {
          do: 'Use breathable fabric bags or cotton covers',
          dont: 'Never store in plastic bags (causes moisture buildup)'
        },
        {
          do: 'Fold gently or lay flat for storage',
          dont: 'Avoid tight compression or heavy stacking'
        },
        {
          do: 'Keep away from moths and insects',
          dont: 'Do not store in cardboard boxes for long periods'
        }
      ]
    },
    {
      icon: Shirt,
      title: 'Daily Care & Maintenance',
      color: 'bg-purple-500',
      tips: [
        {
          do: 'Dust regularly with a soft, dry cloth',
          dont: 'Avoid using rough or abrasive materials'
        },
        {
          do: 'Air out bags and accessories after use',
          dont: 'Do not expose to perfumes or strong chemicals'
        },
        {
          do: 'Handle with clean, dry hands',
          dont: 'Avoid contact with sharp objects or rough surfaces'
        },
        {
          do: 'Rotate crochet flower bouquets occasionally to prevent dust buildup',
          dont: 'Do not place near cooking areas (oil and grease)'
        }
      ]
    }
  ];

  const productSpecificCare = [
    {
      category: 'Crochet Flower Bouquets',
      icon: '💐',
      care: [
        'Dust gently with a soft brush or cloth weekly',
        'Keep away from moisture and humidity',
        'Display away from direct sunlight to prevent fading',
        'Reshape flowers gently if they get compressed',
        'No washing needed - spot clean only if necessary'
      ]
    },
    {
      category: 'Crochet Bags (Tote, Sling, Potli)',
      icon: '👜',
      care: [
        'Empty bag completely before cleaning',
        'Spot clean with damp cloth for minor stains',
        'Hand wash only when necessary with cold water',
        'Air dry completely before storing',
        'Avoid overloading to maintain shape'
      ]
    },
    {
      category: 'Tech Accessories (iPad/Laptop Sleeves)',
      icon: '💻',
      care: [
        'Wipe gently with a slightly damp cloth',
        'Do not immerse in water',
        'Allow to air dry completely before use',
        'Store flat or in device when not in use',
        'Keep away from extreme temperatures'
      ]
    },
    {
      category: 'Baby Items & Blankets',
      icon: '👶',
      care: [
        'Wash more frequently (every 2-3 uses)',
        'Use baby-safe, fragrance-free detergent',
        'Extra gentle hand washing or machine wash on delicate cycle',
        'Double rinse to remove all detergent',
        'Sun drying is beneficial for natural sanitization'
      ]
    }
  ];

  const quickTips = [
    'First-time washing: Test a small, hidden area first',
    'Color care: Wash dark and light colors separately',
    'Stain removal: Treat stains immediately with cold water',
    'Travel: Pack crochet items in separate cloth bags',
    'Gifts: Include care instructions when gifting'
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg"
            alt="Care Guide"
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
          <Heart className="w-16 h-16 mx-auto mb-4 text-[#C8A95A]" />
          <h1 className="text-5xl font-serif font-bold mb-4">Care Guide</h1>
          <p className="text-xl max-w-2xl mx-auto">Keep your handmade treasures beautiful for years to come</p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Each SutraKriti creation is lovingly handmade with premium cotton yarn and deserves proper care to maintain its beauty. Follow these simple guidelines to keep your crochet items looking fresh and vibrant for years.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#C8A95A]/10 px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5 text-[#C8A95A]" />
            <p className="text-sm font-semibold text-[#C8A95A]">With love and care, handmade lasts a lifetime</p>
          </div>
        </motion.div>

        {/* General Care Guidelines */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {careCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-800">{category.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.tips.map((tip, tipIndex) => (
                    <Card key={tipIndex} className="border-[#E9DCC9] hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-green-700 mb-1">DO:</p>
                            <p className="text-gray-700">{tip.do}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pt-4 border-t border-gray-200">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-red-700 mb-1">DON'T:</p>
                            <p className="text-gray-700">{tip.dont}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Product-Specific Care */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Product-Specific Care</h2>
            <p className="text-lg text-gray-600">Tailored care instructions for different product types</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {productSpecificCare.map((product, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-[#E9DCC9] h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">{product.icon}</span>
                      <h3 className="text-2xl font-serif font-bold">{product.category}</h3>
                    </div>
                    <ul className="space-y-3">
                      {product.care.map((instruction, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#C8A95A] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="border-[#C8A95A] border-2 bg-gradient-to-br from-[#FFF8EF] to-[#F8F6F2]">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-[#C8A95A]" />
                <h2 className="text-3xl font-serif font-bold">Quick Care Tips</h2>
              </div>
              <ul className="space-y-3">
                {quickTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C8A95A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 text-lg">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Emergency Care */}
      <section className="py-16 bg-[#F8F6F2]">
        <motion.div
          className="container mx-auto px-4 lg:px-8 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-3xl font-serif font-bold mb-4">Emergency Care</h2>
            <p className="text-lg text-gray-600">What to do if something goes wrong</p>
          </div>

          <Card className="border-[#E9DCC9]">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Stains:</h3>
                <p className="text-gray-700">Act quickly! Blot (don't rub) with cold water and mild soap. For stubborn stains, contact us for advice specific to your product.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Pulls or Snags:</h3>
                <p className="text-gray-700">Don't cut! Gently pull the yarn back through to the inside using a crochet hook or needle. Contact us if you need repair assistance.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Loss of Shape:</h3>
                <p className="text-gray-700">Dampen the item slightly and reshape by hand. Lay flat to dry, maintaining the desired form. Never pull or stretch aggressively.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Color Fading:</h3>
                <p className="text-gray-700">Prevention is key! Keep away from direct sunlight. If already faded, unfortunately, color cannot be restored. This is why proper care is so important!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Conclusion CTA */}
      <section className="py-16">
        <motion.div
          className="container mx-auto px-4 lg:px-8 text-center max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Heart className="w-16 h-16 mx-auto mb-6 text-[#C8A95A]" />
          <h2 className="text-4xl font-serif font-bold mb-6">Questions About Care?</h2>
          <p className="text-lg text-gray-700 mb-8">
            We're here to help! If you have specific questions about caring for your SutraKriti product, don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917777932385'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-semibold transition-colors"
            >
              Message Us on WhatsApp
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C8A95A] text-[#C8A95A] hover:bg-[#C8A95A] hover:text-white rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
