import { api } from '@/lib';

export const getUserCompletedCase = async (type?: 'success' | 'error') => {
  try {
    const res = await api.get(`/cases/user/completed?type=${type}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
