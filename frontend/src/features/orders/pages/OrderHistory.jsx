import React from 'react'

function OrderHistory() {
  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <img
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubK8vAlPuvbREI8aOjX5ryYXXpfIEtvyVWvYl7u7XLO8nDb-O-9NHkv-ZJzAEZsuaTUtHC-WlB7S90XB5C_R2BLzskobM4XgM4FPTqsrME6KxPjk97_jYjOKJCfmQEeI9lhXPGfj8Fygod3f1iPKSJdj4chqZOVflpu0JtZTDqN5fZ1R6zPnPbr9Hvc_QdbmFqs6qXJ-9o61jXlhRcaM4Cc9NI6vq9isYtJYT6_nlS7rYgTE-NSnoHHMBFFQOTy66F8XB9sVFQD4"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Alex Morgan
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  alex.m@example.com
                </p>
              </div>
            </div>
            <nav className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <a
                className="flex items-center gap-3 px-6 py-4 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary transition-colors border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="font-medium">Profile</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 bg-primary/5 text-primary border-l-4 border-primary border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="font-medium">Orders</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary transition-colors border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">favorite</span>
                <span className="font-medium">Wishlist</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary transition-colors border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">location_on</span>
                <span className="font-medium">Address</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-medium">Logout</span>
              </a>
            </nav>
          </div>
        </aside>
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Order History
            </h2>
            <div className="flex gap-2">
              <select className="form-select text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-primary py-2 px-3 shadow-sm">
                <option>All Orders</option>
                <option>Last 30 Days</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <select className="form-select text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-primary py-2 px-3 shadow-sm">
                <option>All Status</option>
                <option>Delivered</option>
                <option>Processing</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Order ID
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        #ORD-2024-8832
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Date Placed
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        May 15, 2024
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Total Amount
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        $1,299.00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      Processing
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex -space-x-3 overflow-hidden p-1">
                      <img
                        alt="Product"
                        className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover bg-slate-100"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJuCZzWBp-A_4Bfw8ZDmcSf4tjS5pfVbezeiswy69lnrTvpdXaewCDACwjCyxGU4a4f114lrFhaOrS5KEqYkRimuYMmsIQTcRARZu9Sz6-QsjWb2hJOHI1BTHqtOx39uuc7mIJzHBv9bkswdsY4tJ-HybodobM_2kKLzbJv3tdJZPIyWhep2X3DtCi85JICqLT-nGOsC18rkSPThQgy-wDbv1AkN6bU0US8J16rBzsJ9aYUdCImcnEksS39g6F9YAl3V_uRPsk-GU"
                      />
                      <img
                        alt="Product"
                        className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover bg-slate-100"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7tHDcyzX8iyRaEWoSF2B0H1_XSLlpGgt7C_DHMW-r_dNW9so8z1g2jeyeoU7Z_Mk3jLoJQAPZVEXNPwH37ldI9-fX0-7EhLBYuXLwMSU8S_fazjY39m9RwkR5Z5eQOEOHCiQdKHyzCYqRTikXHk6aV-EwIm10Yc9w3C5eE_rJxKvrg26v4sk26CNKgS5OwXKs4_4OVfpBRsz1eMXGQaDVRk33L6ThObV_6JindU45qPO9IyNd1dinMEQOVlM-npdLRP53FSPfcY"
                      />
                      <div className="h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                        +1
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Smartphone Pro Max
                      </span>{" "}
                      and 2 other items
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                    View Details
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 mt-0 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
                  <span className="text-primary">Order Placed</span>
                  <span className="text-primary">Processing</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[40%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Expected delivery by{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    May 22, 2024
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Order ID
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        #ORD-2024-7102
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Date Placed
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        April 28, 2024
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Total Amount
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        $89.99
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-100 dark:border-green-800">
                      <span className="material-symbols-outlined text-[16px]">
                        check_circle
                      </span>
                      Delivered
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex -space-x-3 overflow-hidden p-1">
                      <img
                        alt="Product"
                        className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover bg-slate-100"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZekdrrLpKs288l2qi1Vxcd3eGWCMY_bSImACjOAreLGVFkQo49GcnQyn57nbnVzR0N1DrIKr-I7bH-xSmEtWBZcYsPmD5O5iUJ5F289Cj4b0jiIguQCZBnnecD6eGM2noebBsaCzJCPFuTc9vJ_1kiYSzL9CtzrwAcH3qb7OJD32JD29xknAT7C0DsObvdzQ4VuUPecb4omCpi8Hr1v123XS2OmQTq7WGZla1_hqEm25ismwilFSr7KgVosW0EU741Opl04mfhWI"
                      />
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Retro Instant Cam
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        Delivered on May 02, 2024
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-primary bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-medium transition-colors text-sm">
                      Buy Again
                    </button>
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md opacity-75 hover:opacity-100">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Order ID
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        #ORD-2024-6500
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Date Placed
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        April 10, 2024
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Total Amount
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        $120.00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-100 dark:border-red-800">
                      <span className="material-symbols-outlined text-[16px]">
                        cancel
                      </span>
                      Cancelled
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex -space-x-3 overflow-hidden p-1">
                      <img
                        alt="Product"
                        className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover bg-slate-100"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNF8EDkMr9hFqIwiJyWFy2Ay7UvEHfqVFTVNONlVd-J3kd04zStwMf5Zl-bA6ObkeQzJSIth1w3wZzRfux4D-jx5Ttrfg4TVfGTV8cwMeJYBynmUfURHIoufyMxs7ev9038gTW227HaMSr6o_hQWutVQw3FvxbyteXrIYMHggx4Oq3NVeIu9pi24hCzyMreHTadApagbTrh_ZOp6I4KJJdZ_1D7lcjzrW5hspARbWmETo7gZte28O-qIOY7nn962icgG-5_BfaEg"
                      />
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Urban Runner X1
                      </span>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Order ID
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        #ORD-2023-9912
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Date Placed
                      </p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        Dec 12, 2023
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Total Amount
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold">
                        $399.00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-100 dark:border-green-800">
                      <span className="material-symbols-outlined text-[16px]">
                        check_circle
                      </span>
                      Delivered
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex -space-x-3 overflow-hidden p-1">
                      <img
                        alt="Product"
                        className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover bg-slate-100"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkK4AdAoHbXbkC_Kx478vfc36_jBjpr0Tmtw6c0z5g8PzLwlw4t_48JO2VnlgUftt2kcl0qEIWzOOdA1FqULRZf-HTn5Rx1Uzr3hHEr2FTdcFjhT8scoVJ1T6Qi4gAswpcjX5rRdEg7IaugPW-mIfmzdZqr0Q8f1OkmsZpU9R1AhW71WS9-P5U913BQWmwlIxS9xIHBc9EmJLs3k9UzBSV81UjsNSrz5DcdgPFsxaHijVJ1Kww0dixyfeLQJ7Vcu6G3429JvzfmIU"
                      />
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Series 7 Watch
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        Delivered on Dec 16, 2023
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-primary bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-medium transition-colors text-sm">
                      Buy Again
                    </button>
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <nav className="flex items-center gap-2" role="navigation">
              <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/30">
                1
              </button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                2
              </button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                3
              </button>
              <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderHistory
