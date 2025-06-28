import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
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
import { CrmPage } from "@/pages/developer/CRM/page.tsx";
import { CalendarPage } from "@/pages/developer/calendar/page.tsx";
import { DeveloperMapPage } from "@/pages/developer/map/page.tsx";
import { DeveloperObjectInfo } from "@/pages/developer/objectInfo/page.tsx";
import { CalculatorPage } from "@/pages/buyer/calculator/page.tsx";
import { TinderPage } from "@/pages/buyer/tinder/page.tsx";
import { BuyerNotificationsPage } from "@/pages/buyer/notifications/page.tsx";
import { DeveloperNotificationsPage } from "@/pages/developer/notifications/page.tsx";
import { ArPage } from "@/pages/buyer/ar/page.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={AppRoutes.authUserSelection}
          element={<AuthUserSelectionPage />}
        />
        <Route
          index
          element={<Navigate to={AppRoutes.authUserSelection} replace />}
        />
        <Route path={AppRoutes.authBuyer} element={<BuyerAuthPage />} />
        <Route path={AppRoutes.authDeveloper} element={<DeveloperAuthPage />} />
        <Route path="/buyer" element={<BuyerLayout />}>
          <Route path={"home"} element={<BuyerMainPage />}></Route>
          <Route path={"profile"} element={<BuyerProfilePage />}></Route>
          <Route path={"chats"} element={<BuyerChatPage />}></Route>
          <Route path={"list"} element={<BuyerSearchPage />}></Route>
          <Route path={"map"} element={<BuyerMapPage />}></Route>
          <Route path={"calculator"} element={<CalculatorPage />}></Route>
          <Route path={"tinder"} element={<TinderPage />}></Route>
          <Route
            path={"notifications"}
            element={<BuyerNotificationsPage />}
          ></Route>
          <Route path={"ar"} element={<ArPage />}></Route>
          <Route
            path={"object_info/:id"}
            element={<BuyerObjectInfoPage />}
          ></Route>
        </Route>
        <Route path={"/developer"} element={<DeveloperLayout />}>
          <Route path={"main"} element={<DeveloperMainPage />} />
          <Route path={"profile"} element={<DeveloperProfilePage />} />
          <Route path={"add_object"} element={<AddObjectPage />} />
          <Route path={"chats"} element={<BuyerChatPage />}></Route>
          <Route path={"my_objects"} element={<MyObjectsPage />} />
          <Route
            path={"notifications"}
            element={<DeveloperNotificationsPage />}
          />
          <Route path={"crm"} element={<CrmPage />} />
          <Route path={"map"} element={<DeveloperMapPage />} />
          <Route path={"calendar"} element={<CalendarPage />} />
          <Route path={"object_info/:id"} element={<DeveloperObjectInfo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
