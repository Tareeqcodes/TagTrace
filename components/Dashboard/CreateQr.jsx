'use client'
import { useState } from "react";
import { QrCode, CheckCircle, RotateCw } from "lucide-react";
import { databases, ID } from "@/config/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/Authcontext";
import Link from "next/link";

export default function CreateQr() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [contactInstructions, setContactInstructions] = useState("");
  const [reward, setReward] = useState("");
  const [status, setStatus] = useState("active");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();

  const saveItem = async () => {
    if (!itemName || !contactInstructions) {
      setError("Please fill all required fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const userId = user.$id;
      const newItemId = ID.unique();
      const tagId = `${itemName.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
        newItemId,
        {
          name: itemName,
          category,
          description,
          contactInstructions,
          createdAt: new Date().toISOString(),
          status,
          reward,
          tagId,
          userId,
        }
      );

      setSuccess("Item created successfully!");
      handleReset();
    } catch (error) {
      console.error("Error saving item:", error);
      setError("Failed to save item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem();
  };

  const handleReset = () => {
    setItemName("");
    setCategory("Electronics");
    setDescription("");
    setContactInstructions("");
    setReward("");
    setStatus("active");
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <QrCode className="mr-3 text-blue-600" size={24} />
            Create New Trace
          </h1>
        </div>

        <div className="p-2 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. MacBook Pro"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Electronics</option>
                  <option>Bags & Luggage</option>
                  <option>Keys & Access</option>
                  <option>Wallet & Documents</option>
                  <option>Everything else</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Add details about your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {['active', 'lost', 'returned'].map((stat) => (
                  <motion.button
                    key={stat}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-2 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                      status === stat
                        ? stat === 'active'
                          ? 'bg-green-100 text-green-800 border border-green-300 shadow-inner'
                          : stat === 'lost'
                            ? 'bg-red-100 text-red-800 border border-red-300 shadow-inner'
                            : 'bg-blue-100 text-blue-800 border border-blue-300 shadow-inner'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setStatus(stat)}
                  >
                    <motion.span
                      animate={{ scale: status === stat ? 1 : 0 }}
                      className={`w-2 h-2 rounded-full mr-2 ${
                        stat === 'active' ? 'bg-green-500' :
                        stat === 'lost' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                    />
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Reward */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reward if Found <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. $20 or 'A token of appreciation'"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional reward information visible to finders.
              </p>
            </div>

            {/* Contact Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Instructions for finder if item is lost..."
                value={contactInstructions}
                onChange={(e) => setContactInstructions(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be visible when someone scans your item's QR code.
              </p>
            </div>

            {/* Error/Success Messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-green-50 text-green-600 rounded-lg text-sm"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 justify-between">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isLoading}
                className={`px-2 py-3 rounded-xl font-medium flex items-center ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white shadow-md`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2" size={18} />
                    Save Item
                  </>
                )}
              </motion.button>

              <Link href="/print" className="ml-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-2 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium text-sm flex items-center shadow-md"
                >
                  View My Items
                </motion.div>
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}