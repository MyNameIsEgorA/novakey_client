// PropertyCard.tsx
import React from "react";
import {
  MapPin,
  Home,
  Car,
  Wifi,
  Dumbbell,
  Baby,
  Star,
  CheckCircle,
  Bookmark,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import type { ObjectFullData } from "@/entities/buy/objectFullData.ts";
import { useNavigate } from "react-router-dom"; // Убедитесь, что путь к компоненту правильный

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

interface PropertyCardProps {
  property: ObjectFullData;
  imageIndex?: number;
  onNextImage?: () => void;
  onPrevImage?: () => void;
  isCurrentCard?: boolean; // Флаг, чтобы знать, является ли это текущей перетаскиваемой карточкой
}

const amenityIcons: { [key: string]: any } = {
  Парковка: Car,
  "Подземная парковка": Car,
  Лифт: Home,
  Консьерж: Home,
  "Фитнес-зал": Dumbbell,
  Видеонаблюдение: Home,
  "Детская площадка": Baby,
  "Закрытая территория": Home,
  Отделка: Home,
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  imageIndex = 0,
  onNextImage,
  onPrevImage,
  isCurrentCard = false,
}) => {
  const navigate = useNavigate();
  if (!property) {
    return null; // Или какой-то заглушка, если свойство не передано
  }

  return (
    <div>
      {/* Image Section */}
      <div className="relative h-80 lg:h-96 overflow-hidden rounded-t-3xl">
        <ImageWithFallback
          src={property.photos[imageIndex]}
          alt={property.name}
          className="w-full h-full object-cover"
        />

        {/* Image Navigation Dots (только для текущей карточки) */}
        {isCurrentCard && (
          <div className="absolute top-6 left-6 right-6 flex space-x-2">
            {property.photos.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 lg:h-1.5 rounded-full ${
                  index === imageIndex ? "bg-white shadow-sm" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Controls (только для текущей карточки) */}
        {isCurrentCard && (
          <div className="absolute inset-0 flex">
            <button
              onClick={onPrevImage}
              className="flex-1"
              disabled={imageIndex === 0}
            />
            <button
              onClick={onNextImage}
              className="flex-1"
              disabled={imageIndex === property.photos.length - 1}
            />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          <span
            className={`px-3 py-2 lg:px-4 lg:py-2 rounded-2xl text-white text-sm backdrop-blur-sm ${
              property.construction_status === "Сдан"
                ? "bg-emerald-500/90"
                : property.construction_status === "Строительство"
                  ? "bg-blue-500/90"
                  : "bg-amber-500/90"
            }`}
          >
            {property.construction_status}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Rating */}
        <div className="absolute bottom-6 right-6 flex items-center bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-2 lg:px-4 lg:py-2">
          <Star className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 fill-current mr-2" />
          <span className="text-white text-sm lg:text-base">{4.8}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 lg:p-8">
        {/* Title and Verification */}
        <div className="flex items-start justify-between mb-3 lg:mb-4">
          <div className="flex-1">
            <h3 className="text-xl lg:text-2xl text-black mb-1 lg:mb-2">
              {property.name}
            </h3>
            <div className="flex items-center text-gray-500 text-sm lg:text-base">
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
              {property.address}
            </div>
          </div>
          <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500 ml-2 lg:ml-3 flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
          {property.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
          <div className="text-center">
            <div className="text-lg lg:text-xl text-black">
              {property.min_price}
            </div>
            <div className="text-xs lg:text-sm text-gray-500">Цена</div>
          </div>
          <div className="text-center">
            <div className="text-lg lg:text-xl text-black">
              {property.photos.length}
            </div>
            <div className="text-xs lg:text-sm text-gray-500">Просмотров</div>
          </div>
          <div className="text-center">
            <div className="text-lg lg:text-xl text-black">
              {property.amenities.length}
            </div>
            <div className="text-xs lg:text-sm text-gray-500">Сохранили</div>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
          <div className="bg-gray-50 rounded-2xl p-3 lg:p-4">
            <div className="text-sm text-gray-500 mb-1">Площадь</div>
            <div className="text-black">{Math.round(+property.min_price)}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 lg:p-4">
            <div className="text-sm text-gray-500 mb-1">Этаж</div>
            <div className="text-black">{property.floors_count}</div>
          </div>
        </div>

        {/* Action Buttons (только для текущей карточки) */}
        {isCurrentCard && (
          <div className="flex space-x-3 lg:space-x-4">
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Bookmark className="w-5 h-5 mr-2" />
              Сохранить
            </button>
            <button className="flex-1 bg-slate-800 text-white py-3 rounded-2xl hover:bg-slate-900 transition-colors">
              Связаться
            </button>
          </div>
        )}
        {!isCurrentCard && ( // Заглушка или просто отступ для следующей карточки, если нет кнопок
          <div className="h-[48px] lg:h-[52px]"></div> // Высота кнопок + отступ
        )}

        <div className="text-xs lg:text-sm text-gray-400 mt-3 text-center">
          Застройщик: {property.developer}
        </div>
      </div>
    </div>
  );
};
