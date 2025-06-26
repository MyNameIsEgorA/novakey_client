import { useState } from "react";
import { ArrowLeft, MapPin, Filter, List, SlidersHorizontal, Plus, Minus, X, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PropertyMapProps {
  onPropertySelect: (propertyId: string) => void;
  onBack: () => void;
}

const properties = [
  {
    id: '1',
    name: 'ЖК "Северная звезда"',
    price: 'от 8,5 млн ₽',
    priceNum: 8.5,
    rooms: '2-комн.',
    area: 65,
    floor: 5,
    maxFloor: 16,
    status: 'Облицовка',
    statusColor: 'orange',
    district: 'Северный',
    developer: 'СтройИнвест',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=160&h=160&fit=crop',
    coordinates: { x: 120, y: 180 },
    amenities: ['Балкон', 'Лифт', 'Парковка'],
    nearTransport: true,
    nearSchool: false,
    nearShops: true
  },
  {
    id: '2',
    name: 'ЖК "Новый Горизонт"',
    price: 'от 5,2 млн ₽',
    priceNum: 5.2,
    rooms: '1-комн.',
    area: 42,
    floor: 8,
    maxFloor: 25,
    status: 'Строительство',
    statusColor: 'blue',
    district: 'Центр',
    developer: 'Новострой',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=160&fit=crop',
    coordinates: { x: 200, y: 250 },
    amenities: ['Французский балкон', 'Лифт'],
    nearTransport: true,
    nearSchool: true,
    nearShops: true
  },
  {
    id: '3',
    name: 'ЖК "Центральный"',
    price: 'от 12,3 млн ₽',
    priceNum: 12.3,
    rooms: '3-комн.',
    area: 89,
    floor: 12,
    maxFloor: 20,
    status: 'Готов',
    statusColor: 'green',
    district: 'Центр',
    developer: 'Премиум Строй',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=160&h=160&fit=crop',
    coordinates: { x: 180, y: 220 },
    amenities: ['Балкон', 'Лифт', 'Парковка', 'Консьерж'],
    nearTransport: true,
    nearSchool: true,
    nearShops: true
  },
  {
    id: '4',
    name: 'ЖК "Парковый"',
    price: 'от 6,8 млн ₽',
    priceNum: 6.8,
    rooms: '2-комн.',
    area: 55,
    floor: 3,
    maxFloor: 12,
    status: 'Облицовка',
    statusColor: 'orange',
    district: 'Южный',
    developer: 'ЭкоСтрой',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=160&h=160&fit=crop',
    coordinates: { x: 160, y: 320 },
    amenities: ['Балкон', 'Лифт', 'Детская площадка'],
    nearTransport: false,
    nearSchool: true,
    nearShops: false
  },
  {
    id: '5',
    name: 'ЖК "Riverside"',
    price: 'от 15,8 млн ₽',
    priceNum: 15.8,
    rooms: '3-комн.',
    area: 95,
    floor: 7,
    maxFloor: 18,
    status: 'Готов',
    statusColor: 'green',
    district: 'Центр',
    developer: 'Элит Девелопмент',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=160&h=160&fit=crop',
    coordinates: { x: 240, y: 200 },
    amenities: ['Терраса', 'Лифт', 'Парковка', 'Консьерж', 'Фитнес'],
    nearTransport: true,
    nearSchool: true,
    nearShops: true
  },
  {
    id: '6',
    name: 'ЖК "Восток"',
    price: 'от 4,2 млн ₽',
    priceNum: 4.2,
    rooms: '1-комн.',
    area: 35,
    floor: 15,
    maxFloor: 22,
    status: 'Строительство',
    statusColor: 'blue',
    district: 'Восточный',
    developer: 'Массив Строй',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=160&h=160&fit=crop',
    coordinates: { x: 300, y: 180 },
    amenities: ['Лифт'],
    nearTransport: true,
    nearSchool: false,
    nearShops: true
  }
];

export function PropertyMap({ onPropertySelect, onBack }: PropertyMapProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [filters, setFilters] = useState({
    priceRange: [0, 20],
    areaRange: [20, 150],
    rooms: 'any',
    status: 'any',
    district: 'any',
    developer: 'any',
    floorRange: [1, 30],
    amenities: [] as string[],
    nearTransport: false,
    nearSchool: false,
    nearShops: false
  });

  const availableAmenities = ['Балкон', 'Лифт', 'Парковка', 'Консьерж', 'Фитнес', 'Детская площадка', 'Терраса'];
  const availableDistricts = ['any', 'Центр', 'Северный', 'Южный', 'Восточный'];
  const availableDevelopers = ['any', 'СтройИнвест', 'Новострой', 'Премиум Строй', 'ЭкоСтрой', 'Элит Девелопмент', 'Массив Строй'];

  const handlePropertyClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
  };

  const filteredProperties = properties.filter(property => {
    const matchesPrice = property.priceNum >= filters.priceRange[0] && property.priceNum <= filters.priceRange[1];
    const matchesArea = property.area >= filters.areaRange[0] && property.area <= filters.areaRange[1];
    const matchesRooms = filters.rooms === 'any' || property.rooms.includes(filters.rooms);
    const matchesStatus = filters.status === 'any' || 
                          (filters.status === 'construction' && property.status === 'Строительство') ||
                          (filters.status === 'finishing' && property.status === 'Облицовка') ||
                          (filters.status === 'ready' && property.status === 'Готов');
    const matchesDistrict = filters.district === 'any' || property.district === filters.district;
    const matchesDeveloper = filters.developer === 'any' || property.developer === filters.developer;
    const matchesFloor = property.floor >= filters.floorRange[0] && property.floor <= filters.floorRange[1];
    const matchesAmenities = filters.amenities.length === 0 || 
                            filters.amenities.every(amenity => property.amenities.includes(amenity));
    const matchesTransport = !filters.nearTransport || property.nearTransport;
    const matchesSchool = !filters.nearSchool || property.nearSchool;
    const matchesShops = !filters.nearShops || property.nearShops;
    
    return matchesPrice && matchesArea && matchesRooms && matchesStatus && 
           matchesDistrict && matchesDeveloper && matchesFloor && matchesAmenities &&
           matchesTransport && matchesSchool && matchesShops;
  });

  const selectedPropertyData = filteredProperties.find(p => p.id === selectedProperty);

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 20],
      areaRange: [20, 150],
      rooms: 'any',
      status: 'any',
      district: 'any',
      developer: 'any',
      floorRange: [1, 30],
      amenities: [],
      nearTransport: false,
      nearSchool: false,
      nearShops: false
    });
  };

  const activeFiltersCount = [
    filters.priceRange[1] < 20 ? 1 : 0,
    filters.areaRange[0] > 20 || filters.areaRange[1] < 150 ? 1 : 0,
    filters.rooms !== 'any' ? 1 : 0,
    filters.status !== 'any' ? 1 : 0,
    filters.district !== 'any' ? 1 : 0,
    filters.developer !== 'any' ? 1 : 0,
    filters.floorRange[0] > 1 || filters.floorRange[1] < 30 ? 1 : 0,
    filters.amenities.length,
    filters.nearTransport ? 1 : 0,
    filters.nearSchool ? 1 : 0,
    filters.nearShops ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          {/* Mobile Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg">Карта объектов</h1>
                <p className="text-sm text-gray-500">{filteredProperties.length} из {properties.length} объектов</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <List className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="bg-white border-b border-gray-200 max-h-96 overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* Quick Filters */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Быстрые фильтры</h3>
                    {activeFiltersCount > 0 && (
                      <button onClick={resetFilters} className="text-blue-600 text-sm">
                        Сбросить все
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, nearTransport: !prev.nearTransport }))}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        filters.nearTransport 
                          ? 'bg-blue-100 text-blue-700 border-blue-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      🚇 Рядом транспорт
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, nearSchool: !prev.nearSchool }))}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        filters.nearSchool 
                          ? 'bg-blue-100 text-blue-700 border-blue-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      🏫 Рядом школа
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, nearShops: !prev.nearShops }))}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        filters.nearShops 
                          ? 'bg-blue-100 text-blue-700 border-blue-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      🛒 Рядом магазины
                    </button>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm text-gray-600 mb-3 block">Цена, млн ₽</label>
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      step="0.5"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseFloat(e.target.value)] }))}
                      className="w-full accent-blue-600"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0 млн</span>
                      <span className="text-blue-600">до {filters.priceRange[1]} млн</span>
                      <span>20 млн</span>
                    </div>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="text-sm text-gray-600 mb-3 block">Площадь, м²</label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input 
                        type="range" 
                        min="20" 
                        max="150" 
                        value={filters.areaRange[0]}
                        onChange={(e) => setFilters(prev => ({ ...prev, areaRange: [parseInt(e.target.value), prev.areaRange[1]] }))}
                        className="flex-1 accent-blue-600"
                      />
                      <input 
                        type="range" 
                        min="20" 
                        max="150" 
                        value={filters.areaRange[1]}
                        onChange={(e) => setFilters(prev => ({ ...prev, areaRange: [prev.areaRange[0], parseInt(e.target.value)] }))}
                        className="flex-1 accent-blue-600"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{filters.areaRange[0]} м²</span>
                      <span className="text-blue-600">{filters.areaRange[0]} - {filters.areaRange[1]} м²</span>
                      <span>{filters.areaRange[1]} м²</span>
                    </div>
                  </div>
                </div>
                
                {/* Dropdowns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">Комнаты</label>
                    <select 
                      value={filters.rooms}
                      onChange={(e) => setFilters(prev => ({ ...prev, rooms: e.target.value }))}
                      className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm border-0 outline-none"
                    >
                      <option value="any">Любая</option>
                      <option value="1">1-комн.</option>
                      <option value="2">2-комн.</option>
                      <option value="3">3-комн.</option>
                      <option value="4">4+ комн.</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">Готовность</label>
                    <select 
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm border-0 outline-none"
                    >
                      <option value="any">Любой</option>
                      <option value="ready">Готов</option>
                      <option value="finishing">Облицовка</option>
                      <option value="construction">Строительство</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">Район</label>
                    <select 
                      value={filters.district}
                      onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm border-0 outline-none"
                    >
                      {availableDistricts.map(district => (
                        <option key={district} value={district}>
                          {district === 'any' ? 'Любой' : district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">Застройщик</label>
                    <select 
                      value={filters.developer}
                      onChange={(e) => setFilters(prev => ({ ...prev, developer: e.target.value }))}
                      className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm border-0 outline-none"
                    >
                      {availableDevelopers.map(dev => (
                        <option key={dev} value={dev}>
                          {dev === 'any' ? 'Любой' : dev}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm text-gray-600 mb-3 block">Удобства</label>
                  <div className="flex flex-wrap gap-2">
                    {availableAmenities.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            amenities: prev.amenities.includes(amenity)
                              ? prev.amenities.filter(a => a !== amenity)
                              : [...prev.amenities, amenity]
                          }));
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          filters.amenities.includes(amenity)
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Map Container */}
          <div className="relative flex-1 bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-20 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <button 
                onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
                className="p-2 hover:bg-gray-100 border-b border-gray-200"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Realistic Map Background */}
            <div 
              className="absolute inset-0 transition-transform duration-300"
              style={{ 
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.1) 50px, rgba(0,0,0,0.1) 51px),
                  repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.1) 50px, rgba(0,0,0,0.1) 51px)
                `,
                backgroundColor: '#f8f9fa'
              }}
            >
              {/* Districts */}
              <div className="absolute inset-0">
                {/* Center District */}
                <div 
                  className="absolute bg-blue-100/50 border-2 border-blue-200 rounded-lg flex items-center justify-center"
                  style={{ left: '150px', top: '180px', width: '120px', height: '100px' }}
                >
                  <span className="text-blue-700 text-sm">Центр</span>
                </div>
                
                {/* Northern District */}
                <div 
                  className="absolute bg-green-100/50 border-2 border-green-200 rounded-lg flex items-center justify-center"
                  style={{ left: '80px', top: '120px', width: '100px', height: '80px' }}
                >
                  <span className="text-green-700 text-sm">Северный</span>
                </div>

                {/* Southern District */}
                <div 
                  className="absolute bg-orange-100/50 border-2 border-orange-200 rounded-lg flex items-center justify-center"
                  style={{ left: '120px', top: '300px', width: '100px', height: '80px' }}
                >
                  <span className="text-orange-700 text-sm">Южный</span>
                </div>

                {/* Eastern District */}
                <div 
                  className="absolute bg-purple-100/50 border-2 border-purple-200 rounded-lg flex items-center justify-center"
                  style={{ left: '280px', top: '140px', width: '80px', height: '120px' }}
                >
                  <span className="text-purple-700 text-sm">Восточный</span>
                </div>

                {/* Streets */}
                <div className="absolute w-1 bg-gray-400" style={{ left: '200px', top: '0px', height: '400px' }}></div>
                <div className="absolute h-1 bg-gray-400" style={{ left: '0px', top: '200px', width: '400px' }}></div>
                <div className="absolute w-0.5 bg-gray-300" style={{ left: '150px', top: '0px', height: '400px' }}></div>
                <div className="absolute h-0.5 bg-gray-300" style={{ left: '0px', top: '250px', width: '400px' }}></div>

                {/* Street Names */}
                <div 
                  className="absolute text-xs text-gray-600 bg-white px-1 rounded"
                  style={{ left: '205px', top: '100px', transform: 'rotate(90deg)' }}
                >
                  ул. Центральная
                </div>
                <div 
                  className="absolute text-xs text-gray-600 bg-white px-1 rounded"
                  style={{ left: '100px', top: '195px' }}
                >
                  пр. Мира
                </div>
              </div>

              {/* Property Markers */}
              {filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => handlePropertyClick(property.id)}
                  className={`absolute w-10 h-10 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    selectedProperty === property.id 
                      ? 'scale-125 z-20' 
                      : 'hover:scale-110 z-10'
                  } ${
                    property.statusColor === 'orange' ? 'bg-orange-500' :
                    property.statusColor === 'blue' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                  style={{ 
                    left: `${property.coordinates.x}px`, 
                    top: `${property.coordinates.y}px` 
                  }}
                >
                  <MapPin className="w-6 h-6 text-white mx-auto" />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-1 rounded text-xs text-gray-700 shadow-sm whitespace-nowrap">
                    {property.priceNum}М
                  </div>
                </button>
              ))}
            </div>

            {/* Property Card */}
            {selectedPropertyData && (
              <div className="absolute bottom-6 left-4 right-4 bg-white rounded-2xl shadow-xl z-30">
                <div className="p-4">
                  <div className="flex">
                    <div className="w-20 h-20 rounded-xl overflow-hidden mr-4">
                      <ImageWithFallback
                        src={selectedPropertyData.image}
                        alt={selectedPropertyData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-black mb-1">{selectedPropertyData.name}</h3>
                      <p className="text-gray-500 text-sm mb-1">
                        {selectedPropertyData.rooms}, {selectedPropertyData.area} м²
                      </p>
                      <p className="text-blue-600 mb-2">{selectedPropertyData.price}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedPropertyData.statusColor === 'orange' ? 'bg-orange-100 text-orange-600' :
                            selectedPropertyData.statusColor === 'blue' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {selectedPropertyData.status}
                          </span>
                          <span className="text-xs text-gray-500">{selectedPropertyData.district}</span>
                        </div>
                        <button 
                          onClick={() => onPropertySelect(selectedPropertyData.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Готов</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Облицовка</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Строительство</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-6 h-screen">
          {/* Desktop Filters Sidebar */}
          <div className="col-span-3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-black">Фильтры</h2>
                  <p className="text-sm text-gray-500">{filteredProperties.length} из {properties.length} найдено</p>
                </div>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-blue-600 text-sm hover:text-blue-700">
                    Сбросить
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Quick Filters */}
                <div>
                  <h3 className="text-black mb-4">Быстрые фильтры</h3>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.nearTransport}
                        onChange={(e) => setFilters(prev => ({ ...prev, nearTransport: e.target.checked }))}
                        className="mr-3 rounded accent-blue-600"
                      />
                      <span className="text-gray-700">🚇 Рядом транспорт</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.nearSchool}
                        onChange={(e) => setFilters(prev => ({ ...prev, nearSchool: e.target.checked }))}
                        className="mr-3 rounded accent-blue-600"
                      />
                      <span className="text-gray-700">🏫 Рядом школа</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.nearShops}
                        onChange={(e) => setFilters(prev => ({ ...prev, nearShops: e.target.checked }))}
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
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseFloat(e.target.value)] }))}
                      className="w-full accent-blue-600"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0 млн</span>
                      <span className="text-blue-600">до {filters.priceRange[1]} млн</span>
                      <span>20 млн</span>
                    </div>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="text-black mb-4 block">Площадь, м²</label>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <input 
                        type="range" 
                        min="20" 
                        max="150" 
                        value={filters.areaRange[0]}
                        onChange={(e) => setFilters(prev => ({ ...prev, areaRange: [parseInt(e.target.value), prev.areaRange[1]] }))}
                        className="w-full accent-blue-600"
                      />
                      <input 
                        type="range" 
                        min="20" 
                        max="150" 
                        value={filters.areaRange[1]}
                        onChange={(e) => setFilters(prev => ({ ...prev, areaRange: [prev.areaRange[0], parseInt(e.target.value)] }))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{filters.areaRange[0]} м²</span>
                      <span className="text-blue-600">{filters.areaRange[0]} - {filters.areaRange[1]} м²</span>
                      <span>{filters.areaRange[1]} м²</span>
                    </div>
                  </div>
                </div>
                
                {/* Dropdowns */}
                <div className="space-y-4">
                  <div>
                    <label className="text-black mb-2 block">Комнаты</label>
                    <select 
                      value={filters.rooms}
                      onChange={(e) => setFilters(prev => ({ ...prev, rooms: e.target.value }))}
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
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
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
                      onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    >
                      {availableDistricts.map(district => (
                        <option key={district} value={district}>
                          {district === 'any' ? 'Любой' : district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-black mb-2 block">Застройщик</label>
                    <select 
                      value={filters.developer}
                      onChange={(e) => setFilters(prev => ({ ...prev, developer: e.target.value }))}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 border-0 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    >
                      {availableDevelopers.map(dev => (
                        <option key={dev} value={dev}>
                          {dev === 'any' ? 'Любой' : dev}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-black mb-4 block">Удобства</label>
                  <div className="flex flex-wrap gap-2">
                    {availableAmenities.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            amenities: prev.amenities.includes(amenity)
                              ? prev.amenities.filter(a => a !== amenity)
                              : [...prev.amenities, amenity]
                          }));
                        }}
                        className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                          filters.amenities.includes(amenity)
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Map */}
          <div className="col-span-6 relative bg-gray-100">
            {/* Map Controls */}
            <div className="absolute top-6 left-6 z-20 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <button 
                onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
                className="p-3 hover:bg-gray-100 border-b border-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Map Area */}
            <div 
              className="absolute inset-0 transition-transform duration-300 overflow-hidden"
              style={{ 
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.1) 80px, rgba(0,0,0,0.1) 81px),
                  repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,0,0,0.1) 80px, rgba(0,0,0,0.1) 81px)
                `,
                backgroundColor: '#f8f9fa'
              }}
            >
              {/* Desktop Districts - Larger */}
              <div className="absolute inset-0">
                {/* Center District */}
                <div 
                  className="absolute bg-blue-100/50 border-2 border-blue-200 rounded-lg flex items-center justify-center"
                  style={{ left: '250px', top: '280px', width: '200px', height: '160px' }}
                >
                  <span className="text-blue-700 text-lg">Центр</span>
                </div>
                
                {/* Northern District */}
                <div 
                  className="absolute bg-green-100/50 border-2 border-green-200 rounded-lg flex items-center justify-center"
                  style={{ left: '150px', top: '180px', width: '160px', height: '120px' }}
                >
                  <span className="text-green-700 text-lg">Северный</span>
                </div>

                {/* Southern District */}
                <div 
                  className="absolute bg-orange-100/50 border-2 border-orange-200 rounded-lg flex items-center justify-center"
                  style={{ left: '200px', top: '480px', width: '160px', height: '120px' }}
                >
                  <span className="text-orange-700 text-lg">Южный</span>
                </div>

                {/* Eastern District */}
                <div 
                  className="absolute bg-purple-100/50 border-2 border-purple-200 rounded-lg flex items-center justify-center"
                  style={{ left: '480px', top: '220px', width: '140px', height: '200px' }}
                >
                  <span className="text-purple-700 text-lg">Восточный</span>
                </div>

                {/* Major Streets */}
                <div className="absolute w-2 bg-gray-400" style={{ left: '350px', top: '0px', height: '700px' }}></div>
                <div className="absolute h-2 bg-gray-400" style={{ left: '0px', top: '350px', width: '700px' }}></div>
                <div className="absolute w-1 bg-gray-300" style={{ left: '250px', top: '0px', height: '700px' }}></div>
                <div className="absolute h-1 bg-gray-300" style={{ left: '0px', top: '450px', width: '700px' }}></div>

                {/* Street Names */}
                <div 
                  className="absolute text-sm text-gray-600 bg-white px-2 py-1 rounded shadow"
                  style={{ left: '360px', top: '180px', transform: 'rotate(90deg)' }}
                >
                  ул. Центральная
                </div>
                <div 
                  className="absolute text-sm text-gray-600 bg-white px-2 py-1 rounded shadow"
                  style={{ left: '180px', top: '340px' }}
                >
                  пр. Мира
                </div>
              </div>

              {/* Property Markers - Desktop Sized */}
              {filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => handlePropertyClick(property.id)}
                  className={`absolute w-14 h-14 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    selectedProperty === property.id 
                      ? 'scale-125 z-20' 
                      : 'hover:scale-110 z-10'
                  } ${
                    property.statusColor === 'orange' ? 'bg-orange-500' :
                    property.statusColor === 'blue' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                  style={{ 
                    left: `${property.coordinates.x * 1.6}px`, 
                    top: `${property.coordinates.y * 1.6}px` 
                  }}
                >
                  <MapPin className="w-8 h-8 text-white mx-auto" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-sm text-gray-700 shadow-lg whitespace-nowrap">
                    {property.priceNum}М ₽
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop Legend */}
            <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg">
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
          </div>

          {/* Desktop Property Details */}
          <div className="col-span-3 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              {selectedPropertyData ? (
                <div>
                  <h3 className="text-xl text-black mb-4">Детали объекта</h3>
                  
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
                    <ImageWithFallback
                      src={selectedPropertyData.image}
                      alt={selectedPropertyData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-black mb-2">{selectedPropertyData.name}</h4>
                  <p className="text-gray-500 text-sm mb-1">
                    {selectedPropertyData.rooms}, {selectedPropertyData.area} м²
                  </p>
                  <p className="text-blue-600 text-xl mb-4">{selectedPropertyData.price}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Статус</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        selectedPropertyData.statusColor === 'orange' ? 'bg-orange-100 text-orange-600' :
                        selectedPropertyData.statusColor === 'blue' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {selectedPropertyData.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Район</span>
                      <span className="text-black">{selectedPropertyData.district}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Застройщик</span>
                      <span className="text-black">{selectedPropertyData.developer}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Этаж</span>
                      <span className="text-black">{selectedPropertyData.floor}/{selectedPropertyData.maxFloor}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-black mb-3">Удобства</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedPropertyData.amenities.map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => onPropertySelect(selectedPropertyData.id)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Подробнее
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                      Добавить в избранное
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-black mb-2">Выберите объект</h3>
                  <p className="text-gray-500 text-sm">
                    Нажмите на маркер на карте, чтобы увидеть детальную информацию
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}