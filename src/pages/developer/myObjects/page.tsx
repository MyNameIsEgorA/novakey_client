import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx";
import { MyObjectsList } from "@/pages/developer/myObjects/content.tsx";
import { allObjectsStorage } from "@/entities/buy/modelsStorage.ts";
import { observer } from "mobx-react-lite";

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

export const MyObjectsPage = observer(() => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  const onPropertySelect = (id: string) => {
    navigate(`/developer/object_info/${id}`);
  };

  const { allObjects: properties } = allObjectsStorage;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict =
      !selectedDistrict || property.district === selectedDistrict;
    const matchesRooms =
      !selectedRooms || property.apartment_types[0] === selectedRooms;

    return matchesSearch && matchesDistrict && matchesRooms;
  });

  return (
    <>
      <DeveloperHeader
        title={"Мои объекты"}
        description={"Управление вашими проектами"}
        hideOnMobile={true}
      />
      <MyObjectsList
        filteredProperties={filteredProperties}
        selectedDistrict={selectedDistrict}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onBack={onBack}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedRooms={setSelectedRooms}
        selectedRooms={selectedRooms}
        onPropertySelect={onPropertySelect}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        properties={properties}
      />
    </>
  );
});
