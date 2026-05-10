'use client';

import { motion } from 'framer-motion';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Icon/Logo area */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="mb-8 flex justify-center"
        >
          <div className="text-6xl">🔧</div>
        </motion.div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Taking a Break
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-6">
          TagTrace is currently under maintenance. We're working on something amazing!
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          We're taking time to improve TagTrace and bring you an even better experience. 
          We'll be back soon with exciting updates and features.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <motion.a
            href="mailto:tareeqcodes@gmail.com?subject=TagTrace%20Inquiry"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-amber-700 transition-colors"
          >
            📧 Get in Touch
          </motion.a>

          <motion.a
            href="https://twitter.com/build2bank"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold text-lg shadow-lg border-2 border-amber-600 hover:bg-amber-50 transition-colors"
          >
            🐦 Twitter
          </motion.a>

          <motion.a
            href="https://instagram.com/tariqauwal_"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold text-lg shadow-lg border-2 border-amber-600 hover:bg-amber-50 transition-colors"
          >
            📸 Instagram
          </motion.a>
        </div>

        {/* Footer note */}
        <p className="text-gray-500 text-sm mt-12">
          Need immediate assistance?{' '}
          <a
            href="mailto:tareeqcodes@gmail.com"
            className="text-amber-600 font-semibold hover:underline"
          >
            Email
          </a>
          {' '}or{' '}
          <a
            href="tel:+2349124498160"
            className="text-amber-600 font-semibold hover:underline"
          >
            Call +234 9124498160
          </a>
        </p>
      </motion.div>
    </div>
  );
}
