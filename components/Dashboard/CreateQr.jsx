'use client'
import { useState } from "react";
import { QrCode, CheckCircle } from "lucide-react";
import { databases, ID } from "@/config/appwrite";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";


export default function CreateQr() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [contactInstructions, setContactInstructions] = useState("");
  const [reward, setReward] = useState("");
  const [status, setStatus] = useState("active");
  const [qrValue, setQrValue] = useState("");
  const [itemId, setItemId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const saveItem = async () => {
    if (!itemName || !contactInstructions) {
      setError("Please fill all required fields.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const newItemId = ID.unique();
      setItemId(newItemId);
      const tagId = `${itemName.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const response = await databases.createDocument(
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
        }
      );

      // Create a URL that points to your item view page
      const itemUrl = `http://localhost:3000/items/${newItemId}`;
      setQrValue(itemUrl);

      console.log("Item saved successfully:", response);
    } catch (error) {
      console.error("Error saving item:", error);
      setError("Failed to save item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle QR code generation
  const handleGenerateQR = (e) => {
    e.preventDefault();
    saveItem();
  };

  // Function to reset the form and QR code
  const handleReset = () => {
    setItemName("");
    setCategory("Electronics");
    setDescription("");
    setContactInstructions("");
    setReward("");
    setStatus("active");
    setQrValue("");
    setItemId("");
    setError("");
  };

  return (
    <>
      {/* <h1 className="text-2xl font-bold mb-6">Create New Tag</h1> */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-5">
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Item Name*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g. MacBook Pro"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                disabled={qrValue !== ""}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={qrValue !== ""}
              >
                <option>Electronics</option>
                <option>Bags & Luggage</option>
                <option>Keys & Access</option>
                <option>Wallet & Documents</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-1">
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Description (Optional)
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg h-24"
                placeholder="Add details about your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={qrValue !== ""}
              />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: qrValue ? 1 : 1.03 }}
                    whileTap={{ scale: qrValue ? 1 : 0.97 }}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center justify-center ${status === 'active' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 border border-gray-200'} ${qrValue ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={() => !qrValue && setStatus('active')}
                    type="button"
                    disabled={qrValue !== ""}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: status === 'active' ? 1 : 0 }}
                      className="w-2 h-2 rounded-full bg-green-500 mr-1.5"
                    />
                    Active
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: qrValue ? 1 : 1.03 }}
                    whileTap={{ scale: qrValue ? 1 : 0.97 }}
                    className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center ${status === 'lost' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-100 text-gray-700 border border-gray-200'} ${qrValue ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={() => !qrValue && setStatus('lost')}
                    type="button"
                    disabled={qrValue !== ""}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: status === 'lost' ? 1 : 0 }}
                      className="w-2 h-2 rounded-full bg-red-500 mr-1.5"
                    />
                    Lost
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: qrValue ? 1 : 1.03 }}
                    whileTap={{ scale: qrValue ? 1 : 0.97 }}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center justify-center ${status === 'returned' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200'} ${qrValue ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={() => !qrValue && setStatus('returned')}
                    type="button"
                    disabled={qrValue !== ""}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: status === 'returned' ? 1 : 0 }}
                      className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"
                    />
                    Returned
                  </motion.button>
                </div>
              </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-1">
                    Reward if Found (Optional)
                     </label>
              <input
                   type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                     placeholder="e.g. $20 or 'A token of appreciation'"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    disabled={qrValue !== ""}
                      />
                    <p className="text-xs text-gray-500 mt-1">
               Optional reward information visible to finders.
                   </p>
               </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Contact Instructions
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg h-16"
                placeholder="Instructions for finder if item is lost..."
                value={contactInstructions}
                onChange={(e) => setContactInstructions(e.target.value)}
                disabled={qrValue !== ""}
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be visible when someone scans your item's QR code.
              </p>
            </div>
            {error && (
              <div className="mt-2 text-red-500 text-sm">{error}</div>
            )}
          </motion.div>
          <motion.div
           initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
           className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
            <motion.div
             whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
             className="mb-4 w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col cursor-pointer items-center justify-center">
              {qrValue ? (
                <QRCode
                  value={qrValue}
                  size={180}
                  level="H"
                />
              ) : (
                <>
                <motion.div
                   animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                >
                  <QrCode size={80} className="text-gray-300 mb-2" />
                </motion.div>
                  <div className="text-xs text-gray-500 text-center">
                    QR code will appear here after creation
                  </div>
                </>
              )}
            </motion.div>
             
            {/* Only show the Generate button if QR code hasn't been generated yet */}
            <AnimatePresence>
              {!qrValue && (
                <motion.button
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg mb-2 w-full cursor-pointer"
                  onClick={handleGenerateQR}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : null}
                  {isLoading ? "Generating..." : "Generate QR Tag"}
                </motion.button>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {qrValue && (
                <>
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg mb-2 w-full flex items-center justify-center cursor-pointer"
                  >
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.3 }}
                      className="mr-2"
                    >
                      <CheckCircle size={16} />
                    </motion.span>
                    Print QR Code
                  </motion.button>
                  
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg mb-2 w-full flex items-center justify-center cursor-pointer"
                  >
                    Create New QR Tag
                  </motion.button>
                </>
              )}
            </AnimatePresence>
            
            <p className="text-xs text-gray-500 text-center">
              {qrValue ? "Print or save your QR code" : "You can print or save the QR code after generation"}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}