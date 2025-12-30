import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../../features/admin/category/services/category.api'
import { IoIosArrowForward } from "react-icons/io";

const apiBase = (process.env.REACT_APP_API_URL || "http://localhost:5000/api")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");

function CategoryCard() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        const list = Array.isArray(data) ? data : data?.categories || []
        setCategories(list.slice(0, 4))
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Featured Categories
        </h2>
        <a
          className="text-primary font-semibold hover:text-blue-700 flex items-center gap-1 transition-colors"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const base = token ? '/user' : '';
            navigate(`${base}/products`);
          }}
        >
          View All{" "}
          <span className="material-symbols-outlined text-lg">
            <IoIosArrowForward />
          </span>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => {
          const imageUrl = cat.imageUrl
            ? cat.imageUrl.startsWith("http")
              ? cat.imageUrl
              : `${apiBase}${cat.imageUrl}`
            : null;

          return (
            <div
              key={cat._id}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl cursor-pointer"
              onClick={() => {
                const token = localStorage.getItem('token')
                const base = token ? '/user' : ''
                navigate(`${base}/products?category=${encodeURIComponent(cat.name)}`)
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-70 transition-opacity"></div>
              {imageUrl ? (
                <img
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={imageUrl}
                />
              ) : (
                <div className="h-full w-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-6xl">
                    image
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <p className="text-white text-lg font-bold mb-1 translate-y-2 group-hover:translate-y-0 transition-transform">
                  {cat.name}
                </p>
                <span className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 block">
                  {cat.productCount || "0"} Products
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryCard
