'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, QrCode, Check, AlertCircle } from 'lucide-react';
import { databases, Query } from '@/config/appwrite';
import { useAuth } from '@/context/Authcontext';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, slideIn } from '@/utils/motion';
import { formatDistanceToNow } from 'date-fns';

export default function Main({ setActiveTab }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.$id) {
        setLoading(false);
        return;
      }
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
          [Query.equal('userId', user.$id)]
        );
        setUserData(response.documents);
        setLoading(false);
        
      } catch (error) {
        console.log('error occur while fetching', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
  
  // Calculate stats based on actual data
  const stats = [
    { 
      label: "Total Items Tagged", 
      value: userData ? userData.length : 0, 
      icon: <Package size={20} />,
      color: "bg-indigo-100 text-indigo-600"
    },
    { 
      label: "Items Marked as Lost", 
      value: userData ? userData.filter(item => item.status === 'lost').length : 0, 
      icon: <AlertCircle size={20} />,
      color: "bg-red-100 text-red-600"
    },
    { 
      label: "Successfully Returned", 
      value: userData ? userData.filter(item => item.status === 'returned').length : 0, 
      icon: <Check size={20} />,
      color: "bg-green-100 text-green-600"
    }
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'lost': return 'bg-red-100 text-red-600';
      case 'returned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="p-0 md:p-6"
    >
      <div className="flex flex-col space-y-4 md:flex-row items-center justify-between text-justify mt-8 md:mt-4 mb-8">
        <motion.h1 variants={textVariant(0.1)} className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {user?.name || 'User'}!
        </motion.h1>
        <div className="flex space-x-3">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <QrCode size={18} className="mr-2 text-" />
            Create Trace
          </motion.button>
          <Link href="/print">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 cursor-pointer hover:bg-gray-50"
          >
            <Package size={18} className="mr-2" />
            Trace Studio
          </motion.button>
          </Link>
        </div>
      </div>
      
      <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            onHoverStart={() => setHoveredStat(index)}
            onHoverEnd={() => setHoveredStat(null)}
            className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all duration-300 ${hoveredStat === index ? 'shadow-lg' : ''}`}
          >
            {hoveredStat === index && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute inset-0 -z-10 ${stat.color.replace('bg-', 'bg-opacity-20 bg-')} blur-lg`}
              />
            )}
            <div className="flex items-center text-gray-500 mb-3">
              <div className={`p-2 rounded-lg ${stat.color.replace('text-', '')}`}>
                {stat.icon}
              </div>
              <span className="ml-3 text-sm font-medium">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <motion.div 
              animate={{ width: hoveredStat === index ? '100%' : '0%' }}
              className={`h-1 mt-2 ${stat.color.replace('bg-', 'bg-')} rounded-full`}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1">
        <motion.div 
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Tagged Items</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <p>Loading...</p>
            </div>
          ) : userData && userData.length > 0 ? (
            <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Tag ID</th>
                    <th className="pb-3 font-medium">Created</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.slice(0, 4).map((item, idx) => (
                    <motion.tr 
                      key={idx} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4 text-gray-500 text-sm">{item.tagId}</td>
                      <td className="py-4 text-gray-500 text-sm">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</td>
                      <td className="py-4">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
              <div className='md:hidden space-y-4'>
                {userData.slice(0, 4).map( (item, idx) => (
                  <motion.div
                   key={idx} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                     <div className='flex flex-col space-y-3 items-start'>
                      <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">ID: {item.tagId}</p>
                      <p className="text-sm text-gray-500">Last scan: {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                        </div>
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </motion.span>
                     </div>
                  </motion.div>
                ))
                }
              </div>
            </>
            
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Package size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500">No items found.</p>
              <p className="text-sm text-gray-400">Create a QR tag to get started</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}