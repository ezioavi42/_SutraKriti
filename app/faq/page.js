'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Package, CreditCard, Truck, Heart, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FAQPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917777932385';
  
  const faqCategories = [
    {
      icon: Package,
      title: 'Product & Quality',
      faqs: [
        {
          question: 'What materials are used in your crochet products?',
          answer: 'We use only premium quality cotton yarn for all our crochet creations. Our materials are carefully sourced to ensure softness, durability, and vibrant colors that last. For specific products, we also use cotton lining, wooden buttons, and eco-friendly packaging materials.'
        },
        {
          question: 'Are your products really handmade?',
          answer: 'Yes! Every single piece is 100% handmade by our skilled artisans. Each item takes hours of careful craftsmanship, and no two pieces are exactly alike. This makes every SutraKriti creation unique and special.'
        },
        {
          question: 'Can I request custom colors or designs?',
          answer: 'Absolutely! We love creating personalized pieces. You can request custom colors, sizes, or designs through our Custom Orders page. Our artisans will work with you to bring your vision to life. Custom orders typically take 5-10 days depending on complexity.'
        },
        {
          question: 'How long will my crochet product last?',
          answer: 'With proper care, our crochet products can last for years! The premium cotton yarn we use is durable and maintains its shape and color. Follow our care instructions to keep your items looking beautiful for a long time.'
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Ordering & Payment',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'Ordering is simple! Browse our collections, click on any product you like, and click the "Order on WhatsApp" button. This will open a WhatsApp chat with us where we\'ll help you complete your order. You can also message us on Instagram or email us directly.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers, UPI payments (Google Pay, PhonePe, Paytm), and online payment links. Once you place your order via WhatsApp, we\'ll share payment details and confirm your order once payment is received.'
        },
        {
          question: 'Do you have an online payment gateway?',
          answer: 'Currently, we process orders through direct communication (WhatsApp, Instagram, Email) to provide a more personalized service. This allows us to confirm customizations, answer questions, and ensure you get exactly what you want.'
        },
        {
          question: 'Is there a minimum order amount?',
          answer: 'No, there is no minimum order amount! Whether you want to order one item or multiple pieces, we\'re happy to help. Each handmade creation is valuable to us.'
        }
      ]
    },
    {
      icon: Truck,
      title: 'Shipping & Delivery',
      faqs: [
        {
          question: 'How long does production take?',
          answer: 'Most products take 3-7 days to create, as each piece is handmade to order. Custom orders may take 5-10 days depending on complexity. We\'ll provide an estimated timeline when you place your order.'
        },
        {
          question: 'Do you ship all over India?',
          answer: 'Yes! We ship to all locations across India through reliable courier services. Shipping usually takes 3-5 business days after your order is ready. We\'ll provide tracking details once your order is dispatched.'
        },
        {
          question: 'What are the shipping charges?',
          answer: 'Shipping charges vary based on your location and order value. We\'ll confirm the exact shipping cost when you place your order. For orders above ₹1500, we often provide free shipping (subject to location).'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we ship within India only. However, we\'re working on international shipping options. If you\'re interested in international delivery, please contact us and we\'ll do our best to accommodate your request.'
        }
      ]
    },
    {
      icon: Heart,
      title: 'Returns & Exchanges',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'Since each piece is handmade to order, we don\'t offer returns on custom orders. However, if you receive a damaged or defective product, please contact us within 48 hours of delivery with photos, and we\'ll resolve the issue immediately.'
        },
        {
          question: 'Can I exchange my product?',
          answer: 'Exchanges are considered on a case-by-case basis. If you\'re not satisfied with your order due to quality issues, please contact us within 48 hours of delivery. We\'ll work with you to find a solution.'
        },
        {
          question: 'What if my product arrives damaged?',
          answer: 'We take great care in packaging, but if your product arrives damaged, please contact us immediately with photos. We\'ll either send a replacement or offer a full refund. Your satisfaction is our priority!'
        }
      ]
    },
    {
      icon: MessageCircle,
      title: 'Care & Maintenance',
      faqs: [
        {
          question: 'How do I care for my crochet products?',
          answer: 'Care instructions vary by product type. Generally, hand wash with cold water and mild detergent, avoid bleach, and air dry flat. Never put crochet items in the dryer. For detailed care instructions, check our Care Guide page or the specific product page.'
        },
        {
          question: 'Can crochet products be washed?',
          answer: 'Yes, but carefully! Hand washing is always recommended. Use cold water and a gentle detergent. Gently squeeze out excess water (don\'t wring), reshape while damp, and lay flat to dry. For crochet bags and accessories, spot cleaning is often sufficient.'
        },
        {
          question: 'Will colors fade over time?',
          answer: 'We use high-quality, colorfast cotton yarn that resists fading. However, to maintain vibrant colors, avoid direct sunlight for extended periods and follow the care instructions. With proper care, your colors will stay beautiful for years.'
        }
      ]
    },
    {
      icon: HelpCircle,
      title: 'General Questions',
      faqs: [
        {
          question: 'Are your products eco-friendly?',
          answer: 'Yes! Handmade crochet is inherently eco-friendly. We use natural cotton yarn, minimal packaging, and avoid mass production. Each piece is made to order, reducing waste. Our packaging is also recyclable and eco-conscious.'
        },
        {
          question: 'Can I visit your workshop or store?',
          answer: 'Currently, we operate online only and don\'t have a physical store. However, if you\'re in our area and would like to see products in person, please contact us via WhatsApp, and we can arrange a viewing by appointment.'
        },
        {
          question: 'Do you offer gift wrapping?',
          answer: 'Yes! All our products come with beautiful, gift-ready packaging at no extra charge. If you need special gift wrapping or a personalized message card, let us know when you place your order.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order is dispatched, we\'ll send you tracking details via WhatsApp or email. You can track your shipment using the tracking number provided.'
        },
        {
          question: 'Can I cancel my order?',
          answer: 'Since production begins immediately, cancellations are only possible within 24 hours of placing your order. After that, the order is considered final as work has already begun. Please contact us as soon as possible if you need to cancel.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg"
            alt="FAQs"
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
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-[#C8A95A]" />
          <h1 className="text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-2xl mx-auto">Everything you need to know about SutraKriti</p>
        </motion.div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">
              Have a question? We've got answers! Browse through our most frequently asked questions below.
            </p>
          </div>

          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#C8A95A]" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-800">{category.title}</h2>
                </div>

                <Card className="border-[#E9DCC9]">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left text-lg font-semibold hover:text-[#C8A95A] transition-colors">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-[#F8F6F2]">
        <motion.div
          className="container mx-auto px-4 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-serif font-bold mb-6">Still Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? We're here to help! Reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
              asChild
            >
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#C8A95A] text-[#C8A95A] hover:bg-[#C8A95A] hover:text-white"
              asChild
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
