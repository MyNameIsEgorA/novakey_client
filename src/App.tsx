import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthUserSelectionPage } from "@/pages/auth/selection/page.tsx";
import { AppRoutes } from "@/app/routes/base.ts";
import { BuyerAuthPage } from "@/pages/auth/buyer/page.tsx";
import { DeveloperAuthPage } from "@/pages/auth/developer/page.tsx";

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
      </Routes>
    </Router>
  );
};

export default App;
