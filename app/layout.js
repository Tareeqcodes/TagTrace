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

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tagtrace.online'),
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
  openGraph: {
    title: "TagTrace | Never Lose Your Items Again",
    description: "Get your lost items returned with smart QR tags. Works for wallets, phones, luggage, and more.",
    url: "https://tagtrace.online",
    siteName: "TagTrace",
    images: [
      {
        url: "/header.png",
        width: 1200,
        height: 630,
        alt: "TagTrace QR tag on a wallet",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TagTrace | Never Lose Your Items Again",
    description: "The smart way to protect your belongings. Free QR tags, premium NFC options.",
    images: ["/header.png"],
    creator: "@tagtrace",
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
    icon: "/32.png",
    shortcut: "/32.png",
    apple: "/60.png",
  },
  manifest: "/site.webmanifest",
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
      </body>
    </html>
  );
}