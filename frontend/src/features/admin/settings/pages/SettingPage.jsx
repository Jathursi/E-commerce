import React from 'react'
import { Outlet } from 'react-router-dom';
function SettingPage() {
  return (
    <main >
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Admin Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your store configuration, payment gateways, and system
            preferences.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="flex flex-col gap-1 sticky top-0">
              <a
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-card-dark shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg text-primary font-medium"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  store
                </span>
                General Settings
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-card-dark hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  payments
                </span>
                Payment Settings
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-card-dark hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  local_shipping
                </span>
                Shipping Settings
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-card-dark hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  percent
                </span>
                Tax Settings
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-card-dark hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                Notifications
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-card-dark hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  security
                </span>
                Security
              </a>
            </nav>
          </div> */}
          <Outlet />
        </div>
      </div>
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
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

export default SettingPage
