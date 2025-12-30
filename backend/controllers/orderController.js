const orderService = require("../services/orderService");

// Create new order
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentDetails, subtotal, shipping, tax, total, savePaymentMethod } = req.body;
    const userId = req.user?._id;
    const userName = req.user?.name || req.user?.email;

    if (!userId || !userName) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await orderService.createOrder({
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
    });

    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// Get user orders
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const orders = await orderService.getUserOrders(userId);
    return res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Get single order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const order = await orderService.getOrderById(orderId, userId);
    return res.json(order);
  } catch (err) {
    next(err);
  }
};

// Add address to user
const addAddress = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const addressData = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const address = await orderService.addAddress(userId, addressData);
    return res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};

// Get user addresses
const getUserAddresses = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const addresses = await orderService.getUserAddresses(userId);
    return res.json(addresses);
  } catch (err) {
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const addresses = await orderService.deleteAddress(userId, id);
    return res.json(addresses);
  } catch (err) {
    next(err);
  }
};

const getPaymentMethods = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const methods = await orderService.getPaymentMethods(userId);
    return res.json(methods);
  } catch (err) {
    next(err);
  }
};

const deletePaymentMethod = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const methods = await orderService.deletePaymentMethod(userId, id);
    return res.json(methods);
  } catch (err) {
    next(err);
  }
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
