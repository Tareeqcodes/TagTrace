import { Analytics } from '@vercel/analytics/next';
import '../assets/globals.css';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/context/Authcontext';
import Footer from '@/components/Footer';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '300', '400', '700'],
  display: "swap",
});

export const viewport = {
  themeColor: '#B45309',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL( 'https://www.tagtrace.online'), 
  title: "TagTrace | Never Lose Your Items Again",
  description: "Tag your belongings with smart QR codes. Get lost items returned instantly with our scan-to-contact system. Free to start, premium durable tags available.",
  keywords: [
    "lost and found", 
    "QR code tracker", 
    "item recovery", 
    "lost wallet", 
    "luggage tags",
    "contactless return",
    "NFC lost and found"
  ],
  authors: [{ name: "Tagtrace Team" }],
  openGraph: {
    title: "TagTrace | Never Lose Your Items Again",
    description: "Get your lost items returned with smart QR tags. Works for wallets, phones, luggage, and more.",
    url: "https://www.tagtrace.online",
    siteName: "TagTrace",
    images: [
      {
        url: "/images/header.webp",
        width: 1200,
        height: 630,
        alt: "TagTrace QR tag on a wallet",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TagTrace | Never Lose Your Items Again",
    description: "The smart way to protect your belongings. Free QR tags, premium NFC options.",
    images: ["/images/header.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon16.png",
    shortcut: "/images/favicon32.png",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.tagtrace.online",
    languages: {
      en: "https://www.tagtrace.online",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <main className='h-screen'>
            {children}
            <Footer />
          </main>
        </AuthProvider>
         <Analytics />
      </body>
    </html>
  );
}