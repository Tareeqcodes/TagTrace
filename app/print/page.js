'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette,
  Grid3X3,
  Type,
  Download
} from 'lucide-react';
import { databases, Query } from '@/config/appwrite'
import { useAuth } from '@/context/Authcontext';
// import Header from '@/components/PrintComponent/Header';
import Sidebar from '@/components/PrintComponent/Sidebar';
import ItemSelection from '@/components/PrintComponent/ItemSelection';
import LayoutTab from '@/components/PrintComponent/LayoutTab';
import StyleSelection from '@/components/PrintComponent/StyleSelection';
import QRPreview from '@/components/PrintComponent/QrPreview';
import ProTips from '@/components/PrintComponent/ProTips';
import ActionButtons from '@/components/PrintComponent/ActionButtons';


export default function page() {
    const [selectedItem, setSelectedItem] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(''); 
  const [qrValue, setQrValue] = useState(''); 
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('design');
  const [qrSize, setQrSize] = useState(150);
  const [userDoc, setUserDoc] = useState([])
  const [loading, setLoading] = useState(true)

    const printRef = useRef(null);
  const { user } = useAuth()

  // const languages = {
  //   en: { name: 'English', flag: '🇺🇸', greeting: 'Scan If Found' },
  //   es: { name: 'Español', flag: '🇪🇸', greeting: 'Escanear Si Se Encuentra' },
  //   fr: { name: 'Français', flag: '🇫🇷', greeting: 'Scanner Si Trouvé' },
  //   ar: { name: 'العربية', flag: '🇸🇦', greeting: 'امسح إذا وُجد' }
  // };
  
  const styles = [
    { 
      id: 'cyberpunk', 
      name: '1', 
      bg: 'from-purple-900 via-blue-900 to-indigo-900',
      accent: 'from-cyan-400 to-purple-400',
      popular: true
    },
    { 
      id: 'forest', 
      name: '2', 
      bg: 'from-green-900 via-emerald-800 to-teal-900',
      accent: 'from-green-400 to-emerald-400'
    },
    { 
      id: 'sunset', 
      name: '3', 
      bg: 'from-orange-600 via-pink-600 to-purple-600',
      accent: 'from-yellow-300 to-orange-300'
    },
    { 
    id: 'coffee', 
    name: '4', 
    bg: 'from-amber-200 to-amber-300',
    accent: 'from-amber-950 to-amber-800'
    },
    { 
      id: 'arctic', 
      name: '5', 
      bg: 'from-blue-200 via-cyan-200 to-teal-200',
      accent: 'from-blue-700 to-cyan-700'
    },
    { 
      id: 'noir', 
      name: '6', 
      bg: 'from-gray-900 via-gray-800 to-black',
      accent: 'from-gray-300 to-white'
    }
  ];

  const tabs = [
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Grid3X3 },
    // { id: 'typography', label: 'Text', icon: Type },
    // { id: 'export', label: 'Export', icon: Download }
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
   const handleItemSelection = (item) => {
    setSelectedItem(item.name);
    setSelectedItemId(item.$id);
    const itemUrl = `${window.location.origin}/items/${item.$id}`;
    setQrValue(itemUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.$id) {
        return ('User not authenticated');
      }
      try {
        const response = databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
          [Query.equal('userId', user.$id)]
        )
        const documents = (await response).documents;
        setUserDoc(documents);
        if (documents.length > 0) {
          handleItemSelection(documents[0]);
        }
        setLoading(false);
      } catch (error) {
        console.log('error while fetching', error)
        setLoading(false);
      }
    }
    fetchData();
  }, [user])
  
  return (
     <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      {/* <Header 
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        languages={languages}
      /> */}

      <div className="relative z-10 max-w-7xl mx-auto p-3 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-8"
        >
          <Sidebar 
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

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
                  <ItemSelection 
                    userDoc={userDoc}
                    loading={loading}
                    selectedItemId={selectedItemId}
                    handleItemSelection={handleItemSelection}
                  />

                  <StyleSelection 
                    styles={styles}
                    selectedStyle={selectedStyle}
                    setSelectedStyle={setSelectedStyle}
                  />
                </motion.div>
              )}

              {activeTab === 'layout' && (
                <LayoutTab 
                  qrSize={qrSize}
                  setQrSize={setQrSize}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="sticky top-8 mb-6 md:mb-0 space-y-6">
              <QRPreview 
                printRef={printRef}
                styles={styles}
                selectedStyle={selectedStyle}
                selectedItem={selectedItem}
                languages={languages}
                selectedLanguage={selectedLanguage}
                qrSize={qrSize}
                qrValue={qrValue}
              />
              <ActionButtons qrValue={qrValue} printRef={printRef} />
                <ProTips />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
