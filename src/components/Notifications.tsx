import { type FC, useState } from "react";
import {
  ArrowLeft,
  Bell,
  BellOff,
  CheckCircle,
  Clock,
  AlertCircle,
  Mail,
  MessageSquare,
  Phone,
  Users,
  X,
  Filter,
  Search,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { observer } from "mobx-react-lite";
import { notificationStore } from "@/shared/model/notifications.ts";

interface NotificationsProps {
  onBack: () => void;
}

const notificationTypes = {
  new_client: {
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  reminder: {
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
  },
  message: {
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-600",
  },
  viewing: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  system: {
    icon: AlertCircle,
    color: "bg-gray-100 text-gray-600",
  },
};

export const Notifications: FC<NotificationsProps> = observer(({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const {
    getFilteredNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  } = notificationStore;

  const filteredNotifications = getFilteredNotifications(
    searchQuery,
    selectedFilter,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={onBack}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg">Уведомления</h1>
                  <p className="text-sm text-gray-500">
                    {unreadCount > 0
                      ? `${unreadCount} непрочитанных`
                      : "Все уведомления прочитаны"}
                  </p>
                </div>
              </div>
              <button
                onClick={markAllAsRead}
                className="p-2 hover:bg-gray-100 rounded-lg"
                disabled={unreadCount === 0}
              >
                <CheckCircle
                  className={`w-5 h-5 ${
                    unreadCount > 0 ? "text-gray-600" : "text-gray-300"
                  }`}
                />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск уведомлений..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedFilter === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setSelectedFilter("unread")}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedFilter === "unread"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Непрочитанные
                {unreadCount > 0 && (
                  <span className="ml-1 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Notifications List */}
          <div className="px-6 py-4 pb-20">
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const NotificationIcon =
                  notificationTypes[notification.type].icon;
                return (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-xl p-4 shadow-sm border ${
                      notification.read
                        ? "border-gray-100"
                        : "border-purple-200"
                    } hover:shadow-md transition-shadow relative`}
                  >
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-600 rounded-full"></div>
                    )}
                    <div className="flex items-start mb-3">
                      {notification.avatar && (
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <ImageWithFallback
                            src={notification.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-black font-medium">
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${notificationTypes[notification.type].color}`}
                      >
                        <NotificationIcon className="w-3 h-3 mr-1" />
                        {notification.type === "new_client" && "Новый клиент"}
                        {notification.type === "reminder" && "Напоминание"}
                        {notification.type === "message" && "Сообщение"}
                        {notification.type === "viewing" && "Просмотр"}
                        {notification.type === "system" && "Системное"}
                      </div>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Пометить как прочитанное"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          title="Удалить"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-black mb-2">Уведомлений нет</h3>
                <p className="text-gray-500">
                  {selectedFilter === "unread"
                    ? "У вас нет непрочитанных уведомлений"
                    : "Попробуйте изменить параметры поиска"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl text-black">Уведомления</h1>
                <p className="text-gray-500">
                  {unreadCount > 0
                    ? `${unreadCount} непрочитанных уведомлений`
                    : "Все уведомления прочитаны"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={markAllAsRead}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    unreadCount > 0
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  } transition-colors`}
                  disabled={unreadCount === 0}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Прочитать все
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Поиск уведомлений..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Все уведомления</option>
                  <option value="unread">Только непрочитанные</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Notifications List */}
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const NotificationIcon =
                  notificationTypes[notification.type].icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      !notification.read && "bg-purple-50"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-lg mr-4 ${notificationTypes[notification.type].color}`}
                      >
                        <NotificationIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-lg ${
                              notification.read ? "text-gray-700" : "text-black"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {notification.description}
                        </p>
                        <div className="mt-3 flex items-center space-x-4">
                          {notification.avatar && (
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <ImageWithFallback
                                src={notification.avatar}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1"></div>
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Прочитано
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-black mb-2">Уведомлений нет</h3>
                <p className="text-gray-500">
                  {selectedFilter === "unread"
                    ? "У вас нет непрочитанных уведомлений"
                    : "Попробуйте изменить параметры поиска"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
