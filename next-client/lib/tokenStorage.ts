export interface TokenStorage {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
}

const isBrowser = typeof window !== 'undefined';

class MemoryStorage implements TokenStorage {
  private token: string | null = null;

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }
}

class WebTokenStorage implements TokenStorage {
  constructor(private storage: Storage, private key: string) {}

  getToken(): string | null {
    return this.storage.getItem(this.key);
  }

  setToken(token: string) {
    this.storage.setItem(this.key, token);
  }

  clearToken() {
    this.storage.removeItem(this.key);
  }
}

export const createTokenStorage = (
  type: 'local' | 'session' | 'memory' = 'local',
  key: string,
): TokenStorage => {
  if (!isBrowser) {
    return new MemoryStorage();
  }

  try {
    if (type === 'local') return new WebTokenStorage(window.localStorage, key);
    if (type === 'session') return new WebTokenStorage(window.sessionStorage, key);
  } catch (error) {
    console.error(error);
  }

  return new MemoryStorage();
};

export const storage = (() => {
  if (!isBrowser) {
    return new MemoryStorage();
  }

  try {
    return new WebTokenStorage(window.localStorage, 'auth:token');
  } catch (err) {
    console.error(err);
    return new MemoryStorage();
  }
})();
