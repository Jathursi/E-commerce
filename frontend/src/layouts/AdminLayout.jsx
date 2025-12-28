import React from "react";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "../features/admin/dashboard/components/TopBar";
function AdminLayout() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
