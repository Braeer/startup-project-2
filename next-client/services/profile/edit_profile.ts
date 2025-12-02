import { api } from '@/lib/auth/api';

export async function editMyProfile(values: {
  username?: string;
  email?: string;
  specialty?: string;
}) {
  try {
    const res = await api.put('/user/profile/edit', values);

    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard/profile';
    }

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
