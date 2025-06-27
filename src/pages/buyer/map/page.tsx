import { MapFilters } from "@/pages/buyer/map/filters.tsx";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";
import { useEffect, useState } from "react";
import type { BuyEntity } from "@/entities/buy/type.ts";
import { getAllAvailableObjects } from "@/entities/buy/model.ts";
import type { Filters } from "@/shared/type/filters.ts";

export const BuyerMapPage = () => {
  const [allEntities, setAllEntities] = useState<BuyEntity[]>([]);
  const [entitiesToShow, setEntitiesToShow] = useState<BuyEntity[]>([]);

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
          return entity.rooms >= "4";
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
  }, [filters, allEntities]); // Зави

  useEffect(() => {
    const getEntities = async () => {
      const entities = await getAllAvailableObjects();

      setAllEntities(entities);
      setEntitiesToShow(entities);
    };

    getEntities();
  }, []);

  return (
    <div className={"bg-[#f9f9f9] h-full"}>
      <BuyerHeader
        title={"Карта объектов"}
        description={"Интерактивная карта с объектами"}
        hideOnMobile={true}
      />
      <div className={"p-6 flex w-full"}>
        <MapFilters
          entitiesToShow={entitiesToShow}
          allEntities={allEntities}
          setEntitiesToShow={setEntitiesToShow}
          className={"w-1/4"}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={"bg-black w-1/2"}></div>
        <div className={"bg-[#fff] w-1/4"}>123</div>
      </div>
    </div>
  );
};
