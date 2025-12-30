import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/order.api';
import { addReview } from '../services/review.api';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import Modal from '../../../components/ui/Modal';
import { FaRegCheckCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineSchedule } from "react-icons/md";
import { IoPinSharp } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function TrackShipping() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const stepIndex = useMemo(() => {
    const status = order?.status?.toLowerCase?.() || 'processing';
    if (status.includes('deliver')) return 3;
    if (status.includes('ship')) return 2;
    if (status.includes('process')) return 1;
    return 0; // placed
  }, [order?.status]);

  const paymentLabel = useMemo(() => {
    if (!order) return '—';
    if (order.paymentMethod === 'cod') return 'Cash on Delivery';
    if (order.paymentMethod === 'netbanking') {
      const last4 = order.paymentDetails?.accountLast4 || '••••';
      const ifsc = order.paymentDetails?.ifscCode ? ` • IFSC ${order.paymentDetails.ifscCode}` : '';
      return `Net Banking •••• ${last4}${ifsc}`;
    }
    const last4 = order.paymentDetails?.cardLast4 || '••••';
    const brand = order.paymentDetails?.cardType || 'Card';
    return `${brand} •••• ${last4}`;
  }, [order]);

  const subtotal = order?.subtotal || 0;
  const shipping = order?.shipping || 0;
  const tax = order?.tax || 0;
  const total = order?.total || 0;

  const isDelivered = order?.status?.toLowerCase() === 'delivered';

  const handleOpenReview = (item) => {
    setSelectedProduct(item);
    setReviewForm({ rating: 0, comment: '' });
    setReviewError(null);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.rating) {
      setReviewError('Please select a rating');
      return;
    }

    try {
      setSubmittingReview(true);
      setReviewError(null);
      await addReview({
        productId: selectedProduct.productId._id || selectedProduct.productId,
        orderId: order.orderId,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      
      // Refresh order to update reviewed status
      const updatedOrder = await getOrderById(orderId);
      setOrder(updatedOrder);
      
      setShowReviewModal(false);
      setSelectedProduct(null);
      setReviewForm({ rating: 0, comment: '' });
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <ErrorMessage message="Order not found" />;

  return (
    <main className="flex flex-col min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-slate-500">Order ID</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{order.orderId}</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Status</p>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <span className="material-symbols-outlined text-sm"><MdLocalShipping /></span>
              {order.status || 'Processing'}
            </span>
          </div>
        </div>

        <div className="mb-10 sm:mb-16">
          <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded transition-all duration-500"
              style={{ width: `${(stepIndex / 3) * 100}%` }}
            ></div>
            {[
              { label: 'Placed', icon: <FaRegCheckCircle /> },
              { label: 'Processing', icon: <MdOutlineSchedule /> },
              { label: 'Shipped', icon: <MdLocalShipping /> },
              { label: 'Delivered', icon: <IoMdDoneAll /> },
            ].map((step, idx) => {
              const isDone = idx <= stepIndex;
              return (
                <div key={step.label} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ring-4 ring-white dark:ring-slate-900 shadow-sm transition-colors ${
                      isDone ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      isDone ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500"><IoPinSharp /></span>
                  Shipping Address
                </h2>
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-1">
                <p className="font-semibold text-base">
                  {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                </p>
                <p>{order.shippingAddress?.address}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                </p>
                <p className="text-slate-500">{order.shippingAddress?.phone}</p>
                <p className="text-slate-500">{order.shippingAddress?.email}</p>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span className="bg-primary/10 text-primary p-1.5 rounded-md material-symbols-outlined"><FaCreditCard /></span>
                  Payment Method Used
                </h2>
              </div>
              <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                <span className="material-symbols-outlined text-3xl text-primary">
                  {order.paymentMethod === 'cod' ? <FaWallet /> : order.paymentMethod === 'netbanking' ? <MdAccountBox /> : <FaCreditCard />}
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold">{paymentLabel}</span>
                  <span className="text-xs text-slate-500">Paid via {order.paymentMethod?.toUpperCase?.() || 'N/A'}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Order Summary</h3>
                <span className="text-sm text-slate-500">{order.items?.length || 0} Items</span>
              </div>
              <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar">
                {(order.items || []).map((item) => (
                  <div key={item.productId?._id || item.productId} className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100">
                        {item.productId?.images?.[0]?.url ? (
                          <img src={item.productId.images[0].url} alt={item.productName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined">shopping_bag</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-sm font-semibold text-slate-900 dark:text-white">
                          <h4 className="line-clamp-1">{item.productName}</h4>
                          <p>${item.totalPrice?.toFixed ? item.totalPrice.toFixed(2) : item.totalPrice}</p>
                        </div>
                        <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                    {isDelivered && !item.reviewed && (
                      <button
                        onClick={() => handleOpenReview(item)}
                        className="w-full py-2 px-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <FaStar className="text-sm" />
                        Rate this product
                      </button>
                    )}
                    {isDelivered && item.reviewed && (
                      <div className="w-full py-2 px-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Review submitted
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 p-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900 dark:text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center text-base font-bold">
                  <span className="text-slate-900 dark:text-white">Order Total</span>
                  <span className="text-primary text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedProduct && (
        <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Rate Your Purchase
            </h2>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100">
                {selectedProduct.productId?.images?.[0]?.url ? (
                  <img src={selectedProduct.productId.images[0].url} alt={selectedProduct.productName} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{selectedProduct.productName}</h3>
                <p className="text-sm text-slate-500">Order #{order.orderId}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Your Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className="transition-all hover:scale-110"
                  >
                    <FaStar
                      className={`text-3xl ${
                        star <= reviewForm.rating
                          ? 'text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {reviewForm.rating > 0 && (
                <p className="text-sm text-slate-500 mt-2">
                  {reviewForm.rating === 1 && 'Poor'}
                  {reviewForm.rating === 2 && 'Fair'}
                  {reviewForm.rating === 3 && 'Good'}
                  {reviewForm.rating === 4 && 'Very Good'}
                  {reviewForm.rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Review (Optional)
              </label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Share your experience with this product..."
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows="4"
              />
            </div>

            {reviewError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {reviewError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
                disabled={submittingReview}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={submittingReview || !reviewForm.rating}
                className="flex-1 px-4 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submittingReview ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">refresh</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaStar />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default TrackShipping;
