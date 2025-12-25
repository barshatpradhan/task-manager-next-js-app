export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    console.log('✅ Token saved to localStorage');
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log('🔍 Getting token:', token ? 'Found' : 'Not found');
    return token;
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    console.log('✅ Token removed from localStorage');
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};