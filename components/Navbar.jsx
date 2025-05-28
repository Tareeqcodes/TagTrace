'use client'
import Link from 'next/link'
import { FiTag, FiHome, FiUser } from 'react-icons/fi'
import { useAuth } from '@/context/Authcontext'
import { motion, AnimatePresence } from 'framer-motion'


export default function Navbar() {
  const { user } = useAuth();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 md:hidden">
        <div className="container mx-auto px-4 py-3 space-x-2 flex justify-start items-center">
          <Link href="/" className="flex space-x-2 items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TT</span>
            </div>
          <motion.h1 
               className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
               whileHover={{ scale: 1.05 }} >
                TagTrace
              </motion.h1>                        
          </Link>
        </div> 
      </header>

      {/* Desktop Nav (Original) */}
      <header className="hidden md:block bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center group">
           <motion.div 
           className="relative mr-3"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
           >
           <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TT</span>
            </div>
            <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
             </motion.div>
               <motion.h1 
               className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                 >
                 TagTrace
                  </motion.h1>
                   </Link>
            
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

      {/* Bottom Navbar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="p-3 text-gray-700 flex flex-col items-center">
            <FiHome size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          {user ? (
            <Link href="/dashboard" className="p-3 text-blue-600 flex flex-col items-center">
              <FiUser size={20} />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
          ) : (
            <Link href="/login" className="p-3 text-blue-600 flex flex-col items-center">
              <FiUser size={20} />
              <span className="text-xs mt-1">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}