import { useState, useRef, useEffect } from "react";
import {
  Heart,
  X,
  MapPin,
  Home,
  Car,
  Wifi,
  Dumbbell,
  Baby,
  Star,
  ArrowLeft,
  RotateCcw,
  Info,
  CheckCircle,
  Bookmark,
} from "lucide-react";
import { PropertyCard } from "@/pages/buyer/tinder/card.tsx"; // Импортируем новый компонент

interface Property {
  id: string;
  title: string;
  price: string;
  pricePerSqm: string;
  area: string;
  rooms: string;
  floor: string;
  address: string;
  district: string;
  images: string[];
  amenities: string[];
  status: string;
  rating: number;
  description: string;
  developer: string;
  views: string;
  saved: string;
}

interface PropertySwiperProps {
  onBack: () => void;
  onPropertyLike: (propertyId: string) => void;
  onPropertyDislike: (propertyId: string) => void;
}

const properties: Property[] = [
  {
    id: "1",
    title: 'ЖК "Северная звезда"',
    price: "8,5 млн ₽",
    pricePerSqm: "130,000 ₽/м²",
    area: "65 м²",
    rooms: "2-комн.",
    floor: "12/16 эт.",
    address: "ул. Северная, 15",
    district: "Северный",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=800&fit-crop",
    ],
    amenities: ["Парковка", "Лифт", "Консьерж", "Фитнес-зал"],
    status: "Сдан",
    rating: 4.8,
    description:
      "Современная квартира с панорамными окнами и качественной отделкой в тихом районе",
    developer: "СтройИнвест",
    views: "342",
    saved: "28",
  },
  {
    id: "2",
    title: 'ЖК "Новый Горизонт"',
    price: "5,2 млн ₽",
    pricePerSqm: "123,000 ₽/м²",
    area: "42 м²",
    rooms: "1-комн.",
    floor: "8/20 эт.",
    address: "пр. Мира, 45",
    district: "Центр",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=800&fit-crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&h=800&fit-crop",
    ],
    amenities: [
      "Подземная парковка",
      "Лифт",
      "Видеонаблюдение",
      "Детская площадка",
    ],
    status: "Строительство",
    rating: 4.6,
    description:
      "Уютная студия в центре города с развитой инфраструктурой рядом",
    developer: "ГлавСтрой",
    views: "156",
    saved: "12",
  },
  {
    id: "3",
    title: 'ЖК "Парковый"',
    price: "6,8 млн ₽",
    pricePerSqm: "125,000 ₽/м²",
    area: "54 м²",
    rooms: "2-комн.",
    floor: "5/12 эт.",
    address: "ул. Парковая, 8",
    district: "Южный",
    images: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=600&h=800&fit-crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&h=800&fit-crop",
      "https://images.unsplash.com/photo-1540518614846-7eded47c8c1c?w=600&h=800&fit-crop",
    ],
    amenities: ["Закрытая территория", "Лифт", "Парковка", "Консьерж"],
    status: "Отделка",
    rating: 4.9,
    description: "Комфортная квартира рядом с парком и школой",
    developer: "ПаркДевелопмент",
    views: "298",
    saved: "45",
  },
  {
    id: "4",
    title: 'ЖК "Центральный"',
    price: "12,5 млн ₽",
    pricePerSqm: "145,000 ₽/м²",
    area: "86 м²",
    rooms: "3-комн.",
    floor: "15/25 эт.",
    address: "ул. Центральная, 1",
    district: "Центр",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=800&fit-crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=800&fit-crop",
    ],
    amenities: [
      "Подземная парковка",
      "Лифт",
      "Консьерж",
      "Фитнес-зал",
      "Детская площадка",
    ],
    status: "Сдан",
    rating: 4.7,
    description: "Премиальная квартира в самом центре с видом на город",
    developer: "Элит-Строй",
    views: "567",
    saved: "89",
  },
];

