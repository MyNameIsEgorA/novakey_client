import { Bell, Search } from "lucide-react";
import { useIsMobile } from "@/shared/hooks/isMobile.ts";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";
import type { FC } from "react";

export interface BuyerHeaderProps {
  title?: string;
  description?: string;
  hideOnMobile?: boolean; // New prop
}

export const BuyerHeader: FC<BuyerHeaderProps> = ({
  title = "Главная",
  description = "Найдите идеальную недвижимость",
  hideOnMobile = false, // Default to false, so it shows on mobile by default
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-black">{title}</h1>
              <p className="text-gray-500">{description}</p>
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
      )}
      {isMobile &&
        !hideOnMobile && ( // Added conditional rendering based on hideOnMobile
          <div className="px-6 pt-12 pb-4 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Доброе утро,</p>
                <h1 className="text-black">Анна</h1>
              </div>
              <button className="w-12 h-12 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
                <ImageWithFallback
                  src={
                    "https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={"Поиск квартир, районов..."}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        )}
    </>
  );
};
