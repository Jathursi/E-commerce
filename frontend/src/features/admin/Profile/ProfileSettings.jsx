import React from 'react'

function ProfileSettings() {
  return (
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <img
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubK8vAlPuvbREI8aOjX5ryYXXpfIEtvyVWvYl7u7XLO8nDb-O-9NHkv-ZJzAEZsuaTUtHC-WlB7S90XB5C_R2BLzskobM4XgM4FPTqsrME6KxPjk97_jYjOKJCfmQEeI9lhXPGfj8Fygod3f1iPKSJdj4chqZOVflpu0JtZTDqN5fZ1R6zPnPbr9Hvc_QdbmFqs6qXJ-9o61jXlhRcaM4Cc9NI6vq9isYtJYT6_nlS7rYgTE-NSnoHHMBFFQOTy66F8XB9sVFQD4"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Alex Morgan
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  alex.m@example.com
                </p>
              </div>
            </div>
            <nav className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <a
                className="flex items-center gap-3 px-6 py-4 bg-primary/5 text-primary border-l-4 border-primary border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="font-medium">Profile</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary transition-colors border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="font-medium">Orders</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary transition-colors border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">favorite</span>
                <span className="font-medium">Wishlist</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary transition-colors border-b border-slate-100 dark:border-slate-700/50"
                href="#"
              >
                <span className="material-symbols-outlined">location_on</span>
                <span className="font-medium">Address</span>
              </a>
              <a
                className="flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-medium">Logout</span>
              </a>
            </nav>
          </div>
        </aside>
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Profile Settings
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Update your personal details and security settings.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                  <div className="relative group">
                    <img
                      alt="User Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 dark:border-slate-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubK8vAlPuvbREI8aOjX5ryYXXpfIEtvyVWvYl7u7XLO8nDb-O-9NHkv-ZJzAEZsuaTUtHC-WlB7S90XB5C_R2BLzskobM4XgM4FPTqsrME6KxPjk97_jYjOKJCfmQEeI9lhXPGfj8Fygod3f1iPKSJdj4chqZOVflpu0JtZTDqN5fZ1R6zPnPbr9Hvc_QdbmFqs6qXJ-9o61jXlhRcaM4Cc9NI6vq9isYtJYT6_nlS7rYgTE-NSnoHHMBFFQOTy66F8XB9sVFQD4"
                    />
                    <button
                      className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                      title="Change Avatar"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        photo_camera
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 text-center max-w-[150px]">
                    Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 MB
                  </p>
                </div>
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      First Name
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                      type="text"
                      value="Alex"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Last Name
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                      type="text"
                      value="Morgan"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">
                          mail
                        </span>
                      </span>
                      <input
                        className="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                        type="email"
                        value="alex.m@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">
                          call
                        </span>
                      </span>
                      <input
                        className="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                        type="tel"
                        value="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm">
                  Cancel
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-blue-600 font-medium transition-colors text-sm shadow-lg shadow-primary/25">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Change Password
                </h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Current Password
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      New Password
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                      placeholder="••••••••"
                      type="password"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Minimum 8 characters, at least one uppercase and one
                      symbol.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Confirm New Password
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow py-2.5 px-4"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                  <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm">
                    Cancel
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-blue-600 font-medium transition-colors text-sm shadow-lg shadow-primary/25">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Preferences
                </h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Notifications
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:border-primary/30 transition-colors">
                        <input
                          checked=""
                          className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                          type="checkbox"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          Email Notifications
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:border-primary/30 transition-colors">
                        <input
                          className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                          type="checkbox"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          SMS Alerts
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Theme Settings
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-primary bg-primary/5 text-primary">
                        <span className="material-symbols-outlined">
                          light_mode
                        </span>
                        <span className="text-xs font-bold">Light</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500">
                        <span className="material-symbols-outlined">
                          dark_mode
                        </span>
                        <span className="text-xs font-medium">Dark</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500">
                        <span className="material-symbols-outlined">
                          settings_system_daydream
                        </span>
                        <span className="text-xs font-medium">System</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                  <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm">
                    Reset
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-blue-600 font-medium transition-colors text-sm shadow-lg shadow-primary/25">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfileSettings
