'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { databases } from '@/config/appwrite';

export default function ItemDetailPage() {
  const { id } = useParams(); // get the item ID from the route
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
      case 'active': return 'bg-green-100 text-green-600';
      case 'lost': return 'bg-red-100 text-red-600';
      case 'returned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) return <div className="p-6">Loading item details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm">
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
           {/* image */}
           <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
           <Image 
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
           />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
             <div className="absolute top-4 right-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-xs font-medium">{item.tagId}</span>
              </div>
            </div>
           </div>

           
          </div>
      </main>
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      <div className="mb-2 text-gray-700">
        <strong>Category:</strong> {item.category}
      </div>
      {item.description && (
        <div className="mb-4 text-gray-600">
          <strong>Description:</strong> {item.description}
        </div>
      )}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="text-blue-800">
          <strong>Contact Instructions:</strong> {item.contactInstructions}
        </p>
      </div>
    </div>
  );
}
