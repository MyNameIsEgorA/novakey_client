import axios, { type AxiosInstance, AxiosError } from "axios"; // Импортируем AxiosError для лучшей типизации ошибок

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
}

export class AuthService {
  private static api: AxiosInstance;
  public static API_BASE_URL: string = "https://api.nova-key.online/api";
  private static TOKEN_KEY: string = "authToken";

  private static initializeApi() {
    if (!AuthService.api) {
      AuthService.api = axios.create({
        baseURL: AuthService.API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const storedToken = AuthService.getToken();
      if (storedToken) {
        AuthService.setAuthHeader(storedToken);
      }
    }
  }

  private static setAuthHeader(token: string | null): void {
    AuthService.initializeApi();
    if (token) {
      AuthService.api.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    } else {
      delete AuthService.api.defaults.headers.common["Authorization"];
    }
  }

  private static saveToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    AuthService.setAuthHeader(token);
  }

  public static getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  public static removeToken(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    AuthService.setAuthHeader(null);
  }

  public static async register(
    payload: RegisterPayload,
  ): Promise<AuthResponse | null> {
    // Изменено на Promise<AuthResponse | null>
    AuthService.initializeApi();
    try {
      const response = await AuthService.api.post<AuthResponse>(
        "/auth/register",
        payload,
      );
      AuthService.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Registration error:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred during registration:",
          error,
        );
      }
      return null;
    }
  }

  public static async login(
    payload: LoginPayload,
  ): Promise<AuthResponse | null> {
    // Изменено на Promise<AuthResponse | null>
    AuthService.initializeApi();
    try {
      const response = await AuthService.api.post<AuthResponse>(
        "/auth/login",
        payload,
      );
      AuthService.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Login error:", error.response?.data || error.message);
      } else {
        console.error("An unexpected error occurred during login:", error);
      }
      return null;
    }
  }

  public static async getMe(): Promise<User | null> {
    // Изменено на Promise<User | null>
    AuthService.initializeApi();
    try {
      const response = await AuthService.api.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Get user data error:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred while fetching user data:",
          error,
        );
      }
      return null;
    }
  }

  public static async updateMe(
    payload: UpdateUserPayload,
  ): Promise<User | null> {
    // Изменено на Promise<User | null>
    AuthService.initializeApi();
    try {
      const response = await AuthService.api.put<User>("/auth/me", payload);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Update user error:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred during user update:",
          error,
        );
      }
      return null;
    }
  }
}
