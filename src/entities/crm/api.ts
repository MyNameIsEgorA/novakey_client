import axios, { type AxiosInstance, AxiosError } from "axios";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  property: string;
  propertyId: number;
  status: string;
  budget: string;
  lastContact: string;
  source: string;
  viewings: number;
  stage: string;
  notes: string;
  priority: string;
}

export interface CreateClientPayload {
  name: string;
  email: string;
  phone: string;
  source: string;
  priority: string;
}

export interface CreateClientResponse {
  message: string;
  id: number;
}

export interface PropertyListItem {
  id: number;
  name: string;
  construction_status: string;
}

export class CrmService {
  private static api: AxiosInstance;
  public static API_BASE_URL: string = "https://api.nova-key.online/api";

  private static initializeApi() {
    if (!CrmService.api) {
      CrmService.api = axios.create({
        baseURL: CrmService.API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
  }

  public static async createCrmClient(
    payload: CreateClientPayload,
  ): Promise<CreateClientResponse | null> {
    CrmService.initializeApi();
    try {
      const response = await CrmService.api.post<CreateClientResponse>(
        "/crm/clients",
        payload,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error creating CRM client:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred during CRM client creation:",
          error,
        );
      }
      return null;
    }
  }

  public static async getCrmClients(): Promise<Client[] | null> {
    CrmService.initializeApi();
    try {
      const response = await CrmService.api.get<Client[]>("/crm/clients");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error fetching CRM clients:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred while fetching CRM clients:",
          error,
        );
      }
      return null;
    }
  }

  public static async getCrmClient(clientId: number): Promise<Client | null> {
    CrmService.initializeApi();
    try {
      const response = await CrmService.api.get<Client>(
        `/crm/clients/${clientId}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          `Error fetching CRM client with ID ${clientId}:`,
          error.response?.data || error.message,
        );
      } else {
        console.error(
          `An unexpected error occurred while fetching CRM client with ID ${clientId}:`,
          error,
        );
      }
      return null;
    }
  }

  public static async getCrmProperties(): Promise<PropertyListItem[] | null> {
    CrmService.initializeApi();
    try {
      const response =
        await CrmService.api.get<PropertyListItem[]>("/crm/properties");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error fetching CRM properties:",
          error.response?.data || error.message,
        );
      } else {
        console.error(
          "An unexpected error occurred while fetching CRM properties:",
          error,
        );
      }
      return null;
    }
  }
}
