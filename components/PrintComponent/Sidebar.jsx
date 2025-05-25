'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Shield, Eye, Globe, Sparkles } from 'lucide-react';

const Sidebar = ({ tabs, activeTab, setActiveTab }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div variants={itemVariants} className="lg:col-span-3">
      <div className="sticky top-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ x: 4 }}
              transition={{ delay: index * 0.1 }}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight className="h-4 w-4 ml-auto text-cyan-400" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white">Statistics</h3>
          <div className="space-y-3">
            {[
              { label: 'QR Codes Generated', value: '2,847', color: 'text-cyan-400' },
              { label: 'Total Scans', value: '15.2K', color: 'text-purple-400' },
              { label: 'Success Rate', value: '98.7%', color: 'text-green-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center"
              >
                <span className="text-sm text-gray-400">{stat.label}</span>
                <span className={`font-bold ${stat.color}`}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      
        {/* Features */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20">
          <h4 className="font-semibold text-emerald-400 mb-3 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Premium Features
          </h4>
          <div className="space-y-2">
            {[
              { icon: Shield, text: '256-bit encryption' },
              { icon: Eye, text: 'Real-time analytics' },
              { icon: Globe, text: 'Multi-language' },
              { icon: Sparkles, text: 'AI optimization' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 text-sm"
              >
                <feature.icon className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;