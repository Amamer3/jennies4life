import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PriceNotificationForm } from '../types/notification';

interface NotificationFormProps {
  onSubmit: (form: PriceNotificationForm) => Promise<void>;
  initialProduct?: string;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({ onSubmit, initialProduct = '' }) => {
  const [form, setForm] = useState<PriceNotificationForm>({
    productId: initialProduct,
    priceThreshold: 0,
    notificationType: 'below'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(form);
      // Reset form after successful submission
      setForm({
        productId: '',
        priceThreshold: 0,
        notificationType: 'below'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4">Create Price Alert</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="notificationType" className="block text-sm font-medium text-gray-700 mb-1">
            Notification Type
          </label>
          <select
            id="notificationType"
            value={form.notificationType}
            onChange={(e) => setForm({...form, notificationType: e.target.value as 'above' | 'below'})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="below">Notify when price drops below</option>
            <option value="above">Notify when price goes above</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceThreshold" className="block text-sm font-medium text-gray-700 mb-1">
            Price Threshold ($)
          </label>
          <input
            id="priceThreshold"
            type="number"
            min="0"
            step="0.01"
            value={form.priceThreshold}
            onChange={(e) => setForm({...form, priceThreshold: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price threshold"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating...' : 'Create Alert'}
        </button>
      </form>
    </motion.div>
  );
};
