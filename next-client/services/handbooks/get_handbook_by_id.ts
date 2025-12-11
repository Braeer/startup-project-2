import { api } from '@/lib';

export const getHandBooksById = async ({ id }: { id: string }) => {
  try {
    const result = await api.get(`/handbooks/${id}`);

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
