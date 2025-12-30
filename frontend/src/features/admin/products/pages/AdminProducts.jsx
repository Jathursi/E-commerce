import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { fetchProducts, deleteProduct } from "../services/product.api";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const apiBase = (process.env.REACT_APP_API_URL || "http://localhost:5000/api")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      const list = Array.isArray(data) ? data : data?.products || [];
      setProducts(list);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    return !term
      ? true
      : p.name?.toLowerCase().includes(term) || p.category?.name?.toLowerCase().includes(term);
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete product "${name}"?`)) return;
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to delete product");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative max-w-xs w-full">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full text-slate-700 dark:text-slate-200 placeholder-slate-400"
              placeholder="Search products..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">+</span>
          Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading products...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No products found</div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Offer</th>
                  <th className="px-6 py-4">Features</th>
                  <th className="px-6 py-4">Search Keywords</th>
                  <th className="px-6 py-4">Images</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filtered.map((p) => {
                  const firstImg = p.images?.[0]?.url
                    ? p.images[0].url.startsWith("http")
                      ? p.images[0].url
                      : `${apiBase}${p.images[0].url}`
                    : null;
                  return (
                    <tr key={p._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          {firstImg ? (
                            <img src={firstImg} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-slate-400">image</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-slate-500">{p._id}</p>
                      </td>
                      <td className="px-6 py-4">
                        {p.categories && p.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {p.categories.map((cat, idx) => (
                              <span key={idx} className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs rounded">
                                {typeof cat === "object" ? cat.name : cat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900 dark:text-white">
                          ${p.price?.toFixed(2) || "0.00"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          (p.stock || 0) === 0 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : (p.stock || 0) < 10
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {p.stock || 0} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {p.offer ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            {p.offer}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {p.features && p.features.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {p.features.map((f, idx) => (
                              <span key={idx} className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded">
                                {f.name}: {f.value}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {p.searchKeywords && p.searchKeywords.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {p.searchKeywords.map((keyword, idx) => (
                              <span key={idx} className="inline-block px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {p.images && p.images.length > 0 ? (
                          <div className="space-y-1">
                            {p.images.some((img) => img.featureName) ? (
                              <div className="space-y-1">
                                {Array.from(new Map(p.images.map((img, idx) => [
                                  img.featureName ? `${img.featureName}:${img.featureValue}` : `generic-${idx}`,
                                  img,
                                ])).entries()).map(([key, img]) => (
                                  <span key={key} className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs rounded">
                                    {img.featureName ? `${img.featureName}: ${img.featureValue}` : "No variant"}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-xs text-slate-500">Generic ({p.images.length})</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:underline"
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="ml-4 text-red-600 hover:underline"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddProduct
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            loadProducts();
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={() => {
            loadProducts();
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminProducts;
