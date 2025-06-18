'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { databases, ID } from '@/config/appwrite';
import Contact from '@/components/FoundItem/Contact';
import Safety from '@/components/FoundItem/Safety';

export default function page() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [scanLogged, setScanLogged] = useState(false);

  const getUserLocation = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
          },
          (error) => {
            console.log('Location access denied:', error);
            resolve(null); // Continue without location
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        );
      } else {
        resolve(null);
      }
    });
  };

  // Function to reverse geocode coordinates to address
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API}`
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        return data.results[0].formatted;
      }
    } catch (error) {
      console.log('Geocoding failed:', error);
    }
    return null;
  };

  // Function to log the scan
  const logScan = async (itemData, location) => {
    try {
      const scanData = {
        itemId: id,
        scannedAt: new Date().toISOString(),
        userId: itemData.userId,
      };
        if (location) {
        scanData.latitude = location.latitude;
        scanData.longitude = location.longitude;
        const address = await getAddressFromCoords(location.latitude, location.longitude);
        if (address) {
          scanData.address = address;
        }
      }

      // Create scan log
      const scanLog = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_SCAN_LOG_ID,
        ID.unique(),
        scanData
      );
      await createNotification(itemData, scanLog, location);  
      // setScanLogged(true);
      console.log('Scan logged successfully');
    } catch (error) {
      console.error('Failed to log scan:', error);
    }
  };

  // Function to create notification
  const createNotification = async (itemData, scanLog, location) => {
    try {
      const locationText = location && scanLog.location?.address 
        ? ` near ${scanLog.location.address}`
        : location 
        ? ` at coordinates ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
        : '';

      const notification = {
        userId: itemData.userId,
        itemId: id,
        scanId: scanLog.$id,
        type: 'scan_alert',
        title: `Your ${itemData.name} was found!`,
        message: `Someone scanned the QR code for "${itemData.name}"${locationText} at ${new Date().toLocaleString()}.`,
        isRead: false,
        createdAt: new Date().toISOString()
      };

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_NOTIFY_ID,
        ID.unique(),
        notification
      );

      // Optional: Send email notification
      await sendEmailNotification(itemData, notification);
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  };

  // Function to send email notification
  const sendEmailNotification = async (itemData, notification) => {
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: itemData.ownerEmail,
          subject: notification.title,
          message: notification.message,
          itemName: itemData.name,
          scanTime: new Date().toLocaleString()
        }),
      });

      if (response.ok) {
        console.log('Email notification sent');
      }
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  };

  useEffect(() => {
    const fetchItemAndLogScan = async () => {
      try {
        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID,
          id
        );
        setItem(response);

        const location = await getUserLocation();
      
        await logScan(response, location);

      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Item not found or has been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemAndLogScan();
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500 text-white';
      case 'lost': return 'bg-red-500 text-white';
      case 'returned': return 'bg-blue-500 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p>please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 text-red-500 max-w-md text-center">{error}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No item found with this ID</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Found Item
            </h1>
            <p className="text-xs text-gray-500">TagTrace Secure</p>
          </div>
        </div>
      </header>
        
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Scan confirmation banner
        {scanLogged && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-900">Scan Logged</p>
                <p className="text-green-700 text-sm">Owner has been notified!</p>
              </div>
            </div>
          </motion.div>
        )} */}

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
            {item.image && (
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-md text-xs font-semibold shadow-lg ${getStatusColor(item.status)}`}>
                {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-xs font-medium">{item.tagId || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name || 'Untitled Item'}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description || 'No description provided.'}
              </p>
            </div>

            {item.reward ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Reward Offered</p>
                    <p className="text-amber-800 text-sm">{item.reward}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-2">Owner's Message</h3>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    {item.message || `This ${item.name || 'item'} contains important documents. Please contact me to return it safely.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {item?.userId && <Contact Id={item.userId} />}
        <Safety />
      </main>
    </section>
  );
}