import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Star,
  Eye,
  Trash2,
  Edit,
  Download,
  Plus,
  CheckCircle,
  Clock,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AddClientModal } from "./AddClientModal";

interface DeveloperCRMProps {
  onBack: () => void;
  onStartChat: (userId: string) => void;
}

const customers = [
  {
    id: "1",
    name: "Анна Смирнова",
    email: "anna.smirnova@email.com",
    phone: "+7 (999) 123-45-67",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face",
    property: 'ЖК "Северная звезда"',
    propertyId: "1",
    status: "interested",
    budget: "8-10 млн ₽",
    lastContact: "2 часа назад",
    source: "Сайт",
    viewings: 2,
    stage: "Заинтересован",
    notes: "Ищет 2-комнатную квартиру с балконом",
    priority: "high",
  },
  {
    id: "2",
    name: "Михаил Петров",
    email: "mikhail.petrov@email.com",
    phone: "+7 (999) 234-56-78",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    property: 'ЖК "Новый Горизонт"',
    propertyId: "2",
    status: "viewing_scheduled",
    budget: "5-6 млн ₽",
    lastContact: "1 день назад",
    source: "Реклама",
    viewings: 1,
    stage: "Показ запланирован",
    notes: "VR-просмотр запланирован на завтра",
    priority: "medium",
  },
  {
    id: "3",
    name: "Елена Козлова",
    email: "elena.kozlova@email.com",
    phone: "+7 (999) 345-67-89",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    property: 'ЖК "Парковый"',
    propertyId: "3",
    status: "contract_ready",
    budget: "6-7 млн ₽",
    lastContact: "3 дня назад",
    source: "Рекомендации",
    viewings: 3,
    stage: "Готов к сделке",
    notes: "Готова к заключению договора",
    priority: "high",
  },
  {
    id: "4",
    name: "Дмитрий Волков",
    email: "dmitry.volkov@email.com",
    phone: "+7 (999) 456-78-90",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    property: 'ЖК "Центральный"',
    propertyId: "4",
    status: "follow_up",
    budget: "12-15 млн ₽",
    lastContact: "1 неделя назад",
    source: "Агент",
    viewings: 1,
    stage: "Требует внимания",
    notes: "Не отвечает на звонки последнюю неделю",
    priority: "low",
  },
];

