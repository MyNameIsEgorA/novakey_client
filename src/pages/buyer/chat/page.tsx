import { Chat } from "@/components/Chat.tsx";
import { useNavigate } from "react-router-dom";

export const BuyerChatPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Chat onBack={() => navigate(-1)} />;
    </div>
  );
};
