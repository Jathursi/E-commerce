import React from 'react'

function OrderSuccessPage() {
  return (
    <main className="flex-grow w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-6 shadow-sm ring-8 ring-green-50 dark:ring-green-900/10">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[48px]">
              check_circle
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Thank you for your order!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-1">
            Order{" "}
            <span className="font-mono font-semibold text-slate-900 dark:text-white">
              #ORD-7782-XC
            </span>{" "}
            has been successfully placed.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We've sent an email to{" "}
            <span className="font-medium text-slate-900 dark:text-slate-300">
              sarah.j@example.com
            </span>{" "}
            with your order confirmation and receipt.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">
                  local_shipping
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Estimated Delivery
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  Tuesday, Nov 14 - Thursday, Nov 16
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-700">
            <div className="lg:col-span-2 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">
                  shopping_bag
                </span>
                Order Items (2)
              </h3>
              <ul className="flex flex-col gap-6">
                <li className="flex gap-4 sm:gap-6">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50">
                    <img
                      alt="Urban Runner X1"
                      className="h-full w-full object-cover object-center"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNF8EDkMr9hFqIwiJyWFy2Ay7UvEHfqVFTVNONlVd-J3kd04zStwMf5Zl-bA6ObkeQzJSIth1w3wZzRfux4D-jx5Ttrfg4TVfGTV8cwMeJYBynmUfURHIoufyMxs7ev9038gTW227HaMSr6o_hQWutVQw3FvxbyteXrIYMHggx4Oq3NVeIu9pi24hCzyMreHTadApagbTrh_ZOp6I4KJJdZ_1D7lcjzrW5hspARbWmETo7gZte28O-qIOY7nn962icgG-5_BfaEg"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">
                          Urban Runner X1
                        </h4>
                        <p className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          $120.00
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Size: 10 | Color: Red
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Footwear
                      </p>
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 self-start px-2 py-1 rounded mt-2">
                      Qty: 1
                    </div>
                  </div>
                </li>
                <li className="flex gap-4 sm:gap-6 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50">
                    <img
                      alt="Bass Pro Wireless"
                      className="h-full w-full object-cover object-center"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7tHDcyzX8iyRaEWoSF2B0H1_XSLlpGgt7C_DHMW-r_dNW9so8z1g2jeyeoU7Z_Mk3jLoJQAPZVEXNPwH37ldI9-fX0-7EhLBYuXLwMSU8S_fazjY39m9RwkR5Z5eQOEOHCiQdKHyzCYqRTikXHk6aV-EwIm10Yc9w3C5eE_rJxKvrg26v4sk26CNKgS5OwXKs4_4OVfpBRsz1eMXGQaDVRk33L6ThObV_6JindU45qPO9IyNd1dinMEQOVlM-npdLRP53FSPfcY"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">
                          Bass Pro Wireless
                        </h4>
                        <p className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          $299.00
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Color: Matte Black
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Electronics
                      </p>
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 self-start px-2 py-1 rounded mt-2">
                      Qty: 1
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-1 bg-slate-50/50 dark:bg-slate-900/30 p-6 md:p-8 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">
                    location_on
                  </span>
                  Shipping Address
                </h3>
                <address className="not-italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7 border-l-2 border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                    Sarah Johnson
                  </span>
                  1234 Design Street, Suite 56
                  <br />
                  San Francisco, CA 94103
                  <br />
                  United States
                  <br />
                  <span className="block mt-2 text-slate-500">
                    +1 (555) 123-4567
                  </span>
                </address>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">
                    receipt_long
                  </span>
                  Payment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      $419.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      $15.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Tax (8.5%)</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      $35.62
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3 flex justify-between text-base font-bold">
                    <span className="text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-primary text-xl">$469.62</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 mb-2">Paid with</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded border border-slate-200 w-10 h-6 flex items-center justify-center">
                      <img
                        alt="Visa"
                        className="h-3 object-contain opacity-80"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtm_sdUgs5znL7oATjL0KeMgREmNa_kU0hpLaZYbY8vy2C6jJINUXaDTBCbzs1EpUBokJcr10b-3FMJi5Rua4jN_PGV-oJ50CNW5PUnWuTEncOwQawiBc_mmiBrn3Epej_z6hBIefy-iNleIo2-UTVZINss5QzLkxbSLabDti7-jHACapuLbNp9_FGFBGkGEgZI-WKsifghrzwkrGtEBC6OKcQa5jn7koM3TyOHLmaFV3kJkGOFjWlsvktRIVioRkORotkO5773Xs"
                      />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                      Visa ending in 4242
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-0.5 shadow-sm">
            Continue Shopping
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">map</span>
            Track Your Order
          </button>
        </div>
        <p className="text-center text-sm text-slate-400 mt-8">
          Need help?{" "}
          <a className="text-primary hover:underline" href="#">
            Contact Support
          </a>
        </p>
      </div>
    </main>
  );
}

export default OrderSuccessPage
