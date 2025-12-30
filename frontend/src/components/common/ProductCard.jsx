import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../../features/admin/products/services/product.api'
import { addToCart } from '../../features/cart/services/cart.api'
import LoginSignupModal from './LoginSignupModal'
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
function ProductCard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [actionError, setActionError] = useState('')
  const [actionMessage, setActionMessage] = useState('')

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

  const handleViewProduct = (productId) => {
    const token = localStorage.getItem('token')
    const base = token ? '/user' : ''
    navigate(`${base}/products/${productId}`)
  }

  const ensureLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoginModalOpen(true)
      return false
    }
    return true
  }

  const openQuantityModal = (product, action) => {
    if ((product?.stock ?? 0) <= 0) {
      setActionError('Out of stock')
      return
    }
    if (!ensureLoggedIn()) return
    setSelectedProduct(product)
    setModalAction(action)
    setModalQuantity(1)
    setActionError('')
    setActionMessage('')
    setIsQuantityModalOpen(true)
  }

  const closeQuantityModal = () => {
    setIsQuantityModalOpen(false)
    setSelectedProduct(null)
    setModalAction('')
    setModalQuantity(1)
  }

  const handleConfirmQuantity = async () => {
    if (!selectedProduct) return
    if (modalQuantity < 1) {
      setActionError('Quantity must be at least 1')
      return
    }

    if (modalAction === 'cart') {
      try {
        await addToCart({ productId: selectedProduct._id, quantity: modalQuantity })
        setActionMessage('Product added to cart')
        closeQuantityModal()
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Failed to add to cart'
        setActionError(msg)
      }
      return
    }

    if (modalAction === 'buyNow') {
      navigate('/user/checkout', {
        state: {
          buyNowItem: {
            productId: selectedProduct._id,
            productName: selectedProduct.name,
            price: Number(selectedProduct.price) || 0,
            quantity: modalQuantity,
            image: selectedProduct.images?.[0]?.url || '',
          },
        },
      })
      closeQuantityModal()
    }
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 text-center">
        Best Sellers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => {
            const outOfStock = (product.stock ?? 0) <= 0
            return (
              <div
                key={product._id}
                className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50 cursor-pointer"
                onClick={() => handleViewProduct(product._id)}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                  {product.offer && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                      {product.offer}
                    </span>
                  )}
                  {outOfStock && (
                    <span className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                      Out of Stock
                    </span>
                  )}
                  <img
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (outOfStock) return
                      openQuantityModal(product, 'cart')
                    }}
                    disabled={outOfStock}
                    className={`absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white ${outOfStock ? 'cursor-not-allowed opacity-70' : ''}`}
                    title={outOfStock ? 'Out of Stock' : 'Add to cart'}
                  >
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (outOfStock) return
                        openQuantityModal(product, 'buyNow')
                      }}
                      disabled={outOfStock}
                      className={`text-sm font-semibold text-primary hover:text-blue-700 transition-colors ${outOfStock ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      {outOfStock ? 'Out of Stock' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full text-center">
            <p className="text-slate-500">No products available</p>
          </div>
        )}
      </div>

      <LoginSignupModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(role) => {
          setIsLoginModalOpen(false)
          navigate(role === 'admin' ? '/admin' : '/user')
        }}
      />

      {isQuantityModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeQuantityModal}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{modalAction === 'cart' ? 'Add to Cart' : 'Buy Now'}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProduct?.name}
                </h3>
              </div>
              <button
                className="text-slate-400 hover:text-slate-600"
                onClick={closeQuantityModal}
                aria-label="Close quantity modal"
              >
                ×
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Quantity</span>
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                <button
                  className="px-3 py-2 text-slate-600 hover:text-slate-900"
                  onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                  type="button"
                >
                  -
                </button>
                <input
                  className="w-16 text-center border-0 bg-transparent focus:ring-0 text-slate-900 dark:text-white"
                  type="number"
                  min={1}
                  value={modalQuantity}
                  onChange={(e) => setModalQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
                <button
                  className="px-3 py-2 text-slate-600 hover:text-slate-900"
                  onClick={() => setModalQuantity((q) => q + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            {(actionError || actionMessage) && (
              <p className={`text-sm ${actionError ? 'text-red-600' : 'text-green-600'}`}>
                {actionError || actionMessage}
              </p>
            )}

            <div className="flex gap-3">
              <button
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={closeQuantityModal}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition-colors"
                onClick={handleConfirmQuantity}
              >
                {modalAction === 'cart' ? 'Add to Cart' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductCard
