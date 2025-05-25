'use client'
import React from 'react';
import { motion } from 'framer-motion';
import QRCode from "react-qr-code";
import { Maximize2 } from 'lucide-react';

const QRPreview = ({ 
  printRef, 
  styles, 
  selectedStyle, 
  selectedItem, 
  languages, 
  selectedLanguage, 
  qrSize, 
  qrValue 
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Live Preview</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white"
        >
          <Maximize2 className="h-4 w-4" />
        </motion.button>
      </div>

      <motion.div
        ref={printRef}
        className={`rounded-xl p-6 bg-gradient-to-br ${styles.find(s => s.id === selectedStyle)?.bg} relative overflow-hidden`}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-4 right-4 w-16 h-16 border border-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-12 h-12 border border-white rounded-lg"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            className="mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h4 className="text-lg font-bold text-white mb-1">
              {selectedItem || 'Select an item'}
            </h4>
            <p className="text-white/70 text-xl">{languages[selectedLanguage].greeting}</p>
          </motion.div>

          {/* Real QR Code */}
          <motion.div
            className="bg-white rounded-xl p-3 mb-4 mx-auto flex items-center justify-center"
            style={{ width: qrSize * 0.6, height: qrSize * 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            {qrValue ? (
              <QRCode
                value={qrValue}
                size={qrSize * 0.5}
                level="H"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded grid grid-cols-8 gap-px p-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`${Math.random() > 0.5 ? 'bg-gray-400' : 'bg-gray-200'} rounded-sm`}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, delay: i * 0.02, repeat: Infinity }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <div className="text-white/80 text-xs font-medium">
            Powered by Tagtrace
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRPreview;