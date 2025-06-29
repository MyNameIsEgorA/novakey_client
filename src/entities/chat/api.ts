import axios, { type AxiosInstance, AxiosError } from "axios";

export interface Message {
  id: number;
  sender_id: string;
  recipient_id: string;
  message_text: string;
  created_at: string;
  updated_at: string;
}

export interface SendMessagePayload {
  sender_id: string;
  recipient_id: string;
  message_text: string;
}

export interface GetMessagesParams {
  sender_id: string;
  recipient_id: string;
  limit?: number;
  offset?: number;
}

export class ChatService {
  private static api: AxiosInstance;
  public static API_BASE_URL: string = "https://api.nova-key.online/api"; // Adjust if different from auth service
  private static TOKEN_KEY: string = "authToken"; // Assuming same token usage

  private static initializeApi() {
    if (!ChatService.api) {
      ChatService.api = axios.create({
        baseURL: ChatService.API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const storedToken = ChatService.getToken();
      if (storedToken) {
        ChatService.setAuthHeader(storedToken);
      }
    }
  }

  private static setAuthHeader(token: string | null): void {
    ChatService.initializeApi();
    if (token) {
      ChatService.api.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    } else {
      delete ChatService.api.defaults.headers.common["Authorization"];
    }
  }

  // Helper to get token (can be moved to a shared utility if many services use it)
  private static getToken(): string | null {
    return localStorage.getItem(ChatService.TOKEN_KEY);
  }

  public static async sendMessage(
    payload: SendMessagePayload,
  ): Promise<Message | null> {
    ChatService.initializeApi();
    try {
      const response = await ChatService.api.post<Message>(
        "/messages",
        payload,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Send message error:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred while sending message:",
          error,
        );
      }
      return null;
    }
  }

  public static async getMessages(
    params: GetMessagesParams,
  ): Promise<Message[] | null> {
    ChatService.initializeApi();
    try {
      const response = await ChatService.api.get<Message[]>("/messages", {
        params: params,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Get messages error:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred while fetching messages:",
          error,
        );
      }
      return null;
    }
  }
}
