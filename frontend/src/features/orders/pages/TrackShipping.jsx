import React from 'react'

function TrackShipping() {
  return (
    <main class="flex flex-col min-h-screen py-8 md:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="mb-10 sm:mb-16">
          <div class="relative flex items-center justify-between w-full max-w-2xl mx-auto">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded"></div>
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-2/3 h-1 bg-primary -z-10 rounded transition-all duration-500"></div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold ring-4 ring-white dark:ring-background-dark">
                <span class="material-symbols-outlined text-xl">check</span>
              </div>
              <span class="text-xs sm:text-sm font-semibold text-primary">
                Shipping
              </span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold ring-4 ring-white dark:ring-background-dark shadow-lg shadow-primary/30">
                2
              </div>
              <span class="text-xs sm:text-sm font-bold text-primary">
                Payment
              </span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold ring-4 ring-white dark:ring-background-dark">
                3
              </div>
              <span class="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Review
              </span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <section class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold flex items-center gap-2">
                  <span class="material-symbols-outlined text-green-500">
                    check_circle
                  </span>
                  Shipping Address
                </h2>
                <button class="text-sm text-primary font-medium hover:underline">
                  Edit
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 opacity-75 grayscale-[0.5] pointer-events-none select-none text-sm">
                <div class="col-span-2">
                  <p class="font-semibold text-slate-900 dark:text-white">
                    John Doe
                  </p>
                  <p class="text-slate-600 dark:text-slate-400">
                    1234 Fashion Street, Suite 56
                  </p>
                  <p class="text-slate-600 dark:text-slate-400">
                    New York, NY 10012, United States
                  </p>
                  <p class="text-slate-600 dark:text-slate-400 mt-1">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </section>
            <section class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-primary/20 ring-1 ring-primary/10 p-6 md:p-8">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <div class="bg-primary/10 text-primary p-1.5 rounded-md">
                    <span class="material-symbols-outlined">credit_card</span>
                  </div>
                  Payment Method
                </h2>
              </div>
              <div class="flex flex-col sm:flex-row gap-4 mb-8">
                <label class="flex-1 cursor-pointer">
                  <input
                    checked=""
                    class="peer sr-only"
                    name="payment_method"
                    type="radio"
                  />
                  <div class="h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                    <span class="material-symbols-outlined text-3xl mb-1 text-slate-600 dark:text-slate-300 peer-checked:text-primary">
                      credit_card
                    </span>
                    <span class="font-semibold text-sm peer-checked:text-primary">
                      Credit Card
                    </span>
                  </div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input
                    class="peer sr-only"
                    name="payment_method"
                    type="radio"
                  />
                  <div class="h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                    <img
                      alt="PayPal"
                      class="h-6 opacity-70 peer-checked:opacity-100 grayscale peer-checked:grayscale-0"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT8Cbwl3OVu4Eexwsk2ajZQVbLPHUtwz8dPgYBXlVH-Yj6vWWNy8IFNKnBls2j41dBxkJyab4MxD5I9Lzfzch063J9gbhnCia_cGqUmC8AbP1thISzvVEWaOzGhtxZAGObQoO6xpq7IYhvmlSNQEITB8WHMiLhcVY-nw5W5GRI5HzUMQu71vdnHntevrlGiFvC8nDDrusg9jgsxKI1QozBRnm-RPg111LvgcuKLPHB6CVu5Hpm0PXHPc2VqCvjzIrCG4Rq72W7KuQ"
                    />
                    <span class="font-semibold text-sm peer-checked:text-primary">
                      PayPal
                    </span>
                  </div>
                </label>
              </div>
              <form class="space-y-6">
                <div class="grid grid-cols-1 gap-6">
                  <div class="relative">
                    <label
                      class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      for="card-number"
                    >
                      Card Number
                    </label>
                    <div class="relative">
                      <input
                        class="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary transition-shadow"
                        id="card-number"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                      />
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span class="material-symbols-outlined text-slate-400">
                          credit_card
                        </span>
                      </div>
                      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none gap-2">
                        <img
                          alt="Visa"
                          class="h-4"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtm_sdUgs5znL7oATjL0KeMgREmNa_kU0hpLaZYbY8vy2C6jJINUXaDTBCbzs1EpUBokJcr10b-3FMJi5Rua4jN_PGV-oJ50CNW5PUnWuTEncOwQawiBc_mmiBrn3Epej_z6hBIefy-iNleIo2-UTVZINss5QzLkxbSLabDti7-jHACapuLbNp9_FGFBGkGEgZI-WKsifghrzwkrGtEBC6OKcQa5jn7koM3TyOHLmaFV3kJkGOFjWlsvktRIVioRkORotkO5773Xs"
                        />
                        <img
                          alt="Mastercard"
                          class="h-5"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2n_HekO_1ez2I16NP0DCM5VS8obrm-8FILV5PrVoVW73p1fpgzbMEDlyUmOvpIj5d26Hc2eEE7Ay0zojXPWAOkjsHYbth0yjjf3nWIkOtPGy68u6hrs0r6je83RRByC8hkY_gtCS8YTmswGd5ulyYa5Y4IRJRkfSwbwdm_aAKXt0QTd8SPaOvF9yWYiooC2eoFCNJn43MYyLaBqRbVKWVaCkhnsP3Tmn-7-oj0FiCmj3IRqjYe2vcytMRaM-sfQwBYXaKn0bQik0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      for="card-name"
                    >
                      Name on Card
                    </label>
                    <div class="relative">
                      <input
                        class="block w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary transition-shadow"
                        id="card-name"
                        placeholder="John Doe"
                        type="text"
                      />
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span class="material-symbols-outlined text-slate-400">
                          person
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        for="expiry"
                      >
                        Expiry Date
                      </label>
                      <input
                        class="block w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary transition-shadow text-center"
                        id="expiry"
                        placeholder="MM / YY"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        for="cvc"
                      >
                        CVC / CVV
                      </label>
                      <div class="relative">
                        <input
                          class="block w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary transition-shadow"
                          id="cvc"
                          placeholder="123"
                          type="text"
                        />
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span class="material-symbols-outlined text-slate-400 text-lg">
                            lock
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 mt-4">
                  <input
                    class="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary dark:bg-slate-700 dark:border-slate-600"
                    id="save-card"
                    type="checkbox"
                  />
                  <label
                    class="text-sm text-slate-600 dark:text-slate-300"
                    for="save-card"
                  >
                    Save card for future purchases
                  </label>
                </div>
              </form>
            </section>
            <div class="flex justify-between items-center pt-4">
              <button class="flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors font-medium">
                <span class="material-symbols-outlined mr-1">arrow_back</span>
                Back to Shipping
              </button>
              <button class="lg:hidden bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2">
                Next: Review Order
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div class="lg:col-span-5 xl:col-span-4">
            <div class="sticky top-28 space-y-6">
              <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div class="p-6 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 class="font-bold text-lg text-slate-900 dark:text-white">
                    Order Review
                  </h3>
                  <span class="text-sm text-slate-500">2 Items</span>
                </div>
                <div class="p-6 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div class="flex gap-4">
                    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100">
                      <img
                        alt="Urban Runner X1"
                        class="h-full w-full object-cover object-center"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNF8EDkMr9hFqIwiJyWFy2Ay7UvEHfqVFTVNONlVd-J3kd04zStwMf5Zl-bA6ObkeQzJSIth1w3wZzRfux4D-jx5Ttrfg4TVfGTV8cwMeJYBynmUfURHIoufyMxs7ev9038gTW227HaMSr6o_hQWutVQw3FvxbyteXrIYMHggx4Oq3NVeIu9pi24hCzyMreHTadApagbTrh_ZOp6I4KJJdZ_1D7lcjzrW5hspARbWmETo7gZte28O-qIOY7nn962icgG-5_BfaEg"
                      />
                    </div>
                    <div class="flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-slate-900 dark:text-white">
                          <h3>Urban Runner X1</h3>
                          <p class="ml-4">$120.00</p>
                        </div>
                        <p class="mt-1 text-sm text-slate-500">
                          Size: 42 - Color: Red
                        </p>
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm">
                        <p class="text-slate-500">Qty 1</p>
                        <button
                          class="font-medium text-primary hover:text-primary-dark"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100">
                      <img
                        alt="Series 7 Watch"
                        class="h-full w-full object-cover object-center"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkK4AdAoHbXbkC_Kx478vfc36_jBjpr0Tmtw6c0z5g8PzLwlw4t_48JO2VnlgUftt2kcl0qEIWzOOdA1FqULRZf-HTn5Rx1Uzr3hHEr2FTdcFjhT8scoVJ1T6Qi4gAswpcjX5rRdEg7IaugPW-mIfmzdZqr0Q8f1OkmsZpU9R1AhW71WS9-P5U913BQWmwlIxS9xIHBc9EmJLs3k9UzBSV81UjsNSrz5DcdgPFsxaHijVJ1Kww0dixyfeLQJ7Vcu6G3429JvzfmIU"
                      />
                    </div>
                    <div class="flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-slate-900 dark:text-white">
                          <h3>Series 7 Watch</h3>
                          <p class="ml-4">$399.00</p>
                        </div>
                        <p class="mt-1 text-sm text-slate-500">Color: Black</p>
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm">
                        <p class="text-slate-500">Qty 1</p>
                        <button
                          class="font-medium text-primary hover:text-primary-dark"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700 p-6 space-y-4">
                  <div class="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <p>Subtotal</p>
                    <p class="font-medium text-slate-900 dark:text-white">
                      $519.00
                    </p>
                  </div>
                  <div class="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <p>Shipping</p>
                    <p class="font-medium text-slate-900 dark:text-white">
                      $15.00
                    </p>
                  </div>
                  <div class="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <p>Tax Estimate</p>
                    <p class="font-medium text-slate-900 dark:text-white">
                      $41.52
                    </p>
                  </div>
                  <div class="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
                    <p class="text-base font-bold text-slate-900 dark:text-white">
                      Order Total
                    </p>
                    <p class="text-2xl font-bold text-primary">$575.52</p>
                  </div>
                  <div class="pt-4">
                    <div class="flex gap-2">
                      <input
                        class="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="Promo code"
                        type="text"
                      />
                      <button
                        class="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        type="button"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                <div class="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
                  <button class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:translate-y-0 flex justify-center items-center gap-2 text-lg">
                    Place Order
                    <span class="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p class="text-xs text-center text-slate-400 mt-4 flex justify-center items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">
                      lock
                    </span>
                    Your transaction is secured with SSL encryption
                  </p>
                </div>
              </div>
              <div class="text-center">
                <p class="text-sm text-slate-500">
                  Need help?{" "}
                  <a class="text-primary hover:underline" href="#">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TrackShipping
