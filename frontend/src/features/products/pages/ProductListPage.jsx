import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import http from '../../../services/http.service';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import Pagination from '../../../components/common/Pagination';
import { addToCart } from '../../cart/services/cart.api';
import LoginSignupModal from '../../../components/common/LoginSignupModal';
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function ProductListPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [tempPriceRange, setTempPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const navigate = useNavigate();

  // Modal states for add to cart
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products and categories in parallel
        const [productsData, categoriesData] = await Promise.all([
          http.get('/products'),
          http.get('/categories')
        ]);
        
        // Handle both array and object responses for products
        const productsList = Array.isArray(productsData) ? productsData : (productsData?.data || productsData?.products || []);
        setAllProducts(productsList);
        setProducts(productsList);
        
        // Handle categories response
        const categoriesList = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || categoriesData?.categories || []);
        setCategories(categoriesList);
        
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setProducts([]);
        setAllProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply category filter from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.length > 0) {
      // Check if this category exists in our categories list
      const matchingCategory = categories.find(
        cat => cat.name.toLowerCase() === categoryFromUrl.toLowerCase()
      );
      if (matchingCategory && !selectedCategories.includes(matchingCategory.name)) {
        setSelectedCategories([matchingCategory.name]);
      }
    }
  }, [searchParams, categories]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...allProducts];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        product.categories?.some(cat => selectedCategories.includes(cat.name))
      );
    }

    // Price range filter (only apply if values are set)
    if (priceRange.min !== '' || priceRange.max !== '') {
      const minPrice = priceRange.min === '' ? 0 : parseFloat(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : parseFloat(priceRange.max);
      filtered = filtered.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Rating filter
    if (selectedRating !== null) {
      filtered = filtered.filter(product =>
        product.rating >= selectedRating
      );
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock !== false);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategories, priceRange, selectedRating, inStockOnly, allProducts]);

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    setProducts(paginatedProducts);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category checkbox change
  const handleCategoryChange = (categoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Handle price range change
  const handlePriceChange = (type, value) => {
    setTempPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Apply price filter on Enter or blur
  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange);
  };

  const handlePriceKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyPriceFilter();
    }
  };

  // Handle rating filter
  const handleRatingChange = (rating) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  // Handle availability checkbox
  const handleAvailabilityChange = () => {
    setInStockOnly(prev => !prev);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setTempPriceRange({ min: '', max: '' });
    setSelectedRating(null);
    setInStockOnly(false);
  };

  const ensureLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return false;
    }
    return true;
  };

  const openQuantityModal = (product, action) => {
    if ((product?.stock ?? 0) <= 0) {
      setActionError('Out of stock');
      return;
    }
    if (!ensureLoggedIn()) return;
    setSelectedProduct(product);
    setModalAction(action);
    setModalQuantity(1);
    setActionError('');
    setActionMessage('');
    setIsQuantityModalOpen(true);
  };

  const closeQuantityModal = () => {
    setIsQuantityModalOpen(false);
    setSelectedProduct(null);
    setModalAction('');
    setModalQuantity(1);
  };

  const handleConfirmQuantity = async () => {
    if (!selectedProduct) return;
    if (modalQuantity < 1) {
      setActionError('Quantity must be at least 1');
      return;
    }

    if (modalAction === 'cart') {
      try {
        await addToCart({ productId: selectedProduct._id, quantity: modalQuantity });
        setActionMessage('Product added to cart');
        closeQuantityModal();
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Failed to add to cart';
        setActionError(msg);
      }
      return;
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
      });
      closeQuantityModal();
    }
  };

  const handleProductClick = (productId) => {
    if (!productId) return;
    const token = localStorage.getItem('token');
    const base = token ? '/user' : '';
    navigate(`${base}/products/${productId}`);
  };

  const handleProductKeyDown = (event, productId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProductClick(productId);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav
        aria-label="Breadcrumb"
        className="flex mb-6 text-sm text-slate-500 dark:text-slate-400"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              className="inline-flex items-center hover:text-primary dark:hover:text-white transition-colors"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-slate-400 mx-1">
                <IoIosArrowForward />
              </span>
              <a
                className="hover:text-primary dark:hover:text-white transition-colors"
                href="#"
              >
                Shop
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-slate-400 mx-1">
                <IoIosArrowForward />
              </span>
              <span className="text-slate-900 dark:text-white font-medium">
                All Products
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <aside className="hidden lg:block lg:col-span-1 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:text-primary/80 font-medium underline"
            >
              Clear All
            </button>
          </div>
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Categories
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedCategories.length === 0}
                  onChange={() => setSelectedCategories([])}
                  className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                  All Products
                </span>
                <span className="ml-auto text-xs text-slate-400">{allProducts.length}</span>
              </label>
              {categories.map((category) => {
                const categoryCount = allProducts.filter(p => 
                  p.categories?.some(c => c._id === category._id || c.name === category.name)
                ).length;
                
                return (
                  <label key={category._id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                      type="checkbox"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      {categoryCount}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Price Range
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="sr-only" htmlFor="min-price">
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">
                    $
                  </span>
                  <input
                    className="w-full pl-7 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                    id="min-price"
                    placeholder="Min"
                    type="number"
                    value={tempPriceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    onBlur={applyPriceFilter}
                    onKeyDown={handlePriceKeyDown}
                  />
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="max-price">
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">
                    $
                  </span>
                  <input
                    className="w-full pl-7 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                    id="max-price"
                    placeholder="Max"
                    type="number"
                    value={tempPriceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    onBlur={applyPriceFilter}
                    onKeyDown={handlePriceKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
              <div className="absolute left-0 right-1/4 top-0 bottom-0 bg-primary rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Rating
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedRating === 5}
                  onChange={() => handleRatingChange(5)}
                  className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                  type="checkbox"
                />
                <div className="flex text-yellow-400 text-sm">
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                </div>
                <span className="text-xs text-slate-500">&amp; Up</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedRating === 4}
                  onChange={() => handleRatingChange(4)}
                  className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                  type="checkbox"
                />
                <div className="flex text-yellow-400 text-sm">
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-slate-300 text-[18px]">
                    star
                  </span>
                </div>
                <span className="text-xs text-slate-500">&amp; Up</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedRating === 3}
                  onChange={() => handleRatingChange(3)}
                  className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                  type="checkbox"
                />
                <div className="flex text-yellow-400 text-sm">
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-current text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-slate-300 text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-slate-300 text-[18px]">
                    star
                  </span>
                </div>
                <span className="text-xs text-slate-500">&amp; Up</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Availability
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={inStockOnly}
                  onChange={handleAvailabilityChange}
                  className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                  In Stock
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Pre-order
                </span>
              </label>
            </div>
          </div>
        </aside>
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredProducts.length}
              </span>{" "}
              results
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200">
                <span className="material-symbols-outlined text-xl">tune</span>
              </button>
              <label className="sr-only" for="sort">
                Sort By
              </label>
              <select
                className="w-full sm:w-48 pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-primary focus:border-primary"
                id="sort"
              >
                <option>Popularity</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="hidden sm:flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-700">
                <button className="p-1.5 rounded bg-white dark:bg-slate-700 shadow-sm text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    grid_view
                  </span>
                </button>
                <button className="p-1.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <span className="material-symbols-outlined text-[20px]">
                    view_list
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => {
                const outOfStock = (product.stock ?? 0) <= 0
                return (
                  <div
                    key={product._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleProductClick(product._id)}
                    onKeyDown={(e) => handleProductKeyDown(e, product._id)}
                    className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700/50 cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {product.offer && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                          {product.offer}% Off
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
                        src={
                          product.images?.[0]?.url ||
                          "https://via.placeholder.com/400"
                        }
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (outOfStock) return;
                          openQuantityModal(product, 'cart');
                        }}
                        disabled={outOfStock}
                        className={`absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white ${outOfStock ? 'cursor-not-allowed opacity-70' : ''}`}
                        title={outOfStock ? 'Out of Stock' : 'Add to cart'}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          <FaShoppingCart />
                        </span>
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-slate-500 mb-1">
                        {product.categories?.[0]?.name || "Uncategorized"}
                      </p>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined text-[16px] ${
                              i < 4
                                ? "text-yellow-400 fill-current"
                                : "text-slate-300"
                            }`}
                          >
                            <FaStar />
                          </span>
                        ))}
                        <span className="text-xs text-slate-400 ml-1">(0)</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-primary">
                            ${product.price?.toFixed(2) || "0.00"}
                          </span>
                          {product.offer && (
                            <span className="text-sm text-slate-400 line-through">
                              $
                              {(
                                product.price /
                                (1 - product.offer / 100)
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>
                        {outOfStock && (
                          <span className="text-xs font-semibold text-red-600">Out of stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">
                  No products found
                </p>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <LoginSignupModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(role) => {
          setIsLoginModalOpen(false);
          navigate(role === 'admin' ? '/admin' : '/user');
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
      )}    </main>
  );
}

export default ProductListPage
