'use client';
import { useEffect, useState } from 'react';
import { databases, Query } from '@/config/appwrite';

export default function Contact({ Id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
          [Query.equal('userId', Id)]
        );
        setUser(response);
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    if (Id) {
      fetchUserInfo();
    }
  }, [Id]);

  if (loading) return <div>Loading contact info...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Return Options</h3>
      
      <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white">📞</span>
        </div>
        <div>
          <p className="font-medium">Call Owner</p>
          <p className="text-gray-600">{user?.phone || 'Phone not available'}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white">✉️</span>
        </div>
        <div>
          <p className="font-medium">Email Owner</p>
          <p className="text-gray-600">{user?.email || 'Email not available'}</p>
        </div>
      </div>
    </div>
  );
}