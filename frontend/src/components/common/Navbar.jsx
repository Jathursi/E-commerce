import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth"; // assuming you have this hook
import { FaCartShopping } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";
import http from "../../services/http.service";
import { MdInventory2 } from "react-icons/md";
import { getCart } from "../../features/cart/services/cart.api";
function Navbar() {
  const { user, logout, loading } = useAuth(); // get user info and logout function
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const basePath = user ? '/user' : '';

  const handleLogout = () => {
    logout();
    // Force state update before redirect
    setTimeout(() => {
      window.location.href = "/login"; // redirect to login after logout
    }, 100);
  };

  // Fetch cart count on mount and when user changes
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (user) {
          const cartItems = await getCart();
          setCartCount(Array.isArray(cartItems) ? cartItems.length : 0);
        } else {
          setCartCount(0);
        }
      } catch (err) {
        console.error('Error fetching cart count:', err);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [user]);

  // Debounced search
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const response = await http.get(`/products?search=${searchQuery.trim()}`);
          const productsList = Array.isArray(response) 
            ? response 
            : (response?.data || response?.products || []);
          
          // Extract unique search keywords from products that START WITH search query
          const keywords = new Set();
          const searchTerm = searchQuery.trim().toLowerCase();
          
          productsList.forEach(product => {
            if (product.searchKeywords && Array.isArray(product.searchKeywords)) {
              product.searchKeywords.forEach(keyword => {
                // Only add keywords that START WITH the search query
                if (keyword.toLowerCase().startsWith(searchTerm)) {
                  keywords.add(keyword);
                }
              });
            }
          });
          
          // Convert to array and limit to 8 results
          setSearchResults(Array.from(keywords).slice(0, 8));
          setShowDropdown(Array.from(keywords).length > 0);
        } catch (err) {
          console.error('Search error:', err);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${basePath}/search?search=${searchQuery.trim()}`);
      setShowDropdown(false);
      setSearchQuery("");
    }
  };

  const handleKeywordSelect = (keyword) => {
    navigate(`${basePath}/search?search=${keyword}`);
    setShowDropdown(false);
    setSearchQuery("");
  };

  

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={()=> navigate(user ? '/user' : '/') }>
            <div className="size-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                <FaShopify />
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">ShopLogo</h1>
          </div>

          {/* Category Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex justify-between items-center gap-4">
              <div 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`${basePath}/search?category=Women`)}
              >
                Women
              </div>
              <div 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`${basePath}/search?category=Men`)}
              >
                Men
              </div>
              <div 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`${basePath}/search?category=Babies`)}
              >
                Babies
              </div>
              <div 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`${basePath}/search?category=Gifts`)}
              >
                Gifts
              </div>
              <div 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`${basePath}/search?category=Sale`)}
              >
                Sale
              </div>
              <div 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`${basePath}/search?category=Decors`)}
              >
                Decors
              </div>
            </div>

            {/* Search Bar with Dropdown */}
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-64 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                    search
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                  placeholder="Search products..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                />
              </form>

              {/* Search Results Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div 
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
                >
                  {isSearching ? (
                    <div className="p-4 text-center text-slate-500">
                      Searching...
                    </div>
                  ) : (
                    <>
                      {searchResults.map((keyword, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleKeywordSelect(keyword)}
                          className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">🔍</span>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {keyword}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={() => {
                          navigate(`${basePath}/search?search=${searchQuery.trim()}`);
                          setShowDropdown(false);
                          setSearchQuery("");
                        }}
                        className="p-3 text-center text-sm text-primary hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer font-medium"
                      >
                        Search for "{searchQuery}"
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
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

            {user && (
              <button
                onClick={() => navigate('/user/orders')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <MdInventory2 className="text-base" />
                Orders
              </button>
            )}

            {/* Cart Icon */}
            <button 
              onClick={() => navigate('/user/cart')}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors text-3xl">
                <FaCartShopping />
              </span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
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
