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
import { BuyerSearchPage } from "@/pages/buyer/search/page.tsx";
import { BuyerObjectInfoPage } from "@/pages/buyer/objectInfo/page.tsx";
import { BuyerMapPage } from "@/pages/buyer/map/page.tsx";
import { DeveloperLayout } from "@/pages/developer/Layout.tsx";
import { DeveloperMainPage } from "@/pages/developer/main/page.tsx";
import { DeveloperProfilePage } from "@/pages/developer/profile/page.tsx";
import { AddObjectPage } from "@/pages/developer/addObject/page.tsx";
import { MyObjectsPage } from "@/pages/developer/myObjects/page.tsx";

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
          <Route path={"list"} element={<BuyerSearchPage />}></Route>
          <Route path={"map"} element={<BuyerMapPage />}></Route>
          <Route
            path={"object_info/:id"}
            element={<BuyerObjectInfoPage />}
          ></Route>
        </Route>
        <Route path={"/developer"} element={<DeveloperLayout />}>
          <Route path={"main"} element={<DeveloperMainPage />} />
          <Route path={"profile"} element={<DeveloperProfilePage />} />
          <Route path={"add_object"} element={<AddObjectPage />} />
          <Route path={"my_objects"} element={<MyObjectsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
