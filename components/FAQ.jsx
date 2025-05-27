'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "How do the QR codes work?",
      answer: "When someone scans your QR code with their smartphone, they'll be directed to a page with the information you've chosen to share and instructions on how to contact you or claim the reward."
    },
    {
      question: "Is my personal information safe?",
      answer: "Absolutely. Your contact information is never directly visible on the QR code. We use a secure messaging system that allows people to contact you without seeing your personal details until you choose to share them."
    },
    {
      question: "Do I have to offer a reward?",
      answer: "No, rewards are optional. However, offering even a small reward significantly increases the chances that your item will be returned to you."
    },
    {
      question: "How do I attach the QR codes to my items?",
      answer: "You can print the QR codes yourself on adhesive paper, or order our premium waterproof, durable stickers and tags that can be attached to various surfaces and materials."
    },
    {
      question: "Can I use this for my business equipment?",
      answer: "Yes! Our Business plan is designed specifically for companies that want to protect their equipment and assets. You can manage multiple items and have team members access the dashboard."
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about TagTrace
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="overflow-hidden"
            >
              <motion.div
                onClick={() => toggleFAQ(index)}
                whileHover={{ scale: 1.01 }}
                className={`bg-white p-6 rounded-xl shadow-md cursor-pointer transition-all duration-300 flex justify-between items-center ${activeIndex === index ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
              >
                <h3 className="text-xl font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                {activeIndex === index ? (
                  <FiChevronUp className="text-blue-500 text-xl" />
                ) : (
                  <FiChevronDown className="text-gray-400 text-xl" />
                )}
              </motion.div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 rounded-b-xl overflow-hidden"
                  >
                    <div className="p-6 text-gray-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}