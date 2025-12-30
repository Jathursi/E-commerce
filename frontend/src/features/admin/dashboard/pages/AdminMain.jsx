import React, { useState, useEffect } from 'react'
import http from '../../../../services/http.service'

function AdminMain() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    newCustomers: 0,
    salesByCategory: [],
    previousRevenue: 0,
    previousOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const [analyticsData, ordersData, usersData] = await Promise.all([
          http.get('/admin/analytics'),
          http.get('/admin/orders?limit=4'),
          http.get('/admin/user-details'),
        ])
        
        console.log('Orders Data:', ordersData) // Debug log
        console.log('Orders Data Keys:', Object.keys(ordersData || {})) // Debug log
        console.log('Orders Array:', ordersData?.orders) // Debug log
        
        setAnalytics(analyticsData || {})
        // Handle different response structures - check all possible keys
        const orders = ordersData?.data?.orders || ordersData?.data || ordersData?.orders || (Array.isArray(ordersData) ? ordersData : [])
        console.log('Setting orders:', orders) // Debug log
        setRecentOrders(orders)
        setTotalUsers(usersData?.length || 0)
      } catch (err) {
        console.error('Dashboard error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-slate-500">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  const revenueChange = analytics.previousRevenue > 0 
    ? (((parseFloat(analytics.totalRevenue) - parseFloat(analytics.previousRevenue)) / parseFloat(analytics.previousRevenue)) * 100).toFixed(1)
    : 0

  const ordersChange = analytics.previousOrders > 0
    ? (((analytics.totalOrders - analytics.previousOrders) / analytics.previousOrders) * 100).toFixed(1)
    : 0

  return (
      
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    attach_money
                  </span>
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${revenueChange >= 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'} px-2 py-1 rounded-full`}>
                  <span className="material-symbols-outlined text-base">
                    {revenueChange >= 0 ? 'trending_up' : 'trending_down'}
                  </span>{" "}
                  {revenueChange >= 0 ? '+' : ''}{revenueChange}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  ${parseFloat(analytics.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${ordersChange >= 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'} px-2 py-1 rounded-full`}>
                  <span className="material-symbols-outlined text-base">
                    {ordersChange >= 0 ? 'trending_up' : 'trending_down'}
                  </span>{" "}
                  {ordersChange >= 0 ? '+' : ''}{ordersChange}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {analytics.totalOrders?.toLocaleString() || 0}
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-base">
                    trending_up
                  </span>{" "}
                  +{((analytics.newCustomers / (totalUsers || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {totalUsers?.toLocaleString() || 0}
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">sell</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-base">
                    trending_up
                  </span>{" "}
                  +{analytics.previousAvgValue > 0 ? (((parseFloat(analytics.avgOrderValue) - parseFloat(analytics.previousAvgValue)) / parseFloat(analytics.previousAvgValue)) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Avg Order Value
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  ${parseFloat(analytics.avgOrderValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Revenue Trends
                </h3>
                <select className="bg-slate-50 dark:bg-slate-700 border-none text-sm rounded-lg py-1 px-3 text-slate-600 dark:text-slate-300 focus:ring-1 focus:ring-primary">
                  <option>Last 7 Days</option>
                  <option>Last Month</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="relative h-64 w-full mt-auto">
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400">
                  <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full h-0"></div>
                  <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full h-0"></div>
                  <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full h-0"></div>
                  <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full h-0"></div>
                  <div className="border-b border-slate-200 dark:border-slate-700 w-full h-0"></div>
                </div>
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      x2="0%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity="0.2"
                      ></stop>
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,200 L50,150 L100,180 L150,100 L200,120 L250,60 L300,90 L350,40 L400,70 L450,20 L500,50 L550,10 L600,60 L650,40 L700,80 L750,50 L800,90 L850,60 L900,100 L950,50 L1000,80 L1050,40 L1100,60 L1200,10"
                    fill="url(#gradient)"
                    stroke="#3b82f6"
                    strokeLinecap="round"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  ></path>
                </svg>
                <div className="absolute top-[20%] left-[40%] bg-slate-900 text-white text-xs px-2 py-1 rounded transform -translate-x-1/2 -translate-y-full opacity-0 hover:opacity-100 transition-opacity">
                  $3,450
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Orders by Category
              </h3>
              <div className="flex-1 flex items-end justify-between gap-2 h-64">
                {analytics.salesByCategory && analytics.salesByCategory.length > 0 ? (
                  analytics.salesByCategory.slice(0, 5).map((category, index) => {
                    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-emerald-500', 'bg-pink-500'];
                    const maxSales = Math.max(...analytics.salesByCategory.map(c => c.totalSold || 0), 1);
                    const heightPercentage = ((category.totalSold || 0) / maxSales) * 100;
                    const categoryName = (category._id || 'Unknown').substring(0, 4);

                    return (
                      <div key={category._id || index} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="relative w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg h-40 overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                          <div 
                            className={`absolute bottom-0 w-full ${colors[index % colors.length]} rounded-t-lg`}
                            style={{ height: `${heightPercentage}%` }}
                            title={`${category._id}: ${category.totalSold} units`}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {categoryName}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full flex items-center justify-center h-40">
                    <p className="text-slate-500">No category data</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Orders (Debug: {recentOrders.length} orders loaded)
              </h3>
              <a
                className="text-sm font-medium text-primary hover:text-blue-700"
                href="#"
              >
                View All
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {recentOrders && recentOrders.length > 0 ? (
                    recentOrders.map((order) => {
                      const statusColors = {
                        delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                        processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                        shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
                        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                        cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                      };

                      const firstProduct = order.items && order.items[0] ? order.items[0].productId : null;
                      const productName = firstProduct?.name || 'Unknown Product';
                      const productImage = firstProduct?.images?.[0]?.url || firstProduct?.imageUrl;

                      return (
                        <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                            #{order.orderId || order._id?.substring(0, 8)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                                {order.userId?.name?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <span>{order.userId?.name || 'Unknown User'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">{productName}{order.items?.length > 1 ? ` +${order.items.length - 1} more` : ''}</td>
                          <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td className="px-6 py-4 font-medium">${parseFloat(order.total || 0).toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[18px]">
                                more_vert
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                        No recent orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
              <p>Showing {recentOrders.length > 0 ? '1' : '0'}-{recentOrders.length} of {analytics.totalOrders || 0} orders</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                  disabled
                >
                  Prev
                </button>
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700">
                  Next
                </button>
              </div>
            </div>
          </div>
          <footer className="mt-8 text-center text-xs text-slate-400 pb-4">
            © 2024 E-commerce Admin System. All rights reserved.
          </footer>
        </div>
      // </main>
    
  );
}

export default AdminMain
