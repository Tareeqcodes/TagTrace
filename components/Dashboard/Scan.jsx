'use client';
import { useEffect, useState } from 'react';
import { MapPin, Package, ExternalLink, Tag, Calendar } from 'lucide-react';
import { databases } from '@/config/appwrite';

export default function Scan() {
  const [scanLogs, setScanLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScanLogs = async () => {
      try {
        // Fetch scan logs from Appwrite
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_SCAN_LOG_ID
        );
        
        const logsWithItems = await Promise.all(
          response.documents.map(async (log) => {
            try {
              const item = await databases.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
                log.itemId
              );
              return {
                id: log.$id,
                item: item.name || 'Unknown Item',
                date: new Date(log.scannedAt || log.timestamp).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }),
                time: new Date(log.scannedAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                }),
                location: log.address,
                latitude: log.latitude,
                longitude: log.longitude,
                rawData: log
              };
            } catch (err) {
              console.error(`Error fetching item ${log.itemId}:`, err);
              return {
                id: log.$id,
                item: 'Unknown Item',
                date: new Date(log.scannedAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }),
                time: new Date(log.scannedAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                }),
                location: log.address,
                latitude: log.latitude,
                longitude: log.longitude,
                rawData: log
              };
            }
          })
        );
        
        // Sort by most recent first
        logsWithItems.sort((a, b) => new Date(b.rawData.scannedAt || b.rawData.timestamp) - new Date(a.rawData.scannedAt || a.rawData.timestamp));
        setScanLogs(logsWithItems);
      } catch (err) {
        console.error("Error fetching scan logs:", err);
        setError("Failed to load scan logs");
      } finally {
        setLoading(false);
      }
    };

    fetchScanLogs();
  }, []);

  const openInGoogleMaps = (latitude, longitude, address) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(url, '_blank');
    } else if (address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-medium">please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-2xl shadow-xl p-8 mx-4 max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Logs</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="px-4 py-4 sm:px-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Scan Logs</h1>
              {/* <p className="text-sm text-gray-600 mt-1">
                {scanLogs.length} {scanLogs.length === 1 ? 'scan' : 'scans'} recorded
              </p> */}
            </div>
        </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 max-w-7xl mx-auto">
        {scanLogs.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scan Logs Yet</h3>
            <p className="text-gray-600">When someone scans your QR codes, their activity will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scanLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-300 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Tag className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {log.item}
                        </h3>
                       
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date & Time */}
                  <div className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-900">Date & Time</p>
                      <p className="text-xs text-blue-700 truncate">{log.date}</p>
                      <p className="text-xs text-blue-600">{log.time}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-xl border border-green-100/50">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-900">Location</p>
                      {log.location ? (
                        <>
                          <p className="text-xs text-green-700 truncate mb-1">{log.location}</p>
                          <button
                            onClick={() => openInGoogleMaps(log.latitude, log.longitude, log.location)}
                            className=" hidden md:inline-flex items-center space-x-1 text-xs text-green-600 hover:text-green-800 font-medium transition-colors"
                          >
                            <span>View on Map</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <p className="text-xs text-gray-500">Location not available</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile-specific full-width location button */}
                {log.location && (
                  <div className="mt-4 sm:hidden">
                    <button
                      onClick={() => openInGoogleMaps(log.latitude, log.longitude, log.location)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>View Maps</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}