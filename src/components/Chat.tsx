import { useState } from "react";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  Search,
  Info,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";

interface ChatProps {
  propertyId?: string | null;
  onBack: () => void;
}

const chatsList = [
  {
    id: "1",
    name: "СтройИнвест",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Доступна ли квартира для просмотра завтра?",
    timestamp: "14:30",
    unread: 2,
    online: true,
    propertyName: 'ЖК "Северная звезда"',
    type: "developer",
  },
  {
    id: "2",
    name: "Новострой",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Спасибо за интерес к нашему проекту!",
    timestamp: "13:45",
    unread: 0,
    online: false,
    propertyName: 'ЖК "Новый Горизонт"',
    type: "developer",
  },
  {
    id: "3",
    name: "Анна Смирнова",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Когда можно посмотреть квартиру?",
    timestamp: "12:20",
    unread: 1,
    online: true,
    propertyName: 'ЖК "Центральный"',
    type: "buyer",
  },
  {
    id: "4",
    name: "Михаил Петров",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Есть ли скидки для покупки в ипотеку?",
    timestamp: "Вчера",
    unread: 0,
    online: false,
    propertyName: 'ЖК "Парковый"',
    type: "buyer",
  },
];

const messages = [
  {
    id: "1",
    text: 'Здравствуйте! Интересует ли вас квартира в ЖК "Северная звезда"?',
    sender: "other",
    timestamp: "14:20",
    type: "text",
  },
  {
    id: "2",
    text: "Да, хотелось бы узнать подробности о двухкомнатной квартире на 5 этаже",
    sender: "me",
    timestamp: "14:22",
    type: "text",
  },
  {
    id: "3",
    text: "Отличный выбор! Эта квартира имеет площадь 65 м², с видом на парк. Стоимость 8,5 млн рублей.",
    sender: "other",
    timestamp: "14:23",
    type: "text",
  },
  {
    id: "4",
    text: "Вот планировка квартиры",
    sender: "other",
    timestamp: "14:24",
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
  },
  {
    id: "5",
    text: "Спасибо! А доступна ли квартира для просмотра завтра?",
    sender: "me",
    timestamp: "14:30",
    type: "text",
  },
];

export function Chat({ propertyId, onBack }: ChatProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(
    propertyId ? "1" : null,
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedChatData = chatsList.find((chat) => chat.id === selectedChat);
  const filteredChats = chatsList.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.propertyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-h-[80dvh] bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {selectedChat ? (
            /* Mobile Chat View */
            <div className="flex flex-col h-screen">
              {/* Mobile Chat Header */}
              <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <ImageWithFallback
                      src={selectedChatData?.avatar || ""}
                      alt={selectedChatData?.name || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black">{selectedChatData?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedChatData?.propertyName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === "me"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.type === "image" && message.imageUrl ? (
                        <div className="mb-2">
                          <ImageWithFallback
                            src={message.imageUrl}
                            alt="Shared image"
                            className="w-full rounded-lg"
                          />
                        </div>
                      ) : null}
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "me"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-end space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 min-h-[40px] max-h-32 bg-gray-100 rounded-2xl flex items-end">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Напишите сообщение..."
                      rows={1}
                      className="flex-1 bg-transparent px-4 py-2 resize-none outline-none placeholder-gray-400"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Chat List */
            <div>
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
                      <h1 className="text-lg text-black">Сообщения</h1>
                      <p className="text-sm text-gray-500">
                        {filteredChats.length} чатов
                      </p>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск по чатам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Mobile Chat List */}
              <div className="pb-20">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={chat.avatar}
                            alt={chat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-black">{chat.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {chat.timestamp}
                            </span>
                            {chat.unread > 0 && (
                              <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                          {chat.propertyName}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block h-[94vh]">
        <BuyerHeader
          title={"Сообщения"}
          description={"Общение с застройщиками и покупателями"}
        />
        <div className="grid grid-cols-12 h-full">
          {/* Desktop Chat List */}
          <div className="col-span-4 bg-white border-r border-gray-200 flex flex-col">
            {/* Desktop Chat List Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-black">Сообщения</h2>
                <div className="text-sm text-gray-500">
                  {filteredChats.length} чатов
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск по чатам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Desktop Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 ${
                    selectedChat === chat.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className="relative mr-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-black">{chat.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {chat.timestamp}
                          </span>
                          {chat.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {chat.propertyName}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Chat Content */}
          <div className="col-span-8 flex flex-col">
            {selectedChat && selectedChatData ? (
              <>
                {/* Desktop Chat Header */}
                <div className="px-8 py-6 bg-white border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={selectedChatData.avatar}
                            alt={selectedChatData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {selectedChatData.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl text-black">
                          {selectedChatData.name}
                        </h3>
                        <p className="text-gray-500">
                          {selectedChatData.propertyName}
                        </p>
                        <p className="text-sm text-gray-400">
                          {selectedChatData.online
                            ? "В сети"
                            : "Был в сети недавно"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Phone className="w-6 h-6" />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Video className="w-6 h-6" />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Info className="w-6 h-6" />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-md px-6 py-4 rounded-2xl ${
                          message.sender === "me"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.type === "image" && message.imageUrl ? (
                          <div className="mb-3">
                            <ImageWithFallback
                              src={message.imageUrl}
                              alt="Shared image"
                              className="w-full rounded-lg"
                            />
                          </div>
                        ) : null}
                        <p className="text-base leading-relaxed">
                          {message.text}
                        </p>
                        <p
                          className={`text-sm mt-2 ${
                            message.sender === "me"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Message Input */}
                <div className="p-8 bg-white border-t border-gray-200">
                  <div className="flex items-end space-x-4">
                    <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-6 h-6" />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Image className="w-6 h-6" />
                    </button>
                    <div className="flex-1 min-h-[48px] max-h-32 bg-gray-100 rounded-2xl flex items-end">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Напишите сообщение..."
                        rows={1}
                        className="flex-1 bg-transparent px-6 py-3 resize-none outline-none placeholder-gray-400 text-base"
                        style={{ minHeight: "48px" }}
                      />
                      <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile className="w-6 h-6" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Chat Selected */
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl text-black mb-2">Выберите чат</h3>
                  <p className="text-gray-500">
                    Выберите беседу из списка слева, чтобы начать общение
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
