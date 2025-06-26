import { useState } from "react";
import { ArrowLeft, Building2, MapPin, Camera, Upload, Plus, X, Check, ChevronRight, ChevronLeft, Save, Eye, Home, Maximize, Calendar, DollarSign, Info, Image as ImageIcon, Shield, ExternalLink, CheckCircle, AlertCircle, Clock, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AddPropertyProps {
  onBack: () => void;
  onSave: (propertyData: any) => void;
}

const steps = [
  { id: 'basic', title: 'Основная информация', icon: Building2 },
  { id: 'location', title: 'Расположение', icon: MapPin },
  { id: 'details', title: 'Детали', icon: Home },
  { id: 'pricing', title: 'Цены', icon: DollarSign },
  { id: 'media', title: 'Медиа', icon: Camera },
  { id: 'verification', title: 'Проверка ЕГРН', icon: Shield },
  { id: 'platforms', title: 'Публикация', icon: Globe },
  { id: 'preview', title: 'Предварительный просмотр', icon: Eye }
];

const platforms = [
  {
    id: 'cian',
    name: 'Циан',
    description: 'Крупнейший портал недвижимости',
    logo: '🏠',
    cost: 'от 2,000 ₽/мес',
    audience: '15М пользователей'
  },
  {
    id: 'avito',
    name: 'Авито',
    description: 'Популярная доска объявлений',
    logo: '📱',
    cost: 'от 1,500 ₽/мес',
    audience: '50М пользователей'
  },
  {
    id: 'domclick',
    name: 'ДомКлик',
    description: 'Сервис Сбербанка',
    logo: '🏦',
    cost: 'от 3,000 ₽/мес',
    audience: '8М пользователей'
  },
  {
    id: 'yandex',
    name: 'Яндекс.Недвижимость',
    description: 'Поиск от Яндекса',
    logo: '🔍',
    cost: 'от 2,500 ₽/мес',
    audience: '12М пользователей'
  }
];

export function AddProperty({ onBack, onSave }: AddPropertyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    description: '',
    developer: 'СтройИнвест',
    constructionStatus: 'planning',
    
    // Location
    address: '',
    district: '',
    coordinates: { lat: 55.7558, lng: 37.6176 },
    nearTransport: false,
    nearSchool: false,
    nearShops: false,
    
    // Details
    totalFloors: '',
    totalApartments: '',
    apartmentTypes: [],
    amenities: [],
    deliveryDate: '',
    
    // Pricing
    pricePerSqm: '',
    priceRange: { min: '', max: '' },
    paymentPlans: [],
    
    // Media
    images: [],
    virtualTourUrl: '',
    arModelUrl: '',
    floorPlans: [],
    
    // EGRN Verification
    egrnStatus: 'pending',
    cadastralNumber: '',
    ownershipDocuments: [],
    
    // Platform Publishing
    selectedPlatforms: [],
    publicationSettings: {}
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [egrnVerification, setEgrnVerification] = useState({
    status: 'idle', // idle, checking, success, error
    progress: 0,
    documents: []
  });

  const apartmentTypeOptions = [
    { id: 'studio', label: 'Студия', rooms: '0', area: '25-35' },
    { id: '1room', label: '1-комнатная', rooms: '1', area: '35-45' },
    { id: '2room', label: '2-комнатная', rooms: '2', area: '55-75' },
    { id: '3room', label: '3-комнатная', rooms: '3', area: '75-95' },
    { id: '4room', label: '4-комнатная', rooms: '4', area: '95-120' }
  ];

  const amenityOptions = [
    'Парковка', 'Лифт', 'Консьерж', 'Фитнес-зал', 'Детская площадка',
    'Подземная парковка', 'Закрытая территория', 'Видеонаблюдение',
    'Терраса', 'Балкон', 'Французский балкон', 'Кладовая'
  ];

  const statusOptions = [
    { value: 'planning', label: 'Проектирование' },
    { value: 'foundation', label: 'Фундамент' },
    { value: 'construction', label: 'Строительство' },
    { value: 'finishing', label: 'Отделка' },
    { value: 'completed', label: 'Завершен' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleDirectChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: string, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const startEgrnVerification = () => {
    setEgrnVerification({ status: 'checking', progress: 0, documents: [] });
    
    // Simulate EGRN verification process
    const interval = setInterval(() => {
      setEgrnVerification(prev => {
        const newProgress = prev.progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            status: 'success',
            progress: 100,
            documents: [
              { name: 'Выписка ЕГРН', status: 'verified', date: new Date().toLocaleDateString() },
              { name: 'Кадастровый план', status: 'verified', date: new Date().toLocaleDateString() },
              { name: 'Документы собственности', status: 'verified', date: new Date().toLocaleDateString() }
            ]
          };
        }
        return { ...prev, progress: newProgress };
      });
    }, 200);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      images: uploadedImages,
      egrnVerification,
      createdAt: new Date().toISOString()
    };
    onSave(finalData);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Название ЖК *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleDirectChange('name', e.target.value)}
                placeholder='ЖК "Название"'
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleDirectChange('description', e.target.value)}
                placeholder="Краткое описание жилого комплекса..."
                rows={4}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Застройщик</label>
              <input
                type="text"
                value={formData.developer}
                onChange={(e) => handleDirectChange('developer', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Статус строительства</label>
              <select
                value={formData.constructionStatus}
                onChange={(e) => handleDirectChange('constructionStatus', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Адрес *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleDirectChange('address', e.target.value)}
                placeholder="ул. Примерная, д. 123"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Район</label>
              <select
                value={formData.district}
                onChange={(e) => handleDirectChange('district', e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Выберите район</option>
                <option value="center">Центр</option>
                <option value="north">Северный</option>
                <option value="south">Южный</option>
                <option value="east">Восточный</option>
                <option value="west">Западный</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Инфраструктура рядом</label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.nearTransport}
                    onChange={(e) => handleDirectChange('nearTransport', e.target.checked)}
                    className="mr-3 rounded accent-blue-600"
                  />
                  <span className="text-gray-700">🚇 Транспорт рядом</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.nearSchool}
                    onChange={(e) => handleDirectChange('nearSchool', e.target.checked)}
                    className="mr-3 rounded accent-blue-600"
                  />
                  <span className="text-gray-700">🏫 Школа рядом</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.nearShops}
                    onChange={(e) => handleDirectChange('nearShops', e.target.checked)}
                    className="mr-3 rounded accent-blue-600"
                  />
                  <span className="text-gray-700">🛒 Магазины рядом</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-gray-700 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Расположение на карте
              </h4>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">Интерактивная карта</p>
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Количество этажей</label>
                <input
                  type="number"
                  value={formData.totalFloors}
                  onChange={(e) => handleDirectChange('totalFloors', e.target.value)}
                  placeholder="16"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Общее количество квартир</label>
                <input
                  type="number"
                  value={formData.totalApartments}
                  onChange={(e) => handleDirectChange('totalApartments', e.target.value)}
                  placeholder="120"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Типы квартир</label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {apartmentTypeOptions.map(type => (
                  <label key={type.id} className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.apartmentTypes.includes(type.id)}
                      onChange={() => handleArrayToggle('apartmentTypes', type.id)}
                      className="mr-3 rounded accent-blue-600"
                    />
                    <div className="flex-1">
                      <span className="text-gray-700">{type.label}</span>
                      <div className="text-gray-500 text-sm">{type.area} м²</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Удобства</label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {amenityOptions.map(amenity => (
                  <label key={amenity} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleArrayToggle('amenities', amenity)}
                      className="mr-2 rounded accent-blue-600"
                    />
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Срок сдачи</label>
              <input
                type="text"
                value={formData.deliveryDate}
                onChange={(e) => handleDirectChange('deliveryDate', e.target.value)}
                placeholder="4 кв. 2024"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Цена за м² (₽)</label>
              <input
                type="number"
                value={formData.pricePerSqm}
                onChange={(e) => handleDirectChange('pricePerSqm', e.target.value)}
                placeholder="130000"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Минимальная цена (млн ₽)</label>
                <input
                  type="number"
                  value={formData.priceRange.min}
                  onChange={(e) => handleInputChange('priceRange', 'min', e.target.value)}
                  placeholder="5.2"
                  step="0.1"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Максимальная цена (млн ₽)</label>
                <input
                  type="number"
                  value={formData.priceRange.max}
                  onChange={(e) => handleInputChange('priceRange', 'max', e.target.value)}
                  placeholder="12.5"
                  step="0.1"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-blue-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Планы оплаты
              </h4>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-3 rounded accent-blue-600" />
                  <span className="text-blue-700">Ипотека (от 4.5%)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-3 rounded accent-blue-600" />
                  <span className="text-blue-700">Рассрочка от застройщика</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-3 rounded accent-blue-600" />
                  <span className="text-blue-700">Материнский капитал</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-3 rounded accent-blue-600" />
                  <span className="text-blue-700">Trade-in</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3">Фотографии объекта</label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleImageUpload(e.dataTransfer.files);
                }}
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-gray-700 mb-2">Перетащите изображения сюда</h4>
                <p className="text-gray-500 text-sm mb-4">или</p>
                <label className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Выбрать файлы
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Ссылка на VR-тур</label>
                <input
                  type="url"
                  value={formData.virtualTourUrl}
                  onChange={(e) => handleDirectChange('virtualTourUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Ссылка на AR-модель</label>
                <input
                  type="url"
                  value={formData.arModelUrl}
                  onChange={(e) => handleDirectChange('arModelUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Планировки</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                <Home className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm mb-3">Загрузите планировки квартир</p>
                <label className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer inline-flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Выбрать планировки
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 'verification':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-amber-900 mb-3 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Проверка ЕГРН
              </h3>
              <p className="text-amber-700 text-sm mb-4">
                Для публикации объекта на внешних платформах необходимо пройти проверку ЕГРН (Единого государственного реестра недвижимости)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Кадастровый номер *</label>
              <input
                type="text"
                value={formData.cadastralNumber}
                onChange={(e) => handleDirectChange('cadastralNumber', e.target.value)}
                placeholder="77:01:0001001:1001"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Документы собственности</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                <Shield className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm mb-3">Загрузите документы, подтверждающие право собственности</p>
                <label className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors cursor-pointer inline-flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Выбрать документы
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </label>
                <p className="text-gray-400 text-xs mt-2">PDF, JPG, PNG до 10MB каждый</p>
              </div>
            </div>

            {egrnVerification.status === 'idle' && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-black mb-3">Начать проверку ЕГРН</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Процесс проверки займет несколько минут. Мы автоматически сверим данные с государственным реестром.
                </p>
                <button
                  onClick={startEgrnVerification}
                  disabled={!formData.cadastralNumber}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Запустить проверку ЕГРН
                </button>
              </div>
            )}

            {egrnVerification.status === 'checking' && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-black mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Проверка ЕГРН в процессе...
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${egrnVerification.progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 text-sm">
                  Пожалуйста, подождите. Идет сверка с государственным реестром... {egrnVerification.progress}%
                </p>
              </div>
            )}

            {egrnVerification.status === 'success' && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-green-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Проверка ЕГРН успешно завершена
                </h4>
                <div className="space-y-3">
                  {egrnVerification.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-green-800 text-sm">{doc.name}</span>
                      </div>
                      <span className="text-green-600 text-xs">Проверено {doc.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-green-700 text-sm mt-4">
                  Все документы прошли проверку. Объект готов к публикации на внешних платформах.
                </p>
              </div>
            )}

            {egrnVerification.status === 'error' && (
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h4 className="text-red-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Ошибка проверки ЕГРН
                </h4>
                <p className="text-red-700 text-sm mb-4">
                  Не удалось подтвердить данные в государственном реестре. Проверьте корректность кадастрового номера и документов.
                </p>
                <button
                  onClick={() => setEgrnVerification({ status: 'idle', progress: 0, documents: [] })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Попробовать снова
                </button>
              </div>
            )}
          </div>
        );

      case 'platforms':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-blue-900 mb-3 flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Публикация на платформах
              </h3>
              <p className="text-blue-700 text-sm">
                Выберите платформы для размещения вашего объекта. Это поможет привлечь больше покупателей.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {platforms.map(platform => (
                <label
                  key={platform.id}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedPlatforms.includes(platform.id)}
                    onChange={() => handleArrayToggle('selectedPlatforms', platform.id)}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{platform.logo}</span>
                      <div>
                        <h4 className={`${
                          formData.selectedPlatforms.includes(platform.id) ? 'text-blue-900' : 'text-black'
                        }`}>
                          {platform.name}
                        </h4>
                        <p className={`text-sm ${
                          formData.selectedPlatforms.includes(platform.id) ? 'text-blue-700' : 'text-gray-600'
                        }`}>
                          {platform.description}
                        </p>
                      </div>
                    </div>
                    {formData.selectedPlatforms.includes(platform.id) && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${
                      formData.selectedPlatforms.includes(platform.id) ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {platform.cost}
                    </span>
                    <span className={`${
                      formData.selectedPlatforms.includes(platform.id) ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {platform.audience}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {formData.selectedPlatforms.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-green-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Настройки публикации
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded accent-green-600" defaultChecked />
                    <span className="text-green-700">Автоматическое обновление цен</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded accent-green-600" defaultChecked />
                    <span className="text-green-700">Синхронизация наличия квартир</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-3 rounded accent-green-600" />
                    <span className="text-green-700">Продвижение объявлений (доп. плата)</span>
                  </label>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-green-700 text-sm">
                    <strong>Ожидаемая стоимость:</strong> {' '}
                    {formData.selectedPlatforms.length * 2500} ₽/мес
                  </p>
                </div>
              </div>
            )}

            {egrnVerification.status !== 'success' && (
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h4 className="text-amber-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Требуется проверка ЕГРН
                </h4>
                <p className="text-amber-700 text-sm">
                  Для публикации на внешних платформах необходимо завершить проверку ЕГРН на предыдущем шаге.
                </p>
              </div>
            )}
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl text-black mb-4">Предварительный просмотр</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-black mb-2">{formData.name || 'Название ЖК'}</h4>
                  <p className="text-gray-600 text-sm mb-4">{formData.description || 'Описание будет здесь...'}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Застройщик:</span>
                      <span className="text-black">{formData.developer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Адрес:</span>
                      <span className="text-black">{formData.address || 'Не указан'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Этажность:</span>
                      <span className="text-black">{formData.totalFloors || 'Не указана'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Срок сдачи:</span>
                      <span className="text-black">{formData.deliveryDate || 'Не указан'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {uploadedImages.length > 0 && (
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                      <img
                        src={uploadedImages[0]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {formData.pricePerSqm && (
                      <div className="text-blue-600">
                        {parseInt(formData.pricePerSqm).toLocaleString()} ₽/м²
                      </div>
                    )}
                    {formData.priceRange.min && formData.priceRange.max && (
                      <div className="text-gray-600 text-sm">
                        от {formData.priceRange.min} до {formData.priceRange.max} млн ₽
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {formData.amenities.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-black mb-3">Удобства</h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map(amenity => (
                      <span key={amenity} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* EGRN Status */}
              {egrnVerification.status === 'success' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 text-sm">Проверка ЕГРН пройдена</span>
                  </div>
                </div>
              )}

              {/* Selected Platforms */}
              {formData.selectedPlatforms.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-black mb-3">Публикация на платформах</h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedPlatforms.map(platformId => {
                      const platform = platforms.find(p => p.id === platformId);
                      return platform ? (
                        <span key={platformId} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <span className="mr-2">{platform.logo}</span>
                          {platform.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center mb-3">
                <Check className="w-6 h-6 text-green-600 mr-2" />
                <h4 className="text-green-900">Готово к публикации</h4>
              </div>
              <p className="text-green-700 text-sm">
                Объект готов к добавлению в каталог. Проверьте все данные перед сохранением.
              </p>
              {formData.selectedPlatforms.length > 0 && egrnVerification.status === 'success' && (
                <p className="text-green-700 text-sm mt-2">
                  После сохранения объект будет автоматически опубликован на выбранных платформах.
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
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
              <h1 className="text-2xl text-black mb-2">Добавить объект</h1>
              <p className="text-gray-600">Шаг {currentStep + 1} из {steps.length}</p>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{steps[currentStep].title}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="px-6 py-6 pb-20">
            {renderStepContent()}
          </div>

          {/* Mobile Navigation */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 p-4">
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Назад
              </button>
              
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Сохранить
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Далее
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-8 h-screen">
          {/* Desktop Steps Sidebar */}
          <div className="col-span-3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl text-black mb-6">Добавление объекта</h2>
              
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full flex items-center p-4 rounded-xl text-left transition-all ${
                        isActive ? 'bg-blue-50 border-2 border-blue-200' :
                        isCompleted ? 'bg-green-50 border border-green-200' :
                        'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        isActive ? 'bg-blue-600 text-white' :
                        isCompleted ? 'bg-green-600 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`${
                          isActive ? 'text-blue-700' :
                          isCompleted ? 'text-green-700' :
                          'text-gray-700'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-gray-500 text-sm">
                          Шаг {index + 1}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h3 className="text-blue-900 mb-2">Прогресс</h3>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-blue-700 text-sm">
                  {currentStep + 1} из {steps.length} шагов завершено
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Main Content */}
          <div className="col-span-9 flex flex-col">
            {/* Desktop Header */}
            <div className="bg-white border-b border-gray-200 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl text-black">{steps[currentStep].title}</h1>
                  <p className="text-gray-500">Шаг {currentStep + 1} из {steps.length}</p>
                </div>
                <button
                  onClick={onBack}
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Отменить
                </button>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                {renderStepContent()}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="bg-white border-t border-gray-200 p-8">
              <div className="max-w-4xl mx-auto flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Назад
                </button>
                
                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Сохранить объект
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Далее
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}