import { useState } from "react";
import {
  ArrowLeft,
  User,
  Settings,
  Bell,
  Heart,
  Star,
  Calendar,
  MapPin,
  LogOut,
  Edit,
  Shield,
  CreditCard,
  Eye,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfileProps {
  userType: "buyer" | "developer";
  onBack: () => void;
  onLogout: () => void;
}

export function Profile({ userType, onBack, onLogout }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg text-black">Профиль</h1>
            </div>
          </div>

          {/* Mobile Profile Content */}
          <div className="p-6 pb-20">
            {/* User Info */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <ImageWithFallback
                  src={
                    userType === "buyer"
                      ? "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=200&h=200&fit=crop&crop=face"
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl text-black mb-1">
                {userType === "buyer" ? "Анна Смирнова" : "Александр Иванов"}
              </h2>
              <p className="text-gray-500 mb-1">
                {userType === "buyer" ? "Покупатель" : "Застройщик"}
              </p>
              {userType === "developer" && (
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-yellow-600">4.8</span>
                  <span className="text-gray-500 ml-1">(24 отзыва)</span>
                </div>
              )}
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4 mr-2 inline" />
                Редактировать
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <div className="bg-white rounded-xl border border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Личная информация</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Уведомления</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </button>
              </div>

              {userType === "buyer" && (
                <>
                  <div className="bg-white rounded-xl border border-gray-200">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">Избранное</span>
                      </div>
                      <span className="text-sm text-gray-500">3</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">
                          История просмотров
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">12</span>
                    </button>
                  </div>
                </>
              )}

              {userType === "developer" && (
                <>
                  <div className="bg-white rounded-xl border border-gray-200">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">Мои объекты</span>
                      </div>
                      <span className="text-sm text-gray-500">12</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">Статистика</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    </button>
                  </div>
                </>
              )}

              <div className="bg-white rounded-xl border border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Безопасность</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Настройки</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center p-4 hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Выйти</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-8 h-screen">
          {/* Desktop Sidebar */}
          <div className="col-span-3 bg-white border-r border-gray-200 min-w-[350px]">
            <div className="p-8">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                  <ImageWithFallback
                    src={
                      userType === "buyer"
                        ? "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=300&h=300&fit=crop&crop=face"
                        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl text-black mb-2">
                  {userType === "buyer" ? "Анна Смирнова" : "Александр Иванов"}
                </h2>
                <p className="text-gray-500 mb-3">
                  {userType === "buyer"
                    ? "Покупатель"
                    : 'Застройщик • ООО "СтройИнвест"'}
                </p>
                {userType === "developer" && (
                  <div className="flex items-center justify-center mb-6">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-yellow-600 text-lg">4.8</span>
                    <span className="text-gray-500 ml-2">(24 отзыва)</span>
                  </div>
                )}
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Edit className="w-5 h-5 mr-2 inline" />
                  Редактировать профиль
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Личная информация
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "notifications"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Bell className="w-5 h-5 mr-3" />
                  Уведомления
                </button>

                {userType === "buyer" && (
                  <>
                    <button
                      onClick={() => setActiveTab("favorites")}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === "favorites"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-3" />
                        Избранное
                      </div>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                        3
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("history")}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === "history"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 mr-3" />
                        История просмотров
                      </div>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                        12
                      </span>
                    </button>
                  </>
                )}

                {userType === "developer" && (
                  <>
                    <button
                      onClick={() => setActiveTab("properties")}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === "properties"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3" />
                        Мои объекты
                      </div>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                        12
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("statistics")}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === "statistics"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Calendar className="w-5 h-5 mr-3" />
                      Статистика
                    </button>
                  </>
                )}

                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Безопасность
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "settings"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Настройки
                </button>
              </nav>

              {/* Logout */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="col-span-9 p-8 ml-[150px]">
            {activeTab === "profile" && (
              <div className="max-w-2xl">
                <h1 className="text-3xl text-black mb-2">Личная информация</h1>
                <p className="text-gray-500 mb-8">
                  Управляйте своими личными данными и настройками профиля
                </p>

                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Имя</label>
                        <input
                          type="text"
                          defaultValue={
                            userType === "buyer" ? "Анна" : "Александр"
                          }
                          className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Фамилия
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            userType === "buyer" ? "Смирнова" : "Иванов"
                          }
                          className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={
                          userType === "buyer"
                            ? "anna.s@email.com"
                            : "alexander.i@stroyinvest.com"
                        }
                        className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        defaultValue="+7 (999) 123-45-67"
                        className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    {userType === "developer" && (
                      <>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Компания
                          </label>
                          <input
                            type="text"
                            defaultValue="ООО 'СтройИнвест'"
                            className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Должность
                          </label>
                          <input
                            type="text"
                            defaultValue="Директор по продажам"
                            className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex items-center space-x-4 pt-6">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Сохранить изменения
                      </button>
                      <button
                        type="button"
                        className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Отменить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="max-w-2xl">
                <h1 className="text-3xl text-black mb-2">Уведомления</h1>
                <p className="text-gray-500 mb-8">
                  Настройте, какие уведомления вы хотите получать
                </p>

                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-black">Email уведомления</h4>
                        <p className="text-sm text-gray-500">
                          Получать уведомления на email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-black">Push уведомления</h4>
                        <p className="text-sm text-gray-500">
                          Получать push уведомления в браузере
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-black">SMS уведомления</h4>
                        <p className="text-sm text-gray-500">
                          Получать SMS о важных событиях
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {userType === "buyer" && (
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="text-black">Новые объекты</h4>
                          <p className="text-sm text-gray-500">
                            Уведомления о новых объектах недвижимости
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )}

                    {userType === "developer" && (
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="text-black">Новые заявки</h4>
                          <p className="text-sm text-gray-500">
                            Уведомления о новых заявках от покупателей
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="pt-6">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Сохранить настройки
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== "profile" && activeTab !== "notifications" && (
              <div className="max-w-2xl">
                <h1 className="text-3xl text-black mb-2">
                  {activeTab === "favorites" && "Избранное"}
                  {activeTab === "history" && "История просмотров"}
                  {activeTab === "properties" && "Мои объекты"}
                  {activeTab === "statistics" && "Статистика"}
                  {activeTab === "security" && "Безопасность"}
                  {activeTab === "settings" && "Настройки"}
                </h1>
                <p className="text-gray-500 mb-8">Раздел в разработке</p>

                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-black mb-2">Скоро будет доступно</h3>
                  <p className="text-gray-500">
                    Данный раздел находится в разработке
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
