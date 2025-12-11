import { api } from '@/lib';

export const getHandBooksByTypes = async ({ type }: { type: string }) => {
  try {
    const result = await api.get(`/handbooks/types/${type}`);

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
