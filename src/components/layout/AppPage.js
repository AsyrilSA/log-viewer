import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import AppTopBar from "components/layout/AppTopBar";
import AppDrawer from "components/layout/AppDrawer";
import HomePage from "pages/HomePage";
import BasePage from "pages/BasePage";
import CommunicationPage from "pages/CommunicationPage";
import PerformancePage from "pages/PerformancePage";
import RawPage from "pages/RawPage";
import SettingsPage from "pages/SettingsPage";

export default function Layout() {
  return (
    <div>
      <AppDrawer />
      <AppTopBar />
      <div style={{ marginLeft: "210px", marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/base" element={<BasePage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/rawlogs" element={<RawPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}
