import { useState } from "react";
import { X, User, Mail, Phone, Home, DollarSign, FileText, Star } from "lucide-react";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

export function AddClientModal({ isOpen, onClose, onSave }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    budget: '',
    source: 'website',
    priority: 'medium',
    notes: '',
    stage: 'interested'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSave({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        lastContact: 'Только что',
        viewings: 0
      });
      setIsLoading(false);
      onClose();
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyInterest: '',
        budget: '',
        source: 'website',
        priority: 'medium',
        notes: '',
        stage: 'interested'
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl text-black">Добавить клиента</h2>
            <p className="text-gray-500 text-sm">Новый клиент в CRM систему</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <User className="w-4 h-4 mr-2" />
              Основная информация
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2">Полное имя *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Анна Смирнова"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="anna@example.com"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Телефон *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Interest */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Интерес к недвижимости
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2">Интересующий объект</label>
              <select
                value={formData.propertyInterest}
                onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Выберите объект</option>
                <option value="severnaya-zvezda">ЖК "Северная звезда"</option>
                <option value="novyy-gorizont">ЖК "Новый Горизонт"</option>
                <option value="parkovyy">ЖК "Парковый"</option>
                <option value="tsentralnyy">ЖК "Центральный"</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Бюджет</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="8-10 млн ₽"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Дополнительная информация
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Источник</label>
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="website">Сайт</option>
                  <option value="advertising">Реклама</option>
                  <option value="referral">Рекомендации</option>
                  <option value="agent">Агент</option>
                  <option value="phone">Телефон</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Приоритет</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="high">Высокий</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Этап</label>
              <select
                value={formData.stage}
                onChange={(e) => handleInputChange('stage', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="interested">Заинтересован</option>
                <option value="viewing_scheduled">Показ запланирован</option>
                <option value="contract_ready">Готов к сделке</option>
                <option value="follow_up">Требует внимания</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Заметки</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Дополнительная информация о клиенте..."
                rows={3}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email || !formData.phone}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Сохранение...
                </>
              ) : (
                'Добавить клиента'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}