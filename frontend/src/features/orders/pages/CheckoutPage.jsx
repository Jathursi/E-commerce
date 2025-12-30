import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCart } from '../../cart/services/cart.api';
import { createOrder, getUserAddresses, addAddress, deleteAddress, getPaymentMethods, deletePaymentMethod } from '../services/order.api';
import Loader from '../../../components/ui/Loader';
import ErrorMessage from '../../../components/feedback/ErrorMessage';
import { FaCreditCard } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { MdInventory } from "react-icons/md";
function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Address state
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [saveCard, setSaveCard] = useState(false);
  const [saveNetBanking, setSaveNetBanking] = useState(false);
  const [savedPayments, setSavedPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [useNewPayment, setUseNewPayment] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const addresses = await getUserAddresses();
        const paymentMethods = await getPaymentMethods();

        let items;
        if (buyNowItem) {
          const qty = buyNowItem.quantity || 1;
          const price = Number(buyNowItem.price) || 0;
          items = [
            {
              _id: buyNowItem.productId,
              productId: {
                _id: buyNowItem.productId,
                images: buyNowItem.image ? [{ url: buyNowItem.image }] : [],
                features: buyNowItem.features || [],
              },
              productName: buyNowItem.productName,
              quantity: qty,
              totalPrice: price * qty,
            },
          ];
        } else {
          items = await getCart();
        }

        if ((!items || items.length === 0) && !buyNowItem) {
          navigate('/user/cart');
          return;
        }

        setCartItems(items);
        setSavedAddresses(addresses);
        setSavedPayments(paymentMethods);
        
        // Set default address if exists
        const defaultAddr = addresses.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setShippingForm({
            firstName: defaultAddr.firstName,
            lastName: defaultAddr.lastName,
            email: defaultAddr.email,
            phone: defaultAddr.phone,
            address: defaultAddr.address,
            city: defaultAddr.city,
            state: defaultAddr.state,
            zipCode: defaultAddr.zipCode,
          });
        } else if (addresses.length === 0) {
          setShowAddressForm(true);
        }

        if (paymentMethods.length > 0) {
          setSelectedPaymentId(paymentMethods[0]._id);
          setPaymentMethod(paymentMethods[0].type);
          setUseNewPayment(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address._id);
    setShippingForm({
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    setShowAddressForm(false);
  };

  const handleRemoveAddress = async (addressId) => {
    try {
      const updated = await deleteAddress(addressId);
      setSavedAddresses(updated);
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        setShowAddressForm(updated.length === 0);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove address');
    }
  };

  const handleSaveNewAddress = async () => {
    try {
      const newAddress = await addAddress({ ...shippingForm, isDefault: savedAddresses.length === 0 });
      setSavedAddresses([...savedAddresses, newAddress]);
      setSelectedAddressId(newAddress._id);
      setShowAddressForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save address');
    }
  };

  const handleCompleteOrder = async () => {
    const requiredFields = [
      shippingForm.firstName,
      shippingForm.lastName,
      shippingForm.email,
      shippingForm.phone,
      shippingForm.address,
      shippingForm.city,
      shippingForm.state,
      shippingForm.zipCode,
    ];

    if (requiredFields.some((v) => !v || `${v}`.trim() === '')) {
      setError('Please fill in all required shipping fields');
      return;
    }

    const usingSavedPayment = selectedPaymentId && !useNewPayment;

    if (paymentMethod === 'card' && !usingSavedPayment && !paymentForm.cardNumber) {
      setError('Please fill in card details');
      return;
    }

    if (paymentMethod === 'netbanking' && !usingSavedPayment && (!paymentForm.accountNumber || !paymentForm.ifscCode)) {
      setError('Please fill in net banking details');
      return;
    }

    try {
      setSubmitting(true);
      
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId._id,
          productName: item.productName,
          quantity: item.quantity,
          price: item.totalPrice / item.quantity,
          totalPrice: item.totalPrice,
        })),
        shippingAddress: shippingForm,
        paymentMethod,
        paymentDetails: paymentMethod === 'card'
          ? usingSavedPayment
            ? savedPayments.find((pm) => pm._id === selectedPaymentId) || {}
            : {
                cardLast4: paymentForm.cardNumber.slice(-4),
                cardType: 'Card',
              }
          : paymentMethod === 'netbanking'
          ? usingSavedPayment
            ? savedPayments.find((pm) => pm._id === selectedPaymentId) || {}
            : {
                accountLast4: paymentForm.accountNumber.slice(-4),
                ifscCode: paymentForm.ifscCode,
              }
          : {},
        savePaymentMethod:
          usingSavedPayment
            ? false
            : paymentMethod === 'card'
            ? saveCard
            : paymentMethod === 'netbanking'
            ? saveNetBanking
            : false,
        subtotal,
        shipping,
        tax,
        total,
      };

      const order = await createOrder(orderData);
      navigate(`/user/order-success/${order.orderId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="flex flex-col min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex text-sm text-slate-500 dark:text-slate-400 mb-2"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    className="inline-flex items-center hover:text-primary transition-colors"
                    href="/user/main"
                  >
                    <span className="material-symbols-outlined text-[18px] mr-1">
                      <IoMdHome />
                    </span>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">
                      <IoIosArrowForward />
                    </span>
                    <a
                      className="ml-1 md:ml-2 hover:text-primary transition-colors"
                      href="/user/cart"
                    >
                      Cart
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">
                      <IoIosArrowForward />
                    </span>
                    <span className="ml-1 md:ml-2 text-slate-900 dark:text-white font-medium">
                      Checkout
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Checkout
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Review your order and complete your purchase
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/user/cart')}
              className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px] mr-2">
                <IoIosArrowBack />
              </span>
              Back to Cart
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Order Items ({cartItems.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      {item.productId?.images?.[0]?.url ? (
                        <img
                          alt={item.productName}
                          className="w-full h-full object-cover"
                          src={item.productId.images[0].url}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined text-4xl">shopping_bag</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start justify-between sm:justify-start gap-4">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                            {item.productName}
                          </h3>
                          <span className="sm:hidden font-bold text-slate-900 dark:text-white">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                        {item.productId?.features && item.productId.features.length > 0 && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {item.productId.features.slice(0, 2).map(f => `${f.name}: ${f.value}`).join(' · ')}
                          </p>
                        )}
                        {item.productId?.category && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            Category: {item.productId.category}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                          <span className="inline-flex items-center">
                            <span className="material-symbols-outlined text-[16px] mr-1">
                              <MdInventory />
                            </span>
                            In Stock
                          </span>
                          {item.quantity > 1 && (
                            <span>
                              ${(item.totalPrice / item.quantity).toFixed(2)} each
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col items-end gap-1 text-right mt-2 sm:mt-0">
                        <span className="font-bold text-slate-900 dark:text-white text-lg">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Qty: {item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-slate-400">
                            ${(item.totalPrice / item.quantity).toFixed(2)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Shipping Information
                </h2>
                {savedAddresses.length > 0 && !showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm text-primary hover:text-blue-700 font-medium"
                  >
                    + Add New Address
                  </button>
                )}
              </div>

              {savedAddresses.length > 0 && !showAddressForm ? (
                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => handleAddressSelect(addr)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedAddressId === addr._id
                          ? 'border-primary bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          checked={selectedAddressId === addr._id}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {addr.firstName} {addr.lastName}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {addr.address}, {addr.city}, {addr.state} {addr.zipCode}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                            {addr.phone} • {addr.email}
                          </p>
                          {addr.isDefault && (
                            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <button
                          className="text-xs text-red-500 hover:text-red-600 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveAddress(addr._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors"
                  >
                    + Add New Address
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({...shippingForm, firstName: e.target.value})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({...shippingForm, lastName: e.target.value})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                      placeholder="1234 Main St, Apt 5B"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({...shippingForm, state: e.target.value})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({...shippingForm, zipCode: e.target.value})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                        placeholder="10016"
                      />
                    </div>
                  </div>
                  {savedAddresses.length > 0 && (
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSaveNewAddress}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-fit">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Payment Method
                </h2>
                {savedPayments.length > 0 && (
                  <button
                    className="text-sm text-primary hover:text-blue-700 font-medium"
                    onClick={() => {
                      setUseNewPayment(true);
                      setSelectedPaymentId(null);
                      setPaymentMethod('card');
                    }}
                  >
                    + Add New
                  </button>
                )}
              </div>

              <div className="p-6 space-y-6">
                {savedPayments.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Saved Methods</h4>
                    <div className="space-y-3">
                      {savedPayments.map((pm) => (
                        <div
                          key={pm._id}
                          className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                            selectedPaymentId === pm._id && !useNewPayment
                              ? 'border-primary bg-primary/5 dark:bg-primary/10'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <label className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => {
                            setSelectedPaymentId(pm._id);
                            setUseNewPayment(false);
                            setPaymentMethod(pm.type);
                          }}>
                            <input
                              type="radio"
                              name="savedPayment"
                              className="w-4 h-4 text-primary focus:ring-primary"
                              checked={selectedPaymentId === pm._id && !useNewPayment}
                              onChange={() => {
                                setSelectedPaymentId(pm._id);
                                setUseNewPayment(false);
                                setPaymentMethod(pm.type);
                              }}
                            />
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-2xl text-slate-600 dark:text-slate-300">
                                {pm.type === 'card' ? <FaCreditCard /> : <MdAccountBox /> }
                              </span>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                  {pm.type === 'card'
                                    ? `${pm.brand || 'Card'} •••• ${pm.last4 || pm.cardLast4 || ''}`
                                    : `Acct •••• ${pm.accountLast4 || ''}`}
                                </span>
                                {pm.type === 'netbanking' && pm.ifsc && (
                                  <span className="text-xs text-slate-500">IFSC: {pm.ifsc}</span>
                                )}
                              </div>
                            </div>
                          </label>
                          <button
                            className="text-xs text-red-500 hover:text-red-600 font-semibold"
                            onClick={async () => {
                              try {
                                const updated = await deletePaymentMethod(pm._id);
                                setSavedPayments(updated);
                                if (selectedPaymentId === pm._id) {
                                  setSelectedPaymentId(null);
                                  setUseNewPayment(true);
                                  setPaymentMethod('card');
                                }
                              } catch (err) {
                                setError(err.response?.data?.message || 'Failed to remove payment method');
                              }
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="peer sr-only"
                      checked={paymentMethod === 'card' && useNewPayment}
                      onChange={() => {
                        setPaymentMethod('card');
                        setUseNewPayment(true);
                        setSelectedPaymentId(null);
                      }}
                    />
                    <div className="h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                      <span className="material-symbols-outlined text-3xl mb-1 text-slate-600 dark:text-slate-300 peer-checked:text-primary">
                        <FaCreditCard />
                      </span>
                      <span className="font-semibold text-sm peer-checked:text-primary">Credit / Debit Card</span>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="peer sr-only"
                      checked={paymentMethod === 'netbanking' && useNewPayment}
                      onChange={() => {
                        setPaymentMethod('netbanking');
                        setUseNewPayment(true);
                        setSelectedPaymentId(null);
                      }}
                    />
                    <div className="h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                      <span className="material-symbols-outlined text-3xl mb-1 text-slate-600 dark:text-slate-300 peer-checked:text-primary">
                        <MdAccountBox />
                      </span>
                      <span className="font-semibold text-sm peer-checked:text-primary">Net Banking</span>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="peer sr-only"
                      checked={paymentMethod === 'cod'}
                      onChange={() => {
                        setPaymentMethod('cod');
                        setUseNewPayment(true);
                        setSelectedPaymentId(null);
                      }}
                    />
                    <div className="h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                      <span className="material-symbols-outlined text-3xl mb-1 text-slate-600 dark:text-slate-300 peer-checked:text-primary">
                        <FaMoneyCheck />
                      </span>
                      <span className="font-semibold text-sm peer-checked:text-primary">Cash on Delivery</span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && useNewPayment && (
                  <div className="space-y-4 animate-fade-in-up">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                          className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary pl-12 pr-20 py-3"
                          maxLength="19"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <span className="material-symbols-outlined"><FaCreditCard /></span>
                        </div>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none gap-2">
                          <img
                            alt="Visa"
                            className="h-4 opacity-70"
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                          />
                          <img
                            alt="Mastercard"
                            className="h-5 opacity-70"
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={paymentForm.cardName}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                        className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary px-4 py-3"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentForm.expiryDate}
                          onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                          className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary px-4 py-3 text-center"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CVV</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary pl-10 pr-4 py-3"
                            maxLength="4"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined text-lg"><FaLock /></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                      />
                      Save card for future purchases
                    </label>
                  </div>
                )}

                {paymentMethod === 'netbanking' && useNewPayment && (
                  <div className="space-y-4 animate-fade-in-up">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Account Number</label>
                      <input
                        type="text"
                        placeholder="1234567890"
                        value={paymentForm.accountNumber}
                        onChange={(e) => setPaymentForm({ ...paymentForm, accountNumber: e.target.value })}
                        className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">IFSC Code</label>
                      <input
                        type="text"
                        placeholder="ABCD0123456"
                        value={paymentForm.ifscCode}
                        onChange={(e) => setPaymentForm({ ...paymentForm, ifscCode: e.target.value })}
                        className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary px-4 py-3"
                      />
                    </div>
                    <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={saveNetBanking}
                        onChange={(e) => setSaveNetBanking(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                      />
                      Save this account for future payments
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white text-lg">
                    Total
                  </span>
                  <span className="font-bold text-primary text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button 
                  onClick={handleCompleteOrder}
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-[20px]">
                        progress_activity
                      </span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">
                        <FaLock />
                      </span>
                      Complete Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage
