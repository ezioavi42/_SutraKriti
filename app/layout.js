import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'SutraKriti - Handmade Crochet Creations | Threads of Art, Handmade with Heart',
  description: 'Discover beautifully handcrafted crochet creations designed to bring warmth, elegance, and joy to every occasion. Premium crochet bouquets, bags, and home décor made by skilled artisans in India.',
  keywords: 'handmade crochet, crochet bouquets, crochet bags, handcrafted gifts, artisan crafts, Indian handicrafts, premium crochet, custom crochet, SutraKriti',
  authors: [{ name: 'SutraKriti' }],
  openGraph: {
    title: 'SutraKriti - Handmade Crochet Creations',
    description: 'Beautifully handcrafted crochet creations made with love',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SutraKriti'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
