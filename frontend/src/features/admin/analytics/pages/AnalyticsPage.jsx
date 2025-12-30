import React, { useState, useEffect } from 'react'
import http from '../../../../services/http.service'

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    newCustomers: 0,
    topCustomers: [],
    lowStockProducts: [],
    salesByCategory: [],
    monthlySales: [],
    productSalesDetails: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const data = await http.get('/admin/analytics')
        setAnalytics(data || {})
        setError(null)
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Failed to load analytics')
        console.error('Analytics error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-slate-500">Loading analytics...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Reports &amp; Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your store's performance and growth metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20" onClick={() => window.location.reload()}>
            <span className="material-symbols-outlined text-[18px]">
              refresh
            </span>
            Refresh Data
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
              Date Range
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                calendar_today
              </span>
              <select className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>Last Quarter</option>
                <option>Year to Date</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
              Category
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                category
              </span>
              <select className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home &amp; Garden</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
              User Segment
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                group
              </span>
              <select className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                <option>All Users</option>
                <option>New Customers</option>
                <option>Returning Customers</option>
                <option>VIP Members</option>
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            {parseFloat(analytics.totalRevenue || 0) >= parseFloat(analytics.previousRevenue || 0) ? (
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                +{(((parseFloat(analytics.totalRevenue || 0) - parseFloat(analytics.previousRevenue || 0)) / parseFloat(analytics.previousRevenue || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
              </span>
            ) : (
              <span className="flex items-center text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                -{(((parseFloat(analytics.previousRevenue || 0) - parseFloat(analytics.totalRevenue || 0)) / parseFloat(analytics.previousRevenue || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_down
                </span>
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            ${parseFloat(analytics.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. ${parseFloat(analytics.previousRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} last period</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">Total Orders</p>
            {analytics.totalOrders >= analytics.previousOrders ? (
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                +{(((analytics.totalOrders - analytics.previousOrders) / (analytics.previousOrders || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
              </span>
            ) : (
              <span className="flex items-center text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                -{(((analytics.previousOrders - analytics.totalOrders) / (analytics.previousOrders || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_down
                </span>
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {analytics.totalOrders || 0}
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. {analytics.previousOrders || 0} last period</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">
              Avg. Order Value
            </p>
            {parseFloat(analytics.avgOrderValue || 0) >= parseFloat(analytics.previousAvgValue || 0) ? (
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                +{(((parseFloat(analytics.avgOrderValue || 0) - parseFloat(analytics.previousAvgValue || 0)) / parseFloat(analytics.previousAvgValue || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
              </span>
            ) : (
              <span className="flex items-center text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                -{(((parseFloat(analytics.previousAvgValue || 0) - parseFloat(analytics.avgOrderValue || 0)) / parseFloat(analytics.previousAvgValue || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_down
                </span>
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            ${parseFloat(analytics.avgOrderValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. ${parseFloat(analytics.previousAvgValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} last period</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">New Customers</p>
            {analytics.newCustomers >= analytics.previousNewCustomers ? (
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                +{(((analytics.newCustomers - analytics.previousNewCustomers) / (analytics.previousNewCustomers || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
              </span>
            ) : (
              <span className="flex items-center text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                -{(((analytics.previousNewCustomers - analytics.newCustomers) / (analytics.previousNewCustomers || 1)) * 100).toFixed(1)}%{" "}
                <span className="material-symbols-outlined text-[14px]">
                  trending_down
                </span>
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {analytics.newCustomers || 0}
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. {analytics.previousNewCustomers || 0} last period</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                bar_chart
              </span>
              Sales Performance
            </h3>
            <div className="flex gap-2">
              <button
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
                title="Export CSV"
              >
                <span className="material-symbols-outlined text-[20px]">
                  csv
                </span>
              </button>
              <button
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
                title="Export PDF"
              >
                <span className="material-symbols-outlined text-[20px]">
                  picture_as_pdf
                </span>
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 mt-8 px-2">
            {analytics.monthlySales && analytics.monthlySales.length > 0 ? (
              analytics.monthlySales.map((monthData, index) => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthName = monthNames[monthData._id.month - 1];
                const maxSales = Math.max(...analytics.monthlySales.map(m => m.sales), 1);
                const heightPercentage = (monthData.sales / maxSales) * 100;
                const isCurrentMonth = index === analytics.monthlySales.length - 1;

                return (
                  <div key={`${monthData._id.year}-${monthData._id.month}`} className="flex flex-col items-center gap-2 w-full group">
                    <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm chart-bar"
                        style={{ height: `${heightPercentage}%` }}
                        title={`${monthName}: $${monthData.sales.toFixed(2)}`}
                      ></div>
                    </div>
                    <span className={`text-xs ${isCurrentMonth ? 'text-primary font-bold' : 'text-slate-400'}`}>
                      {monthName}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-32">
                <p className="text-slate-500">No sales data available</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">
              pie_chart
            </span>
            Sales by Category
          </h3>
          <div className="flex-1 flex items-center justify-center relative">
            {analytics.salesByCategory && analytics.salesByCategory.length > 0 ? (
              <>
                {(() => {
                  const totalSales = analytics.salesByCategory.reduce((sum, cat) => sum + (cat.revenue || 0), 0);
                  const colors = ['#2b8cee', '#818cf8', '#34d399', '#f59e0b', '#ef4444', '#8b5cf6'];
                  let currentDeg = 0;
                  const gradientParts = analytics.salesByCategory.map((cat, index) => {
                    const percentage = totalSales > 0 ? (cat.revenue / totalSales) * 100 : 0;
                    const degrees = (percentage / 100) * 360;
                    const startDeg = currentDeg;
                    const endDeg = currentDeg + degrees;
                    currentDeg = endDeg;
                    return `${colors[index % colors.length]} ${startDeg}deg ${endDeg}deg`;
                  }).join(',');

                  return (
                    <div 
                      className="size-48 rounded-full flex items-center justify-center shadow-lg relative"
                      style={{ background: `conic-gradient(${gradientParts})` }}
                    >
                      <div className="size-32 bg-white dark:bg-card-dark rounded-full flex flex-col items-center justify-center z-10">
                        <span className="text-3xl font-bold text-slate-800 dark:text-white">
                          {analytics.salesByCategory.reduce((sum, cat) => sum + (cat.totalSold || 0), 0)}
                        </span>
                        <span className="text-xs text-slate-400 uppercase tracking-wide">
                          Total Sales
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="size-48 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-slate-500">No data</span>
              </div>
            )}
          </div>
          <div className="mt-8 space-y-3">
            {analytics.salesByCategory && analytics.salesByCategory.length > 0 ? (
              analytics.salesByCategory.map((category, index) => {
                const colors = ['bg-primary', 'bg-indigo-400', 'bg-emerald-400', 'bg-amber-400', 'bg-red-400', 'bg-purple-400'];
                const totalRevenue = analytics.salesByCategory.reduce((sum, cat) => sum + (cat.revenue || 0), 0);
                const percentage = totalRevenue > 0 ? ((category.revenue / totalRevenue) * 100).toFixed(0) : 0;

                return (
                  <div key={category._id || index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`size-3 ${colors[index % colors.length]} rounded-full`}></span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {category._id || 'Unknown'}
                      </span>
                    </div>
                    <span className="font-semibold">{percentage}%</span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-3 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-300">
                    No categories
                  </span>
                </div>
                <span className="font-semibold">0%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">
                person
              </span>
              Top Customers
            </h3>
            <a className="text-sm text-primary hover:underline" href="#">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase">
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold text-right">Orders</th>
                  <th className="px-6 py-3 font-semibold text-right">
                    Total Spent
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                {analytics.topCustomers && analytics.topCustomers.length > 0 ? (
                  analytics.topCustomers.map((customer, index) => (
                    <tr key={customer._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                          {customer.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {customer.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-slate-400">
                            {customer.email || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                        {customer.orderCount || 0}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                        ${parseFloat(customer.totalSpent || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                      No customer data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">
                warning
              </span>
              Low Stock Alerts
            </h3>
            <a className="text-sm text-primary hover:underline" href="#">
              Manage Inventory
            </a>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.lowStockProducts && analytics.lowStockProducts.length > 0 ? (
                analytics.lowStockProducts.map((product) => {
                  const stockLevel = product.stock || 0;
                  const isLow = stockLevel === 0;
                  const isWarning = stockLevel > 0 && stockLevel < 10;
                  const bgColor = isLow ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' : 
                                   isWarning ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30' : 
                                   'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700';
                  const statusColor = isLow ? 'text-red-600 dark:text-red-400' : 
                                      isWarning ? 'text-orange-600 dark:text-orange-400' : 
                                      'text-slate-500';
                  const statusText = isLow ? `Only ${stockLevel} unit${stockLevel === 1 ? '' : 's'} left` :
                                     isWarning ? `${stockLevel} units left (Low)` :
                                     `${stockLevel} units left (Healthy)`;

                  return (
                    <div key={product._id} className={`flex items-center justify-between p-3 border rounded-lg ${bgColor}`}>
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-white dark:bg-slate-800 rounded flex items-center justify-center shrink-0">
                          {product.images && product.images[0] ? (
                            <img
                              alt={product.name}
                              className="size-8 object-cover rounded"
                              src={product.images[0].url}
                            />
                          ) : (
                            <span className="text-slate-400 text-sm">No Image</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className={`text-xs font-medium ${statusColor}`}>
                            {statusText}
                          </p>
                        </div>
                      </div>
                      <button className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                        isLow ? 'text-white bg-red-500 hover:bg-red-600' :
                        'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                      }`}>
                        {isLow ? 'Restock' : 'View'}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center p-8">
                  <p className="text-slate-500">No low stock products</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col mb-8">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">
              table_chart
            </span>
            Product Sales Details
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                className="pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                placeholder="Search products..."
                type="text"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              Filter
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 uppercase">
                <th className="px-6 py-4 font-semibold w-12">#</th>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-right">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">
                  Units Sold
                </th>
                <th className="px-6 py-4 font-semibold text-right">Revenue</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
              {analytics.productSalesDetails && analytics.productSalesDetails.length > 0 ? (
                analytics.productSalesDetails.map((product, index) => {
                  const stockLevel = product.stock || 0;
                  const isLowStock = stockLevel <= 10;
                  const stockColor = stockLevel === 0 ? 'text-red-500' : 
                                     stockLevel <= 10 ? 'text-orange-500' : 
                                     'text-slate-600 dark:text-slate-300';

                  return (
                    <tr key={product._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-slate-400">{String(index + 1).padStart(2, '0')}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {product.name || 'Unknown Product'}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{product.category || 'N/A'}</td>
                      <td className={`px-6 py-4 text-right ${stockColor} ${isLowStock ? 'font-bold' : ''}`}>
                        {stockLevel}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                        {product.unitsSold || 0}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                        ${parseFloat(product.revenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isLowStock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Active
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                    No product sales data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {analytics.productSalesDetails?.length > 0 ? '1' : '0'}-{analytics.productSalesDetails?.length || 0} of {analytics.productSalesDetails?.length || 0} items
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              Prev
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              Next
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2024 ShopLogo Admin. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a className="hover:text-primary" href="#">
            Support
          </a>
          <a className="hover:text-primary" href="#">
            Documentation
          </a>
          <a className="hover:text-primary" href="#">
            Privacy Policy
          </a>
        </div>
      </footer>
    </main>
  );
}

export default AnalyticsPage
