import React, { useState } from 'react'
import { addUser } from '../services/admin.user.api';

function AddUser({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'customer',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'confirmPassword' || id === 'password') {
      setPasswordMatch(formData.password === (id === 'confirmPassword' ? value : formData.confirmPassword));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await addUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      onUserAdded();
      onClose();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to add user' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add User
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Create a new user account.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                htmlFor="fullName"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                  person
                </span>
                <input
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 transition-shadow ${
                    errors.fullName ? 'border-red-300 dark:border-red-900/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-primary'
                  }`}
                  id="fullName"
                  placeholder="e.g. Jane Doe"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                htmlFor="email"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                  mail
                </span>
                <input
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 transition-shadow ${
                    errors.email ? 'border-red-300 dark:border-red-900/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-primary'
                  }`}
                  id="email"
                  placeholder="e.g. jane@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                htmlFor="role"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                  badge
                </span>
                <select
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100 dark:border-slate-700/50">
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                    lock
                  </span>
                  <input
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 ${
                      errors.password ? 'border-red-300 dark:border-red-900/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-primary'
                    }`}
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Min. 8 characters
                </p>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                    lock_reset
                  </span>
                  <input
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 ${
                      !passwordMatch && formData.confirmPassword ? 'border-red-300 dark:border-red-900/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-primary'
                    }`}
                    id="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      error
                    </span>
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm shadow-primary/30 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">save</span>
            {loading ? 'Saving...' : 'Save User'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser
