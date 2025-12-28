import React from 'react'

function AnalyticsPage() {
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
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
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
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +12.5%{" "}
              <span className="material-symbols-outlined text-[14px]">
                trending_up
              </span>
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            $48,256
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. $42,890 last period</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">Total Orders</p>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +5.2%{" "}
              <span className="material-symbols-outlined text-[14px]">
                trending_up
              </span>
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            1,245
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. 1,180 last period</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">
              Avg. Order Value
            </p>
            <span className="flex items-center text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
              -2.1%{" "}
              <span className="material-symbols-outlined text-[14px]">
                trending_down
              </span>
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            $85.40
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. $87.20 last period</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">New Customers</p>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +18.4%{" "}
              <span className="material-symbols-outlined text-[14px]">
                trending_up
              </span>
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            328
          </h3>
          <p className="text-xs text-slate-400 mt-1">vs. 277 last period</p>
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
            <div className="flex flex-col items-center gap-2 w-full group">
              <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 bg-primary h-[60%] rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-xs text-slate-400">Jan</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full group">
              <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 bg-primary h-[85%] rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-xs text-slate-400">Feb</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full group">
              <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 bg-primary h-[45%] rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-xs text-slate-400">Mar</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full group">
              <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 bg-primary h-[95%] rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-xs text-slate-400 font-bold text-primary">
                Apr
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full group">
              <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 bg-primary h-[70%] rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-xs text-slate-400">May</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full group">
              <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm h-32 relative group-hover:bg-primary/30 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 bg-primary h-[50%] rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-xs text-slate-400">Jun</span>
            </div>
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
            <div className="size-48 rounded-full bg-[conic-gradient(#2b8cee_0deg_120deg,#818cf8_120deg_240deg,#34d399_240deg_360deg)] flex items-center justify-center shadow-lg relative">
              <div className="size-32 bg-white dark:bg-card-dark rounded-full flex flex-col items-center justify-center z-10">
                <span className="text-3xl font-bold text-slate-800 dark:text-white">
                  1,245
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wide">
                  Total Sales
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-3 bg-primary rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-300">
                  Electronics
                </span>
              </div>
              <span className="font-semibold">33%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-3 bg-indigo-400 rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-300">
                  Fashion
                </span>
              </div>
              <span className="font-semibold">33%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-3 bg-emerald-400 rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-300">
                  Home &amp; Decor
                </span>
              </div>
              <span className="font-semibold">34%</span>
            </div>
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
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      alt="Customer"
                      className="size-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWWkEOJ3XAZFQNlfR4OenqWDRUU2eGN-V0z75dXooBzqUMh9UdUDftMNapoBvZ7QAL8f1xXiXp8TSMA3DyV_DdEMHBYxQJls_P8gdx1luSzx9p3Wb2-9HDTOjCz8t2xuSMSMvTRzXFN1F23uJghFWUaJL5164uriZHS2OGlXbZNiNmKkpplgas1XuszFf4hdeLamFjNeiw-swmkBmzGrtH2iVknBTa6K5t6JVZOuHyW8Yb7LczypVPXNxdxOrHu9SWtvVli9ruvf0"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        James Wilson
                      </p>
                      <p className="text-xs text-slate-400">
                        james.w@email.com
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                    14
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                    $2,450.00
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      alt="Customer"
                      className="size-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9I8_tyUbviAorXatCl07Xeu5LpOAgYthbm8y73PlWJsnHjEu-f-Zwu8pfTokHUCgyITKbgFZqEXAlB7r-I0Pl5_iwItg7DeZgtsYH0210miuqTqC2UkwgLOOI2KfpKGukSAkJ35ydSpnDmxOMNOVvCBoahWePsBJL47Wej8kycewXxUohO5tu8lGAVZmESvp6WGYe6-yl4CFFaHCmTj9HOyi6HkANYpNGOl5Z1xA-rdnHiSIOZdnfhcZPJHyPOV6k5A3KZ08mVc"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Sarah Johnson
                      </p>
                      <p className="text-xs text-slate-400">
                        s.johnson@email.com
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                    11
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                    $1,890.50
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      alt="Customer"
                      className="size-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgWt6YId3ySAvK6GqDx8pH4_qGOyBY33IdgKu8J7qEMXVMZRHzE0GBRZqw_7_WdD7VWiCApZaET6dVrL8k__YJ5uMGBaYI1oOg0y9Z9pqiLbuqVOfA9Un3yaVn-mPNRZHPxlWZrfoqS8mFQDRfFqB7TfdneboNRpAaT_5Ygve-_iHW5H7FqT-5_kuqe1FN6qaerkJTY0njyr-LiYeuiuT2AyhzFdM3QGJ0oqjX2ymAA6u88dbgBvp_lKpsD2qvOZiMXyDMiv6EKYY"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Michael Chen
                      </p>
                      <p className="text-xs text-slate-400">m.chen@tech.co</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                    9
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                    $1,240.00
                  </td>
                </tr>
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
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-white dark:bg-slate-800 rounded flex items-center justify-center shrink-0">
                    <img
                      alt="Product"
                      className="size-8 object-cover rounded"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaEoUlOE7o7f-sxX5V7k51tVeM8aH_ISLfHGqaxvzoCC4_EbfzTiuWsUfpVnsd1aWFhwOYIIUlfq_f_nWKkRCcWHXvdC0gm6APY_zkHLcdyPY37BIo6lCHQ1YZEeGuDi6jriBpvG2nCdQdwLmSmZcZYjs_lzbji-Aisgyay4D0mZ73KZsvD6DPBJwwZuMThYUA20_S51y0sqWmpXoLVhTWxgR1_mfi9BlxswD5d5YSY5VWJdVXiixRPuGXD_Y_-cmhlXLpXgK-o7w"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Minimalist Silver Watch
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                      Only 3 units left
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded transition-colors">
                  Restock
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-white dark:bg-slate-800 rounded flex items-center justify-center shrink-0">
                    <img
                      alt="Product"
                      className="size-8 object-cover rounded"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJS_fNGbecdr7iiCtE4XUJe_2fBnzPKcodHzYIoSd2O3sKSdSYRZBaiOx2pOo44lY_F6zKH0MOMwGZ3WD1ZODhhip1ljd-TGbKtEkGSzrKZALcSjVOPpEopoAbsSR-6zstxlX4hymAyx2wzy8cVNh_xBjs9XsPbLFsKuEwyyQqbs4rHlcIXTC67RMa1KCNc7c7KCYGFz2nJzuO-QYtt45SQGrpxQYFjV_lqqKwU31g-lnG4KarMZ5pDgS0MEPaQE7FnoLVTq2FkCc"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Summer Shades
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                      8 units left (Low)
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded transition-colors">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-white dark:bg-slate-800 rounded flex items-center justify-center shrink-0">
                    <img
                      alt="Product"
                      className="size-8 object-cover rounded"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuATnWeJB1XCNok62qLtRKDiwJz06wfstIVhr2nGYxTOFYeqx5ClfLrdqYyxKUykAUwMQb0U1lAoPOfcloG-zcVaQXPzmhDqdgY1R0u7By1m_PX8SDkyECVmWWohqKHi8LunjCxaG6RPtMa_EfELL4NjdzN5QKV3nt4nbXClmTLYk-r-52b8MyUKoQWnRDgmP8s5RLAxSO36kYHqdXNIiE34vR3gdmgTWaYR7K8-_bTMZI0Sr72hyBbFAXzXAr4Oav9Q3MtR-uQin0g"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Explorer Backpack
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      15 units left (Healthy)
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded transition-colors">
                  View
                </button>
              </div>
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
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-400">01</td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  Urban Runner X1
                </td>
                <td className="px-6 py-4 text-slate-500">Footwear</td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  45
                </td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  124
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                  $14,880.00
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-400">02</td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  Bass Pro Wireless
                </td>
                <td className="px-6 py-4 text-slate-500">Electronics</td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  32
                </td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  89
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                  $26,611.00
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-400">03</td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  Minimalist Silver
                </td>
                <td className="px-6 py-4 text-slate-500">Accessories</td>
                <td className="px-6 py-4 text-right text-red-500 font-bold">
                  3
                </td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  210
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                  $30,450.00
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    Low Stock
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-400">04</td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  Smartphone Pro Max
                </td>
                <td className="px-6 py-4 text-slate-500">Mobile</td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  18
                </td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                  65
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                  $64,935.00
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 1-4 of 48 items</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              Prev
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              3
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
