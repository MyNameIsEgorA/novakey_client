import { PropertyDetail } from "@/components/PropertyDetail.tsx";
import { useNavigate } from "react-router-dom";

export const BuyerObjectInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PropertyDetail
        propertyId={"1"}
        onBack={() => {
          navigate(-1);
        }}
        onStartChat={() => {}}
        userType={"buyer"}
        onStartARViewer={() => {}}
      />
    </div>
  );
};
