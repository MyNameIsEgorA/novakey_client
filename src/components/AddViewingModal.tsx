import { useState } from "react";
import { X, Calendar, Clock, MapPin, User, Video, Eye, FileText } from "lucide-react";

interface AddViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (viewingData: any) => void;
  selectedDate?: string;
}

export function AddViewingModal({ isOpen, onClose, onSave, selectedDate }: AddViewingModalProps) {
  const [formData, setFormData] = useState({
    date: selectedDate || new Date().toISOString().split('T')[0],
    time: '',
    duration: '60',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    property: '',
    type: 'ar',
    status: 'pending',
    notes: ''
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
        client: {
          name: formData.clientName,
          phone: formData.clientPhone,
          email: formData.clientEmail,
          avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108755-2616b612b8db' : '1472099645785-5658abf4ff4e'}?w=100&h=100&fit=crop&crop=face`
        },
        createdAt: new Date().toISOString()
      });
      setIsLoading(false);
      onClose();
      // Reset form
      setFormData({
        date: selectedDate || new Date().toISOString().split('T')[0],
        time: '',
        duration: '60',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        property: '',
        type: 'ar',
        status: 'pending',
        notes: ''
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
            <h2 className="text-xl text-black">Новый показ</h2>
            <p className="text-gray-500 text-sm">Запланировать показ недвижимости</p>
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
          {/* Date and Time */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Дата и время
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Дата *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Время *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Длительность (мин)</label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
              >
                <option value="30">30 минут</option>
                <option value="45">45 минут</option>
                <option value="60">60 минут</option>
                <option value="90">90 минут</option>
                <option value="120">120 минут</option>
              </select>
            </div>
          </div>

          {/* Client Info */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <User className="w-4 h-4 mr-2" />
              Информация о клиенте
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2">Имя клиента *</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Анна Смирнова"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Телефон *</label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="anna@example.com"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Property and Type */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Объект и тип показа
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2">Объект недвижимости *</label>
              <select
                value={formData.property}
                onChange={(e) => handleInputChange('property', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
                required
              >
                <option value="">Выберите объект</option>
                <option value="severnaya-zvezda-45">ЖК "Северная звезда", кв. 45</option>
                <option value="novyy-gorizont-12">ЖК "Новый Горизонт", кв. 12</option>
                <option value="parkovyy-78">ЖК "Парковый", кв. 78</option>
                <option value="tsentralnyy-156">ЖК "Центральный", кв. 156</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Тип показа *</label>
              <div className="grid grid-cols-3 gap-3">
                <label className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.type === 'ar' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="ar"
                    checked={formData.type === 'ar'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center">
                    <Eye className={`w-6 h-6 mb-1 ${formData.type === 'ar' ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${formData.type === 'ar' ? 'text-blue-700' : 'text-gray-600'}`}>
                      AR
                    </span>
                  </div>
                </label>

                <label className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.type === 'vr' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="vr"
                    checked={formData.type === 'vr'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center">
                    <Video className={`w-6 h-6 mb-1 ${formData.type === 'vr' ? 'text-purple-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${formData.type === 'vr' ? 'text-purple-700' : 'text-gray-600'}`}>
                      VR
                    </span>
                  </div>
                </label>

                <label className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.type === 'physical' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="physical"
                    checked={formData.type === 'physical'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center">
                    <MapPin className={`w-6 h-6 mb-1 ${formData.type === 'physical' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${formData.type === 'physical' ? 'text-green-700' : 'text-gray-600'}`}>
                      Физический
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-black flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Дополнительно
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2">Статус</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all"
              >
                <option value="pending">Ожидает подтверждения</option>
                <option value="confirmed">Подтвержден</option>
                <option value="cancelled">Отменен</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Заметки</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Дополнительная информация о показе..."
                rows={3}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Type Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                formData.type === 'ar' ? 'bg-blue-100' :
                formData.type === 'vr' ? 'bg-purple-100' : 'bg-green-100'
              }`}>
                {formData.type === 'ar' && <Eye className="w-4 h-4 text-blue-600" />}
                {formData.type === 'vr' && <Video className="w-4 h-4 text-purple-600" />}
                {formData.type === 'physical' && <MapPin className="w-4 h-4 text-green-600" />}
              </div>
              <div>
                <h4 className={`text-sm mb-1 ${
                  formData.type === 'ar' ? 'text-blue-900' :
                  formData.type === 'vr' ? 'text-purple-900' : 'text-green-900'
                }`}>
                  {formData.type === 'ar' && 'AR Просмотр'}
                  {formData.type === 'vr' && 'VR Просмотр'}
                  {formData.type === 'physical' && 'Физический показ'}
                </h4>
                <p className={`text-xs ${
                  formData.type === 'ar' ? 'text-blue-700' :
                  formData.type === 'vr' ? 'text-purple-700' : 'text-green-700'
                }`}>
                  {formData.type === 'ar' && 'Просмотр с использованием дополненной реальности на объекте'}
                  {formData.type === 'vr' && 'Виртуальный тур в офисе с VR-очками'}
                  {formData.type === 'physical' && 'Личный осмотр объекта недвижимости'}
                </p>
              </div>
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
              disabled={isLoading || !formData.date || !formData.time || !formData.clientName || !formData.clientPhone || !formData.property}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Создание...
                </>
              ) : (
                'Создать показ'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}