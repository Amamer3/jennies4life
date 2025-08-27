import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
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
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date: string) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date: string) => new Date(date).toLocaleDateString()}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
