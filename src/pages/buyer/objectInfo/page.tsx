import { PropertyDetail } from "@/components/PropertyDetail.tsx";
import { useNavigate, useParams } from "react-router-dom";

export const BuyerObjectInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      <PropertyDetail
        propertyId={id || "-1"}
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
