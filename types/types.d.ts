export type ID = string;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface User {
  id: ID;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Product {
  id: ID;
  name: string;
  brand: string;
  price: number;
  currency: string;
  imageUrls: string[];
  sizes: number[];
  colors: string[];
  description: string;
}

export interface CartItem {
  product: Product;
  size: number;
  color: string;
  quantity: number;
}

export interface Address {
  id: ID;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  muted: string;
  border: string;
  destructive: string;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ValueOf<T> = T[keyof T];
