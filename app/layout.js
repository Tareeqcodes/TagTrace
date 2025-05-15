
import '../assets/globals.css';
import { Poppins } from 'next/font/google';


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
        {children}
      </body>
    </html>
  );
}
