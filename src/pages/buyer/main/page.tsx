import { BuyerHeader } from "@/pages/buyer/main/header.tsx";
import { BuyerMainContent } from "@/pages/buyer/main/content.tsx";

export const BuyerMainPage = () => {
  return (
    <div className={"flex flex-1 flex-col"}>
      <BuyerHeader />
      <BuyerMainContent />
    </div>
  );
};
