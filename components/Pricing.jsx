'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, ArrowRight, Shield } from 'lucide-react';

export default function Pricing() {
  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Get started with essential features at no cost.',
      features: [
        'Up to 3 items',
        'Standard QR codes',
        'Email notifications',
        'Basic web dashboard'
      ],
      buttonText: 'Get Started Free',
      buttonColor: 'from-gray-500 to-gray-600',
      highlight: false,
      icon: <Shield size={18} />
    },
    {
      name: 'Personal',
      price: '$3',
      period: '/month',
      description: 'Perfect for individuals with several important items.',
      features: [
        'Up to 10 items',
        'Basic QR code design',
        'Email notifications',
        'Enhanced web dashboard',
        '5 free standard stickers'
      ],
      buttonText: 'Choose Personal',
      buttonColor: 'from-blue-500 to-blue-600',
      highlight: false,
      icon: <Star size={18} />
    },
    {
      name: 'Premium',
      price: '$29',
      period: '/year',
      description: 'Great for families or people with many valuables.',
      features: [
        'Unlimited items',
        'Custom QR designs',
        'SMS + Email notifications',
        '10 free premium stickers',
        'Branded QR codes',
        'Priority support',
        'Team accounts'
      ],
      buttonText: 'Choose Premium',
      buttonColor: 'from-blue-500 to-indigo-600',
      highlight: true,
      ribbonText: 'BEST VALUE',
      icon: <Crown size={18} />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Background decorative elements */}
        <motion.div 
          className="absolute top-40 -left-40 w-80 h-80 bg-blue-500 opacity-5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 -right-40 w-96 h-96 bg-indigo-500 opacity-5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut"
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
           Pricing Plans
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your needs. All plans include our core features with no hidden fees.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 
                ${plan.highlight 
                  ? 'shadow-xl ring-4 ring-blue-500 ring-opacity-20 bg-white' 
                  : 'shadow-lg bg-white border border-gray-100'}`
              }
            >
              {/* Highlight ribbon */}
              {plan.highlight && (
                <div className="absolute -right-12 top-7 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-1 transform rotate-45 shadow-md">
                  <span className="text-xs font-bold tracking-wider">{plan.ribbonText}</span>
                </div>
              )}
              
              <div className={`p-8 ${plan.highlight ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-white'}`}>
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md
                    ${plan.highlight 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600'}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                </div>
                
                <div className="flex items-end mt-2 mb-4">
                  <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-blue-600' : 'text-gray-800'}`}>
                    {plan.price}
                  </span>
                  <span className="text-lg text-gray-500 ml-1 mb-1">{plan.period}</span>
                </div>
                
                <p className="text-gray-600 mb-6 min-h-16">{plan.description}</p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full bg-gradient-to-r cursor-pointer ${plan.buttonColor} text-white rounded-lg py-3 px-4 font-medium flex items-center justify-center space-x-2 transition-all shadow-md`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
              
              <div className="bg-white p-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4">What's included:</h4>
                <motion.ul 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      variants={featureVariants}
                      whileHover={{ x: 4 }}
                      className="flex items-start"
                    >
                      <Check className="text-green-500 mt-1 mr-3 flex-shrink-0" size={16} />
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                {plan.highlight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mt-6 text-center text-sm font-medium cursor-pointer text-blue-700 border border-blue-100"
                  >
                    Save 20% compared to monthly billing
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}