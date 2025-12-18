import { api } from '@/lib';

type BodyType = {
  type?: string;
  count?: number;
  difficulty?: string;
};

export const getCasesWitchSettings = async ({ type, count, difficulty }: BodyType) => {
  try {
    const res = await api.post('/cases/random-with-settings', {
      type,
      count,
      difficulty,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
