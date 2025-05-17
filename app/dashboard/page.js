'use client';

import { useState } from 'react';
import { Home, Package, QrCode, Clock, MessageCircle, Settings } from 'lucide-react';
import Main from '@/components/Dashboard/Main';
import Items from '@/components/Dashboard/Items';
import CreateQr from '@/components/Dashboard/CreateQr';
import Scan from '@/components/Dashboard/Scan';
import Message from '@/components/Dashboard/Message';
import Setting from '@/components/Dashboard/Setting';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const tabs = [
  { label: 'Dashboard', value: 'main', icon: Home, color: 'bg-blue-100 text-blue-600' },
  { label: 'My Items', value: 'items', icon: Package, color: 'bg-purple-100 text-purple-600' },
  { label: 'Create Tag', value: 'create', icon: QrCode, color: 'bg-green-100 text-green-600' },
  { label: 'Scan Logs', value: 'logs', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  { label: 'Messages', value: 'messages', icon: MessageCircle, color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Settings', value: 'settings', icon: Settings, color: 'bg-gray-100 text-gray-600' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('main');
  const [hoveredTab, setHoveredTab] = useState(null);
  const router = useRouter();

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <motion.nav 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-64 bg-white border-r border-gray-200 p-4 md:p-6 md:min-h-screen"
        >
          <div className="space-y-1 mt-9">
            {tabs.map(({ label, value, icon: Icon, color }) => (
              <motion.div
                key={value}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredTab(value)}
                onHoverEnd={() => setHoveredTab(null)}
                onClick={() => setActiveTab(value)}
                className={`relative flex items-center py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 mb-1 ${
                  activeTab === value ? color : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="ml-3 font-medium">{label}</span>
                
                {hoveredTab === value && activeTab !== value && (
                  <motion.div 
                    layoutId="tabHover"
                    className="absolute inset-0 bg-gray-100 rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
                
                {activeTab === value && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* User Profile Section */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="mt-8 p-3 rounded-lg bg-gray-50 flex items-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {typeof window !== 'undefined' && localStorage.getItem('user')?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">
                {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))?.name || 'Tareeq'}
              </p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </motion.div>
        </motion.nav>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'main' && <Main />}
              {activeTab === 'items' && <Items />}
              {activeTab === 'create' && <CreateQr />}
              {activeTab === 'logs' && <Scan />}
              {activeTab === 'messages' && <Message />}
              {activeTab === 'settings' && <Setting />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}