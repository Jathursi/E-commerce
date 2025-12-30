import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import http from '../../../services/http.service';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import EmptyState from '../../../components/feedback/EmptyState';
import Pagination from '../../../components/common/Pagination';
import LoginSignupModal from '../../../components/common/LoginSignupModal';

function ProductSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingProductId, setPendingProductId] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Get query parameters
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        
        // Fetch products with filters
        const response = await http.get(`/products?${params.toString()}`);
        const productsList = Array.isArray(response) 
          ? response 
          : (response?.data || response?.products || []);
        
        setProducts(productsList);
        setCurrentPage(1); // Reset to first page on new search
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if at least one filter is present
    if (category || search) {
      fetchFilteredProducts();
    } else {
      setLoading(false);
      setProducts([]);
    }
  }, [category, search]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/user/products/${productId}`);
    } else {
      setPendingProductId(productId);
      setIsLoginModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {category ? `${category} Products` : search ? `Search Results` : 'Products'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {category && `Showing all products in "${category}" category`}
            {search && !category && `Searching for "${search}"`}
            {products.length > 0 && ` - ${products.length} ${products.length === 1 ? 'product' : 'products'} found`}
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <EmptyState 
            message={
              category 
                ? `No products found in "${category}" category` 
                : search 
                  ? `No products found for "${search}"` 
                  : 'No products to display'
            } 
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product) => {
                const outOfStock = (product.stock ?? 0) <= 0
                return (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="text-4xl">📦</span>
                        </div>
                      )}
                      
                      {/* Offer Badge */}
                      {product.offer && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          {product.offer}
                        </div>
                      )}
                      {outOfStock && (
                        <div className="absolute top-2 right-2 bg-slate-900/85 text-white px-2 py-1 rounded-md text-[11px] font-semibold">
                          Out of Stock
                        </div>
                      )}
                    </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Categories */}
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.categories.slice(0, 2).map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded"
                          >
                            {cat.name}
                          </span>
                        ))}
                        {product.categories.length > 2 && (
                          <span className="text-xs text-slate-500">
                            +{product.categories.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                          ${product.price?.toFixed(2)}
                        </span>
                        {outOfStock && <span className="text-xs font-semibold text-red-600">Out of stock</span>}
                      </div>
                      
                      {product.averageRating > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {product.averageRating.toFixed(1)}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({product.totalReviews})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>

      <LoginSignupModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(role) => {
          setIsLoginModalOpen(false);
          if (pendingProductId && role !== 'admin') {
            navigate(`/user/products/${pendingProductId}`);
            setPendingProductId(null);
          } else {
            navigate(role === 'admin' ? '/admin' : '/user');
          }
        }}
      />
    </div>
  );
}

export default ProductSearchPage;
