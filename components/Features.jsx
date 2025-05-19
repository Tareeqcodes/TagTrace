'use client'
import { motion } from 'framer-motion';
import { 
  QrCode, 
  ShieldCheck, 
  Gift, 
  Gauge, 
  Bell, 
  Printer
} from 'lucide-react';

export default function Features() {
  const stats = [
    {
      value: "94%",
      description: "of lost items with TagTrace codes get returned to their owners"
    },
    {
      value: "15,000+",
      description: "happy users protecting their valuables"
    },
    {
      value: "$250k+",
      description: "worth of items recovered by our community"
    }
  ];

  const features = [
    {
      icon: <QrCode size={22} />,
      title: "Custom QR Codes",
      description: "Generate unique QR codes for each of your items that link to your contact details and reward information."
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Privacy Protection",
      description: "Share only the information you want. Your personal details are never exposed directly on the QR code."
    },
    {
      icon: <Gift size={22} />,
      title: "Custom Rewards",
      description: "Set custom rewards for each item to incentivize returns. Motivate finders to return your belongings."
    },
    {
      icon: <Gauge size={22} />,
      title: "Easy Dashboard",
      description: "Manage all your registered items in one place. Update item details and rewards at any time."
    },
    {
      icon: <Bell size={22} />,
      title: "Instant Notifications",
      description: "Get notified immediately when someone scans your QR code so you know your item has been found."
    },
    {
      icon: <Printer size={22} />,
      title: "Durable Labels",
      description: "Print your QR codes on waterproof, durable labels that stick to almost any surface and last for years."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <motion.div 
          className="mb-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={statsContainerVariants}
        >
          <motion.div 
            className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 opacity-5 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, 20, 0] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut" 
            }}
          />
          
          <motion.div 
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500 opacity-5 rounded-full blur-3xl"
            animate={{ 
              x: [0, -30, 0], 
              y: [0, -20, 0] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10,
              ease: "easeInOut"
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={counterVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
              >
                <motion.div 
                  className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-600 text-lg">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="py-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Why Choose TagTrace?</h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
              Our industry-leading features help you recover lost items faster and more securely than ever before.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl w-12 h-12 flex items-center justify-center shrink-0 shadow-md"
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}