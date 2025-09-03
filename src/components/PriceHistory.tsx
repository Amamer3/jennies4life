import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { notificationAPI } from '../services/notificationApi';

interface PriceHistoryProps {
  productId: string;
}

export const PriceHistory: React.FC<PriceHistoryProps> = ({ productId }) => {
  const [priceHistory, setPriceHistory] = useState<Array<{ date: string; price: number; }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const history = await notificationAPI.getPriceHistory(productId);
        setPriceHistory(history);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch price history');
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, [productId]);

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

  if (priceHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No price history available
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Price History</h3>
      
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Price history chart temporarily disabled</p>
          <p className="text-sm mt-2">Data available: {priceHistory.length} entries</p>
          <div className="mt-4 text-xs text-gray-400">
            {priceHistory.slice(0, 3).map((entry, index) => (
              <div key={index}>
                {new Date(entry.date).toLocaleDateString()}: ${entry.price.toFixed(2)}
              </div>
            ))}
            {priceHistory.length > 3 && <div>... and {priceHistory.length - 3} more</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
