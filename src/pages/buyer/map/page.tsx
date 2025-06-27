import { MapFilters } from "@/pages/buyer/map/filters.tsx";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";
import { useEffect, useState } from "react";
import type { BuyEntity } from "@/entities/buy/type.ts";
import { getAllAvailableObjects } from "@/entities/buy/model.ts";
import type { Filters } from "@/shared/type/filters.ts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react"; // Assuming you have lucide-react for the MapPin icon

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Helper function to get status color
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
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z""></path>
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

export const BuyerMapPage = () => {
  const [allEntities, setAllEntities] = useState<BuyEntity[]>([]);
  const [entitiesToShow, setEntitiesToShow] = useState<BuyEntity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<BuyEntity | null>(null);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 20],
    areaRange: [20, 150],
    rooms: "any",
    status: "any",
    district: "any",
    developer: "any",
    floorRange: [1, 30],
    amenities: [] as string[],
    nearTransport: false,
    nearSchool: false,
    nearShops: false,
  });

  useEffect(() => {
    let filtered = allEntities;

    filtered = filtered.filter(
      (entity) =>
        entity.priceNum >= filters.priceRange[0] &&
        entity.priceNum <= filters.priceRange[1],
    );

    filtered = filtered.filter(
      (entity) =>
        entity.area >= filters.areaRange[0] &&
        entity.area <= filters.areaRange[1],
    );

    if (filters.rooms !== "any") {
      filtered = filtered.filter((entity) => {
        if (filters.rooms === "4") {
          return entity.rooms && parseInt(entity.rooms) >= 4;
        }
        return entity.rooms === filters.rooms;
      });
    }

    if (filters.status !== "any") {
      filtered = filtered.filter((entity) => entity.status === filters.status);
    }

    if (filters.district !== "any") {
      filtered = filtered.filter(
        (entity) => entity.district === filters.district,
      );
    }

    if (filters.developer !== "any") {
      filtered = filtered.filter(
        (entity) => entity.developer === filters.developer,
      );
    }

    if (filters.nearTransport) {
      filtered = filtered.filter((entity) => entity.nearTransport);
    }

    if (filters.nearSchool) {
      filtered = filtered.filter((entity) => entity.nearSchool);
    }

    if (filters.nearShops) {
      filtered = filtered.filter((entity) => entity.nearShops);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((entity) =>
        filters.amenities.every((amenity) =>
          entity.amenities.includes(amenity),
        ),
      );
    }

    setEntitiesToShow(filtered);
  }, [filters, allEntities]);

  useEffect(() => {
    const getEntities = async () => {
      const entities = await getAllAvailableObjects();

      // Assuming 'statusColor' and 'priceNum' are available on your BuyEntity type
      // If not, you'll need to add them or derive them here.
      // For demonstration, I'm assuming 'status' can map to 'statusColor' (e.g., 'available' -> 'green', 'sold' -> 'orange')
      // and 'priceNum' is used to format 'price' string.
      const transformedEntities = entities.map((entity) => ({
        ...entity,
        statusColor:
          entity.status === "available"
            ? "green"
            : entity.status === "booked"
              ? "orange"
              : "blue", // Example mapping
        price: `${entity.priceNum}М ₽`, // Format price string
      }));

      setAllEntities(transformedEntities as BuyEntity[]); // Cast if necessary
      setEntitiesToShow(transformedEntities as BuyEntity[]);
    };

    getEntities();
  }, []);

  return (
    <div className={"bg-[#f9f9f9] h-full"}>
      <BuyerHeader
        title={"Карта объектов"}
        description={"Интерактивная карта с объектами"}
        hideOnMobile={true}
      />
      <div className={"p-6 flex w-full h-[calc(100vh-120px)]"}>
        <MapFilters
          entitiesToShow={entitiesToShow}
          allEntities={allEntities}
          setEntitiesToShow={setEntitiesToShow}
          className={"w-1/4"}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={"w-1/2 h-full"}>
          <MapContainer
            center={[45.02, 38.09]}
            zoom={13}
            scrollWheelZoom={false}
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
      </div>
    </div>
  );
};
