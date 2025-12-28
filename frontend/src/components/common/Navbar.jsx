import React from "react";
import { useAuth } from "../../features/auth/hooks/useAuth"; // assuming you have this hook
import { FaCartShopping } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";
function Navbar() {
  const { user, logout, loading } = useAuth(); // get user info and logout function

  const handleLogout = () => {
    logout();
    // Force state update before redirect
    setTimeout(() => {
      window.location.href = "/login"; // redirect to login after logout
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="size-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                <FaShopify />
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">ShopLogo</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex">
            <div className="flex justify-between items-center gap-4">
              <div className="cursor-pointer">Women</div>
              <div className="cursor-pointer">Men</div>
              <div className="cursor-pointer">Babies</div>
              <div className="cursor-pointer">Gifts</div>
              <div className="cursor-pointer">Sale</div>
              <div className="cursor-pointer">Decors</div>
            </div>
            {/* <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                placeholder="Search for products, brands and more..."
                type="text"
              />
            </div> */}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* <a
              className="hidden md:block text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Categories
            </a> */}

            {/* Conditional Login/Logout */}
            {!loading && (
              <div className="hidden md:flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-6">
                {!user ? (
                  <>
                    <a
                      className="text-sm font-medium hover:text-primary transition-colors"
                      href="/login"
                    >
                      Login
                    </a>
                    <a
                      className="text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      href="/register"
                    >
                      Sign Up
                    </a>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}

            {/* Cart Icon */}
            <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors text-3xl">
                <FaCartShopping />
              </span>
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                2
              </span>
            </button>

            {/* Mobile Menu */}
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
