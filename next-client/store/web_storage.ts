'use client';

import { createTokenStorage } from '@/lib';

export const user_session_storage = createTokenStorage('session', 'user');

export const filters_local_storage = createTokenStorage('local', 'filters');
