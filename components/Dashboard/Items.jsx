'use client'
import { useEffect, useState } from 'react';
import { X, Edit, Package, Plus, Save } from 'lucide-react';
import { databases, Query, ID } from '@/config/appwrite';
import { useAuth } from '@/context/Authcontext';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export default function Items() {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    status: 'active',
    reward: ''
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'lost': return 'bg-red-100 text-red-600';
      case 'returned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  useEffect(() => {
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
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const openEditModal = (item) => {
    setCurrentItem(item);
    setEditFormData({
      name: item.name,
      reward: item.reward,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status) => {
    setEditFormData(prev => ({ ...prev, status }));
  };

  const handleSaveChanges = async () => {
    if (!currentItem) return;
    
    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
        currentItem.$id,
        editFormData
      );
      
      setUserData(prev => prev.map(item => 
        item.$id === currentItem.$id ? { ...item, ...editFormData } : item
      ));
      
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
        itemId
      );
      
      setUserData(prev => prev.filter(item => item.$id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <div>
        <h1 className="text-2xl ml-5 mb-6 font-bold">My Items</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p>Loading items...</p>
          </div>
        ) : userData && userData.length > 0 ? (
          <>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3 font-medium">Item Name</th>
                    <th className="pb-3 font-medium">Tag ID</th>
                    <th className="pb-3 font-medium">Last Scan</th>
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
                      <td className="py-4 text-gray-500 text-sm">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</td>
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
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
                            onClick={() => openEditModal(item)}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            onClick={() => handleDeleteItem(item.$id)}
                          >
                            <X size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (hidden on desktop) */}
            <div className="md:hidden space-y-3">
              {userData.slice(0, 10).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">ID: {item.tagId}</p>
                      <p className="text-sm text-gray-500">Last scan: {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
                        onClick={() => openEditModal(item)}
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        onClick={() => handleDeleteItem(item.$id)}
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
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
      </div>

      {/* Edit Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Item</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reward</label>
                  <input
                    type="text"
                    name="reward"
                    value={editFormData.reward}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStatusChange('active')}
                      className={`flex items-center px-4 py-2 rounded-lg border ${
                        editFormData.status === 'active' 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        editFormData.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></span>
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusChange('lost')}
                      className={`flex items-center px-4 py-2 rounded-lg border ${
                        editFormData.status === 'lost' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        editFormData.status === 'lost' ? 'bg-red-500' : 'bg-gray-300'
                      }`}></span>
                      Lost
                    </button>
                    <button
                      onClick={() => handleStatusChange('returned')}
                      className={`flex items-center px-4 py-2 rounded-lg border ${
                        editFormData.status === 'returned' 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        editFormData.status === 'returned' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></span>
                      Returned
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}