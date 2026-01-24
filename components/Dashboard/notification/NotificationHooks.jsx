'use client';
import { useState, useEffect } from 'react';
import { tablesDB, Query } from '@/config/appwrite';
import { useAuth } from '@/context/Authcontext';

export const NotificationHooks = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user || !user.$id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await tablesDB.listRows({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_NOTIFY_ID,
        queries: [
          Query.equal('userId', user.$id),
          Query.orderDesc('createdAt'),
          Query.limit(10)
        ]
    });
      
      const notificationData = response.rows;
      setNotifications(notificationData);
      
      // Calculate unread count
      const unread = notificationData.filter(notification => !notification.isRead);
      setUnreadCount(unread.length);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await tablesDB.updateRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_NOTIFY_ID,
        rowId: notificationId,
        data: { isRead: true }
      });

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.$id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );

      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      const updatePromises = unreadNotifications.map(notification =>
        tablesDB.updateRow({
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          tableId: process.env.NEXT_PUBLIC_APPWRITE_NOTIFY_ID,
          rowId: notification.$id,
          data: { isRead: true }
        })
      );

      await Promise.all(updatePromises);

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await tablesDB.deleteRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_NOTIFY_ID,
        rowId: notificationId
      });

      // Update local state
      setNotifications(prev => prev.filter(n => n.$id !== notificationId));
      
      // Update unread count if deleted notification was unread
      const deletedNotification = notifications.find(n => n.$id === notificationId);
      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const deletePromises = notifications.map(notification =>
        tablesDB.deleteRow({
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          tableId: process.env.NEXT_PUBLIC_APPWRITE_NOTIFY_ID,
          rowId: notification.$id
        })
      );

      await Promise.all(deletePromises);

      // Update local state
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Error clearing all notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    refetch: fetchNotifications
  };
};