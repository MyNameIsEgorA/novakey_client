import { BuyerSidebar } from "@/widgets/sidebars/buyer/widget.tsx";
import { Outlet } from "react-router-dom";
import type { FC } from "react";

export const BuyerLayout: FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }} className="buyer-layout">
      <BuyerSidebar />
      <main style={{ flexGrow: 1 }} className="buyer-main-content">
        <Outlet />
      </main>
    </div>
  );
};
