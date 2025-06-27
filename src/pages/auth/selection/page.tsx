import { User, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NovaKeyLogo({ className = "text-2xl" }: { className?: string }) {
  return (
    <div className={`${className} tracking-tight`}>
      <span className="text-black">novakey</span>
      <span className="text-black/50 text-lg">®</span>
    </div>
  );
}

export function AuthUserSelectionPage() {
  const navigate = useNavigate();

  const onSelectUserType = (userType: "buyer" | "developer") => {
    navigate(`/auth/${userType}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center p-6 bg-white">
          {/* Mobile Logo */}
          <div className="text-center mb-12">
            <NovaKeyLogo className="text-3xl mb-8" />
            <h1 className="text-2xl text-black mb-4">Добро пожаловать</h1>
            <p className="text-gray-600">Выберите тип аккаунта</p>
          </div>

          {/* User Type Cards */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => onSelectUserType("buyer")}
              className="w-full p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                  <User className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-black mb-1">Покупатель</h3>
                  <p className="text-gray-500 text-sm">Поиск недвижимости</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelectUserType("developer")}
              className="w-full p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mr-4">
                  <Building2 className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-black mb-1">Застройщик</h3>
                  <p className="text-gray-500 text-sm">Управление проектами</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="min-h-screen flex">
          {/* Left Side - Info Cards */}
          <div className="flex-1 bg-gray-50 p-12 flex items-center">
            <div className="w-full max-w-lg">
              <div className="grid gap-6">
                {/* Built for Meaningful Connections Card */}
                <div
                  className="relative rounded-3xl p-8 text-white overflow-hidden min-h-[200px] flex flex-col justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg, #a8e6cf 0%, #dcedc8 50%, #f8bbd9 100%)",
                  }}
                >
                  <div className="absolute top-6 right-6 text-white/70 text-sm">
                    / 01
                  </div>
                  <h3 className="text-2xl leading-tight">
                    Создан для значимых
                    <br />
                    подключений
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Get the App Card */}
                  <div
                    className="relative rounded-3xl p-6 text-white overflow-hidden min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #ce93d8 0%, #f8bbd9 100%)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white/70 text-sm">
                      / 02
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <button className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white border border-white/30 self-start">
                        Скачать приложение
                      </button>
                      <div className="text-left">
                        <div className="text-lg mb-2">
                          "Лучшее приложение для недвижимости"
                        </div>
                        <div className="text-sm opacity-80">
                          Мария Иванова, Покупатель
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Purpose Card */}
                  <div
                    className="relative rounded-3xl p-6 text-white overflow-hidden min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #4db6ac 0%, #80cbc4 100%)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white/70 text-sm">
                      / 03
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-sm">
                        Вы в одном шаге от
                        <br />
                        следующей главы жизни
                      </div>
                      <div>
                        <button className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm mb-4">
                          Присоединиться
                        </button>
                        <div className="text-2xl">50,000+</div>
                        <div className="text-sm opacity-80">
                          Успешных сделок
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - User Selection */}
          <div className="flex-1 bg-white flex items-center justify-center p-12">
            <div className="max-w-md w-full">
              <div className="text-center mb-12">
                <NovaKeyLogo className="text-4xl mb-8" />
                <h2 className="text-3xl text-black mb-4">Добро пожаловать</h2>
                <p className="text-gray-600 text-lg">
                  Выберите тип вашего аккаунта
                </p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() => onSelectUserType("buyer")}
                  className="w-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 text-left group"
                >
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-black mb-2">Покупатель</h3>
                      <p className="text-gray-600">
                        Найдите идеальную недвижимость
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectUserType("developer")}
                  className="w-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 text-left group"
                >
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                      <Building2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-black mb-2">Застройщик</h3>
                      <p className="text-gray-600">
                        Управляйте проектами и продажами
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="text-center mt-12">
                <div className="flex justify-center space-x-8 text-xs text-gray-400">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Безопасно
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Надежно
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Современно
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
