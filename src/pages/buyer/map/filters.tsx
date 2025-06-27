import type { BuyEntity } from "@/entities/buy/type.ts";
import type { Dispatch, FC, SetStateAction } from "react";
import { cn } from "@/lib/utils.ts";
import { BaseFilters, type Filters } from "@/shared/type/filters.ts";

interface MapFiltersProps {
  allEntities: BuyEntity[];
  entitiesToShow: BuyEntity[];
  setEntitiesToShow: Dispatch<SetStateAction<BuyEntity[]>>;
  className: string;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const availableAmenities = [
  "Балкон",
  "Лифт",
  "Парковка",
  "Консьерж",
  "Фитнес",
  "Детская площадка",
  "Терраса",
];
const availableDistricts = ["any", "Центр", "Северный", "Южный", "Восточный"];
const availableDevelopers = [
  "any",
  "СтройИнвест",
  "Новострой",
  "Премиум Строй",
  "ЭкоСтрой",
  "Элит Девелопмент",
  "Массив Строй",
];

export const MapFilters: FC<MapFiltersProps> = ({
  allEntities,
  entitiesToShow,
  className,
  filters,
  setFilters,
}) => {
  return (
    <div className={cn("p-3 bg-white rounded-l w-1/4", className)}>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-black">Фильтры</h2>
          {JSON.stringify(filters) !== JSON.stringify(BaseFilters) && (
            <div
              className={"text-[12px] text-blue-600 cursor-pointer"}
              onClick={() => {
                setFilters(BaseFilters);
              }}
            >
              Сбросить
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {entitiesToShow.length} из {allEntities.length} найдено
        </p>
      </div>
      <div className={"mt-4"}>
        <h3 className="text-black mb-4">Быстрые фильтры</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.nearTransport}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  nearTransport: e.target.checked,
                }))
              }
              className="mr-3 rounded accent-blue-600"
            />
            <span className="text-gray-700">🚇 Рядом транспорт</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.nearSchool}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  nearSchool: e.target.checked,
                }))
              }
              className="mr-3 rounded accent-blue-600"
            />
            <span className="text-gray-700">🏫 Рядом школа</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.nearShops}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  nearShops: e.target.checked,
                }))
              }
              className="mr-3 rounded accent-blue-600"
            />
            <span className="text-gray-700">🛒 Рядом магазины</span>
          </label>
        </div>
      </div>

      <div className={"mt-5"}>
        <label className="text-black mb-3 block">Цена, млн ₽</label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [0, parseFloat(e.target.value)],
              }))
            }
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0 млн</span>
            <span className="text-blue-600">
              до {filters.priceRange[1]} млн
            </span>
            <span>20 млн</span>
          </div>
        </div>
      </div>

      {/* Area Range */}
      <div>
        <label className="text-black mb-3 block mt-5">Площадь, м²</label>
        <div className="space-y-3">
          <div className="space-y-2">
            <input
              type="range"
              min="20"
              max="150"
              value={filters.areaRange[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  areaRange: [parseInt(e.target.value), prev.areaRange[1]],
                }))
              }
              className="w-full accent-blue-600"
            />
            <input
              type="range"
              min="20"
              max="150"
              value={filters.areaRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  areaRange: [prev.areaRange[0], parseInt(e.target.value)],
                }))
              }
              className="w-full accent-blue-600"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{filters.areaRange[0]} м²</span>
            <span className="text-blue-600">
              {filters.areaRange[0]} - {filters.areaRange[1]} м²
            </span>
            <span>{filters.areaRange[1]} м²</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div>
          <label className="text-black mb-2 block">Комнаты</label>
          <select
            value={filters.rooms}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, rooms: e.target.value }))
            }
            className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="any">Любая</option>
            <option value="1">1-комн.</option>
            <option value="2">2-комн.</option>
            <option value="3">3-комн.</option>
            <option value="4">4+ комн.</option>
          </select>
        </div>

        <div>
          <label className="text-black mb-2 block">Готовность</label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="any">Любой</option>
            <option value="ready">Готов</option>
            <option value="finishing">Облицовка</option>
            <option value="construction">Строительство</option>
          </select>
        </div>

        <div>
          <label className="text-black mb-2 block">Район</label>
          <select
            value={filters.district}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, district: e.target.value }))
            }
            className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district === "any" ? "Любой" : district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-black mb-2 block">Застройщик</label>
          <select
            value={filters.developer}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, developer: e.target.value }))
            }
            className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            {availableDevelopers.map((dev) => (
              <option key={dev} value={dev}>
                {dev === "any" ? "Любой" : dev}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={"mt-5"}>
        <label className="text-sm text-gray-600 mb-3 block">Удобства</label>
        <div className="flex flex-wrap gap-2">
          {availableAmenities.map((amenity) => (
            <button
              key={amenity}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  amenities: prev.amenities.includes(amenity)
                    ? prev.amenities.filter((a) => a !== amenity)
                    : [...prev.amenities, amenity],
                }));
              }}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                filters.amenities.includes(amenity)
                  ? "bg-blue-100 text-blue-700 border-blue-200"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
