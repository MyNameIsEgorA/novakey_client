import { Building2, List, Plus, Users, Calendar, Search } from "lucide-react";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx";
import { useIsMobile } from "@/shared/hooks/isMobile.ts";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";

export const DeveloperMainPage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <div>
          <div className="px-6 pt-12 pb-4 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Добро пожаловать,</p>
                <h1 className="text-black">Александр Иванов</h1>

                <p className="text-sm text-emerald-600">
                  ООО "СтройИнвест" • Рейтинг 4.8 ⭐
                </p>
              </div>
              <button className="w-12 h-12 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
                <ImageWithFallback
                  src={
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
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
                placeholder={"Поиск по объектам, клиентам..."}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

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
                <button className="bg-blue-50 p-4 rounded-xl text-left hover:bg-blue-100 transition-colors">
                  <Plus className="w-6 h-6 text-blue-600 mb-2" />
                  <h3 className="text-black mb-1">Добавить объект</h3>
                  <p className="text-gray-500 text-sm">Новый ЖК</p>
                </button>
                <button className="bg-emerald-50 p-4 rounded-xl text-left hover:bg-emerald-100 transition-colors">
                  <List className="w-6 h-6 text-emerald-600 mb-2" />
                  <h3 className="text-black mb-1">Мои объекты</h3>
                  <p className="text-gray-500 text-sm">Списком</p>
                </button>
                <button className="bg-stone-50 p-4 rounded-xl text-left hover:bg-stone-100 transition-colors">
                  <Users className="w-6 h-6 text-stone-600 mb-2" />
                  <h3 className="text-black mb-1">CRM</h3>
                  <p className="text-gray-500 text-sm">Клиенты</p>
                </button>
                <button className="bg-green-50 p-4 rounded-xl text-left hover:bg-green-100 transition-colors">
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
                  <div className="text-2xl text-stone-600 mb-1">15</div>
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
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                      <Building2 className="w-4 h-4 text-stone-600" />
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
        </div>
      )}
      {!isMobile && (
        <div>
          <DeveloperHeader hideOnMobile={true} />
          <div className={"max-w-7xl mx-auto mt-10"}>
            <div className={""}>
              <div className="px-6 pb-20 flex gap-x-6">
                <div className={"w-[60%]"}>
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-6 mb-6">
                    <h2 className="text-lg mb-2">Панель застройщика</h2>
                    <p className="text-emerald-100 text-sm">
                      Управление объектами недвижимости
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-6">
                    <h2 className="text-lg mb-4">Быстрые действия</h2>
                    <div className="flex gap-4">
                      <button className="bg-blue-50 w-[25%] p-4 rounded-xl text-left hover:bg-blue-100 transition-colors">
                        <Plus className="w-6 h-6 text-blue-600 mb-2" />
                        <h3 className="text-black mb-1">Добавить объект</h3>
                        <p className="text-gray-500 text-sm">Новый ЖК</p>
                      </button>
                      <button className="bg-emerald-50 p-4 w-[25%] rounded-xl text-left hover:bg-emerald-100 transition-colors">
                        <List className="w-6 h-6 text-emerald-600 mb-2" />
                        <h3 className="text-black mb-1">Мои объекты</h3>
                        <p className="text-gray-500 text-sm">Списком</p>
                      </button>
                      <button className="bg-stone-50 p-4 rounded-xl w-[25%] text-left hover:bg-stone-100 transition-colors">
                        <Users className="w-6 h-6 text-stone-600 mb-2" />
                        <h3 className="text-black mb-1">CRM</h3>
                        <p className="text-gray-500 text-sm">Клиенты</p>
                      </button>
                      <button className="bg-green-50 p-4 rounded-xl w-[25%] text-left hover:bg-green-100 transition-colors">
                        <Calendar className="w-6 h-6 text-green-600 mb-2" />
                        <h3 className="text-black mb-1">Календарь</h3>
                        <p className="text-gray-500 text-sm">Показы</p>
                      </button>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="mb-6">
                    <h2 className="text-lg mb-4">Статистика</h2>
                    <div className="flex gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border w-[25%]">
                        <h3 className="text-black mb-1">Активные объекты</h3>
                        <div className="text-2xl text-emerald-600 mb-1">12</div>
                        <p className="text-gray-400 text-xs">ЖК в продаже</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border w-[25%]">
                        <h3 className="text-black mb-1">Новые заявки</h3>
                        <div className="text-2xl text-blue-600 mb-1">8</div>
                        <p className="text-gray-400 text-xs">за сегодня</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border w-[25%]">
                        <h3 className="text-black mb-1">Показы на неделю</h3>
                        <div className="text-2xl text-stone-600 mb-1">15</div>
                        <p className="text-gray-400 text-xs">запланировано</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border w-[25%]">
                        <h3 className="text-black mb-1">Продажи за месяц</h3>
                        <div className="text-2xl text-green-600 mb-1">24</div>
                        <p className="text-gray-400 text-xs">квартиры</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={"w-[40%]"}>
                  <div>
                    <div className="space-y-5 shadow-sm border p-4 rounded-xl">
                      <h2 className="text-lg mb-4">Последняя активность</h2>
                      <div className="bg-white rounded-xl ">
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

                      <div className="bg-white rounded-xl">
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

                      <div className="bg-white rounded-xl">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                            <Building2 className="w-4 h-4 text-stone-600" />
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
                  <div className="bg-white rounded-xl p-6 shadow-sm border mt-13">
                    <h3 className="text-black mb-4">Быстрая статистика</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Конверсия показов</span>
                        <span className="text-green-600">23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Средняя цена м²</span>
                        <span className="text-black">142,500 ₽</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Активных чатов</span>
                        <span className="text-blue-600">12</span>
                      </div>
                    </div>
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
