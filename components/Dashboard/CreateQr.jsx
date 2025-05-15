'use client'
import { QrCode } from "lucide-react";

export default function CreateQr() {
  return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Create New Tag</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g. MacBook Pro" />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Electronics</option>
                      <option>Bags & Luggage</option>
                      <option>Keys & Access</option>
                      <option>Wallet & Documents</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg h-24" placeholder="Add details about your item..." />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Instructions</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg h-16" placeholder="Instructions for finder if item is lost..." />
                    <p className="text-xs text-gray-500 mt-1">This will be visible when someone scans your item's QR code.</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
                  <div className="mb-4 w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                    <QrCode size={80} className="text-gray-300 mb-2" />
                    <div className="text-sm text-gray-500 text-center">QR code will appear here after creation</div>
                  </div>
                  
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mb-2 w-full">
                    Generate QR Tag
                  </button>
                  <p className="text-xs text-gray-500 text-center">You can print or save the QR code after generation</p>
                </div>
              </div>
            </div>
          </div>
        );
}
