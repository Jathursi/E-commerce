import React from 'react'
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Testimonials from "../components/common/Testimonials";
import HeroSection from "../components/common/HeroSection";
import AddSection from "../components/common/AddSection";
import ProductCard from "../components/common/ProductCard";
import CategoryCard from "../components/common/CategoryCard";
import NewProductCard from "../components/common/NewProductCard";


function MainLayout() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden">
        {/* Sticky Navigation */}
        <Navbar />
        {/* <!-- Main Content Wrapper --> */}
        <main className="flex flex-col min-h-screen">
        {/* <!-- Hero Section --> */}
        <HeroSection />
        {/* <!-- Featured Categories --> */}
        <CategoryCard />
        {/* <!-- Best Sellers --> */}
        <ProductCard />
        {/* <!-- Promotional Banner --> */}
        <AddSection />
        {/* <!-- New Arrivals --> */}
        <NewProductCard />
        {/* <!-- Testimonials --> */}
        <Testimonials />
        </main>
        {/* <!-- Footer --> */}
        <Footer />
    </div>
  )
}

export default MainLayout
