'use client'
import { useState } from "react";
import { QrCode, CheckCircle, Download, RotateCw } from "lucide-react";
import { databases, ID } from "@/config/appwrite";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/Authcontext";

export default function CreateQr() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [contactInstructions, setContactInstructions] = useState("");
  const [reward, setReward] = useState("");
  const [status, setStatus] = useState("active");
  const [qrValue, setQrValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const saveItem = async () => {
    if (!itemName || !contactInstructions) {
      setError("Please fill all required fields.");
      return;
    }
    setIsLoading(true);
    setError("");
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

      const itemUrl = `${window.location.origin}/items/${newItemId}`;
      setQrValue(itemUrl);
    } catch (error) {
      console.error("Error saving item:", error);
      setError("Failed to save item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQR = (e) => {
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
    setQrValue("");
    setError("");
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${itemName}-QRCode.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
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
            Create New QR Tag
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-5">
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. MacBook Pro"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  disabled={!!qrValue}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!!qrValue}
                >
                  <option>Electronics</option>
                  <option>Bags & Luggage</option>
                  <option>Keys & Access</option>
                  <option>Wallet & Documents</option>
                  <option>Other</option>
                </select>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Add details about your item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!!qrValue}
                />
              </motion.div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['active', 'lost', 'returned'].map((stat) => (
                    <motion.button
                      key={stat}
                      whileHover={{ scale: qrValue ? 1 : 1.05 }}
                      whileTap={{ scale: qrValue ? 1 : 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                        status === stat
                          ? stat === 'active'
                            ? 'bg-green-100 text-green-800 border border-green-300 shadow-inner'
                            : stat === 'lost'
                              ? 'bg-red-100 text-red-800 border border-red-300 shadow-inner'
                              : 'bg-blue-100 text-blue-800 border border-blue-300 shadow-inner'
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      } ${qrValue ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={() => !qrValue && setStatus(stat)}
                      disabled={!!qrValue}
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

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reward if Found <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. $20 or 'A token of appreciation'"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  disabled={!!qrValue}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional reward information visible to finders.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Instructions <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Instructions for finder if item is lost..."
                  value={contactInstructions}
                  onChange={(e) => setContactInstructions(e.target.value)}
                  disabled={!!qrValue}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be visible when someone scans your item's QR code.
                </p>
              </motion.div>

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
              </AnimatePresence>
            </div>
          </motion.div>

          {/* QR Code Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-xs bg-white rounded-xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify- cursor-pointer mb-6"
            >
              {qrValue ? (
                <>
                  <QRCode
                    id="qr-code"
                    value={qrValue}
                    size={200}
                    level="H"
                    className="p-2"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-sm text-gray-600 text-center"
                  >
                    Scan this code to view item details
                  </motion.p>
                </>
              ) : (
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <QrCode size={80} className="text-gray-300 mb-4" />
                  <p className="text-sm text-gray-500 text-center">
                    QR code will appear here after creation
                  </p>
                </motion.div>
              )}
            </motion.div>

            <div className="w-full max-w-xs space-y-3">
              <AnimatePresence mode="wait">
                {!qrValue ? (
                  <motion.button
                    key="generate"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-xl font-medium flex items-center justify-center cursor-pointer ${
                      isLoading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                    } text-white transition-all`}
                    onClick={handleGenerateQR}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode size={18} className="mr-2" />
                        Generate QR Tag
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="space-y-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadQR}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium flex items-center cursor-pointer justify-center shadow-md"
                    >
                      <Download size={18} className="mr-2" />
                      Download QR Code
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => window.print()}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium flex items-center cursor-pointer justify-center shadow-md"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Print QR Code
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium flex items-center justify-center border border-gray-200 cursor-pointer"
                    >
                      <RotateCw size={18} className="mr-2" />
                      Create New QR Tag
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}