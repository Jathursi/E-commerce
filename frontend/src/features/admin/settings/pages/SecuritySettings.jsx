import React from 'react'

function SecuritySettings() {
  return (
    <div className="flex-1 space-y-6">
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <span className="material-symbols-outlined text-[24px]">
                lock_reset
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Password &amp; Authentication
              </h2>
              <p className="text-sm text-slate-500">
                Manage your password and global security policies.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm shrink-0 hidden sm:block">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-300 text-[20px]">
                  key
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  My Password
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Last changed 3 months ago. Make sure your password is strong.
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors shadow-sm w-full sm:w-auto text-center">
              Change Password
            </button>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
              Global Password Policy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Minimum Length
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                    placeholder="8"
                    type="number"
                    value="12"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Recommended length is 12+ characters.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Password Expiry
                </label>
                <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5">
                  <option>Never</option>
                  <option>Every 30 Days</option>
                  <option selected="">Every 90 Days</option>
                  <option>Every 180 Days</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Require Special Characters
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Users must include a symbol (e.g., !@#$) in their password.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    checked=""
                    className="sr-only peer"
                    type="checkbox"
                    value=""
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <hr className="border-slate-100 dark:border-slate-800" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Require Numbers
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Users must include at least one numeric character.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
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
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">
                phonelink_lock
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Two-Factor Authentication (2FA)
              </h2>
              <p className="text-sm text-slate-500">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Status:
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Enabled
            </span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                Enable 2FA for all admin accounts
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Enforce 2FA for every administrator login.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                checked=""
                className="sr-only peer"
                type="checkbox"
                value=""
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Preferred 2FA Method
            </h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  checked=""
                  className="form-radio text-primary focus:ring-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                  name="2fa_method"
                  type="radio"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Authenticator App (Recommended)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="form-radio text-primary focus:ring-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                  name="2fa_method"
                  type="radio"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  SMS / Text Message
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  className="form-radio text-primary focus:ring-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                  name="2fa_method"
                  type="radio"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Email Verification
                </span>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  settings
                </span>
                Configure Authenticator App
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Active Sessions &amp; Access
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Monitor active sessions and restrict access by IP.
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Current Active Sessions
            </h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-primary/20 dark:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm">
                  <span className="material-symbols-outlined">desktop_mac</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Chrome on Windows
                    </p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                      Current
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    192.168.1.12 • New York, USA • Active now
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Safari on iPhone 14
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    10.0.0.45 • New York, USA • Active 2h ago
                  </p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors">
                Revoke
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Admin Access IP Whitelist
            </label>
            <textarea
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-3 font-mono h-24"
              placeholder="Enter one IP address per line..."
            ></textarea>
            <div className="flex justify-between mt-2">
              <p className="text-xs text-slate-400">
                Only users from these IPs will be able to access the admin
                panel. Leave empty to allow all.
              </p>
              <a className="text-xs text-primary hover:underline" href="#">
                View Security Logs
              </a>
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

export default SecuritySettings
