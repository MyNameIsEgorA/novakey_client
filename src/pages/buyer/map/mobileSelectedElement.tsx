import { ImageWithFallback } from "@/components/figma/ImageWithFallback.tsx";
import type { BuyEntity } from "@/entities/buy/type.ts";
import type { FC } from "react";

interface MobileSelectedElementProps {
  selectedPropertyData: BuyEntity | null;
  onPropertySelect: (id: string) => void;
}

export const MobileSelectedElement: FC<MobileSelectedElementProps> = ({
  selectedPropertyData,
  onPropertySelect,
}) => {
  if (!selectedPropertyData) {
    return null;
  }
  return (
    <div className="absolute bottom-24 z-[50000] w-[370px] left-5 right-5 mx-auto bg-white rounded-2xl shadow-xl">
      <div className="p-4">
        <div className="flex">
          <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden mr-4">
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
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              selectedPropertyData.statusColor === "orange"
                ? "bg-orange-100 text-orange-600"
                : selectedPropertyData.statusColor === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
            }`}
          >
            {selectedPropertyData.status}
          </span>
          <span className="text-xs text-gray-500">
            {selectedPropertyData.district}
          </span>
        </div>
        <button
          onClick={() => onPropertySelect(selectedPropertyData.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};
