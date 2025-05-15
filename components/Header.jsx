'use client'
import Link from 'next/link'
import { FaQrcode } from 'react-icons/fa'


export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <FaQrcode className='text-blue-500 text-xl mr-2' />
                <h1 className="text-xl font-bold text-blue-600">TagTrace</h1>
            </div>
            

            <nav className="desktop-menu hidden md:block">
                <ul className="flex space-x-6">
                    <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a></li>
                    <li><a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a></li>
                </ul>
            </nav>
            
            <div className="hidden md:block">
                <Link href="#signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">Sign Up</Link>
            </div>
            

            <button className="menu-toggle md:hidden text-gray-600 focus:outline-none" id="menuToggle">
                <i className="fas fa-bars text-2xl"></i>
            </button>
        </div>
        
        <div className="mobile-menu md:hidden" id="mobileMenu">
            <div className="container mx-auto px-4 py-3">
                <ul className="space-y-4">
                    <li><a href="#features" className="block text-gray-600 hover:text-blue-600 transition py-2">Features</a></li>
                    <li><a href="#how-it-works" className="block text-gray-600 hover:text-blue-600 transition py-2">How It Works</a></li>
                    <li><a href="#pricing" className="block text-gray-600 hover:text-blue-600 transition py-2">Pricing</a></li>
                    <li className="pt-2 border-t border-gray-200">
                        <a href="#signup" className="block bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition">Sign Up</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}
