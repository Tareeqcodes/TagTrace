'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { databases } from '@/config/appwrite';
import Contact from '@/components/FoundItem/Contact';

export default function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
          id
        );
        setItem(response);
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Item not found or has been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500 text-white';
      case 'lost': return 'bg-red-500 text-white';
      case 'returned': return 'bg-blue-500 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 text-red-500 max-w-md text-center">{error}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No item found with this ID</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Found Item
            </h1>
            <p className="text-xs text-gray-500">TagTrace Secure</p>
          </div>
        </div>
      </header>
        
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
            {item.image && (
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-md text-xs font-semibold shadow-lg ${getStatusColor(item.status)}`}>
                {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-xs font-medium">{item.tagId || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Item details */}
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name || 'Untitled Item'}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description || 'No description provided.'}
              </p>
            </div>

            {/* Reward section */}
            {item.reward ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Reward Offered</p>
                    <p className="text-amber-800 text-sm">{item.reward}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-2">Owner's Message</h3>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    {item.message || `This ${item.name || 'item'} contains important documents. Please contact me to return it safely.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Contact userId={id} />
      </main>
    </section>
  );
}