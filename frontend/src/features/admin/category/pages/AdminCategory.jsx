import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import AddCategory from "./addCategory";
import EditCategory from "./EditCategory";
import { fetchCategories, deleteCategory } from "../../category/services/category.api";

const apiBase = (process.env.REACT_APP_API_URL || "http://localhost:5000/api")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");

function AdminCategory() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      const list = Array.isArray(data) ? data : data?.categories || [];
      setCategories(list);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = categories.filter((cat) => {
    const term = searchTerm.trim().toLowerCase();
    const status = (cat.status || "active").toString().toLowerCase();
    const matchesSearch = !term
      ? true
      : cat.name?.toLowerCase().includes(term) ||
        cat.description?.toLowerCase().includes(term);
    const matchesStatus = !statusFilter || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to delete category");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative max-w-xs w-full">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full text-slate-700 dark:text-slate-200 placeholder-slate-400"
              placeholder="Search categories..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-xl">+</span>
          Add Category
        </button>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading categories...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No categories found
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4 w-1/2">Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCategories.map((cat) => (
                  <tr
                    key={cat._id || cat.name}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        {(() => {
                          const src = cat.imageUrl
                            ? cat.imageUrl.startsWith("http")
                              ? cat.imageUrl
                              : `${apiBase}${cat.imageUrl}`
                            : null;
                          return src ? (
                            <img
                              src={src}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-slate-400">
                              image
                            </span>
                          );
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {cat.name}
                          </p>
                          {/* <p className="text-xs text-slate-500">{cat._id}</p> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-2">{cat.description || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {(cat.status || "active")
                          .toString()
                          .charAt(0)
                          .toUpperCase() +
                          (cat.status || "active").toString().slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(cat._id, cat.name)}
                        className="ml-4 text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <p>
            Showing{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {filteredCategories.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {categories.length}
            </span>{" "}
            categories
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Next
            </button>
          </div>
        </div>

        {/* Add Category Modal */}
        {showAddModal && (
          <AddCategory
            onClose={() => setShowAddModal(false)}
            onCategoryAdded={() => {
              loadCategories();
            }}
          />
        )}

        {/* Edit Category Modal */}
        {showEditModal && selectedCategory && (
          <EditCategory
            category={selectedCategory}
            onClose={() => {
              setShowEditModal(false);
              setSelectedCategory(null);
            }}
            onSuccess={() => {
              loadCategories();
              setShowEditModal(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AdminCategory;
