import { AddProperty } from "@/components/AddProperty.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";

export const AddObjectPage = () => {
  const navigate = useNavigate();

  return (
    <AddProperty
      onBack={() => navigate(-1)}
      onSave={(propertyData: any) => {
        console.log(propertyData);
        navigate(AppRoutes.developer.myObjects);
      }}
    />
  );
};
