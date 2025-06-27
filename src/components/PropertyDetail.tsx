import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Home,
  Users,
  Calendar,
  Car,
  Wifi,
  Dumbbell,
  Baby,
  Eye,
  Video,
  MessageSquare,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PropertyDetailProps {
  propertyId: string;
  onBack: () => void;
  onStartChat: () => void;
  onStartARViewer: () => void;
  onStartMortgageCalculator?: (price: number) => void;
  userType: "buyer" | "developer" | null;
}

const propertyData = {
  "1": {
    title: 'ЖК "Северная звезда"',
    price: "8,5 млн ₽",
    pricePerSqm: "130,000 ₽/м²",
    area: "65 м²",
    rooms: "2",
    floor: "12/16",
    address: "ул. Северная, 15, Северный район",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    amenities: [
      "Парковка",
      "Лифт",
      "Консьерж",
      "Фитнес-зал",
      "Детская площадка",
      "Закрытая территория",
    ],
    description:
      "Современная 2-комнатная квартира в новом жилом комплексе с развитой инфраструктурой. Панорамные окна, качественная отделка, удобная планировка.",
    developer: "СтройИнвест",
    completionDate: "4 кв. 2024",
    rating: 4.8,
    reviews: 127,
    status: "Облицовка",
    hasAR: true,
    hasVR: false,
    numericPrice: 8500000,
  },
  "2": {
    title: 'ЖК "Новый Горизонт"',
    price: "5,2 млн ₽",
    pricePerSqm: "123,000 ₽/м²",
    area: "42 м²",
    rooms: "1",
    floor: "8/20",
    address: "пр. Мира, 45, Центральный район",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop",
    ],
    amenities: [
      "Подземная парковка",
      "Лифт",
      "Видеонаблюдение",
      "Детская площадка",
    ],
    description:
      "Уютная 1-комнатная квартира в центре города с развитой инфраструктурой рядом.",
    developer: "ГлавСтрой",
    completionDate: "2 кв. 2024",
    rating: 4.6,
    reviews: 89,
    status: "Строительство",
    hasAR: false,
    hasVR: true,
    numericPrice: 5200000,
  },
};

const amenityIcons: { [key: string]: any } = {
  Парковка: Car,
  "Подземная парковка": Car,
  Лифт: Home,
  Консьерж: Users,
  "Фитнес-зал": Dumbbell,
  Видеонаблюдение: Eye,
  "Детская площадка": Baby,
  "Закрытая территория": Home,
};

export function PropertyDetail({
  propertyId,
  onBack,
  onStartChat,
  onStartARViewer,
  onStartMortgageCalculator,
  userType,
}: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = propertyData[propertyId as keyof typeof propertyData];

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-black mb-2">Объект не найден</h2>
          <button onClick={onBack} className="text-blue-500">
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  const handleMortgageCalculator = () => {
    if (onStartMortgageCalculator) {
      onStartMortgageCalculator(property.numericPrice);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center ${
                    isLiked ? "bg-red-500 text-white" : "bg-black/50 text-white"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </button>
                <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    property.status === "Облицовка"
                      ? "bg-orange-500"
                      : property.status === "Строительство"
                        ? "bg-blue-500"
                        : "bg-green-500"
                  }`}
                >
                  {property.status}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-6">
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-2xl text-black mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {property.address}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl text-blue-600 mb-1">
                    {property.price}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {property.pricePerSqm}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-black">{property.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">
                    ({property.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Home className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Комнаты</p>
                <p className="text-black">{property.rooms}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Площадь</p>
                <p className="text-black">{property.area}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Этаж</p>
                <p className="text-black">{property.floor}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg text-black mb-3">Описание</h3>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-lg text-black mb-3">Удобства</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Home;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center p-3 bg-gray-50 rounded-xl"
                    >
                      <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700 text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Developer Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-black mb-2">Застройщик</h3>
              <p className="text-gray-600 mb-1">{property.developer}</p>
              <p className="text-gray-500 text-sm">
                Срок сдачи: {property.completionDate}
              </p>
            </div>

            {/* Viewing Options */}
            {(property.hasAR || property.hasVR) && (
              <div className="mb-6">
                <h3 className="text-lg text-black mb-3">
                  Виртуальный просмотр
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.hasAR && (
                    <button
                      onClick={onStartARViewer}
                      className="flex items-center justify-center p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-blue-600">AR Просмотр</span>
                    </button>
                  )}
                  {property.hasVR && (
                    <button className="flex items-center justify-center p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors">
                      <Video className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="text-purple-600">VR Тур</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Actions */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              {userType === "buyer" && (
                <>
                  <button
                    onClick={handleMortgageCalculator}
                    className="flex-1 bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Ипотека
                  </button>
                  <button
                    onClick={onStartChat}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Написать
                  </button>
                </>
              )}
              {userType === "developer" && (
                <button
                  onClick={onStartChat}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Управление
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto p-8">
          {/* Desktop Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад к поиску
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${isLiked ? "fill-current" : ""}`}
                />
                В избранное
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                Поделиться
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Desktop Image Gallery */}
            <div className="col-span-8">
              <div className="relative">
                <div className="h-96 rounded-xl overflow-hidden mb-4">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-4 py-2 rounded-lg text-white ${
                        property.status === "Облицовка"
                          ? "bg-orange-500"
                          : property.status === "Строительство"
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Info Panel */}
            <div className="col-span-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-8">
                {/* Title and Rating */}
                <div className="mb-6">
                  <h1 className="text-2xl text-black mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.address}
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span className="text-black mr-1">{property.rating}</span>
                    <span className="text-gray-500 text-sm">
                      ({property.reviews} отзывов)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-3xl text-blue-600 mb-1">
                    {property.price}
                  </p>
                  <p className="text-gray-600">{property.pricePerSqm}</p>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Комнаты</span>
                    <span className="text-black">{property.rooms}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Площадь</span>
                    <span className="text-black">{property.area}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Этаж</span>
                    <span className="text-black">{property.floor}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {userType === "buyer" && (
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={handleMortgageCalculator}
                      className="w-full bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Рассчитать ипотеку
                    </button>
                    <button
                      onClick={onStartChat}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Связаться с застройщиком
                    </button>
                  </div>
                )}

                {userType === "developer" && (
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={onStartChat}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Управление объектом
                    </button>
                  </div>
                )}

                {/* Virtual Viewing */}
                {(property.hasAR || property.hasVR) && (
                  <div className="space-y-3">
                    <h4 className="text-black">Виртуальный просмотр</h4>
                    {property.hasAR && (
                      <button
                        onClick={onStartARViewer}
                        className="w-full flex items-center justify-center p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        AR Просмотр
                      </button>
                    )}
                    {property.hasVR && (
                      <button className="w-full flex items-center justify-center p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-100 transition-colors">
                        <Video className="w-5 h-5 mr-2" />
                        VR Тур
                      </button>
                    )}
                  </div>
                )}

                {/* Developer Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-black mb-3">Застройщик</h4>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-black">{property.developer}</p>
                      <p className="text-gray-500 text-sm">
                        Срок сдачи: {property.completionDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Description and Amenities */}
          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="col-span-8">
              {/* Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
                <h3 className="text-xl text-black mb-4">Описание</h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl text-black mb-4">Удобства</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Home;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center p-4 bg-gray-50 rounded-xl"
                      >
                        <IconComponent className="w-6 h-6 text-gray-600 mr-3" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
