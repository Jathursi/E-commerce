import React from 'react'

function ShippingSetting() {
  return (
    <div className="flex-1 space-y-6">
                        <div
                            className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div
                                className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center flex-wrap gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Shipping Zones</h2>
                                    <p className="text-sm text-slate-500 mt-1">Manage countries and regions where you ship
                                        your products.</p>
                                </div>
                                <button
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700">
                                    Add Shipping Zone
                                </button>
                            </div>
                            <div className="p-6">
                                <div
                                    className="border border-slate-200 dark:border-slate-700 rounded-lg divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/20">
                                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary flex-shrink-0">
                                                <span className="material-symbols-outlined">flag</span>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                    Domestic (United States)</h3>
                                                <p className="text-xs text-slate-500 mt-0.5">50 States · Free Shipping,
                                                    Standard</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 self-end sm:self-auto">
                                            <button
                                                className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><span
                                                    className="material-symbols-outlined text-[20px]">edit</span></button>
                                            <button
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><span
                                                    className="material-symbols-outlined text-[20px]">delete</span></button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 flex-shrink-0">
                                                <span className="material-symbols-outlined">public</span>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                    International (Rest of World)</h3>
                                                <p className="text-xs text-slate-500 mt-0.5">238 Countries · DHL Express</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 self-end sm:self-auto">
                                            <button
                                                className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><span
                                                    className="material-symbols-outlined text-[20px]">edit</span></button>
                                            <button
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><span
                                                    className="material-symbols-outlined text-[20px]">delete</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">General Rates &amp; Fees
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Set default shipping calculations and handling
                                    charges.</p>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Free
                                        Shipping Threshold</label>
                                    <div className="relative">
                                        <span
                                            className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">attach_money</span>
                                        <input
                                            className="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                            placeholder="0.00" step="0.01" type="number" value="150.00" />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Cart value required to trigger free shipping.
                                    </p>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Handling
                                        Fee</label>
                                    <div className="relative">
                                        <span
                                            className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">attach_money</span>
                                        <input
                                            className="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                            placeholder="0.00" step="0.01" type="number" value="2.50" />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Additional fee added to every shipment.</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Delivery
                                        Time Estimate (Business Days)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 relative">
                                            <input
                                                className="w-full pr-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                                placeholder="Min" type="number" value="3" />
                                            <span
                                                className="absolute right-3 top-2.5 text-xs text-slate-500 font-medium">MIN</span>
                                        </div>
                                        <span className="text-slate-400 font-medium">-</span>
                                        <div className="flex-1 relative">
                                            <input
                                                className="w-full pr-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                                placeholder="Max" type="number" value="7" />
                                            <span
                                                className="absolute right-3 top-2.5 text-xs text-slate-500 font-medium">MAX</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">This range is displayed to customers at
                                        checkout.</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Default Package</h2>
                                <p className="text-sm text-slate-500 mt-1">Default dimensions used for calculating carrier
                                    rates.</p>
                            </div>
                            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Length</label>
                                    <div className="relative">
                                        <input
                                            className="w-full pr-8 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                            type="number" value="12" />
                                        <span className="absolute right-3 top-2.5 text-xs text-slate-400">in</span>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Width</label>
                                    <div className="relative">
                                        <input
                                            className="w-full pr-8 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                            type="number" value="8" />
                                        <span className="absolute right-3 top-2.5 text-xs text-slate-400">in</span>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Height</label>
                                    <div className="relative">
                                        <input
                                            className="w-full pr-8 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                            type="number" value="4" />
                                        <span className="absolute right-3 top-2.5 text-xs text-slate-400">in</span>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weight</label>
                                    <div className="relative">
                                        <input
                                            className="w-full pr-8 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5"
                                            step="0.1" type="number" value="1.5" />
                                        <span className="absolute right-3 top-2.5 text-xs text-slate-400">lb</span>
                                    </div>
                                </div>
                                <div className="col-span-2 md:col-span-4">
                                    <label
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Unit
                                        System</label>
                                    <select
                                        className="w-full md:w-1/2 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm p-2.5">
                                        <option selected="">Imperial (lb, in)</option>
                                        <option>Metric (kg, cm)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Carrier Integrations</h2>
                                <p className="text-sm text-slate-500 mt-1">Connect with shipping providers for real-time
                                    rates and label generation.</p>
                            </div>
                            <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-12 rounded-lg bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                                            <span className="font-black text-[#4D148C] leading-none text-sm">Fed</span><span
                                                className="font-black text-[#FF6600] leading-none text-sm">Ex</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">FedEx</h3>
                                            <p className="text-xs text-slate-500">Enable calculated rates at checkout</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input checked="" className="sr-only peer" type="checkbox" value="" />
                                            <div
                                                className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                                            </div>
                                        </label>
                                        <button
                                            className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Configure</button>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-12 rounded-lg bg-[#351C15] border border-slate-200 p-2 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-[#FFB500] text-xs">UPS</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">UPS</h3>
                                            <p className="text-xs text-slate-500">Enable calculated rates at checkout</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input className="sr-only peer" type="checkbox" value="" />
                                            <div
                                                className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                                            </div>
                                        </label>
                                        <button
                                            className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Configure</button>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-12 rounded-lg bg-[#004B87] border border-slate-200 p-2 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-white text-[10px] tracking-tighter">USPS</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">USPS</h3>
                                            <p className="text-xs text-slate-500">Enable calculated rates at checkout</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input className="sr-only peer" type="checkbox" value="" />
                                            <div
                                                className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                                            </div>
                                        </label>
                                        <button
                                            className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Configure</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-transparent">
                            <button
                                className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors shadow-lg shadow-primary/25">
                                Save Changes
                            </button>
                        </div>
                    </div>
  )
}

export default ShippingSetting
