import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { BuyEntity } from "@/entities/buy/type.ts";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

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

  return L.divIcon({
    html: `
      <div class="relative w-9 h-9 rounded-full ${shadowClass} transform -translate-x-1/2 -translate-y-1/2transition-all duration-200 ${scaleClass} ${colorClass}" style="left: 50%; top: 50%;">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-8 h-8 text-white mx-auto pt-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"></path>
        </svg>
        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-sm text-gray-700 shadow-lg whitespace-nowrap">
          ${price}
        </div>
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  });
};

interface BuyerMapProps {
  entitiesToShow: BuyEntity[];
  setSelectedPropertyData: Dispatch<SetStateAction<BuyEntity | null>>;
  isMobile?: boolean;
}

export const BuyerMap = ({
  entitiesToShow,
  setSelectedPropertyData,
  isMobile = false,
}: BuyerMapProps) => {
  const [selectedEntity, setSelectedEntity] = useState<BuyEntity | null>(null);
  const mapCenter = [45.2, 39.0];

  return (
    <div className={`${isMobile ? "w-full h-full" : "w-1/2 h-full"} relative`}>
      {!isMobile && (
        <div className="absolute top-6 z-[30000] z-[0] right-6 bg-white rounded-xl p-4 shadow-lg">
          <h4 className="text-black mb-3">Статус объектов</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Готов к заселению</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Отделочные работы</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-gray-700">На стадии строительства</span>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="absolute top-6 z-[30000] z-[0] right-6 bg-white rounded-xl p-2 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-700 text-[12px]">
                Готов к заселению
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-gray-700 text-[12px]">
                Отделочные работы
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-700 text-[12px]">
                На стадии строительства
              </span>
            </div>
          </div>
        </div>
      )}
      <MapContainer
        center={mapCenter}
        zoom={10}
        scrollWheelZoom={false}
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
                setSelectedPropertyData(entity);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
};
