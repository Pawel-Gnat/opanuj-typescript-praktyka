import axios from 'axios';
import { Product } from '../model/Product';
import { trackSlowRequests } from './tracker';

type RequestConfig = {
  metadata?: {
    startTime: number;
  };
};

const SLOW_REQUEST_THRESHOLD = 5000;

const productsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

productsApi.interceptors.request.use((config) => {
  (config as RequestConfig).metadata = {
    startTime: Date.now(),
  };
  return config;
});

productsApi.interceptors.response.use(
  (response) => {
    const startTime = (response.config as RequestConfig).metadata?.startTime;
    if (startTime) {
      const duration = Date.now() - startTime;
      if (duration >= SLOW_REQUEST_THRESHOLD) {
        trackSlowRequests();
      }
    }
    return response;
  },
  (error) => {
    const startTime = (error.config as RequestConfig)?.metadata?.startTime;
    if (startTime) {
      const duration = Date.now() - startTime;
      if (duration >= SLOW_REQUEST_THRESHOLD) {
        trackSlowRequests();
      }
    }
    return Promise.reject(error);
  },
);

export async function getProducts(query: string, limit: number = 5, delay: number = 0) {
  const response = await productsApi.get<{ products: Product[] }>('/products/search', {
    params: {
      q: query,
      limit: limit,
      delay: delay,
    },
  });
  return response;
}
