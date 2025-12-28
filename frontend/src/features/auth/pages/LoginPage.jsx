import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { validateLogin, validateRegister } from "../validators/auth.validation";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login, register, loading, error } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    let validationErrors = {};

    if (activeTab === "login") {
      validationErrors = validateLogin(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        console.log("Login successful:", response);
        
        if (response && response.role) {
          const userRole = response.role;
          if (userRole === "admin") {
            navigate("/admin");
          } else if (userRole === "user") {
            navigate("/user");
          }
        } else {
          setErrors({ general: "Login response invalid" });
        }
      } catch (err) {
        console.log(
          "Server error:",
          err.response?.data?.message || err.message
        );
        setErrors({ general: err.response?.data?.message || "Login failed" });
      }
    } else {
      validationErrors = validateRegister(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        console.log("Registration successful");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        setActiveTab("login");
      } catch (err) {
        console.log(
          "Server error:",
          err.response?.data?.message || err.message
        );
        setErrors({ general: err.response?.data?.message || "Registration failed" });
      }
    }
  };



  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      <nav className="w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (window.location.href = "#")}
          >
            <div className="size-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                shopping_bag
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">ShopLogo</h1>
          </div>
          <a
            className="text-sm font-medium text-slate-500 hover:text-primary flex items-center gap-1"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Back to Store
          </a>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 relative z-10">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
            <button
              className={`flex-1 pb-4 text-sm font-medium ${
                activeTab === "login"
                  ? "text-slate-900 dark:text-white border-b-2 border-primary"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </button>
            <button
              className={`flex-1 pb-4 text-sm font-medium ${
                activeTab === "register"
                  ? "text-slate-900 dark:text-white border-b-2 border-primary"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Show server error from useAuth */}
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          {errors.general && (
            <div className="text-red-500 text-sm mb-4 text-center">{errors.general}</div>
          )}

          {/* Forms */}
          {activeTab === "login" ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-blue-600 transition-all"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-blue-600 transition-all"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
