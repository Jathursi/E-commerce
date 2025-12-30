import React from 'react'
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
function TopBar({ onMenuClick }) {
  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          aria-label="Open menu"
        >
          <FaBars />
        </button>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white hidden sm:block">
          Dashboard Overview
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block max-w-xs">
          <span className="absolute left-3 top-2 text-slate-400 text-[20px]">
            <IoSearch />
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 text-slate-700 dark:text-slate-200 placeholder-slate-400"
            placeholder="Search..."
            type="text"
          />
        </div>
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
          <span className="text-[30px]"><IoMdNotifications /></span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
        </button>
        <button className="sm:hidden w-8 h-8 rounded-full overflow-hidden">
          <img
            alt="Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCC0nN1UxvewODGENKGTpcbKGvzRwwHEIKbxIBSXM-YkXJ0Brd5bUjipkiYANSNUowpVkeGONqhHwIkUPHAgcqANoIAhjtxgdSSmYompsP4CcmO-Gm50lG2vdTv-TbAoZ8flvxryHdOiv9Bj5YRSG_c9l6s79emseCNdrDn8nm3well9yz2fkEiZoINwMN4m0t2PlfKVqcd47ViT-qRI-gkYrfxGZBEKabHiFrTs2WgkrLz0aAOVbsQrZg7H-96QKBMwxAG6zQD04"
          />
        </button>
      </div>
    </header>
  );
}

export default TopBar
