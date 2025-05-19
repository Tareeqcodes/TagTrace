'use client'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function Action() {
  return (
    <section id="signup" className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-20 translate-y-32 -translate-x-32"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to stop losing your stuff?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy users who have recovered their valuable items with TagTrace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Start Your Free Trial Today
          </h3>
          <p className="text-gray-600 text-center mb-8">
            No credit card required. 14-day free trial with all premium features.
          </p>

          <form className="space-y-5">
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center"
            >
              Create Free Account
              <FiArrowRight className="ml-2" />
            </motion.button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}