import { FC, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Правильный способ задать иконки для маркера (ES-модули)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Настройка дефолтной иконки для leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface SelectPositionMapProps {
  setData: (lat: number, lng: number) => void;
}

const MapClickHandler: FC<{ onClick: (lat: number, lng: number) => void }> = ({
  onClick,
}) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onClick(lat, lng);
    },
  });
  return null;
};

export const SelectPositionMap: FC<SelectPositionMapProps> = ({ setData }) => {
  const defaultPosition: [number, number] = [45.035, 38.975];
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null,
  );

  const handleMapClick = (lat: number, lng: number) => {
    setMarkerPosition([lat, lng]);
    setData(lat, lng);
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler onClick={handleMapClick} />
      {markerPosition && <Marker position={markerPosition} />}
    </MapContainer>
  );
};
