'use client'
import { useState } from "react";
import { QrCode } from "lucide-react";
import { databases, ID } from "@/config/appwrite";
import QRCode from "react-qr-code";




export default function CreateQr() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [contactInstructions, setContactInstructions] = useState("");
  const [reward, setReward] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [itemId, setItemId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to save item data to Appwrite
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

      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
        newItemId,
        {
          name: itemName,
          category,
          description,
          contactInstructions,
          reward,
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Tag</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g. MacBook Pro"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electronics</option>
                <option>Bags & Luggage</option>
                <option>Keys & Access</option>
                <option>Wallet & Documents</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg h-24"
                placeholder="Add details about your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward if Found (Optional)
                     </label>
              <input
                   type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
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
                Contact Instructions
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg h-16"
                placeholder="Instructions for finder if item is lost..."
                value={contactInstructions}
                onChange={(e) => setContactInstructions(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be visible when someone scans your item's QR code.
              </p>
            </div>

            {error && (
              <div className="mt-2 text-red-500 text-sm">{error}</div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
            <div className="mb-4 w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
              {qrValue ? (
                <QRCode
                  value={qrValue}
                  size={180}
                  level="H"
                />
              ) : (
                <>
                  <QrCode size={80} className="text-gray-300 mb-2" />
                  <div className="text-sm text-gray-500 text-center">
                    QR code will appear here after creation
                  </div>
                </>
              )}
            </div>

            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg mb-2 w-full"
              onClick={handleGenerateQR}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate QR Tag"}
            </button>
            
            {qrValue && (
              <button 
                className="px-6 py-2 bg-green-500 text-white rounded-lg mb-2 w-full"
                onClick={() => window.print()}
              >
                Print QR Code
              </button>
            )}
            
            <p className="text-xs text-gray-500 text-center">
              You can print or save the QR code after generation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}