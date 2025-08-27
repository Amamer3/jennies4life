import { API_BASE_URL } from '../data';
import type { PriceNotification, PriceNotificationForm } from '../types/notification';

class NotificationAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async getNotifications(): Promise<PriceNotification[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  async createNotification(notification: PriceNotificationForm): Promise<PriceNotification> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(notification)
      });

      if (!response.ok) {
        throw new Error('Failed to create notification');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async updateNotification(id: string, updates: Partial<PriceNotification>): Promise<PriceNotification> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Failed to update notification');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  }

  async deleteNotification(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  async getPriceHistory(productId: string): Promise<{ date: string; price: number; }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}/price-history`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch price history');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching price history:', error);
      throw error;
    }
  }
}

export const notificationAPI = new NotificationAPI();
