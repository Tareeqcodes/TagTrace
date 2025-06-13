'use client';
import { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, ArrowLeft, Clock, AlertCircle, Package, QrCode, MapPin, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationHooks } from './NotificationHooks';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'scan_alert':
      return <QrCode className="w-5 h-5 text-blue-500" />;
    case 'item_returned':
      return <Package className="w-5 h-5 text-green-500" />;
    case 'location_update':
      return <MapPin className="w-5 h-5 text-purple-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const MobileNotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.$id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`relative ${!notification.isRead ? 'bg-blue-50/50' : 'bg-white'}`}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 p-2 rounded-xl ${
            !notification.isRead ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <NotificationIcon type={notification.type} />
          </div>
          
          <div className="flex-1 min-w-0" onClick={handleClick}>
            <div className="flex items-start justify-between mb-2">
              <h3 className={`text-sm font-semibold leading-5 ${
                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {notification.title}
              </h3>
              
              <div className="flex items-center space-x-2 ml-2">
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(!showActions);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 leading-5 mb-3">
              {notification.message}
            </p>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-200"
            >
              <div className="flex items-center justify-end space-x-4">
                {!notification.isRead && (
                  <button
                    onClick={() => {
                      onMarkAsRead(notification.$id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Check className="w-4 h-4" />
                    <span>Mark as read</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    onDelete(notification.$id);
                    setShowActions(false);
                  }}
                  className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Mobile({ isOpen, onClose }) {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  } = NotificationHooks();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-white z-50 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-blue-600">{unreadCount} unread</p>
              )}
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500">Loading notifications...</p>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                <p className="text-gray-500 text-center leading-6">
                  We'll notify you when someone scans your QR codes or when there are updates about your items.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <AnimatePresence>
                {notifications.map((notification) => (
                  <MobileNotificationItem
                    key={notification.$id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {notifications.length} total notifications
              </span>
              <button
                onClick={clearAllNotifications}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}