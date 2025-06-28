import {
  Calculator,
  Heart,
  Home,
  MapPin,
  MessageSquare,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";
import { useIsMobile } from "@/shared/hooks/isMobile.ts";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";

export const BuyerMainContent = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <>
      {!isMobile && (
        <div className="grid grid-cols-12 max-w-7xl mx-auto gap-8 px-7 pt-3">
          <div className="col-span-8">
            <div className="mb-8">
              <h2 className="text-xl mb-6">Поиск недвижимости</h2>
              <div className="grid grid-cols-3 gap-6">
                <button
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-left hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200"
                  onClick={() => navigate(AppRoutes.buyer.map)}
                >
                  <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-black mb-2">Карта объектов</h3>
                  <p className="text-gray-500 text-sm">
                    Поиск на интерактивной карте
                  </p>
                </button>
                <button
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-left hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200"
                  onClick={() => navigate(AppRoutes.buyer.list)}
                >
                  <Home className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="text-black mb-2">Списком</h3>
                  <p className="text-gray-500 text-sm">
                    Все объявления с фильтрами
                  </p>
                </button>
                <button
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-left hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200"
                  onClick={() => navigate(AppRoutes.buyer.chats)}
                >
                  <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-black mb-2">Чаты</h3>
                  <p className="text-gray-500 text-sm">
                    Общение с застройщиками
                  </p>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Новые объекты</h2>
                <button
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  onClick={() => navigate(AppRoutes.buyer.list)}
                >
                  Посмотреть все →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                  <div
                    className="w-full h-48 rounded-lg overflow-hidden mb-4"
                    onClick={() => navigate("/buyer/object_info/1")}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                      alt="Apartment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-black mb-2">ЖК "Северная звезда"</h4>
                  <p className="text-gray-500 text-sm mb-2">2-комн., 65 м²</p>
                  <p className="text-blue-600 text-lg mb-3">от 8,5 млн ₽</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
                      Облицовка
                    </span>
                    <span className="text-gray-400 text-sm">AR просмотр</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                  <div
                    className="w-full h-48 rounded-lg overflow-hidden mb-4"
                    onClick={() => navigate("/buyer/object_info/1")}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
                      alt="Apartment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-black mb-2">ЖК "Новый Горизонт"</h4>
                  <p className="text-gray-500 text-sm mb-2">1-комн., 42 м²</p>
                  <p className="text-blue-600 text-lg mb-3">от 5,2 млн ₽</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                      Строительство
                    </span>
                    <span className="text-gray-400 text-sm">VR просмотр</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-black">Калькулятор ипотеки</h3>
                    <p className="text-gray-600 text-sm">Быстрый расчет</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Рассчитайте ежемесячный платеж и переплату по ипотечному
                  кредиту от ведущих банков
                </p>
                <button
                  onClick={() => navigate(AppRoutes.buyer.calculator)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Рассчитать
                </button>
              </div>

              {/* AI Feature Highlight */}
              <div className="bg-gradient-to-br from-slate-50 to-stone-100 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-stone-600 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-black">AI Подбор</h3>
                    <p className="text-gray-600 text-sm">Swipe для обучения</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Свайпайте квартиры как в Tinder — наш AI изучит ваши
                  предпочтения и покажет лучшие варианты
                </p>
                <button
                  onClick={() => navigate(`/buyer/list?type=tinder`)}
                  className="w-full bg-gradient-to-r from-slate-600 to-stone-600 text-white py-2 rounded-lg hover:from-slate-700 hover:to-stone-700 transition-all"
                >
                  Попробовать
                </button>
              </div>
              {/* Popular Areas */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-black mb-4">Популярные районы</h3>
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(AppRoutes.buyer.map)}
                  >
                    <span className="text-black">Центр</span>
                    <span className="text-gray-500 text-sm">120+ объектов</span>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(AppRoutes.buyer.map)}
                  >
                    <span className="text-black">Северный</span>
                    <span className="text-gray-500 text-sm">85+ объектов</span>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(AppRoutes.buyer.map)}
                  >
                    <span className="text-black">Южный</span>
                    <span className="text-gray-500 text-sm">62+ объектов</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-black mb-4">Недавняя активность</h3>
                <div className="space-y-4">
                  <div
                    className="flex items-start cursor-pointer"
                    onClick={() => navigate("/buyer/object_info/1")}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm text-black">
                        Просмотрели ЖК "Центральный"
                      </p>
                      <p className="text-xs text-gray-500">2 часа назад</p>
                    </div>
                  </div>
                  <div
                    className="flex items-start cursor-pointer"
                    onClick={() => navigate(AppRoutes.buyer.favorites)}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm text-black">Добавили в избранное</p>
                      <p className="text-xs text-gray-500">1 день назад</p>
                    </div>
                  </div>
                  <div
                    className="flex items-start cursor-pointer"
                    onClick={() => navigate(AppRoutes.buyer.chats)}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm text-black">
                        Связались с застройщиком
                      </p>
                      <p className="text-xs text-gray-500">3 дня назад</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="px-6 pb-20">
          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-lg mb-4">Поиск недвижимости</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-blue-50 p-4 rounded-xl text-left hover:bg-blue-100 transition-colors"
                onClick={() => navigate(AppRoutes.buyer.map)}
              >
                <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="text-black mb-1">Карта объектов</h3>
                <p className="text-gray-500 text-sm">Поиск на карте</p>
              </button>
              <button
                className="bg-green-50 p-4 rounded-xl text-left hover:bg-green-100 transition-colors"
                onClick={() => navigate(AppRoutes.buyer.list)}
              >
                <Home className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="text-black mb-1">Списком</h3>
                <p className="text-gray-500 text-sm">Все объявления</p>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-gradient-to-r from-slate-50 to-stone-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-stone-600 rounded-full flex items-center justify-center mr-3">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-black">Умный подбор квартир</h3>
                  <p className="text-gray-600 text-sm">
                    AI-рекомендации на основе ваших предпочтений
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/buyer/list?type=tinder")}
                className="w-full bg-gradient-to-r from-slate-600 to-stone-600 text-white py-2 rounded-lg hover:from-slate-700 hover:to-stone-700 transition-all flex items-center justify-center"
              >
                <Heart className="w-4 h-4 mr-2" />
                Попробовать свайпы
              </button>
            </div>
          </div>

          {/* Mortgage Calculator Feature */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-black">Калькулятор ипотеки</h3>
                  <p className="text-gray-600 text-sm">
                    Рассчитайте ежемесячный платеж
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(AppRoutes.buyer.calculator)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Рассчитать ипотеку
              </button>
            </div>
          </div>

          {/* Recent Properties */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Новые объекты</h2>
              <button
                className="text-blue-500 text-sm"
                onClick={() => navigate(AppRoutes.buyer.list)}
              >
                Все объекты
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                <div
                  className="flex"
                  onClick={() => navigate("/buyer/object_info/1")}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=160&h=160&fit=crop"
                      alt="Apartment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-black mb-1">ЖК "Северная звезда"</h4>
                    <p className="text-gray-500 text-sm mb-1">2-комн., 65 м²</p>
                    <p className="text-blue-600">от 8,5 млн ₽</p>
                    <div className="flex items-center mt-2">
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                        Облицовка
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                <div
                  className="flex"
                  onClick={() => navigate("/buyer/object_info/1")}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=160&fit=crop"
                      alt="Apartment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-black mb-1">ЖК "Новый Горизонт"</h4>
                    <p className="text-gray-500 text-sm mb-1">1-комн., 42 м²</p>
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
              <div
                className="relative rounded-xl overflow-hidden h-24"
                onClick={() => navigate(AppRoutes.buyer.map)}
              >
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
              <div
                className="relative rounded-xl overflow-hidden h-24"
                onClick={() => navigate(AppRoutes.buyer.map)}
              >
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
      )}
    </>
  );
};
