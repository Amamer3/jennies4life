export interface PriceNotification {
  id: string;
  userId: string;
  productId: string;
  priceThreshold: number;
  notificationType: 'above' | 'below';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PriceNotificationForm {
  productId: string;
  priceThreshold: number;
  notificationType: 'above' | 'below';
}

export interface PriceHistory {
  date: string;
  price: number;
  productId: string;
}
