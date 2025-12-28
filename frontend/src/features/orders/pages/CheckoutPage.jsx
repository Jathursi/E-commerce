import React from 'react'

function CheckoutPage() {
  return (
    <main className="flex flex-col min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex text-sm text-slate-500 dark:text-slate-400 mb-2"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    className="inline-flex items-center hover:text-primary transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[18px] mr-1">
                      home
                    </span>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">
                      chevron_right
                    </span>
                    <a
                      className="ml-1 md:ml-2 hover:text-primary transition-colors"
                      href="#"
                    >
                      Orders
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">
                      chevron_right
                    </span>
                    <span className="ml-1 md:ml-2 text-slate-900 dark:text-white font-medium">
                      #ORD-2024-8592
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Order #ORD-2024-8592
              </h1>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                Delivered
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Placed on October 24, 2024 at 10:34 AM
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px] mr-2">
                receipt
              </span>
              Invoice
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm shadow-blue-500/30">
              <span className="material-symbols-outlined text-[18px] mr-2">
                refresh
              </span>
              Reorder
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Order Items (3)
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Shipment 1 of 1
                </span>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img
                      alt="Urban Runner X1"
                      className="w-full h-full object-cover"
                      data-alt="Red athletic sneaker shoe"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNF8EDkMr9hFqIwiJyWFy2Ay7UvEHfqVFTVNONlVd-J3kd04zStwMf5Zl-bA6ObkeQzJSIth1w3wZzRfux4D-jx5Ttrfg4TVfGTV8cwMeJYBynmUfURHIoufyMxs7ev9038gTW227HaMSr6o_hQWutVQw3FvxbyteXrIYMHggx4Oq3NVeIu9pi24hCzyMreHTadApagbTrh_ZOp6I4KJJdZ_1D7lcjzrW5hspARbWmETo7gZte28O-qIOY7nn962icgG-5_BfaEg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start justify-between sm:justify-start gap-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                          Urban Runner X1
                        </h3>
                        <span className="sm:hidden font-bold text-slate-900 dark:text-white">
                          $120.00
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Size: 10 US · Color: Red/Black
                      </p>
                      <div className="mt-2 inline-flex items-center text-sm text-slate-500">
                        <span className="material-symbols-outlined text-[18px] mr-1 text-green-500">
                          check_circle
                        </span>
                        Return window closed on Nov 24
                      </div>
                      <div className="mt-auto pt-2 flex gap-4">
                        <button className="text-primary hover:text-blue-700 text-sm font-medium transition-colors">
                          Write a Review
                        </button>
                        <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">
                          Buy Again
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 text-right mt-2 sm:mt-0">
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        $120.00
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Qty: 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img
                      alt="Bass Pro Wireless"
                      className="w-full h-full object-cover"
                      data-alt="Modern wireless headphones"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7tHDcyzX8iyRaEWoSF2B0H1_XSLlpGgt7C_DHMW-r_dNW9so8z1g2jeyeoU7Z_Mk3jLoJQAPZVEXNPwH37ldI9-fX0-7EhLBYuXLwMSU8S_fazjY39m9RwkR5Z5eQOEOHCiQdKHyzCYqRTikXHk6aV-EwIm10Yc9w3C5eE_rJxKvrg26v4sk26CNKgS5OwXKs4_4OVfpBRsz1eMXGQaDVRk33L6ThObV_6JindU45qPO9IyNd1dinMEQOVlM-npdLRP53FSPfcY"
                    />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start justify-between sm:justify-start gap-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                          Bass Pro Wireless
                        </h3>
                        <span className="sm:hidden font-bold text-slate-900 dark:text-white">
                          $299.00
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Color: Midnight Black · Wireless: Yes
                      </p>
                      <div className="mt-2 inline-flex items-center text-sm text-slate-500">
                        <span className="material-symbols-outlined text-[18px] mr-1 text-green-500">
                          check_circle
                        </span>
                        Return window closed on Nov 24
                      </div>
                      <div className="mt-auto pt-2 flex gap-4">
                        <button className="text-primary hover:text-blue-700 text-sm font-medium transition-colors">
                          Write a Review
                        </button>
                        <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">
                          Buy Again
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 text-right mt-2 sm:mt-0">
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        $299.00
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Qty: 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img
                      alt="Minimalist Silver Watch"
                      className="w-full h-full object-cover"
                      data-alt="Minimalist wrist watch"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaEoUlOE7o7f-sxX5V7k51tVeM8aH_ISLfHGqaxvzoCC4_EbfzTiuWsUfpVnsd1aWFhwOYIIUlfq_f_nWKkRCcWHXvdC0gm6APY_zkHLcdyPY37BIo6lCHQ1YZEeGuDi6jriBpvG2nCdQdwLmSmZcZYjs_lzbji-Aisgyay4D0mZ73KZsvD6DPBJwwZuMThYUA20_S51y0sqWmpXoLVhTWxgR1_mfi9BlxswD5d5YSY5VWJdVXiixRPuGXD_Y_-cmhlXLpXgK-o7w"
                    />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start justify-between sm:justify-start gap-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                          Minimalist Silver Watch
                        </h3>
                        <span className="sm:hidden font-bold text-slate-900 dark:text-white">
                          $145.00
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Strap: Leather · Dial: 40mm
                      </p>
                      <div className="mt-2 inline-flex items-center text-sm text-slate-500">
                        <span className="material-symbols-outlined text-[18px] mr-1 text-green-500">
                          check_circle
                        </span>
                        Return window closed on Nov 24
                      </div>
                      <div className="mt-auto pt-2 flex gap-4">
                        <button className="text-primary hover:text-blue-700 text-sm font-medium transition-colors">
                          Write a Review
                        </button>
                        <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">
                          Buy Again
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 text-right mt-2 sm:mt-0">
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        $145.00
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Qty: 1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Delivery Status
              </h2>
              <div className="relative pl-4">
                <div className="absolute top-0 left-[21px] h-full w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-green-100 dark:bg-green-900/30 border-4 border-white dark:border-slate-800 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        package_2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        Delivered
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Package was handed directly to a resident.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Oct 26, 2:45 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-900/20 border-4 border-white dark:border-slate-800 flex items-center justify-center text-primary shrink-0 z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        local_shipping
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        Out for Delivery
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Courier is on the way to your location.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Oct 26, 8:12 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-white dark:border-slate-800 flex items-center justify-center text-slate-400 shrink-0 z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        inventory_2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        Shipped
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Package has left the facility.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Oct 25, 4:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Subtotal (3 items)</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    $564.00
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>
                    Discount{" "}
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded ml-1 text-slate-500">
                      SUMMER24
                    </span>
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    -$24.00
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    $15.00
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    $44.40
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white text-lg">
                    Total
                  </span>
                  <span className="font-bold text-primary text-xl">
                    $599.40
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 flex items-center gap-3 border border-slate-100 dark:border-slate-700/50">
                  <img
                    alt="Visa"
                    className="h-6 w-auto"
                    data-alt="Visa Logo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtm_sdUgs5znL7oATjL0KeMgREmNa_kU0hpLaZYbY8vy2C6jJINUXaDTBCbzs1EpUBokJcr10b-3FMJi5Rua4jN_PGV-oJ50CNW5PUnWuTEncOwQawiBc_mmiBrn3Epej_z6hBIefy-iNleIo2-UTVZINss5QzLkxbSLabDti7-jHACapuLbNp9_FGFBGkGEgZI-WKsifghrzwkrGtEBC6OKcQa5jn7koM3TyOHLmaFV3kJkGOFjWlsvktRIVioRkORotkO5773Xs"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Visa ending in 4242
                    </p>
                    <p className="text-xs text-slate-500">
                      Paid on Oct 24, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-fit">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Shipping Details
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Delivery Address
                  </h3>
                  <div className="text-slate-900 dark:text-white text-sm leading-relaxed">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p>1234 Park Avenue, Apt 5B</p>
                    <p>New York, NY 10016</p>
                    <p>United States</p>
                    <p className="mt-1 text-slate-500">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Shipping Method
                  </h3>
                  <p className="text-slate-900 dark:text-white text-sm">
                    Express Delivery (2-3 Business Days)
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                    Delivered on time
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-2">
                Need help with your order?
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                Our support team is available 24/7 to assist you with returns or
                exchanges.
              </p>
              <button className="w-full bg-white text-primary font-bold py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors shadow-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage
