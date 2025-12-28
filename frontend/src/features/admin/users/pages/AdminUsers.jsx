import React, { useState, useEffect } from 'react';
import { fetchUser, deleteUser } from '../services/admin.user.api';
import AddUser from './AddUser';
import { IoSearch } from "react-icons/io5";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUser();
      console.log('Fetched data:', data);
      const usersList = Array.isArray(data) ? data : (data?.users || []);
      setUsers(usersList);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    const normalizedRole = user.role?.toLowerCase() || '';
    const normalizedStatus = (user.status || (user.isActive === false ? 'inactive' : 'active'))
      .toString()
      .toLowerCase();

    const matchesSearch = !term
      ? true
      : (user.name?.toLowerCase().includes(term) || user.email?.toLowerCase().includes(term));

    const matchesRole = !roleFilter || normalizedRole === roleFilter;
    const matchesStatus = !statusFilter || normalizedStatus === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white hidden sm:block">
            User Management
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 text-slate-700 dark:text-slate-200 placeholder-slate-400"
              placeholder="Search system..."
              type="text"
            />
          </div>
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
          </button>
          <button className="sm:hidden w-8 h-8 rounded-full overflow-hidden">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCC0nN1UxvewODGENKGTpcbKGvzRwwHEIKbxIBSXM-YkXJ0Brd5bUjipkiYANSNUowpVkeGONqhHwIkUPHAgcqANoIAhjtxgdSSmYompsP4CcmO-Gm50lG2vdTv-TbAoZ8flvxryHdOiv9Bj5YRSG_c9l6s79emseCNdrDn8nm3well9yz2fkEiZoINwMN4m0t2PlfKVqcd47ViT-qRI-gkYrfxGZBEKabHiFrTs2WgkrLz0aAOVbsQrZg7H-96QKBMwxAG6zQD04"
            />
          </button>
        </div>
      </header> */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                  <IoSearch />
                </span>
                <input
                  className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary w-full text-slate-700 dark:text-slate-200 placeholder-slate-400"
                  placeholder="Search by name, email..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <select className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  +
                </span>
                Add User
              </button>
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-slate-500">Loading users...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-red-500">{error}</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-slate-500">No users found</p>
              </div>
            ) : (
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-300 sticky top-0">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Last Login</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-semibold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer p-0">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <p>1-{filteredUsers.length} of {filteredUsers.length} users</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                  disabled
                >
                  Prev
                </button>
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-8 text-center text-xs text-slate-400 pb-4">
          © 2024 E-commerce Admin System. All rights reserved.
        </footer>
      </div>

      {showAddModal && <AddUser onClose={() => setShowAddModal(false)} onUserAdded={() => loadUsers()} />}
    </main>
  );
}

export default AdminUsers
