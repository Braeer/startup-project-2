import { api } from '@/lib';

export const deleteUserCompletedCase = async (id: string) => {
  try {
    const res = await api.delete(`/cases/user/delete-case/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
