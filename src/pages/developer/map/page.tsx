import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useIsMobile } from "@/shared/hooks/isMobile.ts";
import React from "react";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx"; // useState больше не нужен для отдельной легенды

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// District boundaries (значительно более детализированные и непрямоугольные координаты)
const DISTRICT_BOUNDARIES = {
  fmr: [
    // Фестивальный микрорайон - FMR
    [45.058, 38.987],
    [45.06, 38.995],
    [45.059, 39.005],
    [45.057, 39.015],
    [45.05, 39.022],
    [45.045, 39.02],
    [45.038, 39.017],
    [45.035, 39.01],
    [45.034, 39.0],
    [45.036, 38.99],
    [45.04, 38.98],
    [45.048, 38.978],
  ],
  cmr: [
    // Центральный район - CMR
    [45.035, 38.975],
    [45.038, 38.985],
    [45.04, 39.0],
    [45.037, 39.015],
    [45.035, 39.033],
    [45.028, 39.035],
    [45.02, 39.03],
    [45.015, 39.02],
    [45.012, 39.005],
    [45.015, 38.99],
    [45.02, 38.97],
    [45.028, 38.968],
  ],
  ymr: [
    // Юбилейный микрорайон - YMR
    [45.018, 38.965],
    [45.02, 38.975],
    [45.019, 38.985],
    [45.015, 38.995],
    [45.01, 39.005],
    [45.005, 39.008],
    [45.0, 39.0],
    [44.998, 38.99],
    [45.0, 38.98],
    [45.005, 38.97],
    [45.01, 38.96],
  ],
  pmr: [
    // Пашковский микрорайон - PMR
    [45.025, 39.08],
    [45.028, 39.09],
    [45.03, 39.1],
    [45.025, 39.11],
    [45.02, 39.115],
    [45.015, 39.112],
    [45.01, 39.105],
    [45.005, 39.095],
    [45.0, 39.085],
    [45.005, 39.075],
    [45.015, 39.078],
    [45.02, 39.079],
  ],
  smr: [
    // Славянский микрорайон - SMR
    [45.05, 39.03],
    [45.053, 39.04],
    [45.055, 39.05],
    [45.05, 39.06],
    [45.045, 39.065],
    [45.038, 39.062],
    [45.03, 39.06],
    [45.028, 39.05],
    [45.03, 39.04],
    [45.035, 39.03],
    [45.04, 39.028],
  ],
  chmr: [
    // Черёмушки - CHMR
    [45.04, 38.95],
    [45.043, 38.96],
    [45.045, 38.97],
    [45.04, 38.98],
    [45.035, 38.982],
    [45.028, 38.98],
    [45.02, 38.975],
    [45.018, 38.965],
    [45.02, 38.955],
    [45.025, 38.945],
    [45.033, 38.948],
  ],
};

const DISTRICT_COLORS = {
  fmr: "purple",
  cmr: "blue",
  ymr: "green",
  pmr: "orange",
  smr: "red",
  chmr: "pink",
};

const DISTRICT_NAMES = {
  fmr: "Фестивальный микрорайон (ФМР)",
  cmr: "Центральный район (ЦМР)",
  ymr: "Юбилейный микрорайон (ЮМР)",
  pmr: "Пашковский микрорайон (ПМР)",
  smr: "Славянский микрорайон (СМР)",
  chmr: "Черёмушки (ЧМР)",
};

// Placeholder for purchases data (вы можете заменить это реальными данными)
const DISTRICT_PURCHASES: { [key: string]: number } = {
  fmr: 7,
  cmr: 12,
  ymr: 12,
  pmr: 11,
  smr: 4,
  chmr: 3,
  mhg: 9,
};

export const DeveloperMapPage = () => {
  const mapCenter = [45.035, 39.0]; // Центр Краснодара
  const isMobile = useIsMobile();

  return (
    <div className={`${!isMobile ? "p-6" : ""} w-full h-full`}>
      {/* p-6 will add padding, consider if you want full width/height map */}
      <DeveloperHeader
        hideOnMobile={true}
        title={"Карта покупателей по районам"}
        description={
          "На карте показано, сколько было куплено квартир в разных регионах Краснодара"
        }
      />
      <div
        // Use h-screen for full viewport height on mobile, or h-full if its parent has a defined height
        className={`${isMobile ? "w-full h-screen" : "w-full h-full"} relative`}
        style={isMobile ? { height: "calc(100vh - 80px)" } : {}} // Adjust 80px based on header height
      >
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
                    DISTRICT_COLORS[
                      districtKey as keyof typeof DISTRICT_COLORS
                    ],
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-black">
                    <h5 className="font-semibold mb-1">
                      {
                        DISTRICT_NAMES[
                          districtKey as keyof typeof DISTRICT_NAMES
                        ]
                      }
                    </h5>
                    <p>
                      Покупок совершено:{" "}
                      <span className="font-bold">
                        {
                          DISTRICT_PURCHASES[
                            districtKey as keyof typeof DISTRICT_PURCHASES
                          ]
                        }
                      </span>
                    </p>
                  </div>
                </Popup>
              </Polygon>
            ),
          )}

          {/* Property markers */}
        </MapContainer>
      </div>
    </div>
  );
};
