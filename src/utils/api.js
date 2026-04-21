// Simple API utility using fetch for React Native

const BASE_URL = 'http://127.0.0.1:8000/api'; // Android USB (adb reverse) -> local Docker backend

export async function apiRequest(endpoint, method = 'GET', body = null, headers = {}) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`[API] ${method} ${url}`);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API error');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
