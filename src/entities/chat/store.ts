import { makeAutoObservable, runInAction } from "mobx";
import { ChatService, type Message, type SendMessagePayload } from "./api.ts";
import { userDataStore } from "@/entities/user/model.ts";

interface ChatMap {
  [chatKey: string]: Message[];
}

class ChatStore {
  public chats: ChatMap = {};
  public isLoading: boolean = false;
  public error: string | null = null;
  private isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  private initialize = async () => {
    await new Promise<void>((resolve) => {
      const disposer = runInAction(() => {
        if (userDataStore.user?.id) {
          resolve();
          return true; // Stop reaction
        }
        return false; // Continue reaction
      });
      const interval = setInterval(() => {
        if (userDataStore.user?.id) {
          clearInterval(interval);
          resolve();
          if (disposer) disposer(); // Clean up reaction if it was used
        }
      }, 100); // Check every 100ms
    });

    if (this.isInitialized) return; // Prevent re-initialization
    this.isInitialized = true;

    const currentUserId = userDataStore.user?.id?.toString();

    if (currentUserId) {
      console.log(`ChatStore initializing for user: ${currentUserId}`);
      // Здесь мы можем загрузить сообщения для ВСЕХ известных собеседников.
      // ЭТО ПРИМЕР: ВАМ НУЖЕН ИСТОЧНИК knownRecipientIds
      // Например, из другого API-запроса, который возвращает список "моих чатов".
      const knownRecipientIds: string[] = ["user2", "user3", "user4"]; // <-- ЗАМЕНИТЕ ЭТО НА РЕАЛЬНЫЙ СПИСОК!

      for (const recipientId of knownRecipientIds) {
        await this.loadMessages(recipientId); // Загружаем чат с каждым известным собеседником
      }
      console.log(
        "ChatStore initialized and messages loaded for known recipients.",
      );
    } else {
      console.warn("ChatStore could not initialize: User ID not available.");
    }
  };

  private getChatKey(id1: string, id2: string): string {
    return [id1, id2].sort().join("_");
  }

  public loadMessages = async (recipientId: string) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    const currentUserId = userDataStore.user?.id?.toString();

    if (!currentUserId) {
      runInAction(() => {
        this.error = "User not logged in or user ID is missing.";
        this.isLoading = false;
      });
      console.error(this.error);
      return;
    }

    try {
      const chatKey = this.getChatKey(currentUserId, recipientId);
      const messages = await ChatService.getMessages({
        sender_id: currentUserId,
        recipient_id: recipientId,
        limit: 50,
        offset: 0,
      });

      if (messages) {
        runInAction(() => {
          this.chats[chatKey] = messages.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
        });
      } else {
        runInAction(() => {
          this.chats[chatKey] = [];
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to load messages.";
        console.error("Failed to load messages:", err);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  public sendMessage = async (recipientId: string, messageText: string) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    const currentUserId = userDataStore.user?.id?.toString();

    if (!currentUserId) {
      runInAction(() => {
        this.error = "User not logged in or user ID is missing.";
        this.isLoading = false;
      });
      console.error(this.error);
      return;
    }

    try {
      const payload: SendMessagePayload = {
        sender_id: currentUserId,
        recipient_id: recipientId,
        message_text: messageText,
      };
      const newMessage = await ChatService.sendMessage(payload);

      if (newMessage) {
        runInAction(() => {
          const chatKey = this.getChatKey(currentUserId, recipientId);
          if (!this.chats[chatKey]) {
            this.chats[chatKey] = [];
          }
          this.chats[chatKey].push(newMessage);
          this.chats[chatKey].sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to send message.";
        console.error("Failed to send message:", err);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  public get chatPartners(): string[] {
    const currentUserId = userDataStore.user?.id?.toString();
    if (!currentUserId) {
      return [];
    }

    const uniquePartners = new Set<string>();
    for (const key in this.chats) {
      const [id1, id2] = key.split("_");
      if (id1 === currentUserId && id2 !== currentUserId) {
        uniquePartners.add(id2);
      } else if (id2 === currentUserId && id1 !== currentUserId) {
        uniquePartners.add(id1);
      }
    }
    return Array.from(uniquePartners);
  }

  public getMessagesForChat(otherUserId: string): Message[] {
    const currentUserId = userDataStore.user?.id?.toString();
    if (!currentUserId) {
      return [];
    }
    const chatKey = this.getChatKey(currentUserId, otherUserId);
    return this.chats[chatKey] || [];
  }
}

export const chatStore = new ChatStore();
