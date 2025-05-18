// app/items/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

  if (loading) return <div className="p-6">Loading item details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
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
