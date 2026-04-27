import { API_BASE_URL } from '../constants/config';

export const authApi = {
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || `Login failed: ${response.status}`);
      }

      const data = await response.json();

      let token: string | null = null;
      let user: any = null;

      if (data.access) {
        token = data.access;
        user = data.user || { email };
      } else if (data.token) {
        token = data.token;
        user = data.user || { email };
      } else if (data.access_token) {
        token = data.access_token;
        user = data.user || { email };
      } else if (data.data?.token) {
        token = data.data.token;
        user = data.data.user || { email };
      } else if (typeof data === 'string') {
        token = data;
        user = { email };
      }

      if (!token) {
        throw new Error('No token received from server');
      }

      return { token, user };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
};
