const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");

const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

const createOrder = async ({
  userId,
  userName,
  items,
  shippingAddress,
  paymentMethod,
  paymentDetails,
  subtotal,
  shipping,
  tax,
  total,
  savePaymentMethod,
}) => {
  const orderId = generateOrderId();
  
  // Calculate estimated delivery (3-5 business days)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  // Ensure user exists and store address under user profile
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  // Validate stock availability and reduce stock for each item
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      const err = new Error(`Product not found: ${item.productName}`);
      err.statusCode = 404;
      throw err;
    }
    
    if (product.stock < item.quantity) {
      const err = new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
      err.statusCode = 400;
      throw err;
    }
    
    // Reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  const hasAddress = user.addresses?.some((addr) =>
    addr.address === shippingAddress.address &&
    addr.city === shippingAddress.city &&
    addr.state === shippingAddress.state &&
    addr.zipCode === shippingAddress.zipCode &&
    addr.phone === shippingAddress.phone
  );

  if (!hasAddress) {
    if (!user.addresses || user.addresses.length === 0) {
      shippingAddress.isDefault = true;
    }
    user.addresses.push(shippingAddress);
    await user.save();
  }

  // Save payment reference if requested (cards/netbanking are stored masked)
  savePaymentIfRequested(user, paymentMethod, paymentDetails, savePaymentMethod);
  await user.save();

  const order = await Order.create({
    orderId,
    userId,
    userName,
    items,
    shippingAddress,
    paymentMethod,
    paymentDetails,
    subtotal,
    shipping,
    tax,
    total,
    estimatedDelivery,
  });

  // Clear user's cart after successful order
  await Cart.deleteMany({ userId });

  return order;
};

// Store payment method references when requested
const savePaymentIfRequested = (user, paymentMethod, paymentDetails, savePaymentMethod) => {
  if (!savePaymentMethod) return;

  if (!user.paymentMethods) {
    user.paymentMethods = [];
  }

  if (paymentMethod === "card") {
    const last4 = paymentDetails?.cardLast4 || "";
    const brand = paymentDetails?.cardType || "Card";
    const exists = user.paymentMethods.some(
      (m) => m.type === "card" && m.last4 === last4 && (m.brand || "Card") === brand
    );
    if (!exists && last4) {
      user.paymentMethods.push({
        type: "card",
        brand,
        last4,
        displayName: `${brand} •••• ${last4}`,
      });
    }
  }

  if (paymentMethod === "netbanking") {
    const accountLast4 = paymentDetails?.accountLast4 || paymentDetails?.accountNumber?.slice(-4) || "";
    const ifsc = paymentDetails?.ifscCode || "";
    const exists = user.paymentMethods.some(
      (m) => m.type === "netbanking" && m.accountLast4 === accountLast4 && (m.ifsc || "") === ifsc
    );
    if (!exists && accountLast4) {
      user.paymentMethods.push({
        type: "netbanking",
        accountLast4,
        ifsc,
        displayName: `Acct •••• ${accountLast4}`,
      });
    }
  }
};

const getUserOrders = async (userId) => {
  return Order.find({ userId })
    .populate("items.productId", "images name")
    .sort({ createdAt: -1 });
};

const getOrderById = async (orderId, userId) => {
  const conditions = [{ orderId, userId }];
  if (mongoose.Types.ObjectId.isValid(orderId)) {
    conditions.push({ _id: orderId, userId });
  }

  const order = await Order.findOne({ $or: conditions })
    .populate("items.productId", "images name features");
  
  if (!order) {
    const err = new Error("Order not found");
    err.statusCode = 404;
    throw err;
  }
  
  return order;
};

const addAddress = async (userId, addressData) => {
  const user = await User.findById(userId);
  
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  // If this is set as default, unset other defaults
  if (addressData.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  // If this is the first address, make it default
  if (user.addresses.length === 0) {
    addressData.isDefault = true;
  }

  user.addresses.push(addressData);
  await user.save();

  return user.addresses[user.addresses.length - 1];
};

const getUserAddresses = async (userId) => {
  const user = await User.findById(userId).select("addresses");
  
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return user.addresses;
};

const deleteAddress = async (userId, addressId) => {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const initialLength = user.addresses.length;
  user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);

  if (user.addresses.length === initialLength) {
    const err = new Error("Address not found");
    err.statusCode = 404;
    throw err;
  }

  await user.save();
  return user.addresses;
};

const getPaymentMethods = async (userId) => {
  const user = await User.findById(userId).select("paymentMethods");

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return user.paymentMethods || [];
};

const deletePaymentMethod = async (userId, paymentId) => {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const initialLength = (user.paymentMethods || []).length;
  user.paymentMethods = (user.paymentMethods || []).filter((pm) => pm._id.toString() !== paymentId);

  if (user.paymentMethods.length === initialLength) {
    const err = new Error("Payment method not found");
    err.statusCode = 404;
    throw err;
  }

  await user.save();
  return user.paymentMethods;
};

module.exports = { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  addAddress,
  getUserAddresses,
  deleteAddress,
  getPaymentMethods,
  deletePaymentMethod,
};
