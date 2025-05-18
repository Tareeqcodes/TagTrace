'use client'
import Link from 'next/link'
import { FaQrcode } from 'react-icons/fa'
import { useAuth } from '@/context/Authcontext'
import { motion, AnimatePresence } from 'framer-motion'


export default function Navbar() {
    const { user } = useAuth();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto  px-4 flex justify-between items-center">
            <Link href="/"
             className="flex items-center">
              <FaQrcode className='text-blue-500 text-sm mr-2' />
                <h1 className="text-sm font-bold text-blue-600">Tagtrace</h1>
            </Link>
            

            <nav className="desktop-menu hidden md:block">
               <div className="container mx-auto px-4 py-1">
                <div className="flex space-x-6">
                    <Link href="/features" className="block text-gray-600 text-sm hover:text-blue-600 transition py-2">Features</Link>
                    <Link href="/how-it-works" className="block text-gray-600 hover:text-blue-600 text-sm transition py-2">How It Works</Link>
                    <Link href="/pricing" className="block text-gray-600 hover:text-blue-600 text-sm transition py-2">Pricing</Link>
                </div>
                
            </div>
            </nav>
             <div className="flex items-center space-x-4">
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Link 
                  href="/dashboard"
                  className="hidden md:block px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-600 rounded-lg transition-all shadow-sm border border-gray-200"
                >
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Link 
                  href="/login" 
                  className="hidden md:block px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
    </header>
  )
}
