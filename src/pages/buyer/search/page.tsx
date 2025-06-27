import { PropertyList } from "@/components/PropertyList.tsx";
import { useNavigate } from "react-router-dom";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";

export const BuyerSearchPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BuyerHeader
        hideOnMobile={true}
        title={"Поиск недвижимости"}
        description={"Список всех доступных объектов"}
      />
      <PropertyList
        onPropertySelect={() => navigate("/buyer/object_info/1")}
        onBack={() => {
          navigate(-1);
        }}
        userType={"buyer"}
      />
    </>
  );
};
