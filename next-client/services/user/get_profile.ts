import { api } from '@/lib/auth/api';

export async function getMyProfile() {
  try {
    const res = await api.get('/user/profile');

    return {
      username: res.data.username,
      email: res.data.email,
      specialization: res.data.specialty,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
