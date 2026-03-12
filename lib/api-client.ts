const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

export const api = {
  menu: {
    getAll: (category?: string) =>
      apiCall(`/menu${category ? `?category=${category}` : ''}`),
    getCategories: () => apiCall('/menu/categories'),
    getById: (id: number) => apiCall(`/menu/${id}`),
  },

  orders: {
    create: (data: any, token: string) =>
      apiCall('/orders', { method: 'POST', body: JSON.stringify(data), token }),
    getAll: (token: string) =>
      apiCall('/orders', { token }),
    getById: (id: number, token: string) =>
      apiCall(`/orders/${id}`, { token }),
    updateStatus: (id: number, status: string, token: string) =>
      apiCall(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        token,
      }),
  },

  contact: {
    submit: (data: any) =>
      apiCall('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
};
