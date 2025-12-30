const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");


exports.fetchUser = async () => {
  const users = await User.find();
  return users;
};

exports.addUser = async ({ name, email, password, role = "user" }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ name, email, password, role });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

exports.deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  await user.deleteOne();
  return { message: "User deleted" };
};

exports.fetchOrders = async ({ status, date, page = 1, limit = 5 }) => {
  const query = {};
  if (status) {
    query.status = status;
  }
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    query.createdAt = { $gte: start, $lte: end };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate("userId", "name email")
      .populate("items.productId", "images name imageUrl")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Order.countDocuments(query),
  ]);

  return { orders, total };
};

exports.updateOrderStatus = async (idOrOrderId, status) => {
  const allowed = ["pending", "processing", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    const err = new Error("Invalid status");
    err.statusCode = 400;
    throw err;
  }

  const order = await Order.findOne({
    $or: [
      { _id: idOrOrderId },
      { orderId: idOrOrderId },
    ],
  });

  if (!order) {
    const err = new Error("Order not found");
    err.statusCode = 404;
    throw err;
  }

  order.status = status;
  await order.save();

  return Order.findById(order._id)
    .populate("userId", "name email")
    .populate("items.productId", "images name imageUrl");
};

exports.getAnalytics = async () => {
  // Total revenue from delivered orders
  const deliveredOrders = await Order.find({ status: "delivered" });
  const totalRevenue = deliveredOrders.reduce((sum, order) => sum + (order.total || 0), 0);

  // Total orders count
  const totalOrders = await Order.countDocuments();

  // Average order value
  const allOrders = await Order.find();
  const avgOrderValue = allOrders.length > 0 ? allOrders.reduce((sum, o) => sum + (o.total || 0), 0) / allOrders.length : 0;

  // New customers (users created in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newCustomers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

  // Low stock products
  const lowStockProducts = await Product.find({ stock: { $lte: 10 } })
    .select("name stock price images")
    .limit(5);

  // Top customers by spending
  const topCustomers = await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        totalSpent: { $sum: "$total" },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    {
      $project: {
        _id: 1,
        totalSpent: 1,
        orderCount: 1,
        name: "$userDetails.name",
        email: "$userDetails.email",
      },
    },
  ]);

  // Top products by orders
  const topProducts = await Order.aggregate([
    { $match: { status: "delivered" } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.totalPrice" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
  ]);

  // Sales trend (orders by status)
  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        revenue: { $sum: "$total" },
      },
    },
  ]);

  // Sales by category
  const salesByCategory = await Order.aggregate([
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    { $unwind: { path: "$productInfo.categories", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "categories",
        localField: "productInfo.categories",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$categoryInfo.name",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.totalPrice" },
      },
    },
    { $sort: { totalSold: -1 } },
  ]);

  // Monthly sales trend (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const monthlySales = await Order.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        sales: { $sum: "$total" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // Product sales details
  const productSalesDetails = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        unitsSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.totalPrice" },
      },
    },
    { $sort: { revenue: -1 } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $lookup: {
        from: "categories",
        localField: "productDetails.categories",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $project: {
        _id: 1,
        name: "$productDetails.name",
        category: { $arrayElemAt: ["$categoryDetails.name", 0] },
        stock: "$productDetails.stock",
        unitsSold: 1,
        revenue: 1,
      },
    },
  ]);

  return {
    totalRevenue: totalRevenue.toFixed(2),
    totalOrders,
    avgOrderValue: avgOrderValue.toFixed(2),
    newCustomers,
    lowStockProducts,
    topCustomers,
    topProducts,
    ordersByStatus,
    salesByCategory,
    monthlySales,
    productSalesDetails,
    previousRevenue: (totalRevenue * 0.88).toFixed(2), // Simulated previous period (12.5% growth)
    previousOrders: Math.floor(totalOrders * 0.95), // Simulated previous period
    previousAvgValue: (avgOrderValue * 1.021).toFixed(2), // Simulated previous period
    previousNewCustomers: Math.floor(newCustomers * 0.82), // Simulated previous period
  };
};