'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CustomOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    productType: '',
    description: '',
    colors: '',
    budget: '',
    deliveryDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Custom order request submitted! We\'ll contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          productType: '',
          description: '',
          colors: '',
          budget: '',
          deliveryDate: ''
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      <Toaster position="top-center" richColors />
      <Header />

      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5660156/pexels-photo-5660156.jpeg"
            alt="Custom Orders"
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
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#C8A95A]" />
          <h1 className="text-5xl font-serif font-bold mb-4">Custom Orders</h1>
          <p className="text-xl max-w-2xl mx-auto">Create something uniquely yours. Share your vision and we'll bring it to life.</p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card className="border-[#E9DCC9]">
              <CardContent className="p-8">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-serif font-bold mb-4">Tell Us About Your Dream Creation</h2>
                  <p className="text-gray-600">Fill out the form below and our artisans will craft something special just for you.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="border-[#E9DCC9]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="border-[#E9DCC9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="border-[#E9DCC9]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                      <Input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="border-[#E9DCC9]"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Type *</label>
                    <Select value={formData.productType} onValueChange={(value) => handleChange('productType', value)} required>
                      <SelectTrigger className="border-[#E9DCC9]">
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Crochet Flower Bouquet">Crochet Flower Bouquet</SelectItem>
                        <SelectItem value="Crochet Bag">Crochet Bag</SelectItem>
                        <SelectItem value="Crochet Tote Bag">Crochet Tote Bag</SelectItem>
                        <SelectItem value="Crochet Sling Bag">Crochet Sling Bag</SelectItem>
                        <SelectItem value="Crochet Potli Bag">Crochet Potli Bag</SelectItem>
                        <SelectItem value="Home Decor">Home Decor</SelectItem>
                        <SelectItem value="Baby Items">Baby Items</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      required
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Describe your ideal creation in detail. Include size, style, occasion, and any specific requirements..."
                      rows={5}
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Colors</label>
                      <Input
                        value={formData.colors}
                        onChange={(e) => handleChange('colors', e.target.value)}
                        placeholder="e.g., Pastel pink, cream, sage green"
                        className="border-[#E9DCC9]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <Input
                        value={formData.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        placeholder="e.g., ₹1000-2000"
                        className="border-[#E9DCC9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Desired Delivery Date</label>
                    <Input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => handleChange('deliveryDate', e.target.value)}
                      className="border-[#E9DCC9]"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-[#C8A95A] hover:bg-[#B89850] text-white"
                    >
                      {loading ? 'Submitting...' : 'Submit Custom Order Request'}
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      We'll review your request and get back to you within 24 hours
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-[#E9DCC9] text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#C8A95A]" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Design</h3>
                <p className="text-sm text-gray-600">Work directly with our artisans to create your perfect piece</p>
              </CardContent>
            </Card>

            <Card className="border-[#E9DCC9] text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#C8A95A]" />
                </div>
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-sm text-gray-600">Premium materials and expert craftsmanship guaranteed</p>
              </CardContent>
            </Card>

            <Card className="border-[#E9DCC9] text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#C8A95A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#C8A95A]" />
                </div>
                <h3 className="font-semibold mb-2">Fast Response</h3>
                <p className="text-sm text-gray-600">Get a quote and timeline within 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}