'use client'
import { X, Edit, Eye, MapPin, Plus } from 'lucide-react';

export default function Items() {
     const taggedItems = [
    { name: "MacBook Pro", tagId: "MB-3892", status: "active", lastScan: "2 hours ago", location: "Lagos, Nigeria" },
    { name: "Backpack", tagId: "BP-1270", status: "returned", lastScan: "1 day ago", location: "Kano, naibawa" },
    { name: "Wallet", tagId: "WL-9043", status: "lost", lastScan: "3 days ago", location: "Home" },
    { name: "Keys", tagId: "KY-4527", status: "active", lastScan: "1 week ago", location: "Office" },
    { name: "Headphones", tagId: "HP-6281", status: "active", lastScan: "2 weeks ago", location: "gyadi-gyadi" }
  ];
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'lost': return 'bg-red-100 text-red-600';
      case 'returned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
   return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">My Items</h1>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                <Plus size={18} className="mr-2" />
                Add New Item
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="pb-3 font-medium">Item Name</th>
                      <th className="pb-3 font-medium">Tag ID</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Last Scan</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taggedItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3 text-gray-500 text-sm">{item.tagId}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{item.lastScan}</td>
                        <td className="py-3 text-sm">
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            {item.location}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-gray-500 hover:bg-gray-50 rounded">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
}
