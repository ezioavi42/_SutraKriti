'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917777932385';
  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '_sutrakriti';
  const contactEmail = process.env.NEXT_PUBLIC_EMAIL || 'sutrakriti.help@outlook.com';

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        toast.success('Thank you for subscribing!');
        setEmail('');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#F8F6F2] border-t border-[#E9DCC9]">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="SutraKriti"
              width={160}
              height={53}
              className="h-12 w-auto"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              Handmade crochet creations crafted with love by skilled artisans. Every piece tells a story.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={`https://www.instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#C8A95A] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="text-gray-600 hover:text-[#C8A95A] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#C8A95A] transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/collections" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Shop Collections
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="text-sm text-gray-600 hover:text-[#C8A95A] transition-colors">
                  Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Join the Family</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get updates on new collections, exclusive pieces, and crochet inspiration.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-[#E9DCC9]"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C8A95A] hover:bg-[#B89850] text-white"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#E9DCC9]">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} SutraKriti. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-[#D8A7A1] fill-current" /> by Artisans in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}