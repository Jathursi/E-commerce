import React, { useEffect, useMemo, useState } from 'react'
import http from '../../../../services/http.service'

function AdminOrders() {
  // Fallback sample in case of empty/failed fetch
  const sampleOrders = useMemo(() => ([
    {
      id: '#ORD-5532',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@example.com',
      customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9I8_tyUbviAorXatCl07Xeu5LpOAgYthbm8y73PlWJsnHjEu-f-Zwu8pfTokHUCgyITKbgFZqEXAlB7r-I0Pl5_iwItg7DeZgtsYH0210miuqTqC2UkwgLOOI2KfpKGukSAkJ35ydSpnDmxOMNOVvCBoahWePsBJL47Wej8kycewXxUohO5tu8lGAVZmESvp6WGYe6-yl4CFFaHCmTj9HOyi6HkANYpNGOl5Z1xA-rdnHiSIOZdnfhcZPJHyPOV6k5A3KZ08mVc',
      total: 120.0,
      date: 'Oct 24, 2024',
      status: 'delivered',
      items: [
        { productName: 'Wireless Headphones', quantity: 1, price: 80, totalPrice: 80, image: 'https://via.placeholder.com/40' },
        { productName: 'Phone Case', quantity: 2, price: 20, totalPrice: 40, image: 'https://via.placeholder.com/40' },
      ],
    },
    {
      id: '#ORD-5531',
      customerName: 'Michael Chen',
      customerEmail: 'm.chen@design.co',
      customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgWt6YId3ySAvK6GqDx8pH4_qGOyBY33IdgKu8J7qEMXVMZRHzE0GBRZqw_7_WdD7VWiCApZaET6dVrL8k__YJ5uMGBaYI1oOg0y9Z9pqiLbuqVOfA9Un3yaVn-mPNRZHPxlWZrfoqS8mFQDRfFqB7TfdneboNRpAaT_5Ygve-_iHW5H7FqT-5_kuqe1FN6qaerkJTY0njyr-LiYeuiuT2AyhzFdM3QGJ0oqjX2ymAA6u88dbgBvp_lKpsD2qvOZiMXyDMiv6EKYY',
      total: 299.0,
      date: 'Oct 24, 2024',
      status: 'processing',
      items: [
        { productName: 'Mechanical Keyboard', quantity: 1, price: 129, totalPrice: 129, image: 'https://via.placeholder.com/40' },
        { productName: 'Designer Mouse Pad', quantity: 2, price: 85, totalPrice: 170, image: 'https://via.placeholder.com/40' },
      ],
    },
    {
      id: '#ORD-5530',
      customerName: 'Emily Davis',
      customerEmail: 'emily.d@mail.com',
      customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH_dLFqnkTn7Cok0X5B3Jq-KAa-wgZxOhi9gCtCW6Y_WnhOY6oPpW4sN2fjokwltUGi_CdelOciFDaBkgS-yxHPUjqpgtQ6jUK-48UNVMJn0C5gdKYMyYJ9ZFL8v9ulBfrx9mrSUz9RD9rqT7xnAQRotgTj-cbd32RLex0NQX4VGVAo8Qc6wgniKoS301TMmnqxkrM5onASwh6vD03SdPE-qM_H_O1en6aQkEXpPtaCLT-sbmUCdh924Th6fhYZdwXbE7x4aJHxxI',
      total: 89.99,
      date: 'Oct 23, 2024',
      status: 'pending',
      items: [
        { productName: 'USB-C Cable', quantity: 3, price: 12, totalPrice: 36, image: 'https://via.placeholder.com/40' },
        { productName: 'Portable Charger', quantity: 1, price: 53.99, totalPrice: 53.99, image: 'https://via.placeholder.com/40' },
      ],
    },
    {
      id: '#ORD-5529',
      customerName: 'David Wilson',
      customerEmail: 'david.w@tech.io',
      customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWWkEOJ3XAZFQNlfR4OenqWDRUU2eGN-V0z75dXooBzqUMh9UdUDftMNapoBvZ7QAL8f1xXiXp8TSMA3DyV_DdEMHBYxQJls_P8gdx1luSzx9p3Wb2-9HDTOjCz8t2xuSMSMvTRzXFN1F23uJghFWUaJL5164uriZHS2OGlXbZNiNmKkpplgas1XuszFf4hdeLamFjNeiw-swmkBmzGrtH2iVknBTa6K5t6JVZOuHyW8Yb7LczypVPXNxdxOrHu9SWtvVli9ruvf0',
      total: 145.0,
      date: 'Oct 23, 2024',
      status: 'cancelled',
      items: [
        { productName: 'Smart Plug', quantity: 5, price: 29, totalPrice: 145, image: 'https://via.placeholder.com/40' },
      ],
    },
    {
      id: '#ORD-5528',
      customerName: 'Jessica Lee',
      customerEmail: 'jess.lee@domain.com',
      customerAvatar: null,
      total: 560.5,
      date: 'Oct 22, 2024',
      status: 'shipped',
      items: [
        { productName: '4K Monitor', quantity: 1, price: 450, totalPrice: 450, image: 'https://via.placeholder.com/40' },
        { productName: 'HDMI Cable', quantity: 5, price: 22.1, totalPrice: 110.5, image: 'https://via.placeholder.com/40' },
      ],
    },
  ]), []);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFallback, setIsFallback] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const resp = await http.get('/admin/orders', {
          status: filterStatus || undefined,
          date: filterDate || undefined,
          page,
          limit,
        });
        if (!mounted) return;
        const { data = [], total: apiTotal = 0, totalPages: apiTotalPages = 1 } = resp || {};
        const formatted = (data || []).map((o) => ({
          id: o.orderId || o._id,
          sourceId: o._id || o.orderId,
          customerName: o.userId?.name || o.userName || 'Customer',
          customerEmail: o.userId?.email || '',
          customerAvatar: null,
          total: Number(o.total || 0),
          date: new Date(o.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
          status: o.status || 'pending',
          items: (o.items || []).map((it) => ({
            productName: it.productName || it.productId?.name || 'Product',
            quantity: it.quantity,
            price: it.price,
            totalPrice: it.totalPrice,
            image: it.productId?.images?.[0]?.url || it.productId?.imageUrl || 'https://via.placeholder.com/40',
          })),
        }));
        setIsFallback(false);
        setOrders(formatted);
        setTotal(apiTotal);
        setTotalPages(apiTotalPages);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e.message || 'Failed to load orders');
        setIsFallback(true);
        // Fallback to local sample data with client-side pagination
        const formatted = (sampleOrders || []).map((o) => ({ ...o, sourceId: o.id }));
        setOrders(formatted);
        const sampleTotal = formatted.length;
        setTotal(sampleTotal);
        setTotalPages(Math.max(1, Math.ceil(sampleTotal / limit)));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [sampleOrders, filterStatus, filterDate, page]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const StatusBadge = ({ status }) => {
    const map = {
      delivered: {
        container: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      },
      processing: {
        container: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      },
      pending: {
        container: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      },
      cancelled: {
        container: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      },
      shipped: {
        container: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      },
    };
    const cls = map[status]?.container || map.pending.container;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {loading && (
          <div className="mb-4 text-sm text-slate-500">Loading orders…</div>
        )}
        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}
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
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-200 appearance-none">
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
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <button onClick={() => setPage(1)} className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
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
                {(isFallback ? orders.slice((page - 1) * limit, page * limit) : orders).map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {order.customerAvatar ? (
                            <img alt="User" className="w-8 h-8 rounded-full object-cover" src={order.customerAvatar} />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                              {order.customerName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">{order.customerName}</div>
                            <div className="text-xs text-slate-400">{order.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                      <td className="px-6 py-4 text-center">
                        <div className="relative inline-block text-left">
                          <select value={order.status} onChange={async (e) => {
                            const next = e.target.value;
                            try {
                              await http.patch(`/admin/orders/${order.sourceId}/status`, { status: next });
                              setOrders((prev) => prev.map((o) => o.id === order.id ? { ...o, status: next } : o));
                            } catch (err) {
                              setError(err?.response?.data?.message || err.message || 'Failed to update status');
                            }
                          }} className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 cursor-pointer">
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => toggleExpand(order.id)} className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 hover:bg-primary/5 rounded px-3 py-1.5 transition-colors">
                          {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="text-sm">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Order Items</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                <thead className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-300">
                                  <tr>
                                    <th className="py-2">Product</th>
                                    <th className="py-2">Quantity</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Line Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                  {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                      <td className="py-2">
                                        <div className="flex items-center gap-3">
                                          <img alt="Product" src={item.image} className="w-10 h-10 rounded object-cover" />
                                          <span className="text-slate-900 dark:text-slate-200">{item.productName}</span>
                                        </div>
                                      </td>
                                      <td className="py-2">{item.quantity}</td>
                                      <td className="py-2">${Number(item.price).toFixed(2)}</td>
                                      <td className="py-2 font-medium text-slate-900 dark:text-white">${Number(item.totalPrice).toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
            <p>Page {page} of {totalPages} • {total} orders</p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <button
                className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
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
