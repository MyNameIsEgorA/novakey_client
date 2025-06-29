import { Chat } from "@/components/Chat.tsx";
import { useNavigate } from "react-router-dom";
import { chatStore } from "@/entities/chat/store.ts";
import { observer } from "mobx-react-lite";

export const BuyerChatPage = observer(() => {
  const navigate = useNavigate();
  const { chats } = chatStore;
  console.log(JSON.stringify(Object.entries(chats)));
  return (
    <div>
      <Chat onBack={() => navigate(-1)} />
    </div>
  );
});
