export function setAuthCookies(token: string) {
  document.cookie = `authToken=${token}; path=/;`;
}

export function clearAuthCookies() {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
