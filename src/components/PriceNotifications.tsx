import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { NotificationForm } from './NotificationForm';
import { NotificationsList } from './NotificationsList';
import { notificationAPI } from '../services/notificationApi';
import type { PriceNotification, PriceNotificationForm } from '../types/notification';
import { useAuth } from '../contexts/AuthContext';

export const PriceNotifications: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<PriceNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationAPI.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotification = async (formData: PriceNotificationForm) => {
    try {
      const newNotification = await notificationAPI.createNotification(formData);
      setNotifications([...notifications, newNotification]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create notification');
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete notification');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Sign in to Set Price Alerts
        </h3>
        <p className="text-gray-500">
          Create notifications for price changes on your favorite products
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Price Alerts</h2>
        <p className="text-gray-600">
          Get notified when prices change on your watched products
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[350px,1fr]">
        <div>
          <NotificationForm onSubmit={handleCreateNotification} />
        </div>

        <div>
          <NotificationsList
            notifications={notifications}
            onDelete={handleDeleteNotification}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </motion.div>
  );
};
