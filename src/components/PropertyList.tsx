import { useEffect, useState } from "react";
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
  Grid3X3,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";
import { observer } from "mobx-react-lite";
import { allObjectsStorage } from "@/entities/buy/modelsStorage.ts";

interface PropertyListProps {
  onPropertySelect: (propertyId: string) => void;
  onBack: () => void;
  userType?: "buyer" | "developer" | null;
}

export const PropertyList = observer(
  ({ onPropertySelect, onBack, userType }: PropertyListProps) => {
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("price");
    const [viewMode, setViewMode] = useState<"list" | "swiper">("list");
    const { allObjects } = allObjectsStorage;
    const [filters, setFilters] = useState({
      priceRange: [
        0,
        Math.max(...allObjects.map((object) => +object.max_price)),
      ],
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

    const navigate = useNavigate();

    useEffect(() => {
      if (viewMode === "swiper") {
        navigate(AppRoutes.buyer.tinder);
      }
    }, [viewMode]);

    const filteredProperties = allObjects.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        property.min_price >= filters.priceRange[0] &&
        property.min_price <= filters.priceRange[1];
      const area = Math.floor(property.min_price / property.price_per_sqm);
      const matchesArea =
        area >= filters.areaRange[0] && area <= filters.areaRange[1];
      const matchesRooms =
        filters.rooms === "any" ||
        property.apartment_types[0].includes(filters.rooms);
      const matchesStatus =
        filters.status === "any" ||
        (filters.status === "construction" &&
          property.construction_status === "Строительство") ||
        (filters.status === "finishing" &&
          property.construction_status === "Облицовка") ||
        (filters.status === "ready" &&
          property.construction_status === "Готов");
      const matchesDistrict =
        filters.district === "any" || property.district === filters.district;
      const matchesDeveloper =
        filters.developer === "any" || property.developer === filters.developer;
      const matchesFloor =
        property.floors_count >= filters.floorRange[0] &&
        property.floors_count <= filters.floorRange[1];
      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity) =>
          property.amenities.includes(amenity),
        );
      const matchesTransport =
        !filters.nearTransport || property.transport_nearby;
      const matchesSchool = !filters.nearSchool || property.school_nearby;
      const matchesShops = !filters.nearShops || property.shops_nearby;

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

    // Sort allObjects
    const sortedProperties = [...filteredProperties].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.min_price - b.min_price;
        case "price_desc":
          return b.min_price - a.min_price;
        case "area":
          return a.min_price / a.price_per_sqm - b.min_price / b.price_per_sqm;
        case "area_desc":
          return -(
            a.min_price / a.price_per_sqm -
            b.min_price / b.price_per_sqm
          );
        case "price_per_sqm":
          return a.price_per_sqm - b.price_per_sqm;
        case "views":
          return userType === "developer" ? b.id - a.id : 0;
        case "sold":
          return userType === "developer"
            ? b.construction_status - a.construction_status
            : 0;
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
                      {sortedProperties.length} из {allObjects.length} найдено
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

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1 flex-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    Список
                  </button>
                  <button
                    onClick={() => setViewMode("swiper")}
                    className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm transition-colors ${
                      viewMode === "swiper"
                        ? "bg-white text-pink-600 shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Подбор
                  </button>
                </div>
              </div>

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
                    (sortedProperties.reduce((sum, p) => sum + p.min_price, 0) /
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
                      max="20000000"
                      step="500000"
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
                          src={property.photos[0]}
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
                                property.construction_status === "orange"
                                  ? "bg-orange-100 text-orange-600"
                                  : property.construction_status === "blue"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-green-100 text-green-600"
                              }`}
                            >
                              {property.construction_status}
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
                            {property.apartment_types[0]}
                            {userType === "buyer" &&
                              `, ${Math.round(property.min_price / property.price_per_sqm)} м²`}
                          </div>
                          <div className="flex items-center text-gray-500 text-[12px]">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.address}
                            {userType === "buyer" &&
                              `, ${property.floors_count}/${property.floors_count} эт.`}
                          </div>
                          <div className="flex items-center text-gray-500 text-[12px]">
                            <Calendar className="w-4 h-4 mr-1" />
                            {property.delivery_date}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-blue-600 text-[12px]">
                              {property.min_price}
                            </p>
                            <p className="text-gray-500">
                              {property.price_per_sqm.toLocaleString()} ₽/м²
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
                                  {property.transport_nearby && (
                                    <span className="text-xs">🚇</span>
                                  )}
                                  {property.school_nearby && (
                                    <span className="text-xs">🏫</span>
                                  )}
                                  {property.shops_nearby && (
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
                      {sortedProperties.length} из {allObjects.length} найдено
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
                        <span className="text-gray-700">
                          🚇 Рядом транспорт
                        </span>
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
                        max="20000000"
                        step="500000"
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
                          до {filters.priceRange[1]} Р
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
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => setViewMode("list")}
                          className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                            viewMode === "list"
                              ? "bg-white text-blue-600 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Grid3X3 className="w-4 h-4 mr-2" />
                          Список
                        </button>
                        <button
                          onClick={() => setViewMode("swiper")}
                          className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                            viewMode === "swiper"
                              ? "bg-white text-pink-600 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Умный подбор
                        </button>
                      </div>
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
                          (sum, p) => sum + p.min_price,
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
                              src={property.photos[0]}
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
                                  {property.address}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-sm px-3 py-1 rounded-full ${
                                    property.construction_status === "orange"
                                      ? "bg-orange-100 text-orange-600"
                                      : property.construction_status === "blue"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-green-100 text-green-600"
                                  }`}
                                >
                                  {property.construction_status}
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
                                <p className="text-black">
                                  {property.apartment_types[0]}
                                </p>
                              </div>
                              {userType === "buyer" && (
                                <>
                                  <div>
                                    <p className="text-gray-500 text-sm">
                                      Площадь
                                    </p>
                                    <p className="text-black">
                                      {Math.round(
                                        property.min_price /
                                          property.price_per_sqm,
                                      )}{" "}
                                      м²
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-sm">
                                      Этаж
                                    </p>
                                    <p className="text-black">
                                      {property.floors_count}/
                                      {property.floors_count}
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
                                  {property.delivery_date}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-2xl text-blue-600">
                                  {property.min_price}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  {property.price_per_sqm.toLocaleString()} ₽/м²
                                </p>
                              </div>
                              {userType === "developer" && (
                                <div className="text-right">
                                  <p className="text-gray-600">
                                    {(property as any).inquiries} заявок
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    {property.transport_nearby && (
                                      <span className="text-sm">
                                        🚇 Транспорт
                                      </span>
                                    )}
                                    {property.school_nearby && (
                                      <span className="text-sm">🏫 Школа</span>
                                    )}
                                    {property.shops_nearby && (
                                      <span className="text-sm">
                                        🛒 Магазины
                                      </span>
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
                                    {property.transport_nearby && (
                                      <span className="text-sm">
                                        🚇 Транспорт
                                      </span>
                                    )}
                                    {property.school_nearby && (
                                      <span className="text-sm">🏫 Школа</span>
                                    )}
                                    {property.shops_nearby && (
                                      <span className="text-sm">
                                        🛒 Магазины
                                      </span>
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
                  <div></div>
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
  },
);
