'use client'
import { motion } from 'framer-motion';
import { Printer, Download, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';

const ActionButtons = ({ qrValue, printRef }) => {
  const handleDownload = async () => {
    if (!printRef.current) return;
    
    try {
      const dataUrl = await toPng(printRef.current, {
        quality: 1,
        pixelRatio: 3, // Higher resolution
        backgroundColor: 'transparent'
      });
      
      const link = document.createElement('a');
      link.download = `TagTrace-${qrValue.split('/').pop() || 'card'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="space-y-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center cursor-pointer justify-center space-x-2 shadow-lg"
        disabled={!qrValue} 
        onClick={handleDownload}
      >
        <Download className="h-5 w-5" />
          <span>Download</span>
      </motion.button>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center cursor-pointer space-x-2 border border-white/20"
        >
          <Printer className="h-4 w-4" />
        <span>Print</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 border border-white/20 cursor-pointer"
          disabled={!qrValue}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ActionButtons;