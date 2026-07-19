'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Phone, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917777932385';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Custom Orders', href: '/custom-orders' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Our Story', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E9DCC9]">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="SutraKriti Logo"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-[#C8A95A] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-[#C8A95A] text-[#C8A95A] hover:bg-[#C8A95A] hover:text-white"
              asChild
            >
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-[#C8A95A] hover:bg-[#B89850] text-white"
              asChild
            >
              <Link href="/collections">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#E9DCC9] bg-white"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-700 hover:text-[#C8A95A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-[#C8A95A] text-[#C8A95A]"
                  asChild
                >
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Order
                  </a>
                </Button>
                <Button
                  className="w-full bg-[#C8A95A] hover:bg-[#B89850] text-white"
                  asChild
                >
                  <Link href="/collections">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shop Collections
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}