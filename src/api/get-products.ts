import type { Product } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_API_URL;

export async function get(endpoint: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const json = await response.json();

    return json.data.map((text: string) => ({
      id: uuidv4(),
      text,
      liked: false,
    }));
  } catch (error) {
    throw new Error(`Ошибка обработки запроса ${error}`);
  }
}
