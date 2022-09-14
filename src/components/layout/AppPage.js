import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import AppTopBar from "components/layout/AppTopBar";
import AppDrawer from "components/layout/AppDrawer";
import BaseInformations from "pages/BaseInformations";
import WelcomePage from "pages/WelcomePage";
import AdvancedPage from "pages/AdvancedPage";

export default function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const onClickMenuIconHandler = () => {
    setIsDrawerOpen((current) => !current);
    console.log(isDrawerOpen);
  };
  return (
    <div>
      <AppDrawer isDrawerOpen={isDrawerOpen} />
      <AppTopBar onClickMenuIcon={onClickMenuIconHandler} />
      <div style={{ marginLeft: "250px", marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<WelcomePage />} />
          <Route path="/baseinformations" element={<BaseInformations />} />
          <Route path="/advancedpage" element={<AdvancedPage />} />
        </Routes>
      </div>
    </div>
  );
}
