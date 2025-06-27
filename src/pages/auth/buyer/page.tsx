import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";

function NovaKeyLogo({ className = "text-2xl" }: { className?: string }) {
  return (
    <div className={`${className} tracking-tight`}>
      <span className="text-black">novakey</span>
      <span className="text-black/50 text-lg">®</span>
    </div>
  );
}

export function BuyerAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onBack = () => {
    navigate(AppRoutes.authUserSelection);
  };
  const onSuccess = () => {
    navigate("/buyer/main");
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSuccess();
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="px-6 pt-12 pb-8">
            <button
              onClick={onBack}
              className="mb-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="text-center mb-8">
              <NovaKeyLogo className="text-3xl mb-6" />
              <h1 className="text-2xl text-black mb-2">
                {isLogin ? "Вход" : "Регистрация"}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? "Добро пожаловать обратно"
                  : "Создайте аккаунт покупателя"}
              </p>
            </div>
          </div>

          {/* Mobile Form */}
          <div className="px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-2">Полное имя</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Анна Смирнова"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      required={!isLogin}
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="anna@example.com"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-2">Телефон</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+7 (999) 123-45-67"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      required={!isLogin}
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2">Пароль</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Введите пароль"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 pr-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-2">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Повторите пароль"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      required={!isLogin}
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-blue-900 mb-1">
                        Уведомление о госуслугах
                      </h4>
                      <p className="text-blue-700 text-sm">
                        В будущем планируется интеграция с порталом госуслуг для
                        упрощения процесса покупки недвижимости
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    {isLogin ? "Вход..." : "Регистрация..."}
                  </>
                ) : isLogin ? (
                  "Войти"
                ) : (
                  "Создать аккаунт"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {isLogin ? "Зарегистрироваться" : "Войти"}
                </button>
              </p>
            </div>
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
                {/* AR/VR Experience Card */}
                <div
                  className="relative rounded-3xl p-8 text-white overflow-hidden min-h-[200px] flex flex-col justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <div className="absolute top-6 right-6 text-white/70 text-sm">
                    / 01
                  </div>
                  <h3 className="text-2xl leading-tight">
                    AR/VR просмотры
                    <br />
                    недвижимости
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div
                    className="relative rounded-3xl p-6 text-white overflow-hidden min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #a8e6cf 0%, #88d8c0 100%)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white/70 text-sm">
                      / 02
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-sm">
                        Умный поиск по
                        <br />
                        всем параметрам
                      </div>
                      <div>
                        <div className="text-2xl mb-2">1000+</div>
                        <div className="text-sm opacity-80">
                          Объектов в базе
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Card */}
                  <div
                    className="relative rounded-3xl p-6 text-white overflow-hidden min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white/70 text-sm">
                      / 03
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-lg">
                        "Нашли квартиру мечты за неделю!"
                      </div>
                      <div>
                        <div className="text-sm opacity-80 mb-2">
                          Семья Ивановых
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-300 mr-1">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex-1 bg-white flex items-center justify-center p-12">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <button
                  onClick={onBack}
                  className="mb-6 p-3 hover:bg-gray-100 rounded-lg transition-colors self-start"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>

                <NovaKeyLogo className="text-4xl mb-6" />
                <h2 className="text-3xl text-black mb-2">
                  {isLogin ? "Добро пожаловать" : "Создать аккаунт"}
                </h2>
                <p className="text-gray-600">
                  {isLogin
                    ? "Войдите в свой аккаунт покупателя"
                    : "Зарегистрируйтесь как покупатель"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Desktop form fields - same as mobile but with py-4 */}
                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Полное имя
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Анна Смирнова"
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        required={!isLogin}
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="anna@example.com"
                      className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 mb-2">Телефон</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+7 (999) 123-45-67"
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        required={!isLogin}
                      />
                      <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-2">Пароль</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Введите пароль"
                      className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 pr-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Подтвердите пароль
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        placeholder="Повторите пароль"
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        required={!isLogin}
                      />
                      <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-blue-900 mb-2">
                          Интеграция с госуслугами
                        </h4>
                        <p className="text-blue-700 text-sm leading-relaxed">
                          В скором времени планируется интеграция с порталом
                          госуслуг для упрощения процесса покупки недвижимости
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {isLogin ? "Выполняется вход..." : "Создание аккаунта..."}
                    </>
                  ) : isLogin ? (
                    "Войти в аккаунт"
                  ) : (
                    "Создать аккаунт"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500">
                  {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {isLogin ? "Зарегистрироваться" : "Войти"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
