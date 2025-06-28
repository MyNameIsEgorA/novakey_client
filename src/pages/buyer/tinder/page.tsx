import { PropertySwiper } from "@/components/PropertySwiper.tsx";
import { useNavigate } from "react-router-dom";

export const TinderPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PropertySwiper
        onBack={() => navigate(-1)}
        onPropertyLike={() => {}}
        onPropertyDislike={() => {}}
      />
    </div>
  );
};