const statusConfig = {
  interested: {
    label: "Заинтересован",
    color: "bg-blue-100 text-blue-700",
    icon: Star,
  },
  viewing_scheduled: {
    label: "Показ запланирован",
    color: "bg-orange-100 text-orange-700",
    icon: Calendar,
  },
  contract_ready: {
    label: "Готов к сделке",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  follow_up: {
    label: "Требует внимания",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

const priorityConfig = {
  high: { label: "Высокий", color: "border-l-red-500" },
  medium: { label: "Средний", color: "border-l-yellow-500" },
  low: { label: "Низкий", color: "border-l-gray-500" },
};

export function DeveloperCRM({ onBack, onStartChat }: DeveloperCRMProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [customersList, setCustomersList] = useState(customers);

  const filteredCustomers = customersList.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customersList.length,
    interested: customersList.filter((c) => c.status === "interested").length,
    scheduled: customersList.filter((c) => c.status === "viewing_scheduled")
      .length,
    ready: customersList.filter((c) => c.status === "contract_ready").length,
    followUp: customersList.filter((c) => c.status === "follow_up").length,
  };

  const handleAddClient = (clientData: any) => {
    setCustomersList((prev) => [...prev, clientData]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add Client Modal */}
      <AddClientModal
        isOpen={showAddClientModal}
        onClose={() => setShowAddClientModal(false)}
        onSave={handleAddClient}
      />

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
                  <h1 className="text-lg">CRM Система</h1>
                  <p className="text-sm text-gray-500">
                    {filteredCustomers.length} клиентов
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddClientModal(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск клиентов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedStatus === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Все ({stats.total})
              </button>
              <button
                onClick={() => setSelectedStatus("interested")}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedStatus === "interested"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Заинтересованы ({stats.interested})
              </button>
              <button
                onClick={() => setSelectedStatus("viewing_scheduled")}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedStatus === "viewing_scheduled"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Показы ({stats.scheduled})
              </button>
              <button
                onClick={() => setSelectedStatus("contract_ready")}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedStatus === "contract_ready"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                К сделке ({stats.ready})
              </button>
            </div>
          </div>

          {/* Mobile Customer List */}
          <div className="px-6 py-4 pb-20">
            <div className="space-y-4">
              {filteredCustomers.map((customer) => {
                const StatusIcon = statusConfig[customer.status].icon;
                return (
                  <div
                    key={customer.id}
                    className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${priorityConfig[customer.priority].color} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <ImageWithFallback
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-black">{customer.name}</h3>
                          <p className="text-gray-500 text-sm">
                            {customer.property}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${statusConfig[customer.status].color}`}
                        >
                          {statusConfig[customer.status].label}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-500">Бюджет</p>
                        <p className="text-black">{customer.budget}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Просмотры</p>
                        <p className="text-black">{customer.viewings}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Источник</p>
                        <p className="text-black">{customer.source}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Последний контакт</p>
                        <p className="text-black">{customer.lastContact}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-600 text-sm">{customer.notes}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onStartChat(customer.id)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-black mb-2">Клиенты не найдены</h3>
                <p className="text-gray-500 mb-4">
                  Попробуйте изменить параметры поиска
                </p>
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Добавить клиента
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-6">
        <div className="grid grid-cols-12 gap-8 h-screen">
          {/* Desktop Stats Sidebar */}
          <div className="col-span-3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl text-black mb-6">Статистика CRM</h2>

              {/* Stats Cards */}
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-purple-600">
                        {stats.total}
                      </div>
                      <div className="text-sm text-purple-700">
                        Всего клиентов
                      </div>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-blue-600">
                        {stats.interested}
                      </div>
                      <div className="text-sm text-blue-700">
                        Заинтересованы
                      </div>
                    </div>
                    <Star className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-orange-600">
                        {stats.scheduled}
                      </div>
                      <div className="text-sm text-orange-700">
                        Показы назначены
                      </div>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-green-600">
                        {stats.ready}
                      </div>
                      <div className="text-sm text-green-700">
                        Готовы к сделке
                      </div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-red-600">
                        {stats.followUp}
                      </div>
                      <div className="text-sm text-red-700">
                        Требуют внимания
                      </div>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-black mb-3">Быстрые действия</h3>
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Добавить клиента
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Экспорт данных
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Main Content */}
          <div className="col-span-9 flex flex-col">
            {/* Desktop Controls */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl text-black">CRM Система</h1>
                  <p className="text-gray-500">
                    {filteredCustomers.length} клиентов найдено
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "table"
                          ? "bg-white text-purple-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("cards")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "cards"
                          ? "bg-white text-purple-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddClientModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить клиента
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Поиск клиентов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-gray-100 rounded-lg px-4 py-2 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Все статусы</option>
                    <option value="interested">Заинтересованы</option>
                    <option value="viewing_scheduled">Показы назначены</option>
                    <option value="contract_ready">Готовы к сделке</option>
                    <option value="follow_up">Требуют внимания</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {viewMode === "table" ? (
                /* Table View */
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Клиент
                          </th>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Объект
                          </th>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Статус
                          </th>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Бюджет
                          </th>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Просмотры
                          </th>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Последний контакт
                          </th>
                          <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">
                            Действия
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredCustomers.map((customer) => {
                          const StatusIcon = statusConfig[customer.status].icon;
                          return (
                            <tr
                              key={customer.id}
                              className={`hover:bg-gray-50 transition-colors border-l-4 ${priorityConfig[customer.priority].color}`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    <ImageWithFallback
                                      src={customer.avatar}
                                      alt={customer.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-black">
                                      {customer.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                      {customer.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-black">
                                  {customer.property}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  Источник: {customer.source}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[customer.status].color}`}
                                >
                                  <StatusIcon className="w-4 h-4 mr-1" />
                                  {statusConfig[customer.status].label}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-black">
                                {customer.budget}
                              </td>
                              <td className="px-6 py-4 text-black">
                                {customer.viewings}
                              </td>
                              <td className="px-6 py-4 text-gray-500">
                                {customer.lastContact}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => onStartChat(customer.id)}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                    title="Чат"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                    title="Позвонить"
                                  >
                                    <Phone className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                                    title="Email"
                                  >
                                    <Mail className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Ещё"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Cards View */
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {filteredCustomers.map((customer) => {
                    const StatusIcon = statusConfig[customer.status].icon;
                    return (
                      <div
                        key={customer.id}
                        className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${priorityConfig[customer.priority].color} hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                              <ImageWithFallback
                                src={customer.avatar}
                                alt={customer.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-black">{customer.name}</h3>
                              <p className="text-gray-500 text-sm">
                                {customer.email}
                              </p>
                            </div>
                          </div>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">
                              Объект интереса
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusConfig[customer.status].color}`}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[customer.status].label}
                            </span>
                          </div>
                          <p className="text-black">{customer.property}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-500 text-sm">Бюджет</p>
                            <p className="text-black">{customer.budget}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Просмотры</p>
                            <p className="text-black">{customer.viewings}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Источник</p>
                            <p className="text-black">{customer.source}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Контакт</p>
                            <p className="text-black">{customer.lastContact}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-500 text-sm mb-1">Заметки</p>
                          <p className="text-gray-700 text-sm">
                            {customer.notes}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Приоритет: {priorityConfig[customer.priority].label}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => onStartChat(customer.id)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              title="Чат"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Позвонить"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                              title="Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-black mb-2">Клиенты не найдены</h3>
                  <p className="text-gray-500 mb-4">
                    Попробуйте изменить параметры поиска
                  </p>
                  <button
                    onClick={() => setShowAddClientModal(true)}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Добавить клиента
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
