"use client";
import { useState } from "react";
import {
  QrCode,
  CheckCircle,
  Upload,
  X,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  Tablet,
  Backpack,
  Monitor,
  BookOpen
} from "lucide-react";
import { tablesDB, ID, storage } from "@/config/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/Authcontext";
import Link from "next/link";

const GADGET_CATEGORIES = [
  { id: "laptop", name: "Laptop", icon: Laptop },
  { id: "smartphone", name: "Smartphone", icon: Smartphone },
  { id: "headphones", name: "Headphones", icon: Headphones },
  { id: "smartwatch", name: "Smartwatch", icon: Watch },
  { id: "camera", name: "Camera", icon: Camera },
  { id: "tablet", name: "Tablet", icon: Tablet },
  { id: "book", name: "My Book", icon: BookOpen },
  { id: "bag", name: "Bag", icon: Backpack },
];

export default function CreateQr() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [contactInstructions, setContactInstructions] = useState("");
  const [reward, setReward] = useState("");
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const uploadImage = async () => {
  if (!imageFile) return null;

  try {
    const response = await storage.createFile({
      bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
      fileId: ID.unique(),
      file: imageFile
    });
    return response.$id;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

  const saveItem = async () => {
    if (!itemName || !contactInstructions || !category) {
      setError("Please fill all required fields and select a category.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const userId = user.$id;
      const newItemId = ID.unique();
      const tagId = `${itemName.substring(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      let imageId = null;
      if (imageFile) {
        imageId = await uploadImage();
      }

      await tablesDB.createRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
        rowId: newItemId,
        data: {
          name: itemName,
          description,
          contactInstructions,
          status,
          reward,
          tagId,
          userId,
          category,
          imageId,
        },
      });

      setSuccess("Item created successfully!");
      handleReset();
    } catch (error) {
      console.error("Error saving item:", error);
      setError("Failed to save item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   saveItem();
  // };

  const handleReset = () => {
    setItemName("");
    setDescription("");
    setContactInstructions("");
    setReward("");
    setStatus("active");
    setCategory("");
    setImageFile(null);
    setImagePreview("");
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
        <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <QrCode className="mr-3 text-blue-600" size={24} />
            Create New Trace
          </h1>
        </div>

        <div className="p-2 md:p-6">
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gadget Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {GADGET_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        category === cat.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      onClick={() => setCategory(cat.id)}
                    >
                      <Icon
                        className={`mx-auto mb-2 ${category === cat.id ? "text-blue-600" : "text-gray-600"}`}
                        size={24}
                      />
                      <p
                        className={`text-xs font-medium ${category === cat.id ? "text-blue-700" : "text-gray-700"}`}
                      >
                        {cat.name}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Image <span className="text-gray-500">(Optional)</span>
              </label>

              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-300">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. MacBook Pro"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["active", "lost", "returned"].map((stat) => (
                    <motion.button
                      key={stat}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all ${
                        status === stat
                          ? stat === "active"
                            ? "bg-green-100 text-green-800 border border-green-300 shadow-inner"
                            : stat === "lost"
                              ? "bg-red-100 text-red-800 border border-red-300 shadow-inner"
                              : "bg-blue-100 text-blue-800 border border-blue-300 shadow-inner"
                          : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => setStatus(stat)}
                    >
                      <motion.span
                        animate={{ scale: status === stat ? 1 : 0 }}
                        className={`w-2 h-2 rounded-full mr-2 ${
                          stat === "active"
                            ? "bg-green-500"
                            : stat === "lost"
                              ? "bg-red-500"
                              : "bg-blue-500"
                        }`}
                      />
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}
                    </motion.button>
                  ))}
                </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reward if Found{" "}
                <span className="text-gray-500">(Optional)</span>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Instructions for finder if item is lost..."
                value={contactInstructions}
                onChange={(e) => setContactInstructions(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be visible when someone scans your item's QR code.
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-center"
                >
                  <CheckCircle className="mr-2" size={18} />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 pt-4 justify-between">
              <motion.button
                type="button"
                
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isLoading}
                onClick={saveItem}
                className={`px-6 py-3 rounded-xl font-medium flex items-center ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white shadow-md`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium text-sm flex items-center shadow-md"
                >
                  View Item
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
