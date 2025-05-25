'use client'
import React from 'react';
import { motion } from 'framer-motion';

const LayoutTab = ({ qrSize, setQrSize }) => {
  const slideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  };

  return (
    <motion.div
      key="layout"
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Layout Options</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">QR Code Size</label>
          <input
            type="range"
            min="100"
            max="300"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LayoutTab;