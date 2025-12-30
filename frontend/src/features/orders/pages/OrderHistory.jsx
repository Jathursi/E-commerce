import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../services/order.api";
import { addReview } from "../services/review.api";
import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/feedback/ErrorMessage";
import EmptyState from "../../../components/feedback/EmptyState";
import Modal from "../../../components/ui/Modal";
import { FaStar, FaRegClock } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { MdLocalShipping, MdOutlineCancel } from "react-icons/md";

const statusStyles = {
  delivered: "bg-green-50 text-green-600 border-green-100",
  processing: "bg-blue-50 text-blue-600 border-blue-100",
  shipped: "bg-indigo-50 text-indigo-600 border-indigo-100",
  pending: "bg-amber-50 text-amber-600 border-amber-100",
  cancelled: "bg-red-50 text-red-600 border-red-100",
};

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusStyle = (status) => {
  const key = status?.toLowerCase() || "processing";
  return statusStyles[key] || statusStyles.processing;
};

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [reviewImages, setReviewImages] = useState([]);
  const [reviewError, setReviewError] = useState(null);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders();
      setOrders(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const activeOrders = useMemo(
    () => orders.filter((order) => !["delivered", "cancelled"].includes(order.status?.toLowerCase?.() || "")),
    [orders]
  );

  const completedOrders = useMemo(
    () => orders.filter((order) => order.status?.toLowerCase?.() === "delivered"),
    [orders]
  );

  const cancelledOrders = useMemo(
    () => orders.filter((order) => order.status?.toLowerCase?.() === "cancelled"),
    [orders]
  );

  const handleOpenReview = (order, item) => {
    setSelectedOrder(order);
    setSelectedItem(item);
    setReviewForm({ rating: 0, comment: "" });
    setReviewImages([]);
    setReviewError(null);
    setShowReviewModal(true);
  };

  const handleReviewImages = (event) => {
    const files = Array.from(event.target.files || []).slice(0, 3);
    setReviewImages(files);
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.rating) {
      setReviewError("Please select a rating");
      return;
    }

    try {
      setSubmittingReview(true);
      setReviewError(null);

      if (reviewImages.length > 0) {
        // Use FormData when uploading images
        const formData = new FormData();
        formData.append("productId", selectedItem.productId?._id || selectedItem.productId);
        formData.append("orderId", selectedOrder.orderId);
        formData.append("rating", reviewForm.rating);
        if (reviewForm.comment) formData.append("comment", reviewForm.comment);
        reviewImages.forEach((file) => formData.append("images", file));
        await addReview(formData);
      } else {
        // Use JSON when no images
        await addReview({
          productId: selectedItem.productId?._id || selectedItem.productId,
          orderId: selectedOrder.orderId,
          rating: reviewForm.rating,
          comment: reviewForm.comment || "",
        });
      }

      await loadOrders();
      setShowReviewModal(false);
      setSelectedItem(null);
      setSelectedOrder(null);
      setReviewForm({ rating: 0, comment: "" });
      setReviewImages([]);
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderOrderCard = (order) => {
    const statusClass = getStatusStyle(order.status);
    const firstItemImage = order.items?.[0]?.productId?.images?.[0]?.url;

    return (
      <div
        key={order._id || order.orderId}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">Order ID</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{order.orderId}</h3>
              <p className="text-sm text-slate-500">Placed {formatDate(order.createdAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}
              >
                {order.status?.toLowerCase() === "delivered" && <IoMdDoneAll className="text-base" />}
                {order.status?.toLowerCase() === "processing" && <FaRegClock className="text-base" />}
                {order.status?.toLowerCase() === "shipped" && <MdLocalShipping className="text-base" />}
                {order.status?.toLowerCase() === "pending" && <FaRegClock className="text-base" />}
                {order.status?.toLowerCase() === "cancelled" && <MdOutlineCancel className="text-base" />}
                {order.status || "Processing"}
              </span>
              <div className="text-right">
                <p className="text-xs text-slate-500">Total</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">${order.total?.toFixed?.(2) || order.total}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {order.items?.slice(0, 3).map((item) => (
                <img
                  key={item.productId?._id || item.productId}
                  alt={item.productName}
                  className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover bg-slate-100"
                  src={item.productId?.images?.[0]?.url || firstItemImage || "https://via.placeholder.com/48"}
                />
              ))}
              {(order.items?.length || 0) > 3 && (
                <div className="h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                  +{(order.items?.length || 0) - 3}
                </div>
              )}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                {order.items?.[0]?.productName || "Items"}
              </span>
              {(order.items?.length || 0) > 1 && (
                <span> and {(order.items?.length || 0) - 1} other items</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/user/track-shipping/${order.orderId}`)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold flex items-center gap-2"
            >
              View details
            </button>
            {order.status?.toLowerCase() === "delivered" && (
              <button
                onClick={() => navigate(`/user/order-success/${order.orderId}`)}
                className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-blue-600 text-sm font-semibold"
              >
                Order summary
              </button>
            )}
          </div>
        </div>

        {order.status?.toLowerCase() === "delivered" && (
          <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-6 py-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500">Completed items</p>
            <div className="grid gap-3 md:grid-cols-2">
              {(order.items || []).map((item) => (
                <div
                  key={item.productId?._id || item.productId}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                >
                  <div className="h-12 w-12 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100">
                    {item.productId?.images?.[0]?.url ? (
                      <img
                        src={item.productId.images[0].url}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined">shopping_bag</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.productName}</p>
                    <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                  </div>
                  {item.reviewed ? (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 font-semibold">
                      Reviewed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenReview(order, item)}
                      className="text-xs px-3 py-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 font-semibold flex items-center gap-2"
                    >
                      <FaStar className="text-base" />
                      Rate product
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Stay on top of your deliveries and reviews</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order History</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-semibold">
            {orders.length} total orders
          </span>
        </div>
      </header>

      <section className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Current</h2>
            <p className="text-sm text-slate-500">Pending, processing, and shipped orders</p>
          </div>
          {activeOrders.length === 0 ? (
            <EmptyState message="No current orders" icon="🚚" />
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => renderOrderCard(order))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Completed</h2>
            <p className="text-sm text-slate-500">Delivered orders ready for feedback</p>
          </div>
          {completedOrders.length === 0 ? (
            <EmptyState message="No delivered orders yet" icon="📦" />
          ) : (
            <div className="space-y-4">
              {completedOrders.map((order) => renderOrderCard(order))}
            </div>
          )}
        </div>

        {cancelledOrders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cancelled</h2>
              <p className="text-sm text-slate-500">Orders that will not ship</p>
            </div>
            <div className="space-y-4">
              {cancelledOrders.map((order) => renderOrderCard(order))}
            </div>
          </div>
        )}
      </section>

      {showReviewModal && selectedItem && selectedOrder && (
        <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Share your feedback</h2>
            <p className="text-sm text-slate-500 mb-6">Your review helps other shoppers and keeps sellers accountable.</p>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 mb-6">
              <div className="h-16 w-16 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100">
                {selectedItem.productId?.images?.[0]?.url ? (
                  <img
                    src={selectedItem.productId.images[0].url}
                    alt={selectedItem.productName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-500">Order {selectedOrder.orderId}</p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedItem.productName}</h3>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <FaStar
                      className={`text-3xl ${
                        star <= reviewForm.rating ? "text-amber-400" : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Description (optional)
              </label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="What did you like or dislike?"
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={4}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Photos (optional, up to 3)
              </label>
              <div className="flex flex-wrap gap-3 mb-3">
                {reviewImages.map((file, idx) => (
                  <div key={`${file.name}-${idx}`} className="relative h-16 w-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={URL.createObjectURL(file)} alt="Review" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs"
                      onClick={() => setReviewImages(reviewImages.filter((_, i) => i !== idx))}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleReviewImages}
                />
                <span className="material-symbols-outlined text-base">cloud_upload</span>
                Upload photos
              </label>
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
                {submittingReview ? "Submitting..." : "Submit review"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default OrderHistory;
