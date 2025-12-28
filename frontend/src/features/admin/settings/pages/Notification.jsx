import React from 'react'

function Notification() {
  return (
    <div className="flex-1 space-y-6">
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
              <span className="material-symbols-outlined text-[24px]">
                notifications_active
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Event Notifications
              </h2>
              <p className="text-sm text-slate-500">
                Control which events trigger system emails.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                New Order Placed
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Notify admins and customers when a new purchase is made.
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
                Order Status Updates
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Send updates when an order is shipped, delivered, or cancelled.
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
                Low Stock Alerts
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Notify admins when product inventory falls below the threshold.
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
                New Customer Inquiry
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Receive notifications for new messages via the contact form.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input className="sr-only peer" type="checkbox" value="" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">
                mark_email_read
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Email Templates
              </h2>
              <p className="text-sm text-slate-500">
                Customize the content of automated emails.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Select Template
            </label>
            <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5">
              <option>Order Confirmation (Customer)</option>
              <option>New Order Notification (Admin)</option>
              <option>Order Shipped</option>
              <option>Password Reset</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Subject Line
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                placeholder="Your order has been received!"
                type="text"
                value="Order #{{order_id}} Confirmed - Thank you for shopping!"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Supports dynamic placeholders.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email Body
            </label>
            {/* <textarea
              className="w-full h-48 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-3 font-mono"
              placeholder="&lt;html&gt;...&lt;/html&gt;"
            >
              Hello {{ customer_name }}, We have received your order #
              {{ order_id }}. Total amount: {{ order_total }}. We will notify
              you once your items are shipped. Thanks,
              {{ store_name }} Team
            </textarea> */}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
            <h4 className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-300 mb-2">
              Available Placeholders
            </h4>
            <div className="flex flex-wrap gap-2">
              {/* <span className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-blue-100 dark:border-slate-700 font-mono">
                {{ customer_name }}
              </span>
              <span className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-blue-100 dark:border-slate-700 font-mono">
                {{ order_id }}
              </span>
              <span className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-blue-100 dark:border-slate-700 font-mono">
                {{ order_total }}
              </span>
              <span className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-blue-100 dark:border-slate-700 font-mono">
                {{ store_name }}
              </span>
              <span className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-blue-100 dark:border-slate-700 font-mono">
                {{ tracking_url }}
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Delivery Settings
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Configure who receives notifications and how often.
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Admin Notification Email(s)
            </label>
            <input
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
              placeholder="admin@example.com, support@example.com"
              type="text"
              value="jane@store.com"
            />
            <p className="text-xs text-slate-400 mt-1">
              Separate multiple emails with commas.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Low Stock Threshold
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                placeholder="5"
                type="number"
                value="10"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Trigger alert when quantity is below this.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Notification Frequency
            </label>
            <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5">
              <option>Instant (Real-time)</option>
              <option>Daily Digest</option>
              <option>Weekly Summary</option>
            </select>
            <p className="text-xs text-slate-400 mt-1">
              How often do you want to be notified?
            </p>
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

export default Notification
