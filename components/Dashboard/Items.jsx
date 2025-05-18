'use client'
import { useEffect, useState } from 'react';
import { X, Edit, Eye, Package, Plus } from 'lucide-react';
import { databases, Query } from '@/config/appwrite';
import { useAuth } from '@/context/Authcontext';
import { motion } from 'framer-motion';

export default function Items() {
  const { user } =useAuth()
  const [ userData, setUserData ] =useState([]);
  const [ loading, setLoading ] =useState(true);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'lost': return 'bg-red-100 text-red-600';
      case 'returned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
          [Query.equal('userId', user.$id)] 
        )
        setUserData(response.documents)
        setLoading(false)
      } catch (error) {
      }
    }
    fetchData();
  }, [user])
  
   return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">My Items</h1>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                <Plus size={18} className="mr-2" />
                Add New Item
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">

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
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.slice(0, 10).map((item, idx) => (
                    <motion.tr 
                      key={idx} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4 text-gray-500 text-sm">{item.tagId}</td>
                      <td className="py-4 text-gray-500 text-sm">2 days ago</td>
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
                          <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                              <X size={16} />
                            </button>
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
            </div>
          </div>
        );
}
