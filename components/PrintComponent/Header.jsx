'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { QrCode, Settings, Globe } from 'lucide-react';

const Header = ({ selectedLanguage, setSelectedLanguage, languages }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5"
    >
      <div className="max-w-7xl mx-auto px-3 md:px-8 py-6">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-start justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Trace Studio Pro
              </h1>
              <p className="text-gray-400 text-sm font-medium">Professional Tagtrace Designer</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Globe className="h-4 w-4 text-cyan-400" />
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-md font-medium text-white cursor-pointer"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code} className="bg-gray-800 text-white">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </motion.div>
            <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl cursor-pointer shadow-lg"
            >
              <Settings className="h-5 w-5 text-white" />
            </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;