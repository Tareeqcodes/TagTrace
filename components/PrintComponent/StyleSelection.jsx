'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, RotateCcw, Star } from 'lucide-react';

const StyleSelection = ({ styles, selectedStyle, setSelectedStyle }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
            <Palette className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Design Style</h2>
            <p className="text-gray-400">Pick your aesthetic</p>
          </div>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white"
        >
          <RotateCcw className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs px-2 py-1 rounded-full">
                <Star className="h-3 w-3 inline" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelection;