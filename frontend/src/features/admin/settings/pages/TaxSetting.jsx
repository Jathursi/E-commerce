import React from 'react'

function TaxSetting() {
  return (
    <div class="flex-1 space-y-6">
      <div class="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div class="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              Tax Rates &amp; Zones
            </h2>
            <p class="text-sm text-slate-500 mt-1">
              Manage tax rates for different geographical regions.
            </p>
          </div>
          <button class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700">
            Add Tax Rate
          </button>
        </div>
        <div class="p-6">
          <div class="border border-slate-200 dark:border-slate-700 rounded-lg divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/20">
            <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="size-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <span class="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
                    Domestic Sales Tax (US)
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">
                    Applies to United States · Rate: 6% (Combined Average)
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2 self-end sm:self-auto">
                <button class="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                  <span class="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </button>
                <button class="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                  <span class="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
            <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary flex-shrink-0">
                  <span class="material-symbols-outlined">public</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
                    European Union (VAT)
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">
                    Applies to 27 Countries · Rate: 20% · OSS Enabled
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2 self-end sm:self-auto">
                <button class="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                  <span class="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </button>
                <button class="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                  <span class="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div class="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">
            Tax Configuration
          </h2>
          <p class="text-sm text-slate-500 mt-1">
            Configure global tax calculation settings and display options.
          </p>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <div>
              <label class="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Enable Tax Calculation
              </label>
              <p class="text-xs text-slate-500">
                Calculate taxes at checkout based on customer address.
              </p>
            </div>
            <label class="inline-flex items-center cursor-pointer mt-1">
              <input checked="" class="sr-only peer" type="checkbox" value="" />
              <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div class="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <div>
              <label class="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Prices Include Tax
              </label>
              <p class="text-xs text-slate-500">
                If enabled, catalog prices will be treated as tax-inclusive.
              </p>
            </div>
            <label class="inline-flex items-center cursor-pointer mt-1">
              <input class="sr-only peer" type="checkbox" value="" />
              <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Default Tax Name
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                badge
              </span>
              <input
                class="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                placeholder="e.g. VAT, Tax, GST"
                type="text"
                value="Tax"
              />
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Displayed to customers during checkout.
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Calculate Tax Based On
            </label>
            <select class="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5">
              <option selected="">Customer Shipping Address</option>
              <option>Customer Billing Address</option>
              <option>Store Base Address</option>
            </select>
            <p class="text-xs text-slate-400 mt-1">
              Determines which geographical rule applies.
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div class="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">
              Tax Classes &amp; Exemptions
            </h2>
            <p class="text-sm text-slate-500 mt-1">
              Define tax classes for specific product types or exemptions.
            </p>
          </div>
          <button class="text-primary hover:text-primary-dark text-sm font-medium">
            Manage Classes
          </button>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="relative group">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Standard Rate
            </label>
            <div class="relative">
              <input
                class="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                readonly=""
                type="text"
                value="Default Class"
              />
              <span class="absolute right-3 top-2.5 text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 rounded">
                System
              </span>
            </div>
          </div>
          <div class="relative group">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Reduced Rate
            </label>
            <div class="relative">
              <input
                class="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                type="text"
                value="Food &amp; Essentials"
              />
            </div>
          </div>
          <div class="relative group">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Zero Rate (Exempt)
            </label>
            <div class="relative">
              <input
                class="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                type="text"
                value="Digital Goods"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div class="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">
            Automated Tax Services
          </h2>
          <p class="text-sm text-slate-500 mt-1">
            Connect with external providers for automatic tax calculation and
            filing.
          </p>
        </div>
        <div class="divide-y divide-slate-200 dark:divide-slate-700">
          <div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="size-12 rounded-lg bg-orange-500/10 border border-orange-200 dark:border-orange-900/50 p-2 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-orange-600">
                  cloud_sync
                </span>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
                  Avalara AvaTax
                </h3>
                <p class="text-xs text-slate-500">
                  Real-time tax calculation for 12,000+ jurisdictions
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  checked=""
                  class="sr-only peer"
                  type="checkbox"
                  value=""
                />
                <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <button class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Configure
              </button>
            </div>
          </div>
          <div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="size-12 rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-900/50 p-2 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-blue-600">
                  account_tree
                </span>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
                  TaxJar
                </h3>
                <p class="text-xs text-slate-500">
                  Automated sales tax reporting and filing
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center cursor-pointer">
                <input class="sr-only peer" type="checkbox" value="" />
                <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <button class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-transparent">
        <button class="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
          Cancel
        </button>
        <button class="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors shadow-lg shadow-primary/25">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default TaxSetting
