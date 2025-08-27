import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, AlertTriangle } from 'lucide-react';
import type { PriceNotification } from '../types/notification';

interface NotificationsListProps {
  notifications: PriceNotification[];
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onDelete,
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        {error}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No price alerts set</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center"
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Bell className={`h-4 w-4 mr-2 ${notification.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-900">
                  Notify when price goes {notification.notificationType}
                </span>
              </div>
              
              <div className="text-lg font-semibold text-blue-600">
                ${notification.priceThreshold.toFixed(2)}
              </div>
              
              <div className="mt-1 text-xs text-gray-500">
                Created on {new Date(notification.createdAt).toLocaleDateString()}
              </div>
            </div>

            <button
              onClick={() => onDelete(notification.id)}
              className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
              title="Delete notification"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
