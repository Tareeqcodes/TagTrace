'use client'
import { useState } from "react"
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2,
  ExternalLink,
  Heart,
  Info,
  ChevronDown,
} from 'lucide-react';

export default function Safety() {
      const [showSafetyTips, setShowSafetyTips] = useState(false);

  return (
    <>
    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden"
        >
          <button
            onClick={() => setShowSafetyTips(!showSafetyTips)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Safety Tips</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSafetyTips ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showSafetyTips && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100"
              >
                <div className="p-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Meet in public places during daylight hours</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Never share personal financial information</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Trust your instincts and report suspicious requests</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white text-center"
        >
          <h3 className="text-lg font-bold mb-2">Protect Your Items</h3>
          <p className="text-blue-100 text-sm mb-4 leading-relaxed">
            Join thousands who've safely recovered their belongings with TagTrace.
          </p>
          <Link href="https://www.tagtrace.online/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Get TagTrace</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
          </Link>
        </motion.div>
        <div className="text-center py-4 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">Powered by TagTrace</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Connecting lost items since 2024</p>
          </div>
        </div>
    </>
  )
}
