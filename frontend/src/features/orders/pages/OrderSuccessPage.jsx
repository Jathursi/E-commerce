import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/order.api';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import { FaRegCheckCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
function OrderSuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <ErrorMessage message="Order not found" />;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <main className="flex-grow w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-6 shadow-sm ring-8 ring-green-50 dark:ring-green-900/10">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[48px]">
              <FaRegCheckCircle />
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Thank you for your order!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-1">
            Order{" "}
            <span className="font-mono font-semibold text-slate-900 dark:text-white">
              #{order.orderId}
            </span>{" "}
            has been successfully placed.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We've sent an email to{" "}
            <span className="font-medium text-slate-900 dark:text-slate-300">
              {order.shippingAddress.email}
            </span>{" "}
            with your order confirmation and receipt.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">
                  <MdLocalShipping />
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Estimated Delivery
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatDate(order.estimatedDelivery)}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-700">
            <div className="lg:col-span-2 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">
                  <GiShoppingBag />
                </span>
                Order Items ({order.items.length})
              </h3>
              <ul className="flex flex-col gap-6">
                {order.items.map((item, index) => (
                  <li key={index} className={`flex gap-4 sm:gap-6 ${index > 0 ? 'pt-4 border-t border-slate-100 dark:border-slate-700/50' : ''}`}>
                    <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50">
                      {item.productId?.images?.[0]?.url ? (
                        <img
                          alt={item.productName}
                          className="h-full w-full object-cover object-center"
                          src={item.productId.images[0].url}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined text-4xl">shopping_bag</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">
                            {item.productName}
                          </h4>
                          <p className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                        {item.productId?.features && item.productId.features.length > 0 && (
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {item.productId.features.slice(0, 2).map(f => `${f.name}: ${f.value}`).join(' | ')}
                          </p>
                        )}
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 self-start px-2 py-1 rounded mt-2">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-1 bg-slate-50/50 dark:bg-slate-900/30 p-6 md:p-8 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">
                    <CiLocationOn />
                  </span>
                  Shipping Address
                </h3>
                <address className="not-italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7 border-l-2 border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </span>
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  <br />
                  <span className="block mt-2 text-slate-500">
                    {order.shippingAddress.phone}
                  </span>
                </address>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">
                    <CiReceipt />
                  </span>
                  Payment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      ${order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      ${order.shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Tax</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      ${order.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3 flex justify-between text-base font-bold">
                    <span className="text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-primary text-xl">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 mb-2">Payment Method</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                       order.paymentMethod === 'card' ? `Card ending in ${order.paymentDetails?.cardLast4 || '****'}` :
                       'Net Banking'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/user/main')}
            className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-0.5 shadow-sm">
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate(`/user/track-shipping/${orderId}`)}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]"><FaMapLocationDot /></span>
            Track Your Order
          </button>
        </div>
        <p className="text-center text-sm text-slate-400 mt-8">
          Need help?{" "}
          <a className="text-primary hover:underline" href="#">
            Contact Support
          </a>
        </p>
      </div>
    </main>
  );
}

export default OrderSuccessPage
