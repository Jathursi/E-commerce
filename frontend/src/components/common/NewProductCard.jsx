import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../../features/admin/products/services/product.api'
import { addToCart } from '../../features/cart/services/cart.api'
import LoginSignupModal from './LoginSignupModal'
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

function NewProductCard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [actionError, setActionError] = useState('')
  const [actionMessage, setActionMessage] = useState('')
  const [startIndex, setStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const pageSize = 4
  const sectionRef = useRef(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        const productList = Array.isArray(data) ? data : data?.products || []
        // Sort by createdAt desc (new arrivals)
        const sorted = productList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setProducts(sorted)
      } catch (err) {
        setError(err.message || 'Failed to load new products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const ensureLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoginModalOpen(true)
      return false
    }
    return true
  }

  const handleViewProduct = (productId) => {
    const token = localStorage.getItem('token')
    const base = token ? '/user' : ''
    navigate(`${base}/products/${productId}`)
  }

  const openQuantityModal = (product, action) => {
    if ((product?.stock ?? 0) <= 0) {
      setActionError('Out of stock')
      return
    }
    if (!ensureLoggedIn()) return
    setSelectedProduct({ ...product, __action: action })
    setModalQuantity(1)
    setActionError('')
    setActionMessage('')
    setIsQuantityModalOpen(true)
  }

  const closeQuantityModal = () => {
    setIsQuantityModalOpen(false)
    setSelectedProduct(null)
    setModalQuantity(1)
  }

  const handleConfirmQuantity = async () => {
    if (!selectedProduct) return
    if (modalQuantity < 1) {
      setActionError('Quantity must be at least 1')
      return
    }
    const action = selectedProduct.__action
    if (action === 'cart') {
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
    if (action === 'buyNow') {
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

  const canPrev = startIndex > 0
  const canNext = startIndex + pageSize < products.length
  const visibleProducts = products.slice(startIndex, startIndex + pageSize)

  if (loading) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <p className="text-slate-500">Loading new arrivals...</p>
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
    <section ref={sectionRef} className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          New Arrivals
        </h2>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            onClick={() => {
              setIsAnimating(true)
              setStartIndex((i) => {
                const next = Math.max(0, i - 1)
                return next
              })
              sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
              setTimeout(() => setIsAnimating(false), 300)
            }}
            disabled={!canPrev}
            aria-label="Previous"
          >
            <span className="material-symbols-outlined text-lg"><IoIosArrowBack /></span>
          </button>
          <button
            className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            onClick={() => {
              setIsAnimating(true)
              setStartIndex((i) => {
                const maxStart = Math.max(0, products.length - pageSize)
                const next = Math.min(maxStart, i + 1)
                return next
              })
              sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
              setTimeout(() => setIsAnimating(false), 300)
            }}
            disabled={!canNext}
            aria-label="Next"
          >
            <span className="material-symbols-outlined text-lg"> <IoIosArrowForward /></span>
          </button>
        </div>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${isAnimating ? 'opacity-90' : 'opacity-100'}`}>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => {
            const outOfStock = Number(product.stock) <= 0
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
                    <span className="absolute top-3 right-3 bg-slate-800/80 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                      Out of Stock
                    </span>
                  )}
                  <img
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    src={product.images?.[0]?.url || product.imageUrl || 'https://via.placeholder.com/300'}
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
                    <span className="material-symbols-outlined text-[20px]"><IoCartOutline /></span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-slate-500 mb-1">{product.categories?.[0]?.name || 'Uncategorized'}</p>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-primary">${product.price?.toFixed(2)}</span>
                      {outOfStock && (
                        <span className="text-xs font-semibold text-red-600">Out of stock</span>
                      )}
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
            <p className="text-slate-500">No new products available</p>
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
                <p className="text-sm text-slate-500">{selectedProduct?.__action === 'cart' ? 'Add to Cart' : 'Buy Now'}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedProduct?.name}</h3>
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
                {selectedProduct?.__action === 'cart' ? 'Add to Cart' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default NewProductCard
