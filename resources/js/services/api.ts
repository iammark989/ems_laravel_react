// Mock API service - Replace these with actual PHP API calls
// Example: const API_BASE_URL = 'http://your-php-server.com/api';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date_sent: string;
  is_read: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

// Mock data
const mockMessages: Message[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    message: "Hi, I'm interested in your services. Could you please provide more information about pricing and availability? I'm looking for a solution that can handle our growing needs.",
    date_sent: "2026-02-05T10:30:00Z",
    is_read: false,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    message: "Thank you for the quick response! I have a few follow-up questions regarding the implementation process.",
    date_sent: "2026-02-04T15:45:00Z",
    is_read: true,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@techcorp.io",
    message: "We're experiencing an issue with the login feature. The system shows an error when trying to authenticate with SSO.",
    date_sent: "2026-02-04T09:20:00Z",
    is_read: false,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@startup.co",
    message: "I'd like to schedule a demo for our team. We're available next Tuesday or Wednesday afternoon.",
    date_sent: "2026-02-03T14:00:00Z",
    is_read: true,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "rwilson@enterprise.com",
    message: "Requesting a quote for enterprise licensing. We have approximately 500 users.",
    date_sent: "2026-02-03T11:15:00Z",
    is_read: true,
  },
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions - Replace with actual axios calls to your PHP backend
export const api = {
  // POST /api/login.php
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    await delay(800);
    
    // Mock validation - Replace with actual API call
    // Example: return axios.post(`${API_BASE_URL}/login.php`, credentials);
    if (credentials.email === "admin@example.com" && credentials.password === "password123") {
      return {
        success: true,
        token: "mock-jwt-token-xyz",
        user: {
          id: 1,
          email: credentials.email,
          name: "Admin User",
        },
      };
    }
    
    return {
      success: false,
      error: "Invalid email or password",
    };
  },

  // GET /api/getVisitorsCount.php
  getVisitorsCount: async (): Promise<number> => {
    await delay(500);
    // Mock data - Replace with: axios.get(`${API_BASE_URL}/getVisitorsCount.php`)
    return 12847;
  },

  // GET /api/getMessagesCount.php
  getMessagesCount: async (): Promise<number> => {
    await delay(500);
    // Mock data - Replace with: axios.get(`${API_BASE_URL}/getMessagesCount.php`)
    return mockMessages.filter(m => !m.is_read).length;
  },

  // GET /api/getMessages.php
  getMessages: async (): Promise<Message[]> => {
    await delay(600);
    // Mock data - Replace with: axios.get(`${API_BASE_URL}/getMessages.php`)
    return mockMessages;
  },

  // POST /api/logout.php
  logout: async (): Promise<void> => {
    await delay(300);
    // Replace with: axios.post(`${API_BASE_URL}/logout.php`)
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },
};

// Auth helpers
export const auth = {
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },
  
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },
  
  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  
  setSession: (token: string, user: User): void => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
  
  clearSession: (): void => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },
};
