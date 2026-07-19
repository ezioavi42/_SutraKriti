'use client';

import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppFloat() {
  const [settings, setSettings] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after a delay
    setTimeout(() => setShow(true), 2000);

    // Fetch settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to fetch settings:', err));
  }, []);

  const handleClick = () => {
    const number = settings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = 'Hi SutraKriti, I would like to inquire about your handmade crochet products.';
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-bounce"
      aria-label="Order on WhatsApp"
    >
      <Phone className="w-8 h-8" />
    </button>
  );
}
