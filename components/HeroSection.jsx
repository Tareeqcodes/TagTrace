'use client'
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-pattern text-white py-24">
      <div className="container mx-auto px-4 gap-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-4xl  font-bold mb-6">Never lose your valuable items again</h2>
          <p className="text-xl mb-8">TagTrace helps you create QR code tags for all your personal items, making tracking and recovery effortless.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="#signup" className="bg-blue-500 hover:bg-blue-600 text-white text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">Get Started - Free Trial</Link>
            <Link href="#demo" className="bg-transparent border-2 border-white text-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">See How It Works</Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full h-64 lg:h-96">
            <Image 
              src="/1.jpg" 
              alt="Dashboard and QR code mockup" 
              className="rounded-lg shadow-xl"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}