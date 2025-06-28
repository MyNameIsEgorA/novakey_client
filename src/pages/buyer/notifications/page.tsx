import { Notifications } from "@/components/Notifications.tsx";
import { useNavigate } from "react-router-dom";

export const BuyerNotificationsPage = () => {
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
