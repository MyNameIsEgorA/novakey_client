import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx";
import { MyObjectsList } from "@/pages/developer/myObjects/content.tsx";

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

const properties: Property[] = [
  {
    id: "1",
    title: 'ЖК "Северная звезда"',
    price: "8,5 млн ₽",
    pricePerSqm: "130,000 ₽/м²",
    area: "65 м²",
    rooms: "2-комн.",
    floor: "12/16 эт.",
    address: "ул. Северная, 15",
    district: "Северный",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    amenities: ["Парковка", "Лифт", "Консьерж"],
    status: "available",
    isNew: true,
    hasAR: true,
    hasVR: false,
  },
  {
    id: "2",
    title: 'ЖК "Новый Горизонт"',
    price: "5,2 млн ₽",
    pricePerSqm: "123,000 ₽/м²",
    area: "42 м²",
    rooms: "1-комн.",
    floor: "8/20 эт.",
    address: "пр. Мира, 45",
    district: "Центр",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    amenities: ["Подземная парковка", "Лифт"],
    status: "available",
    isNew: false,
    hasAR: false,
    hasVR: true,
  },
  {
    id: "3",
    title: 'ЖК "Парковый"',
    price: "6,8 млн ₽",
    pricePerSqm: "125,000 ₽/м²",
    area: "54 м²",
    rooms: "2-комн.",
    floor: "5/12 эт.",
    address: "ул. Парковая, 8",
    district: "Южный",
    image:
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400&h=300&fit=crop",
    amenities: ["Закрытая территория", "Лифт"],
    status: "reserved",
    isNew: true,
    hasAR: true,
    hasVR: true,
  },
  {
    id: "4",
    title: 'ЖК "Центральный"',
    price: "12,5 млн ₽",
    pricePerSqm: "145,000 ₽/м²",
    area: "86 м²",
    rooms: "3-комн.",
    floor: "15/25 эт.",
    address: "ул. Центральная, 1",
    district: "Центр",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    amenities: ["Подземная парковка", "Лифт", "Консьерж"],
    status: "available",
    isNew: false,
    hasAR: true,
    hasVR: false,
  },
  {
    id: "5",
    title: 'ЖК "Речной"',
    price: "9,2 млн ₽",
    pricePerSqm: "128,000 ₽/м²",
    area: "72 м²",
    rooms: "2-комн.",
    floor: "7/14 эт.",
    address: "наб. Речная, 12",
    district: "Восточный",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    amenities: ["Парковка", "Лифт", "Фитнес-зал"],
    status: "available",
    isNew: true,
    hasAR: false,
    hasVR: true,
  },
  {
    id: "6",
    title: 'ЖК "Зеленый квартал"',
    price: "4,8 млн ₽",
    pricePerSqm: "120,000 ₽/м²",
    area: "40 м²",
    rooms: "1-комн.",
    floor: "3/9 эт.",
    address: "ул. Зеленая, 28",
    district: "Западный",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    amenities: ["Парковка", "Лифт"],
    status: "sold",
    isNew: false,
    hasAR: true,
    hasVR: true,
  },
];

export function MyObjectsPage() {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  const onPropertySelect = (id: string) => {
    navigate(`/developer/object_info/${id}}`);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict =
      !selectedDistrict || property.district === selectedDistrict;
    const matchesRooms = !selectedRooms || property.rooms === selectedRooms;

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
}
