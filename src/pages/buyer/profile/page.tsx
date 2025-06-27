import { Profile } from "@/components/Profile.tsx";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";

export const BuyerProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BuyerHeader
        title={"Профиль"}
        hideOnMobile={true}
        description={"Управление профилем и настройками"}
      />
      <Profile
        onBack={() => {
          navigate(-1);
        }}
        onLogout={() => {
          navigate(AppRoutes.authUserSelection);
        }}
        userType={"buyer"}
      />
      ;
    </div>
  );
};
