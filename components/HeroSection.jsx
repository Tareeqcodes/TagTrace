'use client'
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-pattern text-white py-12 md:py-24">
      <div className="container mx-auto px-4 gap-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Never lose your valuable items again</h2>
          <p className="text-lg md:text-xl mb-8">TagTrace helps you create QR code tags for all your personal items, making tracking and recovery effortless.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/login">
            <button className="px-6 py-3 w-full md:px-8 md:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Start Tagging Now
            </button>
            </Link>
            <Link href="#demo" className="bg-transparent border-2 border-white text-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Watch demo
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center w-full">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
            <Image 
              src="/1.jpg" 
              alt="Dashboard and QR code mockup" 
              className="rounded-lg shadow-xl object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}