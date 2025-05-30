'use client'
import { useRef } from 'react';
import { motion } from 'framer-motion';
import QRCode from "react-qr-code";
import { Maximize2 } from 'lucide-react';
import { toPng } from 'html-to-image';

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
  const qrRef = useRef(null);

  const handleDownloadQR = async () => {
    if (!qrRef.current || !qrValue) return;
    
    try {
      // Store original styles
      const originalStyle = {
        width: qrRef.current.style.width,
        height: qrRef.current.style.height,
        transform: qrRef.current.style.transform,
        position: qrRef.current.style.position,
        zIndex: qrRef.current.style.zIndex
      };
      
      // Temporarily set optimal size for download
      qrRef.current.style.width = '400px';
      qrRef.current.style.height = '400px';
      qrRef.current.style.transform = 'none';
      qrRef.current.style.position = 'relative';
      qrRef.current.style.zIndex = '9999';
      
      // Find and resize the QR code SVG inside
      const qrSvg = qrRef.current.querySelector('svg');
      if (qrSvg) {
        qrSvg.setAttribute('width', '350');
        qrSvg.setAttribute('height', '350');
      }
      
      // Wait for layout to update
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const dataUrl = await toPng(qrRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: 'white',
        width: 400,
        height: 400,
        skipAutoScale: true
      });
      
      const link = document.createElement('a');
      link.download = `TagTrace-QR-${selectedItem || 'code'}.png`;
      link.href = dataUrl;
      link.click();
      
      // Restore original styles
      Object.keys(originalStyle).forEach(key => {
        qrRef.current.style[key] = originalStyle[key];
      });
      
      // Restore QR code size
      if (qrSvg) {
        qrSvg.setAttribute('width', Math.max(qrSize * 0.5, 100));
        qrSvg.setAttribute('height', Math.max(qrSize * 0.5, 100));
      }
      
    } catch (error) {
      console.error('Error downloading QR code:', error);
      
      // Simple fallback - just download current state
      try {
        const dataUrl = await toPng(qrRef.current, {
          quality: 1,
          pixelRatio: 3,
          backgroundColor: 'white'
        });
        
        const link = document.createElement('a');
        link.download = `TagTrace-QR-${selectedItem || 'code'}.png`;
        link.href = dataUrl;
        link.click();
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
      }
    }
  };

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

      <div
        ref={printRef}
        className={`rounded-xl p-6 bg-gradient-to-br ${styles.find(s => s.id === selectedStyle)?.bg} relative overflow-hidden`}
    
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
          <div
            className="mb-4"
          >
            <h4 className="text-lg font-bold text-white mb-1">
              {selectedItem || 'Select an item'}
            </h4>
            <p className="text-white/70 text-xl">{languages[selectedLanguage].greeting}</p>
          </div>

          <motion.div
            ref={qrRef}
            className="bg-white rounded-xl p-1 mb-4 mx-auto flex flex-col items-center justify-center cursor-pointer"
            style={{ 
              width: Math.max(qrSize * 0.6, 120),
              height: Math.max(qrSize * 0.6, 120) 
            }}
            whileHover={{ scale: 1.05 }}
            onClick={handleDownloadQR}
          >
            {qrValue ? (
              <QRCode
                value={qrValue}
                size={Math.max(qrSize * 0.5, 100)}
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
      </div>
    </div>
  );
};

export default QRPreview;