export function PropertySwiper({
  onBack,
  onPropertyLike,
  onPropertyDislike,
}: PropertySwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showPreferences, setShowPreferences] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const currentProperty = properties[currentIndex];
  const nextProperty = properties[currentIndex + 1];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleLike();
      } else {
        handleDislike();
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleLike();
      } else {
        handleDislike();
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleLike = () => {
    if (currentProperty) {
      onPropertyLike(currentProperty.id);
      nextCard();
    }
  };

  const handleDislike = () => {
    if (currentProperty) {
      onPropertyDislike(currentProperty.id);
      nextCard();
    }
  };

  const nextCard = () => {
    setDragOffset({ x: 0, y: 0 });
    setImageIndex(0);
    if (currentIndex < properties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Опционально: начать заново, если нет больше карточек
    }
  };

  const getRotation = () => {
    return dragOffset.x * 0.1;
  };

  const getOpacity = (direction: "like" | "dislike") => {
    const progress = Math.abs(dragOffset.x) / 150;
    if (direction === "like" && dragOffset.x > 0) {
      return Math.min(progress, 1);
    }
    if (direction === "dislike" && dragOffset.x < 0) {
      return Math.min(progress, 1);
    }
    return 0;
  };

  const getNextCardScale = () => {
    const maxOffset = 200; // Максимальное смещение, при котором следующая карточка полностью масштабируется
    const scaleFactor = Math.abs(dragOffset.x) / maxOffset;
    return Math.min(0.95 + scaleFactor * 0.05, 1); // Масштаб от 0.95 до 1
  };

  const getNextCardOpacity = () => {
    const maxOffset = 200;
    const opacityFactor = Math.abs(dragOffset.x) / maxOffset;
    return Math.min(0.3 + opacityFactor * 0.7, 1); // Прозрачность от 0.3 до 1
  };

  const nextImage = () => {
    if (currentProperty && imageIndex < currentProperty.images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const prevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);

      const threshold = 100;
      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          handleLike();
        } else {
          handleDislike();
        }
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragOffset.x]);

  if (!currentProperty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl text-black mb-2">Поздравляем! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Вы просмотрели все доступные квартиры
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="bg-slate-800 text-white px-6 py-3 rounded-2xl hover:bg-slate-900 transition-colors"
          >
            Начать заново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto min-h-screen relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-white/90 backdrop-blur-sm">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="text-center">
              <h1 className="text-lg text-black">Подбор квартир</h1>
              <p className="text-sm text-gray-500">
                {currentIndex + 1} из {properties.length}
              </p>
            </div>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              <Info className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pb-4 bg-white/90 backdrop-blur-sm">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-slate-600 to-stone-600 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / properties.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Cards Stack */}
          <div className="relative flex-1 px-6 py-4">
            {/* Next card (behind) */}
            {nextProperty && (
              <div
                className="absolute inset-x-6 top-4 h-[600px] bg-white rounded-3xl shadow-lg border border-gray-100"
                style={{
                  transform: `scale(${getNextCardScale()})`,
                  opacity: getNextCardOpacity(),
                  transition: isDragging
                    ? "none"
                    : "transform 0.3s ease-out, opacity 0.3s ease-out",
                }}
              >
                <PropertyCard property={nextProperty} />
              </div>
            )}

            {/* Current card */}
            <div
              ref={cardRef}
              className="relative h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100"
              style={{
                transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${getRotation()}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
                zIndex: 10, // Убедимся, что текущая карточка находится поверх
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <PropertyCard
                property={currentProperty}
                imageIndex={imageIndex}
                onNextImage={nextImage}
                onPrevImage={prevImage}
                isCurrentCard={true}
              />

              {/* Like/Dislike Overlays */}
              <div
                className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center rounded-3xl"
                style={{ opacity: getOpacity("like") }}
              >
                <div className="transform rotate-12 bg-white/90 backdrop-blur-sm rounded-3xl p-6">
                  <Heart className="w-16 h-16 text-emerald-500 fill-current" />
                </div>
              </div>

              <div
                className="absolute inset-0 bg-red-500/20 flex items-center justify-center rounded-3xl"
                style={{ opacity: getOpacity("dislike") }}
              >
                <div className="transform -rotate-12 bg-white/90 backdrop-blur-sm rounded-3xl p-6">
                  <X className="w-16 h-16 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-gray-100">
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={handleDislike}
                className="w-16 h-16 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-8 h-8 text-red-500" />
              </button>

              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                disabled={currentIndex === 0}
              >
                <RotateCcw className="w-5 h-5 text-gray-500" />
              </button>

              <button
                onClick={handleLike}
                className="w-16 h-16 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <Heart className="w-8 h-8 text-emerald-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md">
            {/* Desktop Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBack}
                className="p-3 hover:bg-white/20 rounded-2xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="text-center">
                <h1 className="text-2xl text-black">Подбор квартир</h1>
                <p className="text-gray-500">
                  {currentIndex + 1} из {properties.length}
                </p>
              </div>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="p-3 hover:bg-white/20 rounded-2xl transition-colors"
              >
                <Info className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-slate-600 to-stone-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / properties.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Cards Stack */}
            <div className="relative mb-8">
              {/* Next card (behind) */}
              {nextProperty && (
                <div
                  className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-100"
                  style={{
                    transform: `scale(${getNextCardScale()})`,
                    opacity: getNextCardOpacity(),
                    transition: isDragging
                      ? "none"
                      : "transform 0.3s ease-out, opacity 0.3s ease-out",
                  }}
                >
                  <PropertyCard property={nextProperty} />
                </div>
              )}

              {/* Current card */}
              <div
                ref={cardRef}
                className="relative h-full bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100"
                style={{
                  transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${getRotation()}deg)`,
                  transition: isDragging ? "none" : "transform 0.3s ease-out",
                  zIndex: 10, // Убедимся, что текущая карточка находится поверх
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <PropertyCard
                  property={currentProperty}
                  imageIndex={imageIndex}
                  onNextImage={nextImage}
                  onPrevImage={prevImage}
                  isCurrentCard={true}
                />
                {/* Like/Dislike Overlays */}
                <div
                  className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center rounded-3xl"
                  style={{ opacity: getOpacity("like") }}
                >
                  <div className="transform rotate-12 bg-white/90 backdrop-blur-sm rounded-3xl p-8">
                    <Heart className="w-20 h-20 text-emerald-500 fill-current" />
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-red-500/20 flex items-center justify-center rounded-3xl"
                  style={{ opacity: getOpacity("dislike") }}
                >
                  <div className="transform -rotate-12 bg-white/90 backdrop-blur-sm rounded-3xl p-8">
                    <X className="w-20 h-20 text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-8">
              <button
                onClick={handleDislike}
                className="w-18 h-18 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
              >
                <X className="w-9 h-9 text-red-500" />
              </button>

              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                disabled={currentIndex === 0}
              >
                <RotateCcw className="w-6 h-6 text-gray-500" />
              </button>

              <button
                onClick={handleLike}
                className="w-18 h-18 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
              >
                <Heart className="w-9 h-9 text-emerald-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Info Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm">
            <h3 className="text-lg text-black mb-4">Как это работает?</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-emerald-500 mr-3" />
                <span>Свайп вправо или ❤️ - нравится</span>
              </div>
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-500 mr-3" />
                <span>Свайп влево или ✕ - не нравится</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="w-5 h-5 text-gray-500 mr-3" />
                <span>Кнопка отмены - вернуться к предыдущей</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              На основе ваших предпочтений мы улучшим рекомендации
            </p>
            <button
              onClick={() => setShowPreferences(false)}
              className="w-full bg-slate-800 text-white py-2 rounded-2xl mt-4 hover:bg-slate-900 transition-colors"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
