import { api } from '@/lib';

export const getCaseById = async (id: string) => {
  try {
    const res = await api.get(`/cases/get-by-id/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
