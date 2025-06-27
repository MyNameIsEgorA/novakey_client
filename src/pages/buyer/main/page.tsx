import { Bell, Search } from "lucide-react";

export const BuyerMainPage = () => {
  return (
    <div className={"flex flex-1 flex-col"}>
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-black">Главная</h1>
            <p className="text-gray-500">Найдите идеальную недвижимость</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={"Поиск квартир, районов..."}
                className="w-96 bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
