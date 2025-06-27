import { useState } from "react";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Video,
  Eye,
  Phone,
  MessageSquare,
  CheckCircle,
  X,
  Filter,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AddViewingModal } from "./AddViewingModal";

interface ViewingCalendarProps {
  onBack: () => void;
}

const viewings = [
  {
    id: "1",
    date: "2024-06-26",
    time: "14:00",
    duration: 60,
    client: {
      name: "Анна Смирнова",
      phone: "+7 (999) 123-45-67",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face",
    },
    property: 'ЖК "Северная звезда", кв. 45',
    type: "ar",
    status: "confirmed",
    notes: "Клиент заинтересован в 2-комнатной квартире",
  },
  {
    id: "2",
    date: "2024-06-26",
    time: "16:30",
    duration: 45,
    client: {
      name: "Михаил Петров",
      phone: "+7 (999) 234-56-78",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    property: 'ЖК "Новый Горизонт", кв. 12',
    type: "vr",
    status: "confirmed",
    notes: "VR-просмотр в офисе",
  },
  {
    id: "3",
    date: "2024-06-27",
    time: "11:00",
    duration: 90,
    client: {
      name: "Елена Козлова",
      phone: "+7 (999) 345-67-89",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    property: 'ЖК "Парковый", кв. 78',
    type: "physical",
    status: "pending",
    notes: "Физический осмотр объекта",
  },
  {
    id: "4",
    date: "2024-06-28",
    time: "15:00",
    duration: 60,
    client: {
      name: "Дмитрий Волков",
      phone: "+7 (999) 456-78-90",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    property: 'ЖК "Центральный", кв. 156',
    type: "ar",
    status: "cancelled",
    notes: "Отменен клиентом",
  },
];

const typeConfig = {
  ar: { label: "AR Просмотр", color: "bg-blue-100 text-blue-700", icon: Eye },
  vr: {
    label: "VR Просмотр",
    color: "bg-purple-100 text-purple-700",
    icon: Video,
  },
  physical: {
    label: "Физический",
    color: "bg-green-100 text-green-700",
    icon: MapPin,
  },
};

const statusConfig = {
  confirmed: {
    label: "Подтвержден",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  pending: {
    label: "Ожидает",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  cancelled: { label: "Отменен", color: "bg-red-100 text-red-700", icon: X },
};

export function ViewingCalendar({ onBack }: ViewingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showAddViewingModal, setShowAddViewingModal] = useState(false);
  const [viewingsList, setViewingsList] = useState(viewings);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getViewingsForDate = (date: string) => {
    return viewingsList.filter((viewing) => viewing.date === date);
  };

  const todayViewings = getViewingsForDate(selectedDate);
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleAddViewing = (viewingData: any) => {
    setViewingsList((prev) => [...prev, viewingData]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AddViewingModal
        isOpen={showAddViewingModal}
        onClose={() => setShowAddViewingModal(false)}
        onSave={handleAddViewing}
        selectedDate={selectedDate}
      />

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
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
                  <h1 className="text-lg">Календарь показов</h1>
                  <p className="text-sm text-gray-500">
                    {todayViewings.length} на сегодня
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddViewingModal(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg text-black">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center py-2 text-xs text-gray-500"
                >
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentDate).map((day, index) => {
                if (!day) return <div key={index} className="p-2"></div>;
                const dateStr = day.toISOString().split("T")[0];
                const hasViewings = getViewingsForDate(dateStr).length > 0;
                const isSelected = dateStr === selectedDate;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 text-sm rounded-lg transition-colors relative ${
                      isSelected
                        ? "bg-green-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {day.getDate()}
                    {hasViewings && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-green-500"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-4 pb-20">
            <h3 className="text-lg text-black mb-4">
              Показы на{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                "ru-RU",
                { day: "numeric", month: "long" },
              )}
            </h3>
            <div className="space-y-4">
              {todayViewings.map((viewing) => {
                const TypeIcon = typeConfig[viewing.type].icon;
                return (
                  <div
                    key={viewing.id}
                    className="bg-white rounded-xl p-4 shadow-sm border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <ImageWithFallback
                            src={viewing.client.avatar}
                            alt={viewing.client.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-black">{viewing.client.name}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {viewing.time} ({viewing.duration} мин)
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${typeConfig[viewing.type].color}`}
                      >
                        {typeConfig[viewing.type].label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 text-sm">
                        {viewing.client.phone}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
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
              {todayViewings.length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Нет показов на эту дату</p>
                  <button
                    onClick={() => setShowAddViewingModal(true)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Запланировать показ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-8 h-screen">
          <div className="col-span-8 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl text-black">Календарь показов</h1>
                <button
                  onClick={() => setShowAddViewingModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Новый показ
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-xl text-black">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="p-4 text-center text-sm text-gray-600 border-r border-gray-200 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    if (!day)
                      return (
                        <div
                          key={index}
                          className="h-32 border-r border-b border-gray-200 last:border-r-0"
                        ></div>
                      );
                    const dateStr = day.toISOString().split("T")[0];
                    const dayViewings = getViewingsForDate(dateStr);
                    const isSelected = dateStr === selectedDate;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`h-32 border-r border-b border-gray-200 last:border-r-0 p-2 cursor-pointer transition-colors ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}`}
                      >
                        <div
                          className={`text-sm mb-2 ${isSelected ? "text-green-600" : "text-gray-700"}`}
                        >
                          {day.getDate()}
                        </div>
                        <div className="space-y-1 overflow-hidden">
                          {dayViewings.slice(0, 3).map((viewing) => (
                            <div
                              key={viewing.id}
                              className={`text-xs p-1 rounded text-white truncate ${viewing.type === "ar" ? "bg-blue-500" : viewing.type === "vr" ? "bg-purple-500" : "bg-green-500"}`}
                            >
                              {viewing.time} {viewing.client.name}
                            </div>
                          ))}
                          {dayViewings.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{dayViewings.length - 3} ещё
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-white overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg text-black mb-2">
                {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                  "ru-RU",
                  { weekday: "long", day: "numeric", month: "long" },
                )}
              </h3>
              <p className="text-gray-500 mb-6">
                {todayViewings.length} показов запланировано
              </p>

              <div className="space-y-4">
                {todayViewings.map((viewing) => (
                  <div key={viewing.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <ImageWithFallback
                            src={viewing.client.avatar}
                            alt={viewing.client.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="text-black text-sm">
                            {viewing.client.name}
                          </h5>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {viewing.time} ({viewing.duration} мин)
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${typeConfig[viewing.type].color}`}
                      >
                        {typeConfig[viewing.type].label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 text-xs">
                        {viewing.client.phone}
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                          <MessageSquare className="w-3 h-3" />
                        </button>
                        <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors">
                          <Phone className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {todayViewings.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-3">
                      Нет показов на эту дату
                    </p>
                    <button
                      onClick={() => setShowAddViewingModal(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      Запланировать показ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
