const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addItem = async ({ userId, userName, productId, quantity = 1 }) => {
  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  const qty = Math.max(1, Number(quantity) || 1);
  const unitPrice = Number(product.price) || 0;

  // Check if product already exists in user's cart
  const existingItem = await Cart.findOne({ userId, productId });

  if (existingItem) {
    // Return existing item without modifying quantity
    return existingItem;
  }

  // Create new cart item
  const totalPrice = unitPrice * qty;
  const cartItem = await Cart.create({
    userId,
    userName,
    productId,
    productName: product.name,
    quantity: qty,
    totalPrice,
  });

  return cartItem;
};

const getUserCart = async (userId) => {
  return Cart.find({ userId })
    .populate('productId', 'images')
    .sort({ createdAt: -1 });
};

const updateQuantity = async (cartId, userId, quantity) => {
  const cartItem = await Cart.findOne({ _id: cartId, userId });
  if (!cartItem) {
    const err = new Error("Cart item not found");
    err.statusCode = 404;
    throw err;
  }

  const product = await Product.findById(cartItem.productId);
  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  const newQty = Math.max(1, Number(quantity) || 1);
  const unitPrice = Number(product.price) || 0;

  cartItem.quantity = newQty;
  cartItem.totalPrice = unitPrice * newQty;
  await cartItem.save();

  return cartItem;
};

const removeItem = async (cartId, userId) => {
  const cartItem = await Cart.findOneAndDelete({ _id: cartId, userId });
  if (!cartItem) {
    const err = new Error("Cart item not found");
    err.statusCode = 404;
    throw err;
  }
  return cartItem;
};

module.exports = { addItem, getUserCart, updateQuantity, removeItem };
