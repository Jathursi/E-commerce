import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../features/admin/products/services/product.api'
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
function ProductCard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        const productList = Array.isArray(data) ? data : data?.products || []
        setProducts(productList.slice(0, 4)) // Show first 4 products as "Best Sellers"
      } catch (err) {
        setError(err.message || 'Failed to load products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <p className="text-slate-500">Loading products...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 text-center">
        Best Sellers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50">
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                {product.offer && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                    {product.offer}
                  </span>
                )}
                <img
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                />
                <button className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white">
                  <span className="material-symbols-outlined text-[30px]">
                    <IoCartOutline />
                  </span>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-slate-500 mb-1">
                  {product.categories?.[0]?.name || 'Uncategorized'}
                </p>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">
                    <FaStar />
                  </span>
                  <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">
                    <FaStar />
                  </span>
                  <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">
                    <FaStar />
                  </span>
                  <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">
                    <FaStar />
                  </span>
                  <span className="material-symbols-outlined text-slate-300 text-[16px]">
                    <FaStar />
                  </span>
                  <span className="text-xs text-slate-400 ml-1">(0)</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-blue-600">${product.price?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-slate-500">No products available</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductCard
