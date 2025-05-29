'use client'
import { motion } from 'framer-motion'
import { FaQrcode, FaTags, FaSearchDollar, FaMobileAlt } from 'react-icons/fa'

export default function How() {
  const steps = [
    {
      icon: <FaSearchDollar className="text-3xl" />,
      title: "Register Your Items",
      description: "Add items with descriptions, photos, and optional rewards"
    },
    {
      icon: <FaQrcode className="text-3xl" />,
      title: "Generate QR Codes",
      description: "Create unique QR codes linked to your secure item pages"
    },
    {
      icon: <FaTags className="text-3xl" />,
      title: "Apply Tags",
      description: "Attach our durable QR stickers or tags to your valuables"
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Get Items Returned",
      description: "Finders scan the code to contact you through our platform"
    }
  ]

  return (
    <section id="demo" className="relative py-10 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-20 translate-x-32 translate-y-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tagtrace</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Protect your valuables in just a few simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 font-medium text-sm text-center [word-spacing:-1px] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              See It In Action
            </h3>
            <p className="text-gray-600 text-lg">
              Watch our quick demo to see how TagTrace works
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
            <video 
              controls 
              className="w-full aspect-video"
              poster="/header.jpg"
            >
              <source src="/2.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  )
}