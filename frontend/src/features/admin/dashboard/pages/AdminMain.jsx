import React from 'react'

function AdminMain() {
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
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-base">
                    trending_up
                  </span>{" "}
                  +12.5%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  $45,231.89
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
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-base">
                    trending_up
                  </span>{" "}
                  +8.2%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  1,205
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-base">
                    trending_down
                  </span>{" "}
                  -2.4%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Active Users
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  8,921
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
                  +4.6%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Sales
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  2,340
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
                <div className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg h-32 overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <div className="absolute bottom-0 w-full bg-blue-500 h-[65%] rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Elec
                  </span>
                </div>
                <div className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg h-40 overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <div className="absolute bottom-0 w-full bg-purple-500 h-[80%] rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Fash
                  </span>
                </div>
                <div className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg h-24 overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <div className="absolute bottom-0 w-full bg-orange-500 h-[45%] rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Home
                  </span>
                </div>
                <div className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg h-28 overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <div className="absolute bottom-0 w-full bg-emerald-500 h-[55%] rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Beau
                  </span>
                </div>
                <div className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg h-20 overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                    <div className="absolute bottom-0 w-full bg-pink-500 h-[40%] rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Acc
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Orders
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
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      #ORD-5532
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9I8_tyUbviAorXatCl07Xeu5LpOAgYthbm8y73PlWJsnHjEu-f-Zwu8pfTokHUCgyITKbgFZqEXAlB7r-I0Pl5_iwItg7DeZgtsYH0210miuqTqC2UkwgLOOI2KfpKGukSAkJ35ydSpnDmxOMNOVvCBoahWePsBJL47Wej8kycewXxUohO5tu8lGAVZmESvp6WGYe6-yl4CFFaHCmTj9HOyi6HkANYpNGOl5Z1xA-rdnHiSIOZdnfhcZPJHyPOV6k5A3KZ08mVc"
                        />
                        <span>Sarah Johnson</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">Urban Runner X1</td>
                    <td className="px-6 py-4">Oct 24, 2024</td>
                    <td className="px-6 py-4 font-medium">$120.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        Completed
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
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      #ORD-5531
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgWt6YId3ySAvK6GqDx8pH4_qGOyBY33IdgKu8J7qEMXVMZRHzE0GBRZqw_7_WdD7VWiCApZaET6dVrL8k__YJ5uMGBaYI1oOg0y9Z9pqiLbuqVOfA9Un3yaVn-mPNRZHPxlWZrfoqS8mFQDRfFqB7TfdneboNRpAaT_5Ygve-_iHW5H7FqT-5_kuqe1FN6qaerkJTY0njyr-LiYeuiuT2AyhzFdM3QGJ0oqjX2ymAA6u88dbgBvp_lKpsD2qvOZiMXyDMiv6EKYY"
                        />
                        <span>Michael Chen</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">Bass Pro Wireless</td>
                    <td className="px-6 py-4">Oct 24, 2024</td>
                    <td className="px-6 py-4 font-medium">$299.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        Processing
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
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      #ORD-5530
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH_dLFqnkTn7Cok0X5B3Jq-KAa-wgZxOhi9gCtCW6Y_WnhOY6oPpW4sN2fjokwltUGi_CdelOciFDaBkgS-yxHPUjqpgtQ6jUK-48UNVMJn0C5gdKYMyYJ9ZFL8v9ulBfrx9mrSUz9RD9rqT7xnAQRotgTj-cbd32RLex0NQX4VGVAo8Qc6wgniKoS301TMmnqxkrM5onASwh6vD03SdPE-qM_H_O1en6aQkEXpPtaCLT-sbmUCdh924Th6fhYZdwXbE7x4aJHxxI"
                        />
                        <span>Emily Davis</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">Retro Instant Cam</td>
                    <td className="px-6 py-4">Oct 23, 2024</td>
                    <td className="px-6 py-4 font-medium">$89.99</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        Pending
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
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      #ORD-5529
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWWkEOJ3XAZFQNlfR4OenqWDRUU2eGN-V0z75dXooBzqUMh9UdUDftMNapoBvZ7QAL8f1xXiXp8TSMA3DyV_DdEMHBYxQJls_P8gdx1luSzx9p3Wb2-9HDTOjCz8t2xuSMSMvTRzXFN1F23uJghFWUaJL5164uriZHS2OGlXbZNiNmKkpplgas1XuszFf4hdeLamFjNeiw-swmkBmzGrtH2iVknBTa6K5t6JVZOuHyW8Yb7LczypVPXNxdxOrHu9SWtvVli9ruvf0"
                        />
                        <span>David Wilson</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">Minimalist Silver Watch</td>
                    <td className="px-6 py-4">Oct 23, 2024</td>
                    <td className="px-6 py-4 font-medium">$145.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        Cancelled
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
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
              <p>Showing 1-4 of 120 orders</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                  disabled=""
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
