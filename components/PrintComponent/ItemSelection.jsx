'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Check } from 'lucide-react';

const ItemSelection = ({ 
  userDoc, 
  loading, 
  selectedItemId, 
  handleItemSelection 
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl">
          <Camera className="h-6 w-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Where will this tag be used</h2>
          <p className="text-gray-400">Choose what item you want to tag</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/5 rounded"></div>
            </div>
          ))}
        </div>
      ) : userDoc.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No items found. Add some items to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {userDoc.map((item) => (
            <motion.button
              key={item.$id}
              onClick={() => handleItemSelection(item)}
              className={`relative p-4 rounded-xl border transition-all ${
                selectedItemId === item.$id
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-left">
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="text-xs text-gray-400 mt-1">Your Item</div>
              </div>
              {selectedItemId === item.$id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-cyan-500 rounded-full p-1"
                >
                  <Check className="h-3 w-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemSelection;