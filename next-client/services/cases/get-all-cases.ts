import { api } from '@/lib';

export const getAllCases = async () => {
  try {
    const res = await api.get('/cases/all');

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
