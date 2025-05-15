'use client'
import Link from 'next/link'
import { FaQrcode } from 'react-icons/fa'
import { useAuth } from '@/context/Authcontext'


export default function Navbar() {
    const { user } = useAuth();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaQrcode className='text-blue-500 text-xl mr-2' />
                <h1 className="text-xl font-bold text-blue-600">TagTrace</h1>
            </div>
            

            <nav className="desktop-menu hidden md:block">
               <div className="container mx-auto px-4 py-1">
                <div className="flex space-x-6">
                    <Link href="/features" className="block text-gray-600 text-sm hover:text-blue-600 transition py-2">Features</Link>
                    <Link href="/how-it-works" className="block text-gray-600 hover:text-blue-600 text-sm transition py-2">How It Works</Link>
                    <Link href="/pricing" className="block text-gray-600 hover:text-blue-600 text-sm transition py-2">Pricing</Link>
                </div>
                
            </div>
            </nav>
             {user ? (
                        <Link 
                href="/dashboard"
                className="ml-4 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
              >
                Dashboard
              </Link>
                    ): (
                    <Link href="/login" className="block bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition">
                        Login
                    </Link>
                    )} 
        </div>
    </header>
  )
}
