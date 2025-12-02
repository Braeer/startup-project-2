import { createTokenStorage } from '@/lib';
import { api } from '@/lib/auth/api';

export const user_session_storage = createTokenStorage('session', 'user');

export async function getMyProfile() {
  try {
    const res = await api.get('/user/profile');

    user_session_storage.setToken(JSON.stringify(res.data));

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
