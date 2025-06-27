import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Maximize,
  Heart,
  Share2,
  Phone,
  MessageSquare,
  Camera,
  Users,
  Edit,
  BarChart3,
  Star,
  Eye,
  Clock,
  Home,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PropertyDetailProps {
  propertyId: string;
  onBack: () => void;
  onStartChat: () => void;
  onStartARViewer: () => void;
  userType?: "buyer" | "developer" | null;
}

export function PropertyDetail({
  propertyId,
  onBack,
  onStartChat,
  onStartARViewer,
  userType,
}: PropertyDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Sample property data
  const property = {
    id: propertyId,
    name: 'ЖК "Северная звезда"',
    price: "от 8,5 млн ₽",
    pricePerSqm: 130769,
    rooms: "2-комн.",
    area: 65,
    floor: 5,
    maxFloor: 16,
    status: "Облицовка",
    statusColor: "orange",
    district: "Северный",
    developer: "СтройИнвест",
    location: "г. Москва, Северный район, ул. Звездная, 15",
    deliveryDate: "4 кв. 2024",
    description:
      "Современный жилой комплекс в развивающемся районе с отличной транспортной доступностью. Квартира с улучшенной планировкой, большими окнами и видом на парк.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    ],
    amenities: ["Балкон", "Лифт", "Парковка", "Детская площадка", "Консьерж"],
    nearTransport: true,
    nearSchool: true,
    nearShops: true,
    rating: 4.8,
    reviews: 24,
    // Developer specific data
    ...(userType === "developer" && {
      totalApartments: 120,
      soldApartments: 45,
      viewsCount: 1240,
      inquiriesCount: 28,
      averageViewTime: "3:45",
      lastUpdate: "2 дня назад",
    }),
  };

  return (
    <div className="h-fit bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="relative">
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={onBack}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onBack}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Camera className="w-5 h-6 text-gray-800" />
              </button>
              <button
                onClick={onBack}
                className="p-2 ml-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Share2 className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              {userType === "buyer" && (
                <>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="w-6 h-6 text-gray-800" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}
              {userType === "developer" && (
                <>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Edit className="w-6 h-6 text-gray-800" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <BarChart3 className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Image Gallery */}
            <div className="relative h-80 overflow-hidden">
              <ImageWithFallback
                src={property.images[activeImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 ${
                        activeImageIndex === index
                          ? "border-white"
                          : "border-white/50"
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${property.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-6">
            {/* Property Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl text-black">{property.name}</h1>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    property.statusColor === "orange"
                      ? "bg-orange-100 text-orange-600"
                      : property.statusColor === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {property.status}
                </span>
              </div>

              <div className="flex items-center text-gray-500 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-[12px]">{property.location}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl text-blue-600">{property.price}</p>
                  <p className="text-gray-500 text-sm">
                    {property.pricePerSqm.toLocaleString()} ₽/м²
                  </p>
                </div>
                {userType === "buyer" && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-700">{property.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({property.reviews})
                    </span>
                  </div>
                )}
              </div>

              {/* Developer Statistics */}
              {userType === "developer" && (
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-xl text-emerald-600">
                      {property.soldApartments}/{property.totalApartments}
                    </div>
                    <div className="text-xs text-gray-500">Продано</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl text-blue-600">
                      {property.viewsCount}
                    </div>
                    <div className="text-xs text-gray-500">Просмотров</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl text-purple-600">
                      {property.inquiriesCount}
                    </div>
                    <div className="text-xs text-gray-500">Заявок</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl text-orange-600">
                      {property.averageViewTime}
                    </div>
                    <div className="text-xs text-gray-500">Ср. время</div>
                  </div>
                </div>
              )}

              {/* Key Details */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="text-center">
                  <Home className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                  <div className="text-black">{property.rooms}</div>
                  <div className="text-xs text-gray-500">Планировка</div>
                </div>
                <div className="text-center">
                  <Maximize className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                  <div className="text-black">{property.area} м²</div>
                  <div className="text-xs text-gray-500">Площадь</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                  <div className="text-black">
                    {property.floor}/{property.maxFloor}
                  </div>
                  <div className="text-xs text-gray-500">Этаж</div>
                </div>
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
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div className="mb-6">
              <h3 className="text-lg text-black mb-3">Инфраструктура</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-3 ${property.nearTransport ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-700">Транспорт рядом</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-3 ${property.nearSchool ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-700">Школа рядом</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-3 ${property.nearShops ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-700">Магазины рядом</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-20">
              {userType === "buyer" && (
                <>
                  <button
                    onClick={onStartARViewer}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    AR Просмотр
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={onStartChat}
                      className="bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Написать
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Позвонить
                    </button>
                  </div>
                </>
              )}

              {userType === "developer" && (
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Edit className="w-5 h-5 mr-2" />
                    Редактировать
                  </button>
                  <button className="bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Статистика
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-8 h-screen">
          {/* Desktop Image Gallery */}
          <div className="col-span-7 relative">
            <div className="h-full flex flex-col">
              {/* Main Image */}
              <div className="flex-1 relative overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={property.images[activeImageIndex]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <button
                    onClick={onBack}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                  </button>
                </div>

                <div className="absolute top-6 right-6 flex space-x-3">
                  {userType === "buyer" && (
                    <>
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                        <Heart className="w-6 h-6 text-gray-800" />
                      </button>
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                        <Share2 className="w-6 h-6 text-gray-800" />
                      </button>
                    </>
                  )}
                  {userType === "developer" && (
                    <>
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                        <Edit className="w-6 h-6 text-gray-800" />
                      </button>
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                        <BarChart3 className="w-6 h-6 text-gray-800" />
                      </button>
                    </>
                  )}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex space-x-3 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-3 transition-all ${
                          activeImageIndex === index
                            ? "border-white shadow-lg"
                            : "border-white/50"
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${property.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Property Details */}
          <div className="col-span-5 bg-white p-8 overflow-y-auto">
            {/* Property Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl text-black mb-2">{property.name}</h1>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <span
                  className={`text-sm px-4 py-2 rounded-full ${
                    property.statusColor === "orange"
                      ? "bg-orange-100 text-orange-600"
                      : property.statusColor === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {property.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-4xl text-blue-600 mb-1">
                    {property.price}
                  </p>
                  <p className="text-gray-500">
                    {property.pricePerSqm.toLocaleString()} ₽/м²
                  </p>
                </div>
                {userType === "buyer" && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-xl text-gray-700">
                      {property.rating}
                    </span>
                    <span className="text-gray-500 ml-2">
                      ({property.reviews} отзывов)
                    </span>
                  </div>
                )}
              </div>

              {/* Developer Statistics */}
              {userType === "developer" && (
                <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl text-emerald-600 mb-1">
                      {property.soldApartments}/{property.totalApartments}
                    </div>
                    <div className="text-sm text-gray-500">Продано квартир</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-blue-600 mb-1">
                      {property.viewsCount}
                    </div>
                    <div className="text-sm text-gray-500">Просмотров</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-purple-600 mb-1">
                      {property.inquiriesCount}
                    </div>
                    <div className="text-sm text-gray-500">Заявок</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-orange-600 mb-1">
                      {property.averageViewTime}
                    </div>
                    <div className="text-sm text-gray-500">Среднее время</div>
                  </div>
                </div>
              )}

              {/* Key Details */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl mb-8">
                <div className="text-center">
                  <Home className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-xl text-black mb-1">
                    {property.rooms}
                  </div>
                  <div className="text-sm text-gray-500">Планировка</div>
                </div>
                <div className="text-center">
                  <Maximize className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-xl text-black mb-1">
                    {property.area} м²
                  </div>
                  <div className="text-sm text-gray-500">Площадь</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-xl text-black mb-1">
                    {property.floor}/{property.maxFloor}
                  </div>
                  <div className="text-sm text-gray-500">Этаж</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl text-black mb-4">Описание</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl text-black mb-4">Удобства</h3>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div className="mb-8">
              <h3 className="text-xl text-black mb-4">Инфраструктура</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-4 ${property.nearTransport ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-700">Транспорт рядом</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-4 ${property.nearSchool ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-700">Школа рядом</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-4 ${property.nearShops ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                  <span className="text-gray-700">Магазины рядом</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {userType === "buyer" && (
                <>
                  <button
                    onClick={onStartARViewer}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center text-lg"
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    Запустить AR Просмотр
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={onStartChat}
                      className="bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Написать
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Позвонить
                    </button>
                  </div>
                </>
              )}

              {userType === "developer" && (
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Edit className="w-5 h-5 mr-2" />
                    Редактировать
                  </button>
                  <button className="bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Детальная статистика
                  </button>
                </div>
              )}

              {userType === "developer" && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Последнее обновление: {property.lastUpdate}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
