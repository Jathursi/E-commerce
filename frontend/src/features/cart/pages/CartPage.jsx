import React from 'react'

function CartPage() {
  return (
    <main class="flex flex-col min-h-screen py-8 md:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
            Shopping Cart
          </h1>
          <p class="mt-2 text-slate-500 dark:text-slate-400">
            You have 3 items in your cart
          </p>
        </div>
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div class="flex-1">
            <div class="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 mb-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 transition-all hover:shadow-md">
              <div class="w-full sm:w-28 h-28 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                <img
                  alt="Urban Runner X1"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNF8EDkMr9hFqIwiJyWFy2Ay7UvEHfqVFTVNONlVd-J3kd04zStwMf5Zl-bA6ObkeQzJSIth1w3wZzRfux4D-jx5Ttrfg4TVfGTV8cwMeJYBynmUfURHIoufyMxs7ev9038gTW227HaMSr6o_hQWutVQw3FvxbyteXrIYMHggx4Oq3NVeIu9pi24hCzyMreHTadApagbTrh_ZOp6I4KJJdZ_1D7lcjzrW5hspARbWmETo7gZte28O-qIOY7nn962icgG-5_BfaEg"
                />
              </div>
              <div class="flex-1 w-full">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                      Urban Runner X1
                    </h3>
                    <p class="text-sm text-slate-500 mt-1">
                      Size: 42 • Color: Red
                    </p>
                  </div>
                  <button
                    class="text-slate-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div class="flex justify-between items-end mt-4">
                  <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                    <button class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      -
                    </button>
                    <input
                      class="w-10 text-center bg-transparent border-0 p-0 text-sm font-medium focus:ring-0"
                      type="text"
                      value="1"
                    />
                    <button class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-slate-900 dark:text-white">
                      $120.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 mb-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 transition-all hover:shadow-md">
              <div class="w-full sm:w-28 h-28 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                <img
                  alt="Bass Pro Wireless"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7tHDcyzX8iyRaEWoSF2B0H1_XSLlpGgt7C_DHMW-r_dNW9so8z1g2jeyeoU7Z_Mk3jLoJQAPZVEXNPwH37ldI9-fX0-7EhLBYuXLwMSU8S_fazjY39m9RwkR5Z5eQOEOHCiQdKHyzCYqRTikXHk6aV-EwIm10Yc9w3C5eE_rJxKvrg26v4sk26CNKgS5OwXKs4_4OVfpBRsz1eMXGQaDVRk33L6ThObV_6JindU45qPO9IyNd1dinMEQOVlM-npdLRP53FSPfcY"
                />
              </div>
              <div class="flex-1 w-full">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                      Bass Pro Wireless
                    </h3>
                    <p class="text-sm text-slate-500 mt-1">
                      Color: Midnight Black
                    </p>
                  </div>
                  <button
                    class="text-slate-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div class="flex justify-between items-end mt-4">
                  <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                    <button class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      -
                    </button>
                    <input
                      class="w-10 text-center bg-transparent border-0 p-0 text-sm font-medium focus:ring-0"
                      type="text"
                      value="1"
                    />
                    <button class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-slate-900 dark:text-white">
                      $299.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 mb-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 transition-all hover:shadow-md">
              <div class="w-full sm:w-28 h-28 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                <img
                  alt="Explorer Backpack"
                  class="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATnWeJB1XCNok62qLtRKDiwJz06wfstIVhr2nGYxTOFYeqx5ClfLrdqYyxKUykAUwMQb0U1lAoPOfcloG-zcVaQXPzmhDqdgY1R0u7By1m_PX8SDkyECVmWWohqKHi8LunjCxaG6RPtMa_EfELL4NjdzN5QKV3nt4nbXClmTLYk-r-52b8MyUKoQWnRDgmP8s5RLAxSO36kYHqdXNIiE34vR3gdmgTWaYR7K8-_bTMZI0Sr72hyBbFAXzXAr4Oav9Q3MtR-uQin0g"
                />
              </div>
              <div class="flex-1 w-full">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                      Explorer Backpack
                    </h3>
                    <p class="text-sm text-slate-500 mt-1">
                      Color: Olive Green
                    </p>
                  </div>
                  <button
                    class="text-slate-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div class="flex justify-between items-end mt-4">
                  <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                    <button class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      -
                    </button>
                    <input
                      class="w-10 text-center bg-transparent border-0 p-0 text-sm font-medium focus:ring-0"
                      type="text"
                      value="1"
                    />
                    <button class="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-slate-900 dark:text-white">
                      $79.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700">
              <a
                class="inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition-colors"
                href="#"
              >
                <span class="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </a>
            </div>
          </div>
          <div class="w-full lg:w-96 flex-shrink-0">
            <div class="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 lg:p-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span class="font-medium text-slate-900 dark:text-white">
                    $498.99
                  </span>
                </div>
                <div class="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping estimate</span>
                  <span class="font-medium text-slate-900 dark:text-white">
                    $5.00
                  </span>
                </div>
                <div class="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tax estimate</span>
                  <span class="font-medium text-slate-900 dark:text-white">
                    $42.40
                  </span>
                </div>
                <div class="pt-4">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Gift card or discount code
                  </label>
                  <div class="flex gap-2">
                    <input
                      class="flex-1 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-primary focus:border-primary"
                      placeholder="Enter code"
                      type="text"
                    />
                    <button class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div class="border-t border-slate-200 dark:border-slate-700 pt-6 mb-8">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-lg font-bold text-slate-900 dark:text-white">
                    Order Total
                  </span>
                  <span class="text-2xl font-bold text-slate-900 dark:text-white">
                    $546.39
                  </span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <button class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2">
                Proceed to Checkout
                <span class="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
              <div class="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span class="material-symbols-outlined text-sm">lock</span>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage
