const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const USE_MOCK_DATA = !process.env.NEXT_PUBLIC_API_URL;

// Mock data for preview environment
const MOCK_MENU_ITEMS = [
  {
    id: 1,
    name: 'Classic Italian Pasta',
    description: 'Al dente pasta with fresh tomato sauce and basil',
    category: 'Entrees',
    price: 18.50,
    dietary_info: 'Vegetarian',
    min_guests: 10,
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    description: 'Norwegian salmon fillet with lemon butter sauce',
    category: 'Entrees',
    price: 24.00,
    dietary_info: 'Gluten-Free',
    min_guests: 10,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Prime Ribeye Steak',
    description: 'USDA Prime 12oz ribeye with seasonal vegetables',
    category: 'Entrees',
    price: 32.00,
    dietary_info: 'Paleo',
    min_guests: 15,
    image_url: 'https://images.unsplash.com/photo-1606787620884-c88bebf9b534?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, heirloom tomatoes, basil, and balsamic',
    category: 'Appetizers',
    price: 12.00,
    dietary_info: 'Vegetarian',
    min_guests: 5,
    image_url: 'https://images.unsplash.com/photo-1587049633312-d628fb40c321?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Shrimp Cocktail',
    description: 'Chilled jumbo shrimp with zesty cocktail sauce',
    category: 'Appetizers',
    price: 14.00,
    dietary_info: 'Gluten-Free',
    min_guests: 5,
    image_url: 'https://images.unsplash.com/photo-1599599810694-b3a0d4f0f72f?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Chocolate Mousse',
    description: 'Rich dark chocolate mousse with whipped cream',
    category: 'Desserts',
    price: 8.50,
    dietary_info: 'Vegetarian',
    min_guests: 5,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with mascarpone and espresso',
    category: 'Desserts',
    price: 8.50,
    dietary_info: 'Vegetarian',
    min_guests: 5,
    image_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop'
  },
];

const MOCK_CATEGORIES = ['Appetizers', 'Entrees', 'Desserts'];

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  // Use mock data for preview environment
  if (USE_MOCK_DATA) {
    return getMockData(endpoint) as Promise<T>;
  }

  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn('[API] Falling back to mock data:', endpoint);
    return getMockData(endpoint) as Promise<T>;
  }
}

function getMockData(endpoint: string): any {
  if (endpoint.includes('/menu/categories')) {
    return MOCK_CATEGORIES;
  }
  if (endpoint.includes('/menu')) {
    return MOCK_MENU_ITEMS;
  }
  if (endpoint.includes('/orders')) {
    return [];
  }
  return null;
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
