import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "../features/admin/dashboard/components/TopBar";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen flex relative">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Mobile overlay to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar onMenuClick={() => setIsSidebarOpen((v) => !v)} />
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
