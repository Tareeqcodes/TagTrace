'use client'
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "James Miller",
      role: "Software Engineer",
      initials: "JM",
      content: "I lost my laptop at the airport and got it back the next day thanks to TagTrace! The person who found it scanned the QR code and contacted me right away.",
      rating: 5,
      bgGradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Sarah Peterson",
      role: "Parent & Teacher",
      initials: "SP",
      content: "As a mother of three kids who constantly lose things, TagTrace has been a game-changer. I've labeled everything from lunchboxes to jackets and we've had multiple items returned!",
      rating: 5,
      bgGradient: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "IT Manager",
      initials: "MJ",
      content: "We use TagTrace for all our company equipment. It's saved us thousands in replacement costs and the dashboard makes it easy to manage everything.",
      rating: 5,
      bgGradient: "from-emerald-500 to-emerald-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          >
            <FaStar 
              className={`w-5 h-5 ${
                i < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who never lose their valuable items again
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className={`w-8 h-8 bg-gradient-to-r ${testimonial.bgGradient} rounded-full flex items-center justify-center shadow-lg`}>
                  <FaQuoteLeft className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center justify-between mb-6 pt-2">
                <StarRating rating={testimonial.rating} />
                <div className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                  Verified Review
                </div>
              </div>
              
              {/* Content */}
              <blockquote className="text-gray-700 mb-8 leading-relaxed text-base font-medium relative">
                "{testimonial.content}"
              </blockquote>
              
              {/* User info */}
              <div className="flex items-center">
                <div className={`bg-gradient-to-r ${testimonial.bgGradient} text-white rounded-full w-14 h-14 flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="font-bold text-lg">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}