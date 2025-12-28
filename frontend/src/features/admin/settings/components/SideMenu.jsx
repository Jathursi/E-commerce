import React from 'react'

function SideMenu() {
  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <nav className="flex flex-col gap-1 sticky top-0">
        <a
          className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-card-dark shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg text-primary font-medium"
          href="#"
        >
          <span className="material-symbols-outlined text-[20px]">store</span>
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
          <span className="material-symbols-outlined text-[20px]">percent</span>
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
    </div>
  );
}

export default SideMenu
