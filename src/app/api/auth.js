import { apiRequest } from '../../utils/api';

export async function authLogin({ identifier, password }) {
  const response = await apiRequest('/login', 'POST', {
    identifier,
    password,
  });

  if (response?.ok === false) {
    throw new Error(response?.message || 'Login failed');
  }

  if (response?.user) {
    return response.user;
  }

  if (response?.data?.user) {
    return response.data.user;
  }

  if (response?.error || response?.message) {
    throw new Error(response?.error || response?.message || 'Login failed');
  }

  throw new Error('Login failed');
}
