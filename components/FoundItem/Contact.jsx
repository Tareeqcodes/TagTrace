'use client';
import { useEffect, useState } from 'react';
import { 
  Phone, 
  Mail, 
  ChevronRight,
  Copy,
  MessageCircle
} from 'lucide-react';
import { motion,AnimatePresence } from 'framer-motion';
import { databases, Query } from '@/config/appwrite';

export default function Contact({ Id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showAnonymousModal, setShowAnonymousModal] = useState(false);
    const [message, setMessage] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      console.log('Copy failed');
    }
  };

  const handleAnonymousMessage = async () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setContactEmail('');
      setShowAnonymousModal(false);
    }, 3000);
  };
  
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
          <motion.div 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
          className="bg-white/70 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg overflow-hidden">
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
          </motion.div>
         )}
         {user.email && (
          <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/70 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg overflow-hidden">
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
          </motion.div>
         )}
         <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/70 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg overflow-hidden">
           <button
                onClick={() => setShowAnonymousModal(true)}
                className="w-full flex items-center p-4 hover:bg-purple-50/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Message Anonymously</p>
                  <p className="text-gray-600 text-sm">Keep your identity private</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
         </motion.div>
      </div>
      <AnimatePresence>
        {copiedPhone && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Phone number copied!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
              {showAnonymousModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4"
                  onClick={() => setShowAnonymousModal(false)}
                >
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 500 }}
                    className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                      <h2 className="text-xl font-semibold text-gray-900">Anonymous Message</h2>
                      <button
                        onClick={() => setShowAnonymousModal(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
      
                    {/* Modal Content */}
                    <div className="p-6">
                      {!submitted ? (
                        <div className="space-y-4">
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-purple-800 flex items-center">
                              <Shield className="w-4 h-4 mr-2" />
                              Your identity will remain completely private
                            </p>
                          </div>
      
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Message to Owner *
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                              placeholder="Hi! I found your item. Let me know how we can arrange the return..."
                            />
                          </div>
      
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Your Contact Email (Optional)
                            </label>
                            <input
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="finder@example.com"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Optional: For direct communication
                            </p>
                          </div>
      
                          <button
                            onClick={handleAnonymousMessage}
                            disabled={isSubmitting || !message.trim()}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending...</span>
                              </div>
                            ) : (
                              'Send Anonymous Message'
                            )}
                          </button>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center py-8"
                        >
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
                          <p className="text-gray-600 text-sm">
                            The owner has been notified anonymously. They'll contact you if you provided your email.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
    </section>
  );
}