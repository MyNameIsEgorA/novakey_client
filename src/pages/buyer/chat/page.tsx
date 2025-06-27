import { Chat } from "@/components/Chat.tsx";
import { useNavigate } from "react-router-dom";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";

export const BuyerChatPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Chat onBack={() => navigate(-1)} />;
    </div>
  );
};
