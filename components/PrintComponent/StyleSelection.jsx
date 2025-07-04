'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const StyleSelection = ({ styles, selectedStyle, setSelectedStyle }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
            <Palette className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-md font-bold text-white">Choose sticker style</h2>
            <p className="text-gray-400 text-xs"></p>
          </div>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {styles.map((style, index) => (
          <motion.button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`relative p-4 rounded-xl border transition-all ${
              selectedStyle === style.id
                ? 'border-cyan-500/50 ring-2 ring-cyan-500/20'
                : 'border-white/10 hover:border-white/30'
            }`}
            whileHover={{ y: -4 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={`h-16 rounded-lg bg-gradient-to-br ${style.bg} mb-3`} />
            <div className="text-sm font-medium text-white">{style.name}</div>
            {style.popular && (
              <div className="absolute -top-2 -right-2 p-1 text-white bg-green-400 text-xs font-semibold rounded">
                popular
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelection;