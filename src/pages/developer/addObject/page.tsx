import { AddProperty } from "@/components/AddProperty.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";
import { allObjectsStorage } from "@/entities/buy/modelsStorage.ts";
import type { ObjectCreate } from "@/entities/buy/objectFullData.ts";
// import { AuthService } from "@/entities/user/api.ts"; // Not used in this snippet
import { observer } from "mobx-react-lite";
import { userDataStore } from "@/entities/user/model.ts";

import React from "react";
import CustomToast from "@/shared/ui/CustomToast.tsx"; // Import React to use useState

type OriginalInput = {
  name: string;
  description: string;
  developer: string;
  constructionStatus: string;
  address: string;
  district: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearTransport: boolean;
  nearSchool: boolean;
  nearShops: boolean;
  totalFloors: string; // Assuming this can be parsed to a number
  totalApartments: string; // Assuming this can be parsed to a number
  apartmentTypes: string[];
  amenities: string[];
  deliveryDate: string;
  pricePerSqm: string; // Assuming this can be parsed to a number
  priceRange: {
    min: string; // Assuming this can be parsed to a number
    max: string; // Assuming this can be parsed to a number
  };
  paymentPlans: string[];
  images: string[];
  virtualTourUrl: string;
  arModelUrl: string;
  floorPlans: any[]; // Based on your example, this array is empty, but type is unknown
  egrnStatus: string;
  cadastralNumber: string;
  ownershipDocuments: any[]; // Based on your example, this array is empty, but type is unknown
  selectedPlatforms: string[];
  publicationSettings: object;
  egrnVerification: {
    status: string;
    progress: number;
    documents: Array<{ name: string; status: string; date: string }>;
  };
  createdAt: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export function mapToObjectCreate(
  input: OriginalInput,
  user_uuid: string,
): ObjectCreate {
  return {
    user_uuid: user_uuid,
    name: input.name,
    description: input.description,
    developer: input.developer,
    construction_status: input.constructionStatus,
    address: input.address,
    district: input.district,
    transport_nearby: input.nearTransport,
    school_nearby: input.nearSchool,
    shops_nearby: input.nearShops,
    longitude: input.coordinates.lng,
    latitude: input.coordinates.lat,
    floors_count: parseInt(input.totalFloors, 10),
    total_apartments: parseInt(input.totalApartments, 10),
    apartment_types: input.apartmentTypes,
    amenities: input.amenities,
    delivery_date: input.deliveryDate,
    price_per_sqm: parseFloat(input.pricePerSqm),
    min_price: parseFloat(input.priceRange.min),
    max_price: parseFloat(input.priceRange.max),
    payment_plans: input.paymentPlans,
    photos: input.images,
    vr_tour_url: input.virtualTourUrl,
    ar_model_url: input.arModelUrl,
    cadastral_number: input.cadastralNumber,
    // Assuming 'ownershipDocuments' or 'egrnVerification.documents' might map to 'property_documents'.
    // Given the example, I'm mapping verified EGBN documents to property_documents.
    property_documents: input.egrnVerification.documents
      .filter((doc) => doc.status === "verified")
      .map((doc) => doc.name + " (" + doc.date + ")"), // Adjust as needed
  };
}

export const AddObjectPage = observer(() => {
  const navigate = useNavigate();
  const { user } = userDataStore;
  const [showErrorToast, setShowErrorToast] = React.useState(false);

  return (
    <>
      <AddProperty
        onBack={() => navigate(-1)}
        onSave={async (propertyData: any) => {
          const data = mapToObjectCreate(
            propertyData,
            String(user?.id || "user_uuid"),
          );
          const result: boolean = await allObjectsStorage.addObject(data);
          if (result) {
            navigate(AppRoutes.developer.myObjects);
          } else {
            setShowErrorToast(true); // Show the toast on failure
          }
        }}
      />
      <CustomToast
        open={showErrorToast}
        onOpenChange={setShowErrorToast}
        title="Ошибка сохранения!"
        description="Не удалось сохранить информацию об объекте. Пожалуйста, попробуйте еще раз."
        actionText="Повторить"
        onActionClick={async () => {
          setShowErrorToast(false);
        }}
      />
    </>
  );
});
