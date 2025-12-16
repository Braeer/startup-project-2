import { api } from '@/lib';

export const updateUserCompletedCase = async (id: string) => {
  try {
    const res = await api.put(`/cases/user/update-case/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
