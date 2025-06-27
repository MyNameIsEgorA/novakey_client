import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Shield,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";

// Minimalist NovaKey Logo Component
function NovaKeyLogo({ className = "text-2xl" }: { className?: string }) {
  return (
    <div className={`${className} tracking-tight`}>
      <span className="text-black">novakey</span>
      <span className="text-black/50 text-lg">®</span>
    </div>
  );
}

export function DeveloperAuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestAccess, setIsRequestAccess] = useState(false);

  const navigate = useNavigate();

  const onBack = () => {
    navigate(AppRoutes.authUserSelection);
  };
  const onSuccess = () => {
    navigate(AppRoutes.developer.main);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSuccess();
      setIsLoading(false);
    }, 2000);
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert(
        "Заявка на получение доступа отправлена! Наш менеджер свяжется с вами в течение 24 часов.",
      );
      setIsLoading(false);
      setIsRequestAccess(false);
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
                {isRequestAccess ? "Получить доступ" : "Вход для застройщика"}
              </h1>
              <p className="text-gray-600">
                {isRequestAccess
                  ? "Заполните заявку на получение доступа"
                  : "Войдите в панель застройщика"}
              </p>
            </div>
          </div>

          {/* Mobile Form */}
          <div className="px-6">
            <form
              onSubmit={isRequestAccess ? handleRequestAccess : handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="developer@company.com"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                    required
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {!isRequestAccess && (
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
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 pl-12 pr-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
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
              )}

              {isRequestAccess && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Название компании
                    </label>
                    <input
                      type="text"
                      placeholder="ООО 'Ваша компания'"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Краткое описание деятельности
                    </label>
                    <textarea
                      placeholder="Расскажите о вашей компании и проектах..."
                      rows={3}
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                      required
                    />
                  </div>
                </>
              )}

              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-emerald-900 mb-1">
                      {isRequestAccess
                        ? "Проверка заявки"
                        : "Доступ только для партнеров"}
                    </h4>
                    <p className="text-emerald-700 text-sm">
                      {isRequestAccess
                        ? "Мы рассмотрим вашу заявку в течение 24 часов и предоставим доступ к системе"
                        : "Для получения доступа к системе застройщика обратитесь к менеджеру платформы"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    {isRequestAccess ? "Отправка заявки..." : "Вход..."}
                  </>
                ) : isRequestAccess ? (
                  "Отправить заявку"
                ) : (
                  "Войти в систему"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                {isRequestAccess ? "Уже есть доступ?" : "Нет доступа?"}{" "}
                <button
                  onClick={() => setIsRequestAccess(!isRequestAccess)}
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {isRequestAccess ? "Войти" : "Получить доступ"}
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
                {/* CRM System Card */}
                <div
                  className="relative rounded-3xl p-8 text-white overflow-hidden min-h-[200px] flex flex-col justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)",
                  }}
                >
                  <div className="absolute top-6 right-6 text-white/70 text-sm">
                    / 01
                  </div>
                  <h3 className="text-2xl leading-tight">
                    Полная CRM система
                    <br />
                    для застройщиков
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Analytics Card */}
                  <div
                    className="relative rounded-3xl p-6 text-white overflow-hidden min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white/70 text-sm">
                      / 02
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-sm">
                        Детальная аналитика
                        <br />и отчетность
                      </div>
                      <div>
                        <div className="text-2xl mb-2">95%</div>
                        <div className="text-sm opacity-80">
                          Конверсия показов
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integration Card */}
                  <div
                    className="relative rounded-3xl p-6 text-white overflow-hidden min-h-[280px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white/70 text-sm">
                      / 03
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-lg">
                        Интеграция с Авито,
                        <br />
                        Циан, ДомКлик
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <Users className="w-5 h-5 mr-2" />
                          <span className="text-sm">500+ застройщиков</span>
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
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl text-black mb-2">
                  {isRequestAccess ? "Получить доступ" : "Панель застройщика"}
                </h2>
                <p className="text-gray-600">
                  {isRequestAccess
                    ? "Заполните заявку для получения доступа к системе"
                    : "Войдите в систему управления проектами"}
                </p>
              </div>

              <form
                onSubmit={isRequestAccess ? handleRequestAccess : handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="developer@company.com"
                      className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {!isRequestAccess && (
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
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 pl-12 pr-12 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
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
                )}

                {isRequestAccess && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Название компании
                      </label>
                      <input
                        type="text"
                        placeholder="ООО 'Ваша компания'"
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Краткое описание деятельности
                      </label>
                      <textarea
                        placeholder="Расскажите о вашей компании и проектах..."
                        rows={4}
                        className="w-full bg-gray-100 rounded-xl px-4 py-4 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-emerald-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-emerald-900 mb-2">
                        {isRequestAccess
                          ? "Быстрое рассмотрение заявки"
                          : "Доступ только для партнеров"}
                      </h4>
                      <p className="text-emerald-700 text-sm leading-relaxed">
                        {isRequestAccess
                          ? "Мы рассмотрим вашу заявку в течение 24 часов и предоставим полный доступ к платформе NovaKey для застройщиков"
                          : "Для получения доступа к системе застройщика и управления проектами обратитесь к менеджеру платформы NovaKey"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {isRequestAccess
                        ? "Отправка заявки..."
                        : "Выполняется вход..."}
                    </>
                  ) : isRequestAccess ? (
                    "Отправить заявку на доступ"
                  ) : (
                    "Войти в систему"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500">
                  {isRequestAccess ? "Уже есть доступ?" : "Нет доступа?"}{" "}
                  <button
                    onClick={() => setIsRequestAccess(!isRequestAccess)}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {isRequestAccess ? "Войти в систему" : "Получить доступ"}
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
