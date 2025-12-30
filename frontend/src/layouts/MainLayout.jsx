import React, { useEffect } from 'react'
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {Outlet} from "react-router-dom";


function MainLayout() {
  useEffect(() => {
    // Clear localStorage when user is on home page (public route)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden">
        {/* Sticky Navigation */}
        <Navbar />
        {/* <!-- Main Content Wrapper --> */}
        <main className="flex flex-col min-h-screen">
          <Outlet />
        </main>
        {/* <!-- Footer --> */}
        <Footer />
    </div>
  )
}

export default MainLayout
