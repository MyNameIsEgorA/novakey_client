import { MapFilters } from "@/pages/buyer/map/filters.tsx";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";
import { useEffect, useState } from "react";
import type { BuyEntity } from "@/entities/buy/type.ts";
import { getAllAvailableObjects } from "@/entities/buy/model.ts";
import type { Filters } from "@/shared/type/filters.ts";
import { BuyerMap } from "@/pages/buyer/map/map.tsx";
import { SelectedElement } from "@/pages/buyer/map/selectedElement.tsx";
import { useIsMobile } from "@/shared/hooks/isMobile.ts";
import { ArrowLeft, List, SlidersHorizontal } from "lucide-react";
import { MobileSelectedElement } from "@/pages/buyer/map/mobileSelectedElement.tsx";
import { useNavigate } from "react-router-dom";

export const BuyerMapPage = () => {
  const isMobile = useIsMobile();
  const [allEntities, setAllEntities] = useState<BuyEntity[]>([]);
  const [entitiesToShow, setEntitiesToShow] = useState<BuyEntity[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedPropertyData, setSelectedPropertyData] =
    useState<BuyEntity | null>(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Filters>({
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

  useEffect(() => {
    let filtered = allEntities;

    filtered = filtered.filter(
      (entity) =>
        entity.priceNum >= filters.priceRange[0] &&
        entity.priceNum <= filters.priceRange[1],
    );

    filtered = filtered.filter(
      (entity) =>
        entity.area >= filters.areaRange[0] &&
        entity.area <= filters.areaRange[1],
    );

    if (filters.rooms !== "any") {
      filtered = filtered.filter((entity) => {
        if (filters.rooms === "4") {
          return entity.rooms && parseInt(entity.rooms) >= 4;
        }
        return entity.rooms === filters.rooms;
      });
    }

    if (filters.status !== "any") {
      filtered = filtered.filter((entity) => entity.status === filters.status);
    }

    if (filters.district !== "any") {
      filtered = filtered.filter(
        (entity) => entity.district === filters.district,
      );
    }

    if (filters.developer !== "any") {
      filtered = filtered.filter(
        (entity) => entity.developer === filters.developer,
      );
    }

    if (filters.nearTransport) {
      filtered = filtered.filter((entity) => entity.nearTransport);
    }

    if (filters.nearSchool) {
      filtered = filtered.filter((entity) => entity.nearSchool);
    }

    if (filters.nearShops) {
      filtered = filtered.filter((entity) => entity.nearShops);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((entity) =>
        filters.amenities.every((amenity) =>
          entity.amenities.includes(amenity),
        ),
      );
    }

    setEntitiesToShow(filtered);
  }, [filters, allEntities]);

  useEffect(() => {
    const getEntities = async () => {
      const entities = await getAllAvailableObjects();
      const transformedEntities = entities.map((entity) => ({
        ...entity,
        statusColor:
          entity.status === "Готов к заселению"
            ? "green"
            : entity.status === "Строительство"
              ? "orange"
              : "blue",
        price: `${entity.priceNum}М ₽`,
      }));

      setAllEntities(transformedEntities as BuyEntity[]);
      setEntitiesToShow(transformedEntities as BuyEntity[]);
    };

    getEntities();
  }, []);

  return (
    <div className={"bg-[#f9f9f9] h-full"}>
      {!isMobile && (
        <>
          <BuyerHeader
            title={"Карта объектов"}
            description={"Интерактивная карта с объектами"}
            hideOnMobile={true}
          />
          <div className={"p-6 flex w-full h-[94vh]"}>
            <MapFilters
              entitiesToShow={entitiesToShow}
              allEntities={allEntities}
              setEntitiesToShow={setEntitiesToShow}
              className={"w-1/4"}
              filters={filters}
              setFilters={setFilters}
            />

            <BuyerMap
              entitiesToShow={entitiesToShow}
              setSelectedPropertyData={setSelectedPropertyData}
            />
            {selectedPropertyData && (
              <SelectedElement
                selectedPropertyData={selectedPropertyData}
                onPropertySelect={(id: string) => {
                  navigate(`/buyer/object_info/${id}`);
                }}
              />
            )}
          </div>
        </>
      )}
      {isMobile && (
        <>
          <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => {}}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg">Карта объектов</h1>
                <p className="text-sm text-gray-500">
                  {entitiesToShow.length} из {allEntities.length} объектов
                </p>
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
          {showFilters && (
            <MapFilters
              entitiesToShow={entitiesToShow}
              allEntities={allEntities}
              setEntitiesToShow={setEntitiesToShow}
              className={"w-full"}
              filters={filters}
              setFilters={setFilters}
            />
          )}
          <BuyerMap
            isMobile={true}
            entitiesToShow={entitiesToShow}
            setSelectedPropertyData={setSelectedPropertyData}
          />
          <MobileSelectedElement
            selectedPropertyData={selectedPropertyData}
            onPropertySelect={(id: string) => {
              navigate(`/buyer/object_info/${id}`);
            }}
          ></MobileSelectedElement>
        </>
      )}
    </div>
  );
};
