import { useState } from "react";
import { X, Camera, Menu, ChevronDown, Info, Maximize } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ARViewerProps {
  propertyId: string;
  onClose: () => void;
}

const propertyData = {
  '1': {
    name: 'ЖК "Северная звезда"',
    price: 'от 8,5 млн ₽',
    rooms: '2-комн.',
    area: '65 м²',
    status: 'Облицовка'
  },
  '2': {
    name: 'ЖК "Новый Горизонт"',
    price: 'от 5,2 млн ₽',
    rooms: '1-комн.',
    area: '42 м²',
    status: 'Строительство'
  },
  '3': {
    name: 'ЖК "Центральный"',
    price: 'от 12,3 млн ₽',
    rooms: '3-комн.',
    area: '89 м²',
    status: 'Готов'
  }
};

const rooms = [
  {
    id: 'living-room',
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 25, y: 40, title: 'Книжная полка', description: 'Встроенная книжная полка из натурального дерева' },
      { id: 2, x: 60, y: 70, title: 'Дизайнерский стул', description: 'Эргономичный стул ручной работы' },
      { id: 3, x: 80, y: 30, title: 'Картина', description: 'Современное искусство в интерьере' }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 30, y: 50, title: 'Кухонный островок', description: 'Мраморная столешница, встроенная техника' },
      { id: 2, x: 70, y: 40, title: 'Холодильник', description: 'Встроенный холодильник премиум класса' },
      { id: 3, x: 50, y: 80, title: 'Барные стулья', description: 'Дизайнерские барные стулья' }
    ]
  },
  {
    id: 'bedroom-1',
    name: 'Bedroom 1',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded47ee3df?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 40, y: 60, title: 'Кровать', description: 'Кровать king-size с ортопедическим матрасом' },
      { id: 2, x: 80, y: 30, title: 'Гардеробная', description: 'Встроенная гардеробная с LED подсветкой' },
      { id: 3, x: 20, y: 40, title: 'Прикроватная тумба', description: 'Тумба с беспроводной зарядкой' }
    ]
  },
  {
    id: 'bedroom-2',
    name: 'Bedroom 2',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 50, y: 50, title: 'Рабочее место', description: 'Встроенный рабочий стол с полками' },
      { id: 2, x: 75, y: 65, title: 'Диван-кровать', description: 'Трансформируемая мебель' }
    ]
  },
  {
    id: 'bedroom-3',
    name: 'Bedroom 3',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 45, y: 55, title: 'Детская кровать', description: 'Безопасная детская кровать' },
      { id: 2, x: 70, y: 40, title: 'Игровая зона', description: 'Место для игр и творчества' }
    ]
  },
  {
    id: 'bathroom-1',
    name: 'Bathroom 1',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 30, y: 60, title: 'Ванна', description: 'Глубокая ванна с гидромассажем' },
      { id: 2, x: 70, y: 40, title: 'Душевая кабина', description: 'Стеклянная душевая с тропическим душем' },
      { id: 3, x: 50, y: 30, title: 'Зеркало', description: 'Зеркало с LED подсветкой и подогревом' }
    ]
  },
  {
    id: 'bathroom-2',
    name: 'Bathroom 2',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 40, y: 50, title: 'Умывальник', description: 'Двойной умывальник из натурального камня' },
      { id: 2, x: 75, y: 65, title: 'Хранение', description: 'Встроенные шкафчики для хранения' }
    ]
  },
  {
    id: 'bathroom-3',
    name: 'Bathroom 3',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
    hotspots: [
      { id: 1, x: 50, y: 70, title: 'Гостевой туалет', description: 'Компактный гостевой санузел' }
    ]
  }
];

