import { useNavigate } from "react-router-dom";
import { Notifications } from "@/components/Notifications.tsx";

export const DeveloperNotificationsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Notifications
        onBack={() => {
          navigate(-1);
        }}
      />
    </div>
  );
};
