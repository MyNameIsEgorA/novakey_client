import { Outlet } from "react-router-dom";
import type { FC } from "react";
import { DeveloperSidebar } from "@/widgets/sidebars/developer/widget.tsx";

export const DeveloperLayout: FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }} className="buyer-layout">
      <DeveloperSidebar />
      <main style={{ flexGrow: 1 }} className="buyer-main-content">
        <Outlet />
      </main>
    </div>
  );
};
