import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { BuyEntity } from "@/entities/buy/type.ts";
import { calculateCenter } from "@/pages/buyer/map/helpers.ts"; // Не используется в данном примере, но сохранено
import { useState, useEffect } from "react";

// Важно: Эта строка необходима для корректного отображения маркеров по умолчанию в Leaflet
// Хотя мы используем кастомные divIcon, это может помочь избежать проблем с Leaflet в целом
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const getStatusColorClass = (statusColor: string) => {
  if (statusColor === "orange") return "bg-orange-500";
  if (statusColor === "blue") return "bg-blue-500";
  return "bg-green-500";
};

interface CustomMarkerIconProps {
  isSelected: boolean;
  statusColor: string;
  price: string;
}

const CustomMarkerIcon = ({
  isSelected,
  statusColor,
  price,
}: CustomMarkerIconProps) => {
  const colorClass = getStatusColorClass(statusColor);
  const scaleClass = isSelected ? "scale-125 z-20" : "hover:scale-110 z-10";
  const shadowClass = isSelected ? "shadow-lg" : "";

  // Отображаем цену только для выбранного маркера
  const priceHtml = isSelected
    ? `<div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs text-gray-700 shadow-md whitespace-nowrap">
        ${price}
       </div>`
    : "";

  return L.divIcon({
    html: `
      <div class="relative w-9 h-9 rounded-full ${shadowClass} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${scaleClass} ${colorClass}" style="left: 50%; top: 50%;">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-8 h-8 text-white mx-auto pt-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"></path>
        </svg>
        ${priceHtml}
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [60, 60], // Возвращаем исходный размер иконки
    iconAnchor: [30, 60], // Возвращаем исходный якорь
  });
};

interface BuyerMapProps {
  entitiesToShow: BuyEntity[];
}

export const BuyerMap = ({ entitiesToShow }: BuyerMapProps) => {
  const [selectedEntity, setSelectedEntity] = useState<BuyEntity | null>(null);
  const mapCenter = [44.58, 37.5]; // Центр карты по умолчанию

  return (
    <div className={"w-1/2 relative h-full"}>
      {/* Легенда статусов удалена для минимализма */}
      <MapContainer
        center={mapCenter}
        zoom={8}
        scrollWheelZoom={false} // Отключена прокрутка для зума
        className={"relative"}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {entitiesToShow.map((entity) => (
          <Marker
            key={entity.id}
            position={[entity.x, entity.y]}
            icon={CustomMarkerIcon({
              isSelected: selectedEntity?.id === entity.id,
              statusColor: entity.statusColor,
              price: entity.price,
            })}
            eventHandlers={{
              click: () => {
                setSelectedEntity(entity);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
};
