const cartService = require("../services/cartService");

// Add item to cart
const addToCart = async (req, res, next) => {
	try {
    const { productId, quantity } = req.body;
    const userId = req.user?._id;
    const userName = req.user?.name || req.user?.email;

    if (!userId || !userName) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const item = await cartService.addItem({ productId, quantity, userId, userName });
    return res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// Get cart items for user
const getCart = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });
    const items = await cartService.getUserCart(userId);
    return res.json(items);
  } catch (err) {
    next(err);
  }
};

// Update cart item quantity
const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ message: "Not authorized" });
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const updatedItem = await cartService.updateQuantity(id, userId, quantity);
    return res.json(updatedItem);
  } catch (err) {
    next(err);
  }
};

// Remove item from cart
const removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ message: "Not authorized" });

    await cartService.removeItem(id, userId);
    return res.json({ message: "Item removed from cart" });
  } catch (err) {
    next(err);
  }
};

module.exports = { addToCart, getCart, updateCartItem, removeCartItem };
