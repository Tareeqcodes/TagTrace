'use client';
import { useEffect, useState } from 'react';
import { 
  Phone, 
  Mail, 
  ChevronRight,
  Copy
} from 'lucide-react';
import { databases, Query } from '@/config/appwrite';

export default function Contact({ Id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!Id) {
          setError('No user ID provided');
          return; 
        }
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
          [Query.equal('userId', Id)]
        );

        if (response.documents.length > 0) {
          setUser(response.documents[0]);
        } else {
          setError('No user found with this ID');
          console.log('Full response:', response); 
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [Id]);

  if (loading) return <div>Loading contact info...</div>;

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 px-2">Return Options</h3>
      <div className="space-y-3">
         {user?.phone && (
          <div className="bg-white/70 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg overflow-hidden">
           <a
            href={`tel:${user.phone}`}
            className="flex items-center p-4 hover:bg-blue-50/50 transition-colors duration-200"
           >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
           <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
                    <p className="font-semibold text-gray-900">Call Owner</p>
                    <p className="text-gray-600 text-sm">{user.phone}</p>
                  </div>
             <div className="flex items-center space-x-2">
               <button
                 onClick={(e) => {
                  e.preventDefault();
                 copyToClipboard(user.phone);
                   }}
                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                    <Copy className="w-4 h-4 text-gray-400" />
                     </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
             </div>
           </a>
          </div>
         )}
         {user.email && (
          <div className="bg-white/70 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg overflow-hidden">
           <a
            href={`mailto:${user.email}?subject=Found your Lost item &body=Hi, I found your item. Let me know how we can arrange the return.`}
            className="flex items-center p-4 hover:bg-green-50/50 transition-colors duration-200"
           >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Email Owner</p>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
           </a>
          </div>
         )}

      </div>
      
    </section>
  );
}