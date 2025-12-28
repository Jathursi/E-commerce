import React from 'react'

function PaymentSetting() {
  return (
    <div className="flex-1 space-y-6">
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF]">
              <span className="material-symbols-outlined text-[24px]">
                credit_card
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Stripe Payment Gateway
              </h2>
              <p className="text-sm text-slate-500">
                Configure your Stripe account settings to accept credit card
                payments.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Enable
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                checked=""
                className="sr-only peer"
                type="checkbox"
                value=""
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Publishable Key
            </label>
            <input
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
              placeholder="pk_test_..."
              type="text"
              value="pk_test_51Mz..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Secret Key
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5 pr-10"
                placeholder="sk_test_..."
                type="password"
                value="sk_test_51Mz..."
              />
              <button className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <span className="material-symbols-outlined text-[20px]">
                  visibility_off
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                Test Mode
              </h4>
              <p className="text-xs text-slate-500">
                Use the test environment to simulate transactions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                checked=""
                className="sr-only peer"
                type="checkbox"
                value=""
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[#003087]/10 flex items-center justify-center text-[#003087] dark:text-blue-400">
              <span className="material-symbols-outlined text-[24px]">
                account_balance_wallet
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                PayPal Checkout
              </h2>
              <p className="text-sm text-slate-500">
                Allow customers to pay via PayPal wallet.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Enable
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer" type="checkbox" value="" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6 opacity-50 pointer-events-none select-none">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Client ID
            </label>
            <input
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
              placeholder="Enter Client ID"
              type="text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Secret Key
            </label>
            <input
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
              placeholder="Enter Secret Key"
              type="password"
            />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Payment Methods &amp; Rules
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Configure accepted payment types and additional fees.
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Accepted Payment Methods
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  checked=""
                  className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  id="cc"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300"
                  for="cc"
                >
                  Credit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked=""
                  className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  id="dc"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300"
                  for="dc"
                >
                  Debit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  id="nb"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300"
                  for="nb"
                >
                  Net Banking
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  id="wal"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300"
                  for="wal"
                >
                  Digital Wallets
                </label>
              </div>
            </div>
          </div>
          <hr className="border-slate-200 dark:border-slate-700" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                Cash on Delivery (COD)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold uppercase">
                  Active
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Allow customers to pay when they receive their order.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                checked=""
                className="sr-only peer"
                type="checkbox"
                value=""
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                COD Additional Fee (Flat)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 text-sm">
                  $
                </span>
                <input
                  className="w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                  placeholder="0.00"
                  type="number"
                  value="5.00"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extra charge for COD orders.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Global Transaction Fee (%)
              </label>
              <div className="relative">
                <input
                  className="w-full pr-8 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                  placeholder="0"
                  type="number"
                />
                <span className="absolute right-3 top-2.5 text-slate-500 text-sm">
                  %
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Applied to all online payments.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors shadow-lg shadow-primary/25">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default PaymentSetting
