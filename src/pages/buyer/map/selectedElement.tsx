import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";
import { MapPin } from "lucide-react";
import type { BuyEntity } from "@/entities/buy/type.ts";
import type { FC } from "react";

interface SelectedElementProps {
  selectedPropertyData: BuyEntity;
  onPropertySelect: (id: string) => void;
}

export const SelectedElement: FC<SelectedElementProps> = ({
  selectedPropertyData,
  onPropertySelect,
}) => {
  return (
    <div className={"w-1/4"}>
      <div className="col-span-3 h-full bg-white border-l border-gray-200 overflow-y-auto">
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
              <p className="text-blue-600 text-xl mb-4">
                {selectedPropertyData.price}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Статус</span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      selectedPropertyData.statusColor === "orange"
                        ? "bg-orange-100 text-orange-600"
                        : selectedPropertyData.statusColor === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {selectedPropertyData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Район</span>
                  <span className="text-black">
                    {selectedPropertyData.district}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Застройщик</span>
                  <span className="text-black">
                    {selectedPropertyData.developer}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Этаж</span>
                  <span className="text-black">
                    {selectedPropertyData.floor}/{selectedPropertyData.maxFloor}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-black mb-3">Удобства</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedPropertyData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
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
  );
};
