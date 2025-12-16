import { api } from '@/lib';

export const saveUserCompletedCase = async (caseId: string, type: 'success' | 'error') => {
  try {
    const res = await api.post(`/cases/user/save-case`, {
      caseId,
      variant: type,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
