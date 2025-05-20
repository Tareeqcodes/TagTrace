'use client';

import { useState, useRef, useEffect } from 'react';
import { Home, Package, QrCode, Clock, MessageCircle, Settings, LogOut, HelpCircle } from 'lucide-react';
import Main from '@/components/Dashboard/Main';
import Items from '@/components/Dashboard/Items';
import CreateQr from '@/components/Dashboard/CreateQr';
import Scan from '@/components/Dashboard/Scan';
import Message from '@/components/Dashboard/Message';
import Setting from '@/components/Dashboard/Setting';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/Authcontext';

const tabs = [
  { label: 'Dashboard', value: 'main', icon: Home, color: 'bg-blue-100 text-blue-600' },
  { label: 'My Items', value: 'items', icon: Package, color: 'bg-purple-100 text-purple-600' },
  { label: 'Create Trace', value: 'create', icon: QrCode, color: 'bg-green-100 text-green-600' },
  { label: 'Scan Logs', value: 'logs', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  { label: 'Messages', value: 'messages', icon: MessageCircle, color: 'bg-indigo-100 text-indigo-600' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('main');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
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

          <div className="relative mt-8" ref={dropdownRef}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-3 rounded-lg bg-gray-50 flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {typeof window !== 'undefined' && localStorage.getItem('user')?.charAt(0).toUpperCase() || 'T'}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">
                  Tareeq
                </p>
              </div>
            </motion.div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 md:right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <button 
                      onClick={() => {
                        setActiveTab('settings');
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings size={16} className="mr-3 text-gray-500" />
                      Settings
                    </button>
                    
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <HelpCircle size={16} className="mr-3 text-gray-500" />
                      Contact support
                    </button>
                  </div>
                  
                  <div className="py-1 border-t border-gray-100">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        <div className="flex-1 p-1 md:p-8">
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