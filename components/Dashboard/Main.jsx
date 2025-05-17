'use client'
import { useState, useEffect } from 'react';
import { Package, QrCode, Check, AlertCircle, RefreshCw, Edit, Eye, Plus } from 'lucide-react';
import { databases, Query } from '@/config/appwrite';
import { useAuth } from '@/context/Authcontext';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, slideIn } from '@/utils/motion';

export default function Main() {
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
      label: "Recently Scanned", 
      value: 3, // Hardcoded as requested
      icon: <QrCode size={20} />,
      color: "bg-purple-100 text-purple-600"
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

  const activityFeed = [
    { item: "MacBook Pro", action: "was scanned", location: "Lagos, Nigeria", time: "2 hours ago", icon: <QrCode size={16} /> },
    { item: "Backpack", action: "returned by", who: "anonymous finder", time: "Yesterday", icon: <RefreshCw size={16} /> },
    { item: "Wallet", action: "marked as", status: "lost", time: "3 days ago", icon: <AlertCircle size={16} /> },
    { item: "Keys", action: "new tag created", time: "1 week ago", icon: <Plus size={16} /> }
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
      className="p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h1 variants={textVariant(0.1)} className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {user?.name || 'Tareeq'}!
        </motion.h1>
        <div className="flex space-x-3">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <QrCode size={18} className="mr-2" />
            Create New QR Tag
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300"
          >
            <Package size={18} className="mr-2" />
            Add New Item
          </motion.button>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Tagged Items</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <p>Loading items...</p>
            </div>
          ) : userData && userData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3 font-medium">Item Name</th>
                    <th className="pb-3 font-medium">Tag ID</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
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
                      <td className="py-4">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </motion.span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <motion.button 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                          >
                            <Eye size={16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
                          >
                            <Edit size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
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
        
        <motion.div 
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activityFeed.map((activity, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex pb-4 border-b border-gray-50 last:border-0 group"
              >
                <div className="mt-1 mr-3 p-2 bg-gray-50 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  {activity.icon}
                </div>
                <div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{activity.item}</span> {activity.action} {activity.who || activity.location || activity.status}
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full py-2 text-sm text-center text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
          >
            Show More Activity
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}