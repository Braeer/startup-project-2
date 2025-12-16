import { api } from '@/lib';

export const getUserCompletedCaseById = async (id: string) => {
  try {
    const res = await api.get(`/cases/user/completed/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
