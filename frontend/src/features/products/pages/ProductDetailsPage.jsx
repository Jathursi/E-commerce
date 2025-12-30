import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '../../../services/http.service';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import LoginSignupModal from '../../../components/common/LoginSignupModal';
import { addToCart } from "../../cart/services/cart.api";
import { getProductReviews, markReviewHelpful } from "../../orders/services/review.api";
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdFlashOn } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { MdAssignmentReturn } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get current user ID from token or auth context
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload._id || payload.id);
      } catch (err) {
        console.error('Failed to parse token:', err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await http.get(`/products/${productId}`);
        const productData = data?.data || data?.product || data;
        setProduct(productData);

        const firstImage = (productData?.images || [])
          .map((img) => img?.url || img)
          .find(Boolean);
        setSelectedImage(firstImage || '');
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return;
      try {
        setReviewsLoading(true);
        const data = await getProductReviews(productId);
        const reviewsWithHelpfulStatus = (data.reviews || []).map(review => ({
          ...review,
          isHelpfulByCurrentUser: review.helpfulBy?.some(id => id === userId) || false
        }));
        setReviews(reviewsWithHelpfulStatus);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, userId]);

  const imageList = (product?.images || [])
    .map((img) => img?.url || img)
    .filter(Boolean);

  const displayImage = selectedImage || imageList[0] || 'https://via.placeholder.com/800';
  const formattedPrice = product?.price ? product.price.toFixed(2) : '0.00';
  const originalPrice = product?.offer
    ? (product.price / (1 - product.offer / 100)).toFixed(2)
    : null;
  const ratingValue = averageRating || Number(product?.averageRating || 0);
  const reviewsCount = totalReviews || product?.totalReviews || 0;
  const categoryName = product?.categories?.[0]?.name || product?.category?.name || 'Shop';
  const inStock = (product?.stock ?? 0) > 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviewsCount > 0 ? ((count / reviewsCount) * 100).toFixed(0) : 0;
    return { star, count, percentage: `${percentage}%` };
  });

  const formatReviewDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleMarkHelpful = async (reviewId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const result = await markReviewHelpful(productId, reviewId);
      
      // Update the reviews state with new helpful count
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review._id === reviewId 
            ? { 
                ...review, 
                helpfulCount: result.helpfulCount,
                isHelpfulByCurrentUser: result.isHelpful
              }
            : review
        )
      );
    } catch (err) {
      console.error('Failed to mark review as helpful:', err);
    }
  };

  const handleAddToCart = async () => {
    setActionMessage("");
    setActionError("");

    if (!inStock) {
      setActionError("Out of stock");
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    
    try {
      await addToCart({
        productId,
        quantity,
      });
      setActionMessage("Product added to cart successfully");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to add to cart";
      setActionError(msg);
    }
  };

  const handleBuyNow = () => {
    setActionMessage("");
    setActionError("");

    if (!inStock) {
      setActionError("Out of stock");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    navigate('/user/checkout', {
      state: {
        buyNowItem: {
          productId: product?._id,
          productName: product?.name,
          price: Number(product?.price) || 0,
          quantity,
          image: displayImage,
        },
      },
    });
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <>
    <main className="flex-grow pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex mb-8">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-slate-500 dark:text-slate-400">
            <li className="inline-flex items-center">
              <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-lg mx-1"><IoIosArrowForward /></span>
                <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">
                  {categoryName}
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-lg mx-1"><IoIosArrowForward /></span>
                <span aria-current="page" className="text-slate-900 dark:text-white font-medium">
                  {product?.name || 'Product Details'}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group">
              {product?.offer ? (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-lg">
                  -{product.offer}% Discount
                </span>
              ) : null}
              <img
                alt={product?.name || 'Product image'}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                src={displayImage}
              />
              <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {imageList.slice(0, 4).map((image, index) => {
                const isActive = image === displayImage;
                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 ${
                      isActive
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                    } transition-colors bg-slate-100 dark:bg-slate-800`}
                  >
                    <img
                      alt={`${product?.name || 'Product'} view ${index + 1}`}
                      className={`w-full h-full object-cover ${
                        isActive ? '' : 'opacity-80 hover:opacity-100'
                      }`}
                      src={image}
                    />
                  </button>
                );
              })}
              {imageList.length === 0 && (
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-default">
                  <span className="text-xs text-slate-400">No images</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {product?.name || 'Product Name'}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-400 gap-0.5">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <span
                      key={index}
                      className={`material-symbols-outlined text-[20px] ${
                        ratingValue >= index + 1
                          ? 'fill-current'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      <FaStar />
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer transition-colors underline decoration-slate-300 underline-offset-4">
                  {reviewsCount} Reviews
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    inStock
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">${formattedPrice}</span>
                {originalPrice && (
                  <span className="text-xl text-slate-400 line-through mb-1">${originalPrice}</span>
                )}
              </div>
              <p className="text-sm text-slate-500">Includes all taxes. Free shipping available.</p>
            </div>

            <div className="mb-8">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {product?.description ||
                  'This item is ready for your cart. Add it now to see full details and specifications.'}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-slate-900 dark:text-white">Product Features</label>
                </div>
                {product?.features?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((f, idx) => (
                      <span
                        key={`${f.name}-${idx}`}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200"
                      >
                        <span className="font-semibold">{f.name}:</span> {f.value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No features listed.</p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-2">Quantity</label>
                <div className="flex items-center w-max border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                  <button
                    className="p-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    type="button"
                  >
                    <span className="text-3xl">-</span>
                  </button>
                  <input
                    className="w-12 text-center border-0 bg-transparent focus:ring-0 p-0 text-slate-900 dark:text-white font-semibold"
                    readOnly
                    type="number"
                    value={quantity}
                  />
                  <button
                    className="p-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    onClick={() => setQuantity((q) => q + 1)}
                    type="button"
                  >
                    <span className="text-2xl">+</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-2">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${inStock ? 'hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300' : 'cursor-not-allowed opacity-60'}`}
              >
                <span className="material-symbols-outlined"><FaShoppingCart /></span>
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className={`flex-1 bg-primary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${inStock ? 'hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0' : 'cursor-not-allowed opacity-60'}`}
              >
                <span className="material-symbols-outlined"><MdFlashOn /></span>
                {inStock ? 'Buy Now' : 'Out of Stock'}
              </button>
            </div>
            {(actionMessage || actionError) && (
              <p className={`text-sm ${actionError ? "text-red-600" : "text-green-600"}`}>{actionError || actionMessage}</p>
            )}

            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary">
                  <span className="material-symbols-outlined"><MdLocalShipping /></span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Free Delivery</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Free standard delivery on orders over $50. Estimated delivery: June 24 - June 26.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary">
                  <span className="material-symbols-outlined"><MdAssignmentReturn /></span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Return Policy</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Worry-free 30 day return policy. Money back guarantee if item is returned in original condition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">{ratingValue.toFixed(1)}</span>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 text-sm">
                      {[1, 2, 3, 4, 5].map((star) => {
                        if (ratingValue >= star) {
                          return <FaStar key={star} className="text-[18px] fill-current" />;
                        } else if (ratingValue >= star - 0.5) {
                          return <FaStarHalfAlt key={star} className="text-[18px] fill-current" />;
                        } else {
                          return <FaRegStar key={star} className="text-[18px] text-slate-300 dark:text-slate-600" />;
                        }
                      })}
                    </div>
                    <span className="text-sm text-slate-500">Based on {reviewsCount} reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-sm">
                    <span className="w-3 font-medium text-slate-600 dark:text-slate-400">{row.star}</span>
                    <span className="text-[14px] text-yellow-400 fill-current"><FaStar /></span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: row.percentage }}></div>
                    </div>
                    <span className="w-12 text-right text-slate-400">{row.percentage} ({row.count})</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Write a Review
              </button>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto hide-scrollbar">
                <button className="pb-3 border-b-2 border-primary text-primary font-semibold whitespace-nowrap">All Reviews ({reviewsCount})</button>
                {/* <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium whitespace-nowrap transition-colors">With Images</button> */}
                {/* <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium whitespace-nowrap transition-colors">5 Stars</button> */}
              </div>

              {reviewsLoading ? (
                <div className="text-center py-8 text-slate-500">Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No reviews yet</h3>
                  <p className="text-slate-600 dark:text-slate-400">Be the first to review this product!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {review.userName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white">{review.userName || 'Anonymous'}</h5>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400 text-xs">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  className={`text-[14px] ${
                                    star <= review.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">{formatReviewDate(review.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <FaRegCheckCircle className="text-[14px]" /> Verified Buyer
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {review.comment}
                      </p>
                    )}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {review.images.map((img, idx) => (
                          <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-700">
                            <img
                              className="w-full h-full object-cover hover:scale-110 transition-transform"
                              src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                              alt={`Review image ${idx + 1}`}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleMarkHelpful(review._id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          review.isHelpfulByCurrentUser 
                            ? 'text-primary font-semibold' 
                            : 'text-slate-400 hover:text-primary'
                        }`}
                      >
                        <FaRegThumbsUp className="text-[18px]" /> 
                        Helpful {review.helpfulCount > 0 && `(${review.helpfulCount})`}
                      </button>
                    </div>
                  </div>
                ))
              )}

              <button className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <LoginSignupModal 
      isOpen={isLoginModalOpen}
      onClose={() => setIsLoginModalOpen(false)}
      onLoginSuccess={(role) => {
        setIsLoginModalOpen(false);
        navigate(role === 'admin' ? '/admin' : '/user');
      }}
    />
    </>
  );
}

export default ProductDetailsPage;
