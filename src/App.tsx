import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthUserSelectionPage } from "@/pages/auth/selection/page.tsx";
import { AppRoutes } from "@/app/routes/base.ts";
import { BuyerAuthPage } from "@/pages/auth/buyer/page.tsx";
import { DeveloperAuthPage } from "@/pages/auth/developer/page.tsx";
import { BuyerLayout } from "@/pages/buyer/Layout.tsx";
import { BuyerMainPage } from "@/pages/buyer/main/page.tsx";
import { BuyerProfilePage } from "@/pages/buyer/profile/page.tsx";
import { BuyerChatPage } from "@/pages/buyer/chat/page.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={AppRoutes.authUserSelection}
          element={<AuthUserSelectionPage />}
        />
        <Route path={AppRoutes.authBuyer} element={<BuyerAuthPage />} />
        <Route path={AppRoutes.authDeveloper} element={<DeveloperAuthPage />} />
        <Route path="/buyer" element={<BuyerLayout />}>
          <Route path={"home"} element={<BuyerMainPage />}></Route>
          <Route path={"profile"} element={<BuyerProfilePage />}></Route>
          <Route path={"chats"} element={<BuyerChatPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
