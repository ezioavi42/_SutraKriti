'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Instagram, MapPin, Clock } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917777932385';
  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '_sutrakriti';
  const contactEmail = process.env.NEXT_PUBLIC_EMAIL || 'sutrakriti.help@outlook.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
            alt="Contact Us"
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
          <h1 className="text-5xl font-serif font-bold mb-4">Get in Touch</h1>
          <p className="text-xl">We'd love to hear from you</p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-serif font-bold mb-6">Let's Connect</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have a question about our products or want to place a custom order? We're here to help!
            </p>

            <div className="space-y-6">
              <Card className="border-[#E9DCC9]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#C8A95A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-gray-600 mb-2">Chat with us for quick responses</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8A95A] hover:underline"
                    >
                      +91 77779 32385
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E9DCC9]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#C8A95A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 mb-2">Send us a detailed message</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-[#C8A95A] hover:underline"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E9DCC9]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-[#C8A95A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instagram</h3>
                    <p className="text-gray-600 mb-2">Follow us for inspiration</p>
                    <a
                      href={`https://www.instagram.com/${instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8A95A] hover:underline"
                    >
                      @{instagramHandle}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E9DCC9]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C8A95A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card className="border-[#E9DCC9]">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What's this about?"
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      rows={5}
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-[#C8A95A] hover:bg-[#B89850] text-white"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}