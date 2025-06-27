import { DeveloperCRM } from "@/components/DeveloperCRM.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/base.ts";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx";

export const CrmPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <DeveloperHeader
        title={"CRM Система"}
        description={"Управление клиентами и заявками"}
        hideOnMobile={true}
      />
      <div className={""}>
        <DeveloperCRM
          onBack={() => navigate("-1")}
          onStartChat={() => navigate(AppRoutes.developer.chats)}
        />
      </div>
    </>
  );
};
