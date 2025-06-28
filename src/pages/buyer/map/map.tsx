import { MapContainer, TileLayer, Marker, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { BuyEntity } from "@/entities/buy/type.ts";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { ObjectFullData } from "@/entities/buy/objectFullData.ts";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// District boundaries (approximate coordinates)
const DISTRICT_BOUNDARIES = {
  fmr: [
    // Фестивальный микрорайон
    [45.058, 38.987],
    [45.058, 38.9945],
    [45.058, 39.002],
    [45.058, 39.0095],
    [45.058, 39.017],
    [45.053, 39.017],
    [45.048, 39.017],
    [45.043, 39.017],
    [45.038, 39.017],
    [45.038, 39.0095],
    [45.038, 39.002],
    [45.038, 38.9945],
    [45.038, 38.987],
    [45.043, 38.987],
    [45.048, 38.987],
    [45.053, 38.987],
  ],

  cmr: [
    // Центральный район
    [45.035, 38.975],
    [45.035, 38.9895],
    [45.035, 39.004],
    [45.035, 39.0185],
    [45.035, 39.033],
    [45.03, 39.033],
    [45.025, 39.033],
    [45.02, 39.033],
    [45.015, 39.033],
    [45.015, 39.0185],
    [45.015, 39.004],
    [45.015, 38.9895],
    [45.015, 38.975],
    [45.02, 38.975],
    [45.025, 38.975],
    [45.03, 38.975],
  ],

  ymr: [
    // Юбилейный микрорайон
    [45.018, 38.965],
    [45.018, 38.975],
    [45.018, 38.985],
    [45.018, 38.995],
    [45.018, 39.005],
    [45.0135, 39.005],
    [45.009, 39.005],
    [45.0045, 39.005],
    [45.0, 39.005],
    [45.0, 38.995],
    [45.0, 38.985],
    [45.0, 38.975],
    [45.0, 38.965],
    [45.0045, 38.965],
    [45.009, 38.965],
    [45.0135, 38.965],
  ],

  pmr: [
    // Пашковский микрорайон
    [45.025, 39.08],
    [45.025, 39.0875],
    [45.025, 39.095],
    [45.025, 39.1025],
    [45.025, 39.11],
    [45.02, 39.11],
    [45.015, 39.11],
    [45.01, 39.11],
    [45.005, 39.11],
    [45.005, 39.1025],
    [45.005, 39.095],
    [45.005, 39.0875],
    [45.005, 39.08],
    [45.01, 39.08],
    [45.015, 39.08],
    [45.02, 39.08],
  ],

  smr: [
    // Славянский микрорайон
    [45.05, 39.03],
    [45.05, 39.0375],
    [45.05, 39.045],
    [45.05, 39.0525],
    [45.05, 39.06],
    [45.045, 39.06],
    [45.04, 39.06],
    [45.035, 39.06],
    [45.03, 39.06],
    [45.03, 39.0525],
    [45.03, 39.045],
    [45.03, 39.0375],
    [45.03, 39.03],
    [45.035, 39.03],
    [45.04, 39.03],
    [45.045, 39.03],
  ],

  chmr: [
    // Черёмушки
    [45.04, 38.95],
    [45.04, 38.9575],
    [45.04, 38.965],
    [45.04, 38.9725],
    [45.04, 38.98],
    [45.035, 38.98],
    [45.03, 38.98],
    [45.025, 38.98],
    [45.02, 38.98],
    [45.02, 38.9725],
    [45.02, 38.965],
    [45.02, 38.9575],
    [45.02, 38.95],
    [45.025, 38.95],
    [45.03, 38.95],
    [45.035, 38.95],
  ],

  mhg: [
    // «Микрохирургия глаза» (часть СМР)
    [45.03, 39.0],
    [45.03, 39.005],
    [45.03, 39.01],
    [45.03, 39.015],
    [45.03, 39.02],
    [45.0275, 39.02],
    [45.025, 39.02],
    [45.0225, 39.02],
    [45.02, 39.02],
    [45.02, 39.015],
    [45.02, 39.01],
    [45.02, 39.005],
    [45.02, 39.0],
    [45.0225, 39.0],
    [45.025, 39.0],
    [45.0275, 39.0],
  ],
};
const DISTRICT_COLORS = {
  fmr: "purple",
  cmr: "blue",
  ymr: "green",
  pmr: "orange",
  smr: "red",
  chmr: "pink",
  mhg: "brown",
};

const DISTRICT_NAMES = {
  fmr: "Фестивальный микрорайон (ФМР)",
  cmr: "Центральный район (ЦМР)",
  ymr: "Юбилейный микрорайон (ЮМР)",
  pmr: "Пашковский микрорайон (ПМР)",
  smr: "Славянский микрорайон (СМР)",
  chmr: "Черемушки (ЧМР)",
  mhg: "Микрохирургии глаза (МХГ)",
};

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
  entitiesToShow: ObjectFullData[];
  setSelectedPropertyData: Dispatch<SetStateAction<ObjectFullData | null>>;
  isMobile?: boolean;
}

export const BuyerMap = ({
  entitiesToShow,
  setSelectedPropertyData,
  isMobile = false,
}: BuyerMapProps) => {
  const [selectedEntity, setSelectedEntity] = useState<ObjectFullData | null>(
    null,
  );
  const mapCenter = [45.035, 38.975]; // Центр Краснодара

  return (
    <div className={`${isMobile ? "w-full h-full" : "w-1/2 h-full"} relative`}>
      {!isMobile && (
        <div className="absolute top-6 z-[30000] right-6 bg-white rounded-xl p-4 shadow-lg">
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
        <div className="absolute top-6 z-[30000] right-6 bg-white rounded-xl p-2 shadow-lg">
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
        zoom={12}
        scrollWheelZoom={false}
        className={"relative"}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* District polygons */}
        {Object.entries(DISTRICT_BOUNDARIES).map(
          ([districtKey, coordinates]) => (
            <Polygon
              key={districtKey}
              positions={coordinates}
              pathOptions={{
                color:
                  DISTRICT_COLORS[districtKey as keyof typeof DISTRICT_COLORS],
                fillOpacity: 0.1,
                weight: 2,
              }}
            >
              <Popup>
                {DISTRICT_NAMES[districtKey as keyof typeof DISTRICT_NAMES]}
              </Popup>
            </Polygon>
          ),
        )}

        {/* Property markers */}
        {entitiesToShow.map((entity) => (
          <Marker
            key={entity.id}
            position={[
              Number.parseFloat(entity.latitude),
              Number.parseFloat(entity.longitude),
            ]}
            icon={CustomMarkerIcon({
              isSelected: +(selectedEntity?.id || 0) === entity.id,
              statusColor: "#f0f0f0",
              price: entity.min_price,
            })}
            eventHandlers={{
              click: () => {
                setSelectedEntity(entity);
                setSelectedPropertyData(entity);
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};
