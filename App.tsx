import { useState } from "react";
import {
  Search,
  Home,
  MapPin,
  MessageSquare,
  User,
  Plus,
  Calendar,
  Users,
  Building2,
  Menu,
  X,
  Bell,
  Settings,
  List,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { UserTypeSelection } from "./components/UserTypeSelection";
import { BuyerAuth } from "./components/Page";
import { DeveloperAuth } from "./components/DeveloperAuth";
import { PropertyMap } from "./components/PropertyMap";
import { PropertyList } from "./components/PropertyList";
import { PropertyDetail } from "./components/PropertyDetail";
import { Chat } from "./components/Chat";
import { Profile } from "./components/Profile";
import { ARViewer } from "./components/ARViewer";
import { AddProperty } from "./components/AddProperty";
import { DeveloperCRM } from "./components/DeveloperCRM";
import { ViewingCalendar } from "./components/ViewingCalendar";

type AuthState =
  | "selection"
  | "buyer-auth"
  | "developer-auth"
  | "authenticated";
type UserType = "buyer" | "developer" | null;
type Screen =
  | "home"
  | "map"
  | "list"
  | "detail"
  | "chat"
  | "profile"
  | "ar-viewer"
  | "add-property"
  | "crm"
  | "calendar";

function FooterInfo() {
  return (
    <div className="fixed bottom-4 left-4 z-50 hidden lg:block">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="text-sm">
            <span className="text-gray-600">v2.1.0</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-600">Статус: Онлайн</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>("selection");
  const [userType, setUserType] = useState<UserType>("buyer");
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUserTypeSelect = (type: "buyer" | "developer") => {
    setUserType(type);
    setAuthState(type === "buyer" ? "buyer-auth" : "developer-auth");
  };

  const handleAuthSuccess = () => {
    setAuthState("authenticated");
  };

  const handleBack = () => {
    setAuthState("selection");
    setUserType(null);
  };

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentScreen("detail");
  };

  const handleLogout = () => {
    setAuthState("selection");
    setUserType(null);
    setCurrentScreen("home");
  };

  const handleStartARViewer = () => {
    setCurrentScreen("ar-viewer");
  };

  const handlePropertySave = (propertyData: any) => {
    console.log("Property saved:", propertyData);
    alert("Объект успешно добавлен!");
    setCurrentScreen("home");
  };

  const navigationItems =
    userType === "buyer"
      ? [
          {
            id: "home",
            icon: Home,
            label: "Главная",
            screen: "home" as Screen,
          },
          { id: "map", icon: MapPin, label: "Карта", screen: "map" as Screen },
          {
            id: "list",
            icon: Search,
            label: "Поиск",
            screen: "list" as Screen,
          },
          {
            id: "chat",
            icon: MessageSquare,
            label: "Чаты",
            screen: "chat" as Screen,
          },
          {
            id: "profile",
            icon: User,
            label: "Профиль",
            screen: "profile" as Screen,
          },
        ]
      : [
          {
            id: "home",
            icon: Home,
            label: "Главная",
            screen: "home" as Screen,
          },
          {
            id: "map",
            icon: Building2,
            label: "Карта",
            screen: "map" as Screen,
          },
          {
            id: "list",
            icon: List,
            label: "Мои объекты",
            screen: "list" as Screen,
          },
          { id: "crm", icon: Users, label: "CRM", screen: "crm" as Screen },
          {
            id: "calendar",
            icon: Calendar,
            label: "Календарь",
            screen: "calendar" as Screen,
          },
          {
            id: "profile",
            icon: User,
            label: "Профиль",
            screen: "profile" as Screen,
          },
        ];

  // Show authentication screens
  if (authState !== "authenticated") {
    switch (authState) {
      case "selection":
        return <UserTypeSelection onSelectUserType={handleUserTypeSelect} />;
      case "buyer-auth":
        return <BuyerAuth onBack={handleBack} onSuccess={handleAuthSuccess} />;
      case "developer-auth":
        return (
          <DeveloperAuth onBack={handleBack} onSuccess={handleAuthSuccess} />
        );
    }
  }

  // Fullscreen components (AR Viewer)
  if (currentScreen === "ar-viewer") {
    return (
      <ARViewer
        propertyId={selectedPropertyId!}
        onClose={() => setCurrentScreen("detail")}
      />
    );
  }

  // Main layout with responsive design
  return (
    <div className="min-h-screen bg-gray-50">
      <FooterInfo />

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Navigation */}
          {currentScreen !== "home" ? (
            // Show specific screen components for mobile
            <div>
              {currentScreen === "map" && (
                <PropertyMap
                  onPropertySelect={handlePropertySelect}
                  onBack={() => setCurrentScreen("home")}
                />
              )}
              {currentScreen === "list" && (
                <PropertyList
                  onPropertySelect={handlePropertySelect}
                  onBack={() => setCurrentScreen("home")}
                  userType={userType}
                />
              )}
              {currentScreen === "detail" && (
                <PropertyDetail
                  propertyId={selectedPropertyId!}
                  onBack={() => setCurrentScreen("home")}
                  onStartChat={() => setCurrentScreen("chat")}
                  onStartARViewer={handleStartARViewer}
                  userType={userType}
                />
              )}
              {currentScreen === "chat" && (
                <Chat
                  propertyId={selectedPropertyId}
                  onBack={() => setCurrentScreen("detail")}
                />
              )}
              {currentScreen === "profile" && (
                <Profile
                  userType={userType!}
                  onBack={() => setCurrentScreen("home")}
                  onLogout={handleLogout}
                />
              )}
              {currentScreen === "add-property" && (
                <AddProperty
                  onBack={() => setCurrentScreen("home")}
                  onSave={handlePropertySave}
                />
              )}
              {currentScreen === "crm" && (
                <DeveloperCRM
                  onBack={() => setCurrentScreen("home")}
                  onStartChat={(userId) => setCurrentScreen("chat")}
                />
              )}
              {currentScreen === "calendar" && (
                <ViewingCalendar onBack={() => setCurrentScreen("home")} />
              )}
            </div>
          ) : (
            // Mobile Home Screen
            <div>
              {/* Mobile Header */}
              <div className="px-6 pt-12 pb-4 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">
                      {userType === "buyer"
                        ? "Доброе утро,"
                        : "Добро пожаловать,"}
                    </p>
                    <h1 className="text-black">
                      {userType === "buyer" ? "Анна" : "Александр Иванов"}
                    </h1>
                    {userType === "developer" && (
                      <p className="text-sm text-emerald-600">
                        ООО "СтройИнвест" • Рейтинг 4.8 ⭐
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentScreen("profile")}
                    className="w-12 h-12 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <ImageWithFallback
                      src={
                        userType === "buyer"
                          ? "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face"
                          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      userType === "buyer"
                        ? "Поиск квартир, районов..."
                        : "Поиск по объектам, клиентам..."
                    }
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Mobile Content */}
              {userType === "buyer" ? (
                <div className="px-6 pb-20">
                  {/* Quick Actions */}
                  <div className="mb-6">
                    <h2 className="text-lg mb-4">Поиск недвижимости</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setCurrentScreen("map")}
                        className="bg-blue-50 p-4 rounded-xl text-left hover:bg-blue-100 transition-colors"
                      >
                        <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                        <h3 className="text-black mb-1">Карта объектов</h3>
                        <p className="text-gray-500 text-sm">Поиск на карте</p>
                      </button>
                      <button
                        onClick={() => setCurrentScreen("list")}
                        className="bg-green-50 p-4 rounded-xl text-left hover:bg-green-100 transition-colors"
                      >
                        <Home className="w-6 h-6 text-green-600 mb-2" />
                        <h3 className="text-black mb-1">Списком</h3>
                        <p className="text-gray-500 text-sm">Все объявления</p>
                      </button>
                    </div>
                  </div>

                  {/* Recent Properties */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg">Новые объекты</h2>
                      <button
                        onClick={() => setCurrentScreen("list")}
                        className="text-blue-500 text-sm"
                      >
                        Все объекты
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div
                        onClick={() => handlePropertySelect("1")}
                        className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex">
                          <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                            <ImageWithFallback
                              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=160&h=160&fit=crop"
                              alt="Apartment"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-black mb-1">
                              ЖК "Северная звезда"
                            </h4>
                            <p className="text-gray-500 text-sm mb-1">
                              2-комн., 65 м²
                            </p>
                            <p className="text-blue-600">от 8,5 млн ₽</p>
                            <div className="flex items-center mt-2">
                              <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                                Облицовка
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => handlePropertySelect("2")}
                        className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex">
                          <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                            <ImageWithFallback
                              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=160&fit=crop"
                              alt="Apartment"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-black mb-1">
                              ЖК "Новый Горизонт"
                            </h4>
                            <p className="text-gray-500 text-sm mb-1">
                              1-комн., 42 м²
                            </p>
                            <p className="text-blue-600">от 5,2 млн ₽</p>
                            <div className="flex items-center mt-2">
                              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                Строительство
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Popular Areas */}
                  <div>
                    <h2 className="text-lg mb-4">Популярные районы</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative rounded-xl overflow-hidden h-24">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=120&fit=crop"
                          alt="Центр"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                          <div className="text-white">
                            <h4 className="text-sm">Центр</h4>
                            <p className="text-xs opacity-90">120+ объектов</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative rounded-xl overflow-hidden h-24">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1486718448742-163732cd1544?w=200&h=120&fit=crop"
                          alt="Северный"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                          <div className="text-white">
                            <h4 className="text-sm">Северный</h4>
                            <p className="text-xs opacity-90">85+ объектов</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Developer Dashboard Mobile */
                <div className="px-6 pb-20">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-6 mb-6">
                    <h2 className="text-lg mb-2">Панель застройщика</h2>
                    <p className="text-emerald-100 text-sm">
                      Управление объектами недвижимости
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-6">
                    <h2 className="text-lg mb-4">Быстрые действия</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setCurrentScreen("add-property")}
                        className="bg-blue-50 p-4 rounded-xl text-left hover:bg-blue-100 transition-colors"
                      >
                        <Plus className="w-6 h-6 text-blue-600 mb-2" />
                        <h3 className="text-black mb-1">Добавить объект</h3>
                        <p className="text-gray-500 text-sm">Новый ЖК</p>
                      </button>
                      <button
                        onClick={() => setCurrentScreen("list")}
                        className="bg-emerald-50 p-4 rounded-xl text-left hover:bg-emerald-100 transition-colors"
                      >
                        <List className="w-6 h-6 text-emerald-600 mb-2" />
                        <h3 className="text-black mb-1">Мои объекты</h3>
                        <p className="text-gray-500 text-sm">Списком</p>
                      </button>
                      <button
                        onClick={() => setCurrentScreen("crm")}
                        className="bg-purple-50 p-4 rounded-xl text-left hover:bg-purple-100 transition-colors"
                      >
                        <Users className="w-6 h-6 text-purple-600 mb-2" />
                        <h3 className="text-black mb-1">CRM</h3>
                        <p className="text-gray-500 text-sm">Клиенты</p>
                      </button>
                      <button
                        onClick={() => setCurrentScreen("calendar")}
                        className="bg-green-50 p-4 rounded-xl text-left hover:bg-green-100 transition-colors"
                      >
                        <Calendar className="w-6 h-6 text-green-600 mb-2" />
                        <h3 className="text-black mb-1">Календарь</h3>
                        <p className="text-gray-500 text-sm">Показы</p>
                      </button>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="mb-6">
                    <h2 className="text-lg mb-4">Статистика</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <h3 className="text-black mb-1">Активные объекты</h3>
                        <div className="text-2xl text-emerald-600 mb-1">12</div>
                        <p className="text-gray-400 text-xs">ЖК в продаже</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <h3 className="text-black mb-1">Новые заявки</h3>
                        <div className="text-2xl text-blue-600 mb-1">8</div>
                        <p className="text-gray-400 text-xs">за сегодня</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <h3 className="text-black mb-1">Показы на неделю</h3>
                        <div className="text-2xl text-purple-600 mb-1">15</div>
                        <p className="text-gray-400 text-xs">запланировано</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <h3 className="text-black mb-1">Продажи за месяц</h3>
                        <div className="text-2xl text-green-600 mb-1">24</div>
                        <p className="text-gray-400 text-xs">квартиры</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h2 className="text-lg mb-4">Последняя активность</h2>
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-black text-sm">
                              Новая заявка от Анны Смирновой
                            </p>
                            <p className="text-gray-500 text-xs">
                              ЖК "Северная звезда" • 2 часа назад
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <Calendar className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-black text-sm">
                              Подтвержден показ с Михаилом Петровым
                            </p>
                            <p className="text-gray-500 text-xs">
                              Завтра в 16:30 • VR-просмотр
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <Building2 className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-black text-sm">
                              Объект прошел проверку ЕГРН
                            </p>
                            <p className="text-gray-500 text-xs">
                              ЖК "Парковый" • 1 день назад
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Bottom Navigation */}
              <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
                <div className="flex items-center justify-around py-3">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.screen)}
                      className={`flex flex-col items-center py-2 px-4 ${currentScreen === item.screen ? "text-blue-600" : "text-gray-400"}`}
                    >
                      <item.icon className="w-6 h-6 mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="mr-3">
                <NovaKeyLogo className="text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  {userType === "buyer" ? "Покупатель" : "Застройщик"}
                </p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <ImageWithFallback
                  src={
                    userType === "buyer"
                      ? "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face"
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-black">
                  {userType === "buyer" ? "Анна" : "Александр Иванов"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {userType === "buyer" ? "Покупатель" : "СтройИнвест"}
                </p>
                {userType === "developer" && (
                  <p className="text-emerald-600 text-xs">Рейтинг 4.8 ⭐</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.screen)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    currentScreen === item.screen
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}

              {userType === "developer" && (
                <button
                  onClick={() => setCurrentScreen("add-property")}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Добавить объект
                </button>
              )}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentScreen("profile")}
              className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              Настройки
            </button>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-black">
                  {currentScreen === "home" && "Главная"}
                  {currentScreen === "map" &&
                    (userType === "buyer"
                      ? "Карта объектов"
                      : "Карта объектов")}
                  {currentScreen === "list" &&
                    (userType === "buyer"
                      ? "Поиск недвижимости"
                      : "Мои объекты")}
                  {currentScreen === "detail" && "Детали объекта"}
                  {currentScreen === "chat" && "Сообщения"}
                  {currentScreen === "profile" && "Профиль"}
                  {currentScreen === "add-property" && "Добавить объект"}
                  {currentScreen === "crm" && "CRM Система"}
                  {currentScreen === "calendar" && "Календарь показов"}
                </h1>
                <p className="text-gray-500">
                  {currentScreen === "home" &&
                    (userType === "buyer"
                      ? "Найдите идеальную недвижимость"
                      : "Управляйте вашими объектами")}
                  {currentScreen === "map" && "Интерактивная карта с объектами"}
                  {currentScreen === "list" &&
                    (userType === "buyer"
                      ? "Список всех доступных объектов"
                      : "Управление вашими объектами")}
                  {currentScreen === "crm" && "Управление клиентами и заявками"}
                  {currentScreen === "calendar" && "Планирование показов"}
                  {currentScreen === "chat" &&
                    "Общение с застройщиками и покупателями"}
                  {currentScreen === "profile" &&
                    "Управление профилем и настройками"}
                  {currentScreen === "add-property" &&
                    "Добавление нового объекта недвижимости"}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      userType === "buyer"
                        ? "Поиск квартир, районов..."
                        : "Поиск по объектам, клиентам..."
                    }
                    className="w-96 bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>

                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Desktop Content Area */}
          <main className="flex-1 p-8 overflow-auto">
            {currentScreen === "home" && (
              <div className="max-w-7xl mx-auto">
                {userType === "buyer" ? (
                  <div className="grid grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="col-span-8">
                      {/* Quick Actions */}
                      <div className="mb-8">
                        <h2 className="text-xl mb-6">Поиск недвижимости</h2>
                        <div className="grid grid-cols-3 gap-6">
                          <button
                            onClick={() => setCurrentScreen("map")}
                            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-left hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200"
                          >
                            <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="text-black mb-2">Карта объектов</h3>
                            <p className="text-gray-500 text-sm">
                              Поиск на интерактивной карте
                            </p>
                          </button>
                          <button
                            onClick={() => setCurrentScreen("list")}
                            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-left hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200"
                          >
                            <Home className="w-8 h-8 text-green-600 mb-3" />
                            <h3 className="text-black mb-2">Списком</h3>
                            <p className="text-gray-500 text-sm">
                              Все объявления с фильтрами
                            </p>
                          </button>
                          <button
                            onClick={() => setCurrentScreen("chat")}
                            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-left hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200"
                          >
                            <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
                            <h3 className="text-black mb-2">Чаты</h3>
                            <p className="text-gray-500 text-sm">
                              Общение с застройщиками
                            </p>
                          </button>
                        </div>
                      </div>

                      {/* Recent Properties Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl">Новые объекты</h2>
                          <button
                            onClick={() => setCurrentScreen("list")}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            Посмотреть все →
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div
                            onClick={() => handlePropertySelect("1")}
                            className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                          >
                            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                                alt="Apartment"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-black mb-2">
                              ЖК "Северная звезда"
                            </h4>
                            <p className="text-gray-500 text-sm mb-2">
                              2-комн., 65 м²
                            </p>
                            <p className="text-blue-600 text-lg mb-3">
                              от 8,5 млн ₽
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
                                Облицовка
                              </span>
                              <span className="text-gray-400 text-sm">
                                AR просмотр
                              </span>
                            </div>
                          </div>

                          <div
                            onClick={() => handlePropertySelect("2")}
                            className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                          >
                            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
                                alt="Apartment"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-black mb-2">
                              ЖК "Новый Горизонт"
                            </h4>
                            <p className="text-gray-500 text-sm mb-2">
                              1-комн., 42 м²
                            </p>
                            <p className="text-blue-600 text-lg mb-3">
                              от 5,2 млн ₽
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                                Строительство
                              </span>
                              <span className="text-gray-400 text-sm">
                                VR просмотр
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4">
                      <div className="space-y-6">
                        {/* Popular Areas */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                          <h3 className="text-black mb-4">Популярные районы</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                              <span className="text-black">Центр</span>
                              <span className="text-gray-500 text-sm">
                                120+ объектов
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                              <span className="text-black">Северный</span>
                              <span className="text-gray-500 text-sm">
                                85+ объектов
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                              <span className="text-black">Южный</span>
                              <span className="text-gray-500 text-sm">
                                62+ объектов
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                          <h3 className="text-black mb-4">
                            Недавняя активность
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <p className="text-sm text-black">
                                  Просмотрели ЖК "Центральный"
                                </p>
                                <p className="text-xs text-gray-500">
                                  2 часа назад
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <p className="text-sm text-black">
                                  Добавили в избранное
                                </p>
                                <p className="text-xs text-gray-500">
                                  1 день назад
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <p className="text-sm text-black">
                                  Связались с застройщиком
                                </p>
                                <p className="text-xs text-gray-500">
                                  3 дня назад
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Developer Dashboard Desktop */
                  <div className="grid grid-cols-12 gap-8">
                    {/* Main Dashboard */}
                    <div className="col-span-8">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-8 mb-8">
                        <h2 className="text-2xl mb-3">Панель застройщика</h2>
                        <p className="text-emerald-100">
                          Управление объектами недвижимости и клиентами
                        </p>
                      </div>

                      {/* Quick Actions */}
                      <div className="mb-8">
                        <h2 className="text-xl mb-6">Быстрые действия</h2>
                        <div className="grid grid-cols-4 gap-6">
                          <button
                            onClick={() => setCurrentScreen("add-property")}
                            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200"
                          >
                            <Plus className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                            <h3 className="text-black mb-1">Добавить объект</h3>
                            <p className="text-gray-500 text-sm">Новый ЖК</p>
                          </button>
                          <button
                            onClick={() => setCurrentScreen("list")}
                            className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl text-center hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 border border-emerald-200"
                          >
                            <List className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                            <h3 className="text-black mb-1">Мои объекты</h3>
                            <p className="text-gray-500 text-sm">Списком</p>
                          </button>
                          <button
                            onClick={() => setCurrentScreen("crm")}
                            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200"
                          >
                            <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                            <h3 className="text-black mb-1">CRM</h3>
                            <p className="text-gray-500 text-sm">Клиенты</p>
                          </button>
                          <button
                            onClick={() => setCurrentScreen("calendar")}
                            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200"
                          >
                            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
                            <h3 className="text-black mb-1">Календарь</h3>
                            <p className="text-gray-500 text-sm">Показы</p>
                          </button>
                        </div>
                      </div>

                      {/* Statistics Grid */}
                      <div>
                        <h2 className="text-xl mb-6">Статистика</h2>
                        <div className="grid grid-cols-4 gap-6">
                          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                            <h3 className="text-black mb-2">
                              Активные объекты
                            </h3>
                            <div className="text-3xl text-emerald-600 mb-2">
                              12
                            </div>
                            <p className="text-gray-400 text-sm">
                              ЖК в продаже
                            </p>
                          </div>

                          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                            <h3 className="text-black mb-2">Новые заявки</h3>
                            <div className="text-3xl text-blue-600 mb-2">8</div>
                            <p className="text-gray-400 text-sm">за сегодня</p>
                          </div>

                          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                            <h3 className="text-black mb-2">
                              Показы на неделю
                            </h3>
                            <div className="text-3xl text-purple-600 mb-2">
                              15
                            </div>
                            <p className="text-gray-400 text-sm">
                              запланировано
                            </p>
                          </div>

                          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
                            <h3 className="text-black mb-2">
                              Продажи за месяц
                            </h3>
                            <div className="text-3xl text-green-600 mb-2">
                              24
                            </div>
                            <p className="text-gray-400 text-sm">квартиры</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-4">
                      <div className="space-y-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                          <h3 className="text-black mb-4">
                            Последняя активность
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <Users className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-black text-sm">
                                  Новая заявка от Анны Смирновой
                                </p>
                                <p className="text-gray-500 text-xs">
                                  ЖК "Северная звезда" • 2 часа назад
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <Calendar className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-black text-sm">
                                  Подтвержден показ с Михаилом Петровым
                                </p>
                                <p className="text-gray-500 text-xs">
                                  Завтра в 16:30 • VR-просмотр
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <Building2 className="w-5 h-5 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-black text-sm">
                                  Объект прошел проверку ЕГРН
                                </p>
                                <p className="text-gray-500 text-xs">
                                  ЖК "Парковый" • 1 день назад
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                          <h3 className="text-black mb-4">
                            Быстрая статистика
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Конверсия показов
                              </span>
                              <span className="text-green-600">23%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Средняя цена м²
                              </span>
                              <span className="text-black">142,500 ₽</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Активных чатов
                              </span>
                              <span className="text-blue-600">12</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Other screens rendered here with responsive design */}
            {currentScreen === "map" && (
              <PropertyMap
                onPropertySelect={handlePropertySelect}
                onBack={() => setCurrentScreen("home")}
              />
            )}
            {currentScreen === "list" && (
              <PropertyList
                onPropertySelect={handlePropertySelect}
                onBack={() => setCurrentScreen("home")}
                userType={userType}
              />
            )}
            {currentScreen === "detail" && (
              <PropertyDetail
                propertyId={selectedPropertyId!}
                onBack={() => setCurrentScreen("home")}
                onStartChat={() => setCurrentScreen("chat")}
                onStartARViewer={handleStartARViewer}
                userType={userType}
              />
            )}
            {currentScreen === "chat" && (
              <Chat
                propertyId={selectedPropertyId}
                onBack={() => setCurrentScreen("detail")}
              />
            )}
            {currentScreen === "profile" && (
              <Profile
                userType={userType!}
                onBack={() => setCurrentScreen("home")}
                onLogout={handleLogout}
              />
            )}
            {currentScreen === "add-property" && (
              <AddProperty
                onBack={() => setCurrentScreen("home")}
                onSave={handlePropertySave}
              />
            )}
            {currentScreen === "crm" && (
              <DeveloperCRM
                onBack={() => setCurrentScreen("home")}
                onStartChat={(userId) => setCurrentScreen("chat")}
              />
            )}
            {currentScreen === "calendar" && (
              <ViewingCalendar onBack={() => setCurrentScreen("home")} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
