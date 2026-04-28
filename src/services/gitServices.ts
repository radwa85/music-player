import { API_BASE_URL } from '../constants/config';

const FETCH_TIMEOUT = 15000; // 15 seconds

const fetchWithTimeout = (url: string, options: RequestInit, timeout: number = FETCH_TIMEOUT): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Network request timeout')), timeout)
    ),
  ]);
};

export const authApi = {
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = `Login failed: ${response.status}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData?.message || errorData?.detail || errorMessage;
            } catch {
              // If response is not JSON, use the text as error message
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (error) {
          // Fallback if text() fails
          errorMessage = `Login failed: ${response.status}`;
        }
        throw new Error(errorMessage);
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
        throw new Error('No token received from server. Please contact support.');
      }

      return { token, user };
    } catch (error: any) {
      const errorMessage = error?.message || 'Login failed';
      console.error('Login error:', errorMessage);
      
      // Provide user-friendly error messages
      if (errorMessage.includes('timeout')) {
        throw new Error('Connection timeout. Please check your internet and try again.');
      }
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw error;
    }
  },

  async signUp(username: string, email: string, password: string): Promise<any> {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `Registration failed: ${response.status}`;

        try {
          const errorData = JSON.parse(responseText);
          // Handle different error response formats from Django
          if (typeof errorData === 'object') {
            // Check for common Django error formats
            if (errorData.detail) {
              errorMessage = errorData.detail;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
              errorMessage = errorData.non_field_errors[0];
            } else {
              // If it's an object with field errors, extract them
              const fieldErrors = Object.entries(errorData)
                .filter(([key, value]) => Array.isArray(value) && value.length > 0)
                .map(([key, value]) => `${key}: ${(value as any)[0]}`)
                .join(', ');
              if (fieldErrors) {
                errorMessage = fieldErrors;
              }
            }
          }
        } catch {
          if (responseText) {
            errorMessage = responseText;
          }
        }

        console.error('Signup backend error:', errorMessage, 'Response:', responseText);
        throw new Error(errorMessage);
      }

      return responseText ? JSON.parse(responseText) : {};
    } catch (error: any) {
      const errorMessage = error?.message || 'Registration failed';
      console.error('Signup error:', errorMessage);
      
      // Provide user-friendly error messages
      if (errorMessage.includes('timeout')) {
        throw new Error('Connection timeout. Please check your internet and try again.');
      }
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw error;
    }
  },
};
