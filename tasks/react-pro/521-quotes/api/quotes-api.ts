import axios from 'axios';
import { QuotesResponse } from '../model/QuotesResponse';
import { useQuery } from '@tanstack/react-query';

export const fetchQuotes = async (page: number, limit: number): Promise<QuotesResponse> => {
  const response = await axios.get<QuotesResponse>(
    `https://dummyjson.com/quotes?limit=${limit}&skip=${page * limit}`,
  );
  return response.data;
};

export function useQuotes(page: number, limit: number) {
  return useQuery<QuotesResponse>({
    queryKey: ['quotes', page, limit],
    queryFn: () => fetchQuotes(page, limit),
  });
}
