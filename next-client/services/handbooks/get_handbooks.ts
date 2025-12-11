import { api } from '@/lib';

export const getHandBooks = async () => {
  try {
    const result = await api.get('/handbooks');

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
