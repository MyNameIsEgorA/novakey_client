// notificationStore.ts
import { makeAutoObservable } from "mobx";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "new_client" | "reminder" | "message" | "viewing" | "system";
  avatar?: string;
}

class NotificationStore {
  notifications: Notification[] = [
    {
      id: "1",
      title: "Новый клиент",
      description: "Анна Смирнова заинтересована в ЖК 'Северная звезда'",
      time: "10 минут назад",
      read: false,
      type: "new_client",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "2",
      title: "Напоминание о звонке",
      description: "Запланирован звонок с Михаилом Петровым на 15:00",
      time: "1 час назад",
      read: false,
      type: "reminder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "3",
      title: "Новое сообщение",
      description: "Елена Козлова: Добрый день! Хочу уточнить по документам...",
      time: "2 часа назад",
      read: true,
      type: "message",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "4",
      title: "Просмотр назначен",
      description: "Дмитрий Волков подтвердил просмотр на завтра в 12:00",
      time: "5 часов назад",
      read: true,
      type: "viewing",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "5",
      title: "Системное обновление",
      description:
        "Доступно новое обновление CRM системы. Рекомендуем установить",
      time: "Вчера",
      read: true,
      type: "system",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  markAsRead = (id: string) => {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };

  markAllAsRead = () => {
    this.notifications.forEach((n) => (n.read = true));
  };

  deleteNotification = (id: string) => {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  };

  get unreadCount() {
    return this.notifications.filter((n) => !n.read).length;
  }

  getFilteredNotifications = (searchQuery: string, filter: string) => {
    return this.notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "all" || (filter === "unread" && !notification.read);
      return matchesSearch && matchesFilter;
    });
  };
}

export const notificationStore = new NotificationStore();
