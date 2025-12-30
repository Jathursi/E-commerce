import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartQuantity, deleteCartItem } from '../services/cart.api';
import { getUserOrders } from '../../orders/services/order.api';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState({});

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const [items, ordersData] = await Promise.all([
        getCart(),
        getUserOrders()
      ]);
      setCartItems(items);
      // Filter non-completed orders
      const activeOrders = ordersData.filter(order => {
        const status = order.status?.toLowerCase() || '';
        return !status.includes('deliver') && !status.includes('cancel');
      });
      setOrders(activeOrders);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdatingItems(prev => ({ ...prev, [cartId]: true }));
      await updateCartQuantity(cartId, newQuantity);
      await fetchCartItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quantity');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [cartId]: false }));
    }
  };

  const handleDeleteItem = async (cartId) => {
    try {
      setUpdatingItems(prev => ({ ...prev, [cartId]: true }));
      await deleteCartItem(cartId);
      await fetchCartItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [cartId]: false }));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const tax = subtotal * 0.085;
  const orderTotal = subtotal + shipping + tax;

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="flex flex-col min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            You have {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">Your cart is empty</p>
                <a
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition-colors"
                  href="/user/main"
                >
                  <span className="material-symbols-outlined"><IoIosArrowBack /></span>
                  Continue Shopping
                </a>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item._id} className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 mb-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 transition-all hover:shadow-md">
                    <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                      {item.productId?.images?.[0]?.url ? (
                        <img
                          src={item.productId.images[0].url}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined text-4xl">shopping_bag</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          disabled={updatingItems[item._id]}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 disabled:opacity-50"
                          title="Remove item"
                        >
                          <MdDelete />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                          <button 
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updatingItems[item._id]}
                            className="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <input
                            className="w-10 text-center bg-transparent border-0 p-0 text-sm font-medium focus:ring-0"
                            type="text"
                            value={item.quantity}
                            readOnly
                          />
                          <button 
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            disabled={updatingItems[item._id]}
                            className="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-slate-900 dark:text-white">
                            ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700">
                  <a
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition-colors"
                    href="/"
                  >
                    <span className="material-symbols-outlined"><IoIosArrowBack /></span>
                    Continue Shopping
                  </a>
                </div>
              </>
            )}
            
            {orders.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Active Orders
                  </h2>
                  <span className="text-sm text-slate-500">
                    {orders.length} {orders.length === 1 ? 'order' : 'orders'} in progress
                  </span>
                </div>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Order ID</p>
                          <h3 className="font-mono font-bold text-slate-900 dark:text-white">
                            #{order.orderId}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            <span className="material-symbols-outlined text-sm"><MdOutlineSchedule /></span>
                            {order.status || 'Processing'}
                          </span>
                          <button
                            onClick={() => navigate(`/user/track-shipping/${order._id}`)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[18px]"><FaMapMarkerAlt /></span>
                            Track Order
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 mb-2">Items</p>
                          <div className="flex -space-x-2">
                            {order.items?.slice(0, 4).map((item, idx) => (
                              <div
                                key={idx}
                                className="h-10 w-10 rounded-lg border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 overflow-hidden"
                              >
                                {item.productId?.images?.[0]?.url ? (
                                  <img
                                    src={item.productId.images[0].url}
                                    alt={item.productName}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">shopping_bag</span>
                                  </div>
                                )}
                              </div>
                            ))}
                            {order.items?.length > 4 && (
                              <div className="h-10 w-10 rounded-lg border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                  +{order.items.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-1">Order Total</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            ${order.total?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 lg:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping estimate</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tax estimate</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Gift card or discount code
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                      placeholder="Enter code"
                      type="text"
                    />
                    <button className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mb-8">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    Order Total
                  </span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <button 
                onClick={() => navigate('/user/checkout')}
                disabled={cartItems.length === 0}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined text-[20px]">
                  <IoIosArrowForward />
                </span>
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span className="material-symbols-outlined text-sm">lock</span>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage
