'use client';
import { useEffect, useState } from 'react';
import { databases } from '@/config/appwrite';

export default function Contact({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!userId) {
          setError('No user ID provided');
          return;
        }

        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_ID, // Make sure this is correct
          userId
        );
        setUser(response);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError('Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (loading) return (
    <div className="bg-white rounded-lg p-4 text-center">
      <p>Loading contact options...</p>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-lg p-4 text-red-500">
      {error}
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Return Options</h3>
      
      {/* Phone Option */}
      <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Call Owner</p>
          {user?.phone ? (
            <a href={`tel:${user.phone}`} className="text-blue-600 hover:underline">
              {user.phone}
            </a>
          ) : (
            <p className="text-gray-500">Phone not provided</p>
          )}
        </div>
      </div>

      {/* Email Option */}
      <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Email Owner</p>
          {user?.email ? (
            <a href={`mailto:${user.email}`} className="text-green-600 hover:underline">
              {user.email}
            </a>
          ) : (
            <p className="text-gray-500">Email not provided</p>
          )}
        </div>
      </div>

      {/* Anonymous Message Option */}
      <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Message Anonymously</p>
          <p className="text-gray-600">Keep your identity private</p>
        </div>
      </div>
    </div>
  );
}