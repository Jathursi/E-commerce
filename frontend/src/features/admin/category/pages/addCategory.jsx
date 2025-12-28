import React, { useState } from 'react';
import { addCategory } from '../../category/services/category.api';

function AddCategory({ onClose, onCategoryAdded }) {
	const [form, setForm] = useState({
		name: '',
		description: '',
	});
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		if (!form.name.trim()) {
			setError('Name is required');
			return;
		}
		try {
			setLoading(true);
			const created = await addCategory({ ...form, file });
			setSuccess(`Category '${created.name}' created`);
			
			// Call the callback and close modal after success
			if (onCategoryAdded) onCategoryAdded(created);
			if (onClose) {
				setTimeout(() => {
					onClose();
				}, 500);
			}
		} catch (err) {
			setError(err?.response?.data?.message || err.message || 'Failed to add category');
		} finally {
			setLoading(false);
		}
	};

	const content = (
		<div className="max-w-xl w-full mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
			<div className="flex items-start justify-between mb-4">
				<h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add Category</h2>
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
						aria-label="Close"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				)}
			</div>
			<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label>
						<input
							name="name"
							value={form.name}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100"
							placeholder="Category name"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
						<textarea
							name="description"
							value={form.description}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100"
							placeholder="Short description"
							rows={3}
						/>
					</div>
					{/* Image URL and type inputs removed per request; file upload below handles images. */}
					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Image</label>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
							className="w-full text-sm text-slate-600 dark:text-slate-200"
						/>
						{file && <p className="text-xs text-slate-500 mt-1">Selected: {file.name}</p>}
					</div>
					{error && <p className="text-sm text-red-600">{error}</p>}
					{success && <p className="text-sm text-green-600">{success}</p>}
					<button
						type="submit"
						disabled={loading}
						className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium"
					>
						{loading ? 'Saving...' : 'Create Category'}
					</button>
			</form>
		</div>
	);

	if (onClose) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div className="absolute inset-0 bg-black/50" onClick={onClose} />
				<div className="relative w-full max-w-xl px-4">{content}</div>
			</div>
		);
	}

	return (
		<main className="flex-1 flex flex-col p-6">{content}</main>
	);
}

export default AddCategory;
