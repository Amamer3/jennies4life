import { API_BASE_URL } from '../data';

interface NewsletterSubscriptionRequest {
  email: string;
}

interface NewsletterSubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    subscriptionId: string;
    welcomeBonus?: {
      discountCode: string;
      discountPercentage: number;
    };
  };
}

class NewsletterAPI {
  /**
   * POST /api/newsletter/subscribe - Subscribe to newsletter
   * This endpoint subscribes an email to the newsletter
   */
  async subscribe(email: string): Promise<NewsletterSubscriptionResponse> {
    console.log('NewsletterAPI: Starting subscription request for email:', email);
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/newsletter/subscribe`);
      
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        return {
          success: false,
          message: errorData.message || `HTTP error! status: ${response.status}`
        };
      }
      
      const data = await response.json();
      console.log('✅ Newsletter subscription successful:', data);
      return data;
    } catch (error) {
      console.error('🚨 Error subscribing to newsletter:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to subscribe to newsletter'
      };
    }
  }

  /**
   * POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
   * This endpoint unsubscribes an email from the newsletter
   */
  async unsubscribe(email: string): Promise<NewsletterSubscriptionResponse> {
    console.log('NewsletterAPI: Starting unsubscription request for email:', email);
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/newsletter/unsubscribe`);
      
      const response = await fetch(`${API_BASE_URL}/api/newsletter/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        return {
          success: false,
          message: errorData.message || `HTTP error! status: ${response.status}`
        };
      }
      
      const data = await response.json();
      console.log('✅ Newsletter unsubscription successful:', data);
      return data;
    } catch (error) {
      console.error('🚨 Error unsubscribing from newsletter:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to unsubscribe from newsletter'
      };
    }
  }
}

export const newsletterAPI = new NewsletterAPI();
export type { NewsletterSubscriptionRequest, NewsletterSubscriptionResponse };