'use client'
import { useState } from 'react';
import { Search, Home, Package, QrCode, Clock, MessageCircle, Settings, Bell, User, Check, AlertCircle, RefreshCw, X, Edit, Eye, MapPin, Plus } from 'lucide-react';

const Dash = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const user = {
    name: "Jamie Smith",
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
  
  const scanLogs = [
    { item: "MacBook Pro", date: "May 15, 2025", time: "10:43 AM", location: "Lagos, Nigeria" },
    { item: "Backpack", date: "May 14, 2025", time: "3:22 PM", location: "New York, USA" },
    { item: "Wallet", date: "May 12, 2025", time: "9:15 AM", location: "Home" },
    { item: "Keys", date: "May 8, 2025", time: "5:30 PM", location: "Office" }
  ];
  
  const messages = [
    { from: "Anonymous Finder", regarding: "Backpack", preview: "Hello, I found your backpack at...", time: "Yesterday", unread: true },
    { from: "John Doe", regarding: "MacBook Pro", preview: "I think I might have seen your...", time: "May 13", unread: false },
    { from: "Support Team", regarding: "Account", preview: "Thank you for registering with TagTrace...", time: "May 10", unread: false }
  ];
  
  const renderNavIcon = (name, Icon) => {
    return (
      <div 
        className={`flex items-center py-3 px-4 cursor-pointer rounded-lg mb-1 ${activeTab === name ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        onClick={() => setActiveTab(name)}
      >
        <Icon size={20} className="mr-3" />
        <span className="font-medium">{name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')}</span>
      </div>
    );
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'lost': return 'bg-red-100 text-red-600';
      case 'returned': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  const renderMainContent = () => {
    switch(activeTab) {
      case 'dashboard':
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
      
      case 'my-items':
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
        
      case 'scan-logs':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Scan Logs</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="pb-3 font-medium">Item</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Time</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanLogs.map((log, idx) => (
                      <tr key={idx} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">{log.item}</td>
                        <td className="py-3 text-sm text-gray-500">{log.date}</td>
                        <td className="py-3 text-sm text-gray-500">{log.time}</td>
                        <td className="py-3 text-sm">
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            {log.location}
                          </div>
                        </td>
                        <td className="py-3">
                          <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'messages':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Messages & Return Requests</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              {messages.map((message, idx) => (
                <div key={idx} className={`p-4 border-b border-gray-100 last:border-0 flex cursor-pointer hover:bg-gray-50 ${message.unread ? 'bg-blue-50' : ''}`}>
                  <div className="mr-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">{message.from}</h3>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">Re: {message.regarding}</div>
                    <div className="text-sm text-gray-500 truncate">{message.preview}</div>
                  </div>
                  {message.unread && <div className="ml-2 w-2 h-2 rounded-full bg-blue-500 self-center"></div>}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'create-tag':
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
        
      case 'settings':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={user.name} />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" value="jamie.smith@example.com" />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg" value="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save Changes</button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails when your items are scanned</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-email" className="sr-only" checked readOnly />
                        <label htmlFor="toggle-email" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive text messages for urgent alerts</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-sms" className="sr-only" readOnly />
                        <label htmlFor="toggle-sms" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transition-transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Anonymous Contact Form</p>
                        <p className="text-sm text-gray-500">Allow finders to contact you anonymously</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-anon" className="sr-only" checked readOnly />
                        <label htmlFor="toggle-anon" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4 transition-transform"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Updates</p>
                        <p className="text-sm text-gray-500">Receive product news and updates</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" name="toggle" id="toggle-updates" className="sr-only" readOnly />
                        <label htmlFor="toggle-updates" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transition-transform"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-gray-500">This section is under development</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold mr-2">T</div>
          <span className="text-xl font-bold">TagTrace</span>
        </div>
        
        <nav className="space-y-1">
          {renderNavIcon('dashboard', Home)}
          {renderNavIcon('my-items', Package)}
          {renderNavIcon('create-tag', QrCode)}
          {renderNavIcon('scan-logs', Clock)}
          {renderNavIcon('messages', MessageCircle)}
          {renderNavIcon('settings', Settings)}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="w-72">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items, tags..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell size={20} className="text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </div>
              
              <div className="flex items-center cursor-pointer">
                <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dash;