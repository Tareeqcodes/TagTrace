'use client'
import { Package, QrCode, Check, AlertCircle, RefreshCw,  Edit, Eye,  Plus } from 'lucide-react';

export default function Main() {
   const user = {
    name: "DevXplorer",
    avatar: "/api/placeholder/40/40"
  };
  
  const stats = [
    { label: "Total Items Tagged", value: 24, icon: <Package size={20} /> },
    { label: "Recently Scanned", value: 3, icon: <QrCode size={20} /> },
    { label: "Items Marked as Lost", value: 1, icon: <AlertCircle size={20} /> },
    { label: "Successfully Returned", value: 2, icon: <Check size={20} /> }
  ];

   const activityFeed = [
    { item: "MacBook Pro", action: "was scanned", location: "Lagos, Nigeria", time: "2 hours ago", icon: <QrCode size={16} /> },
    { item: "Backpack", action: "returned by", who: "anonymous finder", time: "Yesterday", icon: <RefreshCw size={16} /> },
    { item: "Wallet", action: "marked as", status: "lost", time: "3 days ago", icon: <AlertCircle size={16} /> },
    { item: "Keys", action: "new tag created", time: "1 week ago", icon: <Plus size={16} /> }
  ];
    const taggedItems = [
    { name: "MacBook Pro", tagId: "MB-3892", status: "active", lastScan: "2 hours ago", location: "Lagos, Nigeria" },
    { name: "Backpack", tagId: "BP-1270", status: "returned", lastScan: "1 day ago", location: "New York, USA" },
    { name: "Wallet", tagId: "WL-9043", status: "lost", lastScan: "3 days ago", location: "Home" },
    { name: "Keys", tagId: "KY-4527", status: "active", lastScan: "1 week ago", location: "Office" },
    { name: "Headphones", tagId: "HP-6281", status: "active", lastScan: "2 weeks ago", location: "Gym" }
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
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                  <QrCode size={18} className="mr-2" />
                  Create New QR Tag
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center">
                  <Package size={18} className="mr-2" />
                  Add New Item
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-2">
                    {stat.icon}
                    <span className="ml-2 text-sm">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-semibold mb-4">Tagged Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="pb-3 font-medium">Item Name</th>
                        <th className="pb-3 font-medium">Tag ID</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Last Scan</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taggedItems.slice(0, 4).map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-50">
                          <td className="py-3">{item.name}</td>
                          <td className="py-3 text-gray-500 text-sm">{item.tagId}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-500">{item.lastScan}</td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-gray-500 hover:bg-gray-50 rounded">
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-center">
                  <button className="text-blue-500 text-sm font-medium">View All Items</button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {activityFeed.map((activity, idx) => (
                    <div key={idx} className="flex pb-3 border-b border-gray-50 last:border-0">
                      <div className="mt-1 mr-3 p-2 bg-gray-50 rounded-full">
                        {activity.icon}
                      </div>
                      <div>
                        <div className="text-sm">
                          <span className="font-medium">{activity.item}</span> {activity.action} {activity.who || activity.location || activity.status}
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
}
