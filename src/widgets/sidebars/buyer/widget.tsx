import { Home, MapPin, MessageSquare, Search, User } from "lucide-react";
import { AppRoutes } from "@/app/routes/base.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navigationItems = [
  {
    id: "home",
    icon: Home,
    label: "Главная",
    page: AppRoutes.user.home,
  },
  { id: "map", icon: MapPin, label: "Карта", page: AppRoutes.user.map },
  {
    id: "list",
    icon: Search,
    page: AppRoutes.user.list,
  },
  {
    id: "chat",
    icon: MessageSquare,
    label: "Чаты",
    page: AppRoutes.user.chats,
  },
  {
    id: "profile",
    icon: User,
    label: "Профиль",
    page: AppRoutes.user.profile,
  },
];

export const BuyerSidebar = () => {
  const navigate = useNavigate();

  const [currentScreen, setCurrentScreen] = useState<string>("");
  const handleLabelClick = (route: string) => {
    setCurrentScreen(route);
    navigate(route);
  };

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleLabelClick(item.page)}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
              currentScreen === item.page
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
