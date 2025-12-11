import { api } from '@/lib';

export const getHandBooksTypes = async () => {
  try {
    const result = await api.get('/handbooks/types');

    const arrayRes = result.data.map((item: { type: string }) => item.type);

    return arrayRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};