export function ARViewer({ propertyId, onClose }: ARViewerProps) {
  const [currentRoomId, setCurrentRoomId] = useState('living-room');
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const property = propertyData[propertyId as keyof typeof propertyData];
  const currentRoom = rooms.find(room => room.id === currentRoomId) || rooms[0];

  // Если объект не найден, показываем ошибку
  if (!property) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 mx-4 text-center">
          <h2 className="text-xl text-black mb-2">Объект не найден</h2>
          <p className="text-gray-600 mb-4">AR-просмотр для данного объекта недоступен</p>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const handleHotspotClick = (hotspotId: number) => {
    setSelectedHotspot(selectedHotspot === hotspotId ? null : hotspotId);
  };

  const selectedHotspotData = currentRoom.hotspots.find(h => h.id === selectedHotspot);

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* AR Camera View */}
      <div className="relative w-full h-full">
        <ImageWithFallback
          src={currentRoom.image}
          alt={currentRoom.name}
          className="w-full h-full object-cover"
        />
        
        {/* AR Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20">
          
          {/* Room Title */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full">
              <h1 className="text-lg">{currentRoom.name}</h1>
            </div>
          </div>

          {/* Interactive Hotspots */}
          {currentRoom.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => handleHotspotClick(hotspot.id)}
              className={`absolute w-8 h-8 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                selectedHotspot === hotspot.id 
                  ? 'scale-125 bg-blue-500/80 animate-pulse' 
                  : 'hover:scale-110 hover:bg-white/30'
              }`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`w-3 h-3 rounded-full ${
                selectedHotspot === hotspot.id ? 'bg-white' : 'bg-white/70'
              }`}></div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
            </button>
          ))}

          {/* Hotspot Information Card */}
          {selectedHotspotData && (
            <div className="absolute bottom-32 left-4 right-4">
              <div className="bg-black/80 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white">{selectedHotspotData.title}</h3>
                  <button 
                    onClick={() => setSelectedHotspot(null)}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {selectedHotspotData.description}
                </p>
                <button className="mt-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Узнать больше
                </button>
              </div>
            </div>
          )}

          {/* Room Selector */}
          <div className="absolute bottom-32 right-4">
            <div className="relative">
              <button
                onClick={() => setShowRoomSelector(!showRoomSelector)}
                className="bg-black/70 backdrop-blur-md text-white px-4 py-3 rounded-xl flex items-center space-x-2 border border-white/20"
              >
                <span>{currentRoom.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showRoomSelector ? 'rotate-180' : ''}`} />
              </button>

              {showRoomSelector && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/20 min-w-48 max-h-64 overflow-y-auto">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        setCurrentRoomId(room.id);
                        setShowRoomSelector(false);
                        setSelectedHotspot(null);
                      }}
                      className={`w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        currentRoomId === room.id ? 'bg-blue-500/50' : ''
                      }`}
                    >
                      {room.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-8">
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => alert('Снимок сохранен!')}
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-white transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-300"></div>
              </button>
              
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="w-12 h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-black/80 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Menu Panel */}
          {showMenu && (
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center p-3 text-white hover:bg-white/10 rounded-xl transition-colors">
                    <Info className="w-6 h-6 mb-1" />
                    <span className="text-xs">Информация</span>
                  </button>
                  <button className="flex flex-col items-center p-3 text-white hover:bg-white/10 rounded-xl transition-colors">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs">Галерея</span>
                  </button>
                  <button className="flex flex-col items-center p-3 text-white hover:bg-white/10 rounded-xl transition-colors">
                    <Maximize className="w-6 h-6 mb-1" />
                    <span className="text-xs">Полный экран</span>
                  </button>
                  <button className="flex flex-col items-center p-3 text-white hover:bg-white/10 rounded-xl transition-colors">
                    <Menu className="w-6 h-6 mb-1" />
                    <span className="text-xs">Настройки</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-24 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/20">
              <p className="text-sm text-center">
                👆 Нажимайте на белые точки для получения информации об объектах
              </p>
            </div>
          </div>

          {/* AR Status Indicator */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-2 bg-green-500/80 backdrop-blur-md text-white px-3 py-2 rounded-full text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>AR Активен</span>
            </div>
          </div>

          {/* Property Info */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/70 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/20">
              <p className="text-sm">{property.name}</p>
              <p className="text-xs text-white/70">{property.rooms}, {property.area}</p>
            </div>
          </div>

          {/* Loading Animation on Room Change */}
          {false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white text-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
                <p>Загрузка AR комнаты...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}