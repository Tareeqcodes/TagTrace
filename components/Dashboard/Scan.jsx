'use client'
import {  Eye, MapPin } from 'lucide-react';

export default function Scan() {
    const scanLogs = [
    { item: "MacBook Pro", date: "May 15, 2025", time: "10:43 AM", location: "Lagos, Nigeria" },
    { item: "Backpack", date: "May 14, 2025", time: "3:22 PM", location: "New York, USA" },
    { item: "Wallet", date: "May 12, 2025", time: "9:15 AM", location: "Home" },
    { item: "Keys", date: "May 8, 2025", time: "5:30 PM", location: "Office" }
  ];
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
}
