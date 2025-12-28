import React from 'react'

function AdminOrders() {
  return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Filter Orders
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Narrow down your list by status or date.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-48">
                <select className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-200 appearance-none">
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className="absolute right-3 top-2.5 pointer-events-none text-slate-500 material-symbols-outlined text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="relative w-full sm:w-48">
                <input
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-200"
                  placeholder="Filter by date"
                  type="date"
                />
              </div>
              <button className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  filter_list
                </span>
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              All Orders
            </h3>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <span className="material-symbols-outlined">download</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <span className="material-symbols-outlined">print</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Update Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    #ORD-5532
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9I8_tyUbviAorXatCl07Xeu5LpOAgYthbm8y73PlWJsnHjEu-f-Zwu8pfTokHUCgyITKbgFZqEXAlB7r-I0Pl5_iwItg7DeZgtsYH0210miuqTqC2UkwgLOOI2KfpKGukSAkJ35ydSpnDmxOMNOVvCBoahWePsBJL47Wej8kycewXxUohO5tu8lGAVZmESvp6WGYe6-yl4CFFaHCmTj9HOyi6HkANYpNGOl5Z1xA-rdnHiSIOZdnfhcZPJHyPOV6k5A3KZ08mVc"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Sarah Johnson
                        </div>
                        <div className="text-xs text-slate-400">
                          sarah.j@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    $120.00
                  </td>
                  <td className="px-6 py-4">Oct 24, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left">
                      <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 cursor-pointer">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option selected="">Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 hover:bg-primary/5 rounded px-3 py-1.5 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    #ORD-5531
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgWt6YId3ySAvK6GqDx8pH4_qGOyBY33IdgKu8J7qEMXVMZRHzE0GBRZqw_7_WdD7VWiCApZaET6dVrL8k__YJ5uMGBaYI1oOg0y9Z9pqiLbuqVOfA9Un3yaVn-mPNRZHPxlWZrfoqS8mFQDRfFqB7TfdneboNRpAaT_5Ygve-_iHW5H7FqT-5_kuqe1FN6qaerkJTY0njyr-LiYeuiuT2AyhzFdM3QGJ0oqjX2ymAA6u88dbgBvp_lKpsD2qvOZiMXyDMiv6EKYY"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Michael Chen
                        </div>
                        <div className="text-xs text-slate-400">
                          m.chen@design.co
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    $299.00
                  </td>
                  <td className="px-6 py-4">Oct 24, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left">
                      <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 cursor-pointer">
                        <option>Pending</option>
                        <option selected="">Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 hover:bg-primary/5 rounded px-3 py-1.5 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    #ORD-5530
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH_dLFqnkTn7Cok0X5B3Jq-KAa-wgZxOhi9gCtCW6Y_WnhOY6oPpW4sN2fjokwltUGi_CdelOciFDaBkgS-yxHPUjqpgtQ6jUK-48UNVMJn0C5gdKYMyYJ9ZFL8v9ulBfrx9mrSUz9RD9rqT7xnAQRotgTj-cbd32RLex0NQX4VGVAo8Qc6wgniKoS301TMmnqxkrM5onASwh6vD03SdPE-qM_H_O1en6aQkEXpPtaCLT-sbmUCdh924Th6fhYZdwXbE7x4aJHxxI"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Emily Davis
                        </div>
                        <div className="text-xs text-slate-400">
                          emily.d@mail.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    $89.99
                  </td>
                  <td className="px-6 py-4">Oct 23, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left">
                      <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 cursor-pointer">
                        <option selected="">Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 hover:bg-primary/5 rounded px-3 py-1.5 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    #ORD-5529
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWWkEOJ3XAZFQNlfR4OenqWDRUU2eGN-V0z75dXooBzqUMh9UdUDftMNapoBvZ7QAL8f1xXiXp8TSMA3DyV_DdEMHBYxQJls_P8gdx1luSzx9p3Wb2-9HDTOjCz8t2xuSMSMvTRzXFN1F23uJghFWUaJL5164uriZHS2OGlXbZNiNmKkpplgas1XuszFf4hdeLamFjNeiw-swmkBmzGrtH2iVknBTa6K5t6JVZOuHyW8Yb7LczypVPXNxdxOrHu9SWtvVli9ruvf0"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          David Wilson
                        </div>
                        <div className="text-xs text-slate-400">
                          david.w@tech.io
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    $145.00
                  </td>
                  <td className="px-6 py-4">Oct 23, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      Cancelled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left">
                      <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 cursor-pointer">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option selected="">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 hover:bg-primary/5 rounded px-3 py-1.5 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    #ORD-5528
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        JL
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Jessica Lee
                        </div>
                        <div className="text-xs text-slate-400">
                          jess.lee@domain.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    $560.50
                  </td>
                  <td className="px-6 py-4">Oct 22, 2024</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      Shipped
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left">
                      <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 cursor-pointer">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option selected="">Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 hover:bg-primary/5 rounded px-3 py-1.5 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
            <p>Showing 1-5 of 120 orders</p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                disabled=""
              >
                Prev
              </button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700">
                Next
              </button>
            </div>
          </div>
        </div>
        <footer className="mt-8 text-center text-xs text-slate-400 pb-4">
          © 2024 E-commerce Admin System. All rights reserved.
        </footer>
      </div>
  );
}

export default AdminOrders
