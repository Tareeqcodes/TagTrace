'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Package, QrCode, Clock, BadgeCheck, MessageCircle, Settings, LogOut, HelpCircle, Menu, X, ChevronRight, User, Bell
} from 'lucide-react';
import Main from '@/components/Dashboard/Main';
import Items from '@/components/Dashboard/Items';
import CreateQr from '@/components/Dashboard/CreateQr';
import Scan from '@/components/Dashboard/Scan';
import Message from '@/components/Dashboard/Message';
import Setting from '@/components/Dashboard/Setting';
import Subscription from '@/components/Dashboard/Subscription';
import Desktop from '@/components/Dashboard/notification/Desktop';
import Mobile from '@/components/Dashboard/notification/Mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/Authcontext';
import { NotificationHooks } from '@/components/Dashboard/notification/NotificationHooks';

const tabs = [
  { label: 'Dashboard', value: 'main', icon: Home, color: 'bg-blue-100 text-blue-600' },
  { label: 'My Items', value: 'items', icon: Package, color: 'bg-purple-100 text-purple-600' },
  { label: 'Create Trace', value: 'create', icon: QrCode, color: 'bg-green-100 text-green-600' },
  { label: 'Scan Logs', value: 'logs', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  { label: 'Messages', value: 'messages', icon: MessageCircle, color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Subscription', value: 'subsription', icon: BadgeCheck, color: 'bg-indigo-100 text-indigo-600' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('main');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNotificationsOpen, setIsMobileNotificationsOpen] = useState(false);
  const { logout, user, loading } = useAuth();
  const { unreadCount } = NotificationHooks();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const SlideDrawer = () => (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl md:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="text-gray-500" size={24} />
                </button>
              </div>
              
              <nav className="space-y-2">
                {tabs.map(({ label, value, icon: Icon }) => (
                  <motion.button
                    key={value}
                    onClick={() => {
                      setActiveTab(value);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                      activeTab === value 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                  </motion.button>
                ))}
              </nav>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button 
                  onClick={() => {
                    setActiveTab('settings');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  <Settings size={20} />
                  <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl">
                  <HelpCircle size={20} />
                  <span className="font-medium">Help & Support</span>
                </button>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Mobile Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileNotificationsOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <motion.nav 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-64 bg-white border-r border-gray-200 p-4 md:p-6 md:min-h-screen"
        >
          <div className="flex items-center justify-between mb-8">
            <Desktop />
          </div>

          <div className="space-y-1">
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
                <Icon size={20} className="shrink-0" />
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
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">
                  {user?.name || 'User'}
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
                    <p className="text-sm text-gray-600 truncate">{user?.email}</p>
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

        {/* Main Content */}
        <div className="flex-1 p-1 md:p-3 lg:p-8">
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
              {activeTab === 'main' && <Main setActiveTab={setActiveTab} />}
              {activeTab === 'items' && <Items />}
              {activeTab === 'create' && <CreateQr />}
              {activeTab === 'logs' && <Scan />}
              {activeTab === 'messages' && <Message />}
              {activeTab === 'settings' && <Setting />}
              {activeTab === 'subsription' && <Subscription />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <SlideDrawer />
      <Mobile 
        isOpen={isMobileNotificationsOpen} 
        onClose={() => setIsMobileNotificationsOpen(false)} 
      />
    </section>
  );
}