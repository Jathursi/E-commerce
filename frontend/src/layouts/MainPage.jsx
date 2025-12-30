import React from 'react'
import Testimonials from "../components/common/Testimonials";
import HeroSection from "../components/common/HeroSection";
import AddSection from "../components/common/AddSection";
import ProductCard from "../components/common/ProductCard";
import CategoryCard from "../components/common/CategoryCard";
import NewProductCard from "../components/common/NewProductCard";
function MainPageLayout() {
  return (
    <div>
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
    </div>
  )
}

export default MainPageLayout
