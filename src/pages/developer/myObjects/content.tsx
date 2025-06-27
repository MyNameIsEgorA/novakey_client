import { ArrowLeft, Filter, MapPin, Search } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";
import type { Dispatch, FC, SetStateAction } from "react";

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
  image: string;
  amenities: string[];
  status: "available" | "reserved" | "sold";
  isNew?: boolean;
  hasAR?: boolean;
  hasVR?: boolean;
}

const statusLabels = {
  available: "Доступна",
  reserved: "Забронирована",
  sold: "Продана",
};

const statusColors = {
  available: "bg-green-100 text-green-700",
  reserved: "bg-yellow-100 text-yellow-700",
  sold: "bg-red-100 text-red-700",
};

interface MyObjectsList {
  properties: Property[];
  filteredProperties: Property[];
  onPropertySelect: (id: string) => void;
  onBack: () => void;
  setShowFilters: () => void;
  showFilters: boolean;
  searchQuery: string;
  selectedDistrict: any;
  setSelectedRooms: any;
  setSelectedDistrict: any;
  setSearchQuery: Dispatch<SetStateAction<boolean>>;
  selectedRooms: any;
}

export const MyObjectsList: FC<MyObjectsList> = ({
  filteredProperties,
  setShowFilters,
  showFilters,
  searchQuery,
  onBack,
  onPropertySelect,
  properties,
  selectedDistrict,
  selectedRooms,
  setSelectedDistrict,
  setSelectedRooms,
  setSearchQuery,
}) => {
  const districts = [...new Set(properties.map((p) => p.district))];
  const roomTypes = [...new Set(properties.map((p) => p.rooms))];

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
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
                  <h1 className="text-lg">Мои объекты</h1>
                  <p className="text-sm text-gray-500">
                    {filteredProperties.length} объектов
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск по названию, адресу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Район
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Все районы</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Количество комнат
                  </label>
                  <select
                    value={selectedRooms}
                    onChange={(e) => setSelectedRooms(e.target.value)}
                    className="w-full bg-white rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Любое</option>
                    {roomTypes.map((rooms) => (
                      <option key={rooms} value={rooms}>
                        {rooms}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Property List */}
          <div className="px-6 py-4 pb-20">
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => onPropertySelect(property.id)}
                  className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 relative">
                      <ImageWithFallback
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      {property.isNew && (
                        <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                          Новый
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-black pr-2">{property.title}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${statusColors[property.status]}`}
                        >
                          {statusLabels[property.status]}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mb-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {property.address}
                      </div>
                      <p className="text-gray-500 text-sm mb-1">
                        {property.rooms}, {property.area}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600">{property.price}</p>
                          <p className="text-gray-400 text-xs">
                            {property.pricePerSqm}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {property.hasAR && (
                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                              AR
                            </span>
                          )}
                          {property.hasVR && (
                            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
                              VR
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-black mb-2">Объекты не найдены</h3>
                <p className="text-gray-500">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="bg-white border-b border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl text-black">Мои объекты</h1>
                <p className="text-gray-500">
                  {filteredProperties.length} объектов найдено
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Поиск по названию, адресу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-2 pr-10 placeholder-gray-400 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>

              {showFilters && (
                <div className="flex items-center space-x-4 ml-6">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-gray-100 rounded-lg px-4 py-2 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Все районы</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedRooms}
                    onChange={(e) => setSelectedRooms(e.target.value)}
                    className="bg-gray-100 rounded-lg px-4 py-2 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Любое количество комнат</option>
                    {roomTypes.map((rooms) => (
                      <option key={rooms} value={rooms}>
                        {rooms}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Property Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => onPropertySelect(property.id)}
                  className="bg-white rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.isNew && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Новый
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColors[property.status]}`}
                      >
                        {statusLabels[property.status]}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex space-x-1">
                      {property.hasAR && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          AR
                        </span>
                      )}
                      {property.hasVR && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                          VR
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-black mb-2">{property.title}</h4>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </div>
                    <p className="text-gray-500 text-sm mb-3">
                      {property.rooms}, {property.area}, {property.floor}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600">{property.price}</p>
                        <p className="text-gray-400 text-sm">
                          {property.pricePerSqm}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-black mb-2">Объекты не найдены</h3>
                <p className="text-gray-500 mb-4">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
