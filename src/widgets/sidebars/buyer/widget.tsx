import { Home, MapPin, MessageSquare, Search, User } from "lucide-react";
import { AppRoutes } from "@/app/routes/base.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";
import { NovaKeyLogo } from "@/shared/ui/logo.tsx";

interface NavigationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  page: string;
  badge?: number;
}

export const BuyerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Получаем текущий путь
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Обновление ширины окна при ресайзе
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      icon: Home,
      label: "Главная",
      page: AppRoutes.buyer.home,
    },
    {
      id: "map",
      icon: MapPin,
      label: "Карта",
      page: AppRoutes.buyer.map,
    },
    {
      id: "list",
      icon: Search,
      label: "Поиск",
      page: AppRoutes.buyer.list,
    },
    {
      id: "chat",
      icon: MessageSquare,
      label: "Чаты",
      page: AppRoutes.buyer.chats,
    },
    {
      id: "profile",
      icon: User,
      label: "Профиль",
      page: AppRoutes.buyer.profile,
    },
  ];

  const handleNavigation = (route: string) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  const isMobile = windowWidth < 1024;
  const currentScreen = location.pathname;

  return (
    <>
      {!isMobile && (
        <div className="w-64 h-full flex flex-col bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <NovaKeyLogo className="text-xl" />
              <span className="ml-2 text-s text-gray-500">Покупатель</span>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b8db?w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Анна Смирнова
                </h3>
                <p className="text-xs text-gray-500">Покупатель</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.page)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors group ${
                    currentScreen === item.page
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        currentScreen === item.page
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}

      {isMobile && window.location.pathname !== "/buyer/tinder" && (
        <div className="fixed w-[392px] bottom-0 bg-white border-t border-gray-200 shadow-lg z-[3000000000]">
          <nav className="flex justify-around py-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.page)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  currentScreen === item.page
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
