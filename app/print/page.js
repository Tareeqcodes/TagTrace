'use client'
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  Download, 
  Settings, 
  Layers, 
  QrCode, 
  Check, 
  Star,
  Zap,
  Shield,
  Eye,
  Globe,
  ChevronRight,
  ArrowDown,
  Sparkles,
  Camera,
  Maximize2,
  RotateCcw,
  Save,
  Share2,
  Grid3X3,
  Palette,
  Type
} from 'lucide-react';

const PrintPageComponent = () => {
  const [selectedItem, setSelectedItem] = useState('MacBook Pro M3');
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('design');
  const [qrSize, setQrSize] = useState(150);
  const [showGrid, setShowGrid] = useState(false);
  const printRef = useRef(null);

 const languages = {
  en: { name: 'English', flag: '🇺🇸', greeting: 'Scan If Found' },
  es: { name: 'Español', flag: '🇪🇸', greeting: 'Escanear Si Se Encuentra' },
  fr: { name: 'Français', flag: '🇫🇷', greeting: 'Scanner Si Trouvé' },
  ar: { name: 'العربية', flag: '🇸🇦', greeting: 'امسح إذا وُجد' }
};

  const styles = [
    { 
      id: 'cyberpunk', 
      name: 'Cyberpunk Neon', 
      bg: 'from-purple-900 via-blue-900 to-indigo-900',
      accent: 'from-cyan-400 to-purple-400',
      popular: true
    },
    { 
      id: 'minimal', 
      name: 'Minimal White', 
      bg: 'from-gray-50 to-gray-100',
      accent: 'from-gray-800 to-gray-600'
    },
    { 
      id: 'forest', 
      name: 'Forest Dark', 
      bg: 'from-green-900 via-emerald-800 to-teal-900',
      accent: 'from-green-400 to-emerald-400'
    },
    { 
      id: 'sunset', 
      name: 'Sunset Vibes', 
      bg: 'from-orange-600 via-pink-600 to-purple-600',
      accent: 'from-yellow-300 to-orange-300'
    },
    { 
      id: 'arctic', 
      name: 'Arctic Blue', 
      bg: 'from-blue-200 via-cyan-200 to-teal-200',
      accent: 'from-blue-700 to-cyan-700'
    },
    { 
      id: 'noir', 
      name: 'Noir Classic', 
      bg: 'from-gray-900 via-gray-800 to-black',
      accent: 'from-gray-300 to-white'
    }
  ];

  const tabs = [
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Grid3X3 },
    { id: 'typography', label: 'Text', icon: Type },
    { id: 'export', label: 'Export', icon: Download }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  QR Studio Pro
                </h1>
                <p className="text-gray-400 text-sm font-medium">Professional QR Tag Designer</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.div 
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <Globe className="h-4 w-4 text-cyan-400" />
                <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-md font-medium text-gray-800 cursor-pointer"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-lg"
              >
                <Settings className="h-5 w-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-8"
        >
          {/* Left Sidebar */}
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
                <h3 className="text-lg font-semibold mb-4 text-white"> Statistics</h3>
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

          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {activeTab === 'design' && (
                <motion.div
                  key="design"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8"
                >
                  {/* Item Selection */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl">
                        <Camera className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Where will this tag be used</h2>
                        <p className="text-gray-400">Choose what you want to tag</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {['MacBook Pro M3', 'iPhone 15 Pro', 'AirPods Max', 'iPad Air'].map((item) => (
                        <motion.button
                          key={item}
                          onClick={() => setSelectedItem(item)}
                          className={`p-4 rounded-xl border transition-all ${
                            selectedItem === item
                              ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-white'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-left">
                            <div className="font-semibold text-sm">{item}</div>
                            <div className="text-xs text-gray-400 mt-1">Electronic Device</div>
                          </div>
                          {selectedItem === item && (
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
                  </div>

                  {/* Style Selection */}
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
                </motion.div>
              )}

              {activeTab === 'layout' && (
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
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Grid</span>
                      <motion.button
                        onClick={() => setShowGrid(!showGrid)}
                        className={`w-12 h-6 rounded-full transition-colors ${showGrid ? 'bg-cyan-500' : 'bg-white/20'}`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow"
                          animate={{ x: showGrid ? 28 : 2, y: 2 }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="sticky top-8 space-y-6">
              {/* Live Preview */}
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
                      <h4 className="text-lg font-bold text-white mb-1">{selectedItem}</h4>
                      <p className="text-white/70 text-sm">{languages[selectedLanguage].greeting}</p>
                    </motion.div>

                    {/* Animated QR Code */}
                    <motion.div
                      className="bg-white rounded-xl p-3 mb-4 mx-auto"
                      style={{ width: qrSize * 0.6, height: qrSize * 0.6 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-full h-full bg-black rounded grid grid-cols-8 gap-px p-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'} rounded-sm`}
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, delay: i * 0.02, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <div className="text-white/80 text-xs">
                      <div className="font-mono">#{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Printer className="h-5 w-5" />
                  <span>Print Premium</span>
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 border border-white/20"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 border border-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>
              {/* Tips */}
              <div 
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
            >
              <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Pro Tips
              </h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Use high-quality paper for better durability</li>
                <li>• Test scan before mass printing</li>
                <li>• Keep QR codes clean and unobstructed</li>
                <li>• Consider laminating for outdoor use</li>
              </ul>
            </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrintPageComponent;