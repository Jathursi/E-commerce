import React from 'react'
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { CiSettings } from "react-icons/ci";
import { IoMdHelp } from "react-icons/io";
function Sidebar({ isOpen = false, onClose }) {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-3 py-2.5 bg-primary/10 text-primary rounded-lg font-medium"
      : "flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors font-medium";
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-200 ease-in-out z-40 md:z-20
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}
      aria-label="Sidebar"
    >
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">
              shopping_bag
            </span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">AdminPanel</h1>
        </div>
        <button
          type="button"
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <span className="material-symbols-outlined">X</span>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <NavLink
          className={navLinkClass}
          to="/admin/dashboard"
        >
          <span className="material-symbols-outlined"><MdDashboard /></span>
          Dashboard
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/admin/products"
        >
          <span className="material-symbols-outlined"><MdInventory /></span>
          Products
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/admin/categories"
        >
          <span className="material-symbols-outlined"><MdCategory /></span>
          Categories
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/admin/orders"
        >
          <span className="material-symbols-outlined"><FaCartShopping /></span>
          Orders
          <span className="ml-auto bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
            3
          </span>
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/admin/users"
        >
          <span className="material-symbols-outlined"><FaUsers /></span>
          Users
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/admin/reports"
        >
          <span className="material-symbols-outlined"><SiSimpleanalytics /></span>
          Reports
        </NavLink>
        <div className="pt-6 pb-2">
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            System
          </p>
          <NavLink
            className={navLinkClass}
            to="/admin/settings"
          >
            <span className="material-symbols-outlined"><CiSettings /></span>
            Settings
          </NavLink>
          <a
            className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors font-medium"
            href="#"
          >
            <span className="material-symbols-outlined"><IoMdHelp /></span>
            Help Center
          </a>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <img
            alt="Admin User"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCC0nN1UxvewODGENKGTpcbKGvzRwwHEIKbxIBSXM-YkXJ0Brd5bUjipkiYANSNUowpVkeGONqhHwIkUPHAgcqANoIAhjtxgdSSmYompsP4CcmO-Gm50lG2vdTv-TbAoZ8flvxryHdOiv9Bj5YRSG_c9l6s79emseCNdrDn8nm3well9yz2fkEiZoINwMN4m0t2PlfKVqcd47ViT-qRI-gkYrfxGZBEKabHiFrTs2WgkrLz0aAOVbsQrZg7H-96QKBMwxAG6zQD04"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              Alex Morgan
            </p>
            <p className="text-xs text-slate-500 truncate">Administrator</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar
