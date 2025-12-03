import { api } from '@/lib';

export async function editMyPassword(values: {
  password: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const res = await api.put('/user/profile/password', values);

    if (res.status === 400) {
      return { error: 'Ошибка при изменении пароля' };
    }

    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard/profile';
    }

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
