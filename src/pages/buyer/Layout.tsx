import { BuyerSidebar } from "@/widgets/sidebars/buyer/widget.tsx";
import { Outlet } from "react-router-dom";

export const BuyerLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <BuyerSidebar />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};
