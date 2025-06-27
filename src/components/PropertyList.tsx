import { useState } from "react";
import {
  ArrowLeft,
  Filter,
  MapPin,
  Home,
  Calendar,
  Search,
  SlidersHorizontal,
  X,
  Grid,
  List as ListIcon,
  Heart,
  Share2,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PropertyListProps {
  onPropertySelect: (propertyId: string) => void;
  onBack: () => void;
  userType?: "buyer" | "developer" | null;
}

const buyerProperties = [
  {
    id: "1",
    name: 'ЖК "Северная звезда"',
    price: "от 8,5 млн ₽",
    priceNum: 8.5,
    pricePerSqm: 130769,
    rooms: "2-комн.",
    area: 65,
    floor: 5,
    maxFloor: 16,
    status: "Облицовка",
    statusColor: "orange",
    district: "Северный",
    developer: "СтройИнвест",
    location: "Северный район",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=160&h=160&fit=crop",
    amenities: ["Балкон", "Лифт", "Парковка"],
    nearTransport: true,
    nearSchool: false,
    nearShops: true,
    deliveryDate: "4 кв. 2024",
  },
  {
    id: "2",
    name: 'ЖК "Новый Горизонт"',
    price: "от 5,2 млн ₽",
    priceNum: 5.2,
    pricePerSqm: 123810,
    rooms: "1-комн.",
    area: 42,
    floor: 8,
    maxFloor: 25,
    status: "Строительство",
    statusColor: "blue",
    district: "Центр",
    developer: "Новострой",
    location: "Центр",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=160&fit=crop",
    amenities: ["Французский балкон", "Лифт"],
    nearTransport: true,
    nearSchool: true,
    nearShops: true,
    deliveryDate: "2 кв. 2025",
  },
  {
    id: "3",
    name: 'ЖК "Центральный"',
    price: "от 12,3 млн ₽",
    priceNum: 12.3,
    pricePerSqm: 138202,
    rooms: "3-комн.",
    area: 89,
    floor: 12,
    maxFloor: 20,
    status: "Готов",
    statusColor: "green",
    district: "Центр",
    developer: "Премиум Строй",
    location: "Центр",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=160&h=160&fit=crop",
    amenities: ["Балкон", "Лифт", "Парковка", "Консьерж"],
    nearTransport: true,
    nearSchool: true,
    nearShops: true,
    deliveryDate: "Сдан",
  },
];

const developerProperties = [
  {
    id: "1",
    name: 'ЖК "Северная звезда"',
    price: "от 8,5 млн ₽",
    priceNum: 8.5,
    pricePerSqm: 130769,
    rooms: "65 квартир",
    area: 65,
    floor: 16,
    maxFloor: 16,
    status: "Облицовка",
    statusColor: "orange",
    district: "Северный",
    developer: "СтройИнвест",
    location: "Северный район",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=160&h=160&fit=crop",
    amenities: ["Балкон", "Лифт", "Парковка"],
    nearTransport: true,
    nearSchool: false,
    nearShops: true,
    deliveryDate: "4 кв. 2024",
    sold: 45,
    total: 120,
    views: 1240,
    inquiries: 28,
  },
  {
    id: "2",
    name: 'ЖК "Новый Горизонт"',
    price: "от 5,2 млн ₽",
    priceNum: 5.2,
    pricePerSqm: 123810,
    rooms: "84 квартиры",
    area: 42,
    floor: 25,
    maxFloor: 25,
    status: "Строительство",
    statusColor: "blue",
    district: "Центр",
    developer: "СтройИнвест",
    location: "Центр",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=160&fit=crop",
    amenities: ["Французский балкон", "Лифт"],
    nearTransport: true,
    nearSchool: true,
    nearShops: true,
    deliveryDate: "2 кв. 2025",
    sold: 12,
    total: 84,
    views: 890,
    inquiries: 15,
  },
  {
    id: "3",
    name: 'ЖК "Парковый"',
    price: "от 6,8 млн ₽",
    priceNum: 6.8,
    pricePerSqm: 123636,
    rooms: "48 квартир",
    area: 55,
    floor: 12,
    maxFloor: 12,
    status: "Облицовка",
    statusColor: "orange",
    district: "Южный",
    developer: "СтройИнвест",
    location: "Южный район",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=160&h=160&fit=crop",
    amenities: ["Балкон", "Лифт", "Детская площадка"],
    nearTransport: false,
    nearSchool: true,
    nearShops: false,
    deliveryDate: "1 кв. 2025",
    sold: 31,
    total: 48,
    views: 2100,
    inquiries: 42,
  },
];

export function PropertyList({
  onPropertySelect,
  onBack,
  userType,
}: PropertyListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filters, setFilters] = useState({
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

  const properties =
    userType === "developer" ? developerProperties : buyerProperties;
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

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      property.priceNum >= filters.priceRange[0] &&
      property.priceNum <= filters.priceRange[1];
    const matchesArea =
      property.area >= filters.areaRange[0] &&
      property.area <= filters.areaRange[1];
    const matchesRooms =
      filters.rooms === "any" || property.rooms.includes(filters.rooms);
    const matchesStatus =
      filters.status === "any" ||
      (filters.status === "construction" &&
        property.status === "Строительство") ||
      (filters.status === "finishing" && property.status === "Облицовка") ||
      (filters.status === "ready" && property.status === "Готов");
    const matchesDistrict =
      filters.district === "any" || property.district === filters.district;
    const matchesDeveloper =
      filters.developer === "any" || property.developer === filters.developer;
    const matchesFloor =
      property.floor >= filters.floorRange[0] &&
      property.floor <= filters.floorRange[1];
    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((amenity) =>
        property.amenities.includes(amenity),
      );
    const matchesTransport = !filters.nearTransport || property.nearTransport;
    const matchesSchool = !filters.nearSchool || property.nearSchool;
    const matchesShops = !filters.nearShops || property.nearShops;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesArea &&
      matchesRooms &&
      matchesStatus &&
      matchesDistrict &&
      matchesDeveloper &&
      matchesFloor &&
      matchesAmenities &&
      matchesTransport &&
      matchesSchool &&
      matchesShops
    );
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.priceNum - b.priceNum;
      case "price_desc":
        return b.priceNum - a.priceNum;
      case "area":
        return a.area - b.area;
      case "area_desc":
        return b.area - a.area;
      case "price_per_sqm":
        return a.pricePerSqm - b.pricePerSqm;
      case "views":
        return userType === "developer"
          ? (b as any).views - (a as any).views
          : 0;
      case "sold":
        return userType === "developer" ? (b as any).sold - (a as any).sold : 0;
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 20],
      areaRange: [20, 150],
      rooms: "any",
      status: "any",
      district: "any",
      developer: "any",
      floorRange: [1, 30],
      amenities: [],
      nearTransport: false,
      nearSchool: false,
      nearShops: false,
    });
  };

  const activeFiltersCount = [
    filters.priceRange[1] < 20 ? 1 : 0,
    filters.areaRange[0] > 20 || filters.areaRange[1] < 150 ? 1 : 0,
    filters.rooms !== "any" ? 1 : 0,
    filters.status !== "any" ? 1 : 0,
    filters.district !== "any" ? 1 : 0,
    filters.developer !== "any" ? 1 : 0,
    filters.floorRange[0] > 1 || filters.floorRange[1] < 30 ? 1 : 0,
    filters.amenities.length,
    filters.nearTransport ? 1 : 0,
    filters.nearSchool ? 1 : 0,
    filters.nearShops ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="h-fit bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white h-fit">
          {/* Mobile Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={onBack}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg">
                    {userType === "developer" ? "Мои объекты" : "Все объекты"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {sortedProperties.length} из {properties.length} найдено
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-gray-100 rounded-lg relative"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder={
                  userType === "developer"
                    ? "Поиск по моим объектам..."
                    : "Поиск по названию, району, застройщику..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Sort and Quick Stats */}
            <div className="flex items-center justify-between">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 rounded-lg px-3 py-2 text-sm border-0 outline-none"
              >
                <option value="price">По цене ↑</option>
                <option value="price_desc">По цене ↓</option>
                <option value="area">По площади ↑</option>
                <option value="area_desc">По площади ↓</option>
                <option value="price_per_sqm">По цене за м²</option>
                {userType === "developer" && (
                  <>
                    <option value="views">По просмотрам</option>
                    <option value="sold">По продажам</option>
                  </>
                )}
              </select>

              <div className="text-gray-500 text-xs">
                Средняя цена:{" "}
                {Math.round(
                  (sortedProperties.reduce((sum, p) => sum + p.priceNum, 0) /
                    sortedProperties.length) *
                    10,
                ) / 10}{" "}
                млн ₽
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel - Same as before but hidden for brevity */}
          {showFilters && (
            <div className="bg-white border-b border-gray-200 max-h-96 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">Фильтры</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Quick Filters */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Рядом есть
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.nearTransport}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            nearTransport: e.target.checked,
                          })
                        }
                        className="rounded accent-blue-600"
                      />
                      <span className="text-sm">🚇 Транспорт</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.nearSchool}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            nearSchool: e.target.checked,
                          })
                        }
                        className="rounded accent-blue-600"
                      />
                      <span className="text-sm">🏫 Школа</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.nearShops}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            nearShops: e.target.checked,
                          })
                        }
                        className="rounded accent-blue-600"
                      />
                      <span className="text-sm">🛒 Магазины</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Цена, млн ₽</h4>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [0, parseFloat(e.target.value)],
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span>
                    <span>до {filters.priceRange[1]}</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Добавьте остальные фильтры */}

                <div className="flex space-x-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2 border border-gray-300 rounded-lg"
                  >
                    Сбросить
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Применить
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Properties List */}
          <div className="px-6 py-4 pb-20">
            <div className="space-y-4">
              {sortedProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => onPropertySelect(property.id)}
                  className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    <div className="w-24 h-24 rounded-lg overflow-hidden mr-4">
                      <ImageWithFallback
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-black text-[14px]">
                          {property.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              property.statusColor === "orange"
                                ? "bg-orange-100 text-orange-600"
                                : property.statusColor === "blue"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                            }`}
                          >
                            {property.status}
                          </span>
                          {userType === "developer" && (
                            <div className="flex space-x-1">
                              <button className="p-1 text-gray-400 hover:text-blue-500">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 mb-2">
                        <div className="flex items-center text-gray-500 text-[12px]">
                          <Home className="w-4 h-4 mr-1" />
                          {property.rooms}
                          {userType === "buyer" && `, ${property.area} м²`}
                        </div>
                        <div className="flex items-center text-gray-500 text-[12px]">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                          {userType === "buyer" &&
                            `, ${property.floor}/${property.maxFloor} эт.`}
                        </div>
                        <div className="flex items-center text-gray-500 text-[12px]">
                          <Calendar className="w-4 h-4 mr-1" />
                          {property.deliveryDate}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-blue-600 text-[12px]">
                            {property.price}
                          </p>
                          <p className="text-gray-500">
                            {property.pricePerSqm.toLocaleString()} ₽/м²
                          </p>
                        </div>
                        <div className="text-right">
                          {userType === "developer" ? (
                            <div>
                              <p className="text-gray-600 text-sm">
                                {(property as any).sold}/
                                {(property as any).total} продано
                              </p>
                              <p className="text-gray-500 text-xs">
                                {(property as any).views} просмотров
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-600 text-sm">
                                {property.developer}
                              </p>
                              <div className="flex items-center space-x-1 mt-1">
                                {property.nearTransport && (
                                  <span className="text-xs">🚇</span>
                                )}
                                {property.nearSchool && (
                                  <span className="text-xs">🏫</span>
                                )}
                                {property.nearShops && (
                                  <span className="text-xs">🛒</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1">
                        {property.amenities
                          .slice(0, 3)
                          .map((amenity, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        {property.amenities.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{property.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProperties.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Объекты не найдены</p>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 text-sm mt-2"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-6 h-[93vh]">
          {/* Desktop Filters Sidebar */}
          <div className="col-span-3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-black">Фильтры</h2>
                  <p className="text-sm text-gray-500">
                    {sortedProperties.length} из {properties.length} найдено
                  </p>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-blue-600 text-sm hover:text-blue-700"
                  >
                    Сбросить
                  </button>
                )}
              </div>

              {/* Desktop filters implementation - keeping existing logic */}
              <div className="space-y-8">
                {/* Quick Filters */}
                <div>
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

                {/* Price Range */}
                <div>
                  <label className="text-black mb-4 block">Цена, млн ₽</label>
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
              </div>
            </div>
          </div>

          {/* Desktop Main Content */}
          <div className="col-span-9 flex flex-col">
            {/* Desktop Controls */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl text-black">
                    {userType === "developer"
                      ? "Мои объекты"
                      : "Поиск недвижимости"}
                  </h1>
                  <p className="text-gray-500">
                    {sortedProperties.length} объектов найдено
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder={
                      userType === "developer"
                        ? "Поиск по моим объектам..."
                        : "Поиск по названию, району, застройщику..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-100 rounded-lg px-4 py-2 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price">По цене ↑</option>
                    <option value="price_desc">По цене ↓</option>
                    <option value="area">По площади ↑</option>
                    <option value="area_desc">По площади ↓</option>
                    <option value="price_per_sqm">По цене за м²</option>
                    {userType === "developer" && (
                      <>
                        <option value="views">По просмотрам</option>
                        <option value="sold">По продажам</option>
                      </>
                    )}
                  </select>

                  <div className="text-sm text-gray-500">
                    Средняя цена:{" "}
                    {Math.round(
                      (sortedProperties.reduce(
                        (sum, p) => sum + p.priceNum,
                        0,
                      ) /
                        sortedProperties.length) *
                        10,
                    ) / 10}{" "}
                    млн ₽
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {viewMode === "list" ? (
                /* List View */
                <div className="space-y-4">
                  {sortedProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => onPropertySelect(property.id)}
                      className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="w-32 h-32 rounded-lg overflow-hidden mr-6">
                          <ImageWithFallback
                            src={property.image}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl text-black mb-1">
                                {property.name}
                              </h3>
                              <p className="text-gray-500">
                                {property.location}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
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
                              {userType === "developer" ? (
                                <div className="flex space-x-2">
                                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Eye className="w-5 h-5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-2">
                                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Heart className="w-5 h-5" />
                                  </button>
                                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-gray-500 text-sm">
                                {userType === "developer"
                                  ? "Квартиры"
                                  : "Планировка"}
                              </p>
                              <p className="text-black">{property.rooms}</p>
                            </div>
                            {userType === "buyer" && (
                              <>
                                <div>
                                  <p className="text-gray-500 text-sm">
                                    Площадь
                                  </p>
                                  <p className="text-black">
                                    {property.area} м²
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 text-sm">Этаж</p>
                                  <p className="text-black">
                                    {property.floor}/{property.maxFloor}
                                  </p>
                                </div>
                              </>
                            )}
                            {userType === "developer" && (
                              <>
                                <div>
                                  <p className="text-gray-500 text-sm">
                                    Продано
                                  </p>
                                  <p className="text-black">
                                    {(property as any).sold}/
                                    {(property as any).total}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 text-sm">
                                    Просмотры
                                  </p>
                                  <p className="text-black">
                                    {(property as any).views}
                                  </p>
                                </div>
                              </>
                            )}
                            <div>
                              <p className="text-gray-500 text-sm">
                                Срок сдачи
                              </p>
                              <p className="text-black">
                                {property.deliveryDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-2xl text-blue-600">
                                {property.price}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {property.pricePerSqm.toLocaleString()} ₽/м²
                              </p>
                            </div>
                            {userType === "developer" && (
                              <div className="text-right">
                                <p className="text-gray-600">
                                  {(property as any).inquiries} заявок
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {property.nearTransport && (
                                    <span className="text-sm">
                                      🚇 Транспорт
                                    </span>
                                  )}
                                  {property.nearSchool && (
                                    <span className="text-sm">🏫 Школа</span>
                                  )}
                                  {property.nearShops && (
                                    <span className="text-sm">🛒 Магазины</span>
                                  )}
                                </div>
                              </div>
                            )}
                            {userType === "buyer" && (
                              <div className="text-right">
                                <p className="text-gray-600">
                                  {property.developer}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {property.nearTransport && (
                                    <span className="text-sm">
                                      🚇 Транспорт
                                    </span>
                                  )}
                                  {property.nearSchool && (
                                    <span className="text-sm">🏫 Школа</span>
                                  )}
                                  {property.nearShops && (
                                    <span className="text-sm">🛒 Магазины</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => onPropertySelect(property.id)}
                      className="bg-white rounded-xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="w-full h-48 rounded-lg overflow-hidden mb-4 relative">
                        <ImageWithFallback
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex space-x-1">
                          {userType === "developer" ? (
                            <>
                              <button className="p-2 bg-white/80 rounded-full text-gray-600 hover:text-blue-500 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-white/80 rounded-full text-gray-600 hover:text-gray-800 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="p-2 bg-white/80 rounded-full text-gray-600 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-white/80 rounded-full text-gray-600 hover:text-gray-800 transition-colors">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                        <div className="absolute top-3 left-3">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
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
                      </div>

                      <h3 className="text-black mb-2">{property.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">
                        {property.location}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Home className="w-4 h-4 mr-2" />
                          {property.rooms}
                          {userType === "buyer" && `, ${property.area} м²`}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {property.deliveryDate}
                        </div>
                        {userType === "developer" && (
                          <div className="flex items-center text-gray-600 text-sm">
                            <Eye className="w-4 h-4 mr-2" />
                            {(property as any).views} просмотров
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className="text-xl text-blue-600">
                          {property.price}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {property.pricePerSqm.toLocaleString()} ₽/м²
                        </p>
                        {userType === "developer" && (
                          <p className="text-gray-600 text-sm mt-1">
                            Продано: {(property as any).sold}/
                            {(property as any).total}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {property.amenities
                          .slice(0, 2)
                          .map((amenity, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        {property.amenities.length > 2 && (
                          <span className="text-gray-500 text-xs">
                            +{property.amenities.length - 2}
                          </span>
                        )}
                      </div>

                      {userType === "buyer" && (
                        <p className="text-gray-600 text-sm">
                          {property.developer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {sortedProperties.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-black mb-2">Объекты не найдены</h3>
                  <p className="text-gray-500 mb-4">
                    Попробуйте изменить параметры поиска
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
