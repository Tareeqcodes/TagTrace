
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
  title: "TagTrace",
  description: "Never Lose Your Items Again",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={poppins.className}
      >
        <AuthProvider >
          <main>
         
        {children}
        <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
