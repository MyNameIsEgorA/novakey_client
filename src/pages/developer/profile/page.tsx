import { Profile } from "@/components/Profile.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx";

export const DeveloperProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DeveloperHeader
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
        userType={"developer"}
      />
      ;
    </div>
  );
};
