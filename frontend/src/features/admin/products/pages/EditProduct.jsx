import React, { useEffect, useState } from "react";
import { updateProduct } from "../services/product.api";
import { fetchCategories } from "../../category/services/category.api";

function EditProduct({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: [],
    price: "",
    stock: "",
    offer: "",
    features: [],
    searchKeywords: [],
    files: [],
  });
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imageFeatures, setImageFeatures] = useState({});
  const [existingImageFeatures, setExistingImageFeatures] = useState({});
  const [imageDragOffsets, setImageDragOffsets] = useState({});
  const [newImageDragOffsets, setNewImageDragOffsets] = useState({});
  const [draggingImage, setDraggingImage] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories();
        const list = Array.isArray(data) ? data : data?.categories || [];
        setCategories(list);
      } catch (err) {
        setError(err.message || "Failed to load categories");
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        categories: product.categories?.map((c) => c._id || c) || [],
        price: product.price || "",
        stock: product.stock || "",
        offer: product.offer || "",
        features: product.features || [],
        searchKeywords: product.searchKeywords || [],
        files: [],
      });
      setExistingImages(product.images || []);
      const existingFeatures = {};
      product.images?.forEach((img, idx) => {
        if (img.featureName && img.featureValue) {
          existingFeatures[idx] = { featureName: img.featureName, featureValue: img.featureValue };
        }
      });
      setExistingImageFeatures(existingFeatures);
    }
  }, [product]);

  const handleImageMouseDown = (e, idx, isNew = false) => {
    if (e.button !== 0) return; // Only left click
    // If color feature is selected, don't drag - we're in color picking mode
    const features = isNew ? imageFeatures : existingImageFeatures;
    if (features[idx]?.featureName?.toLowerCase() === "color") {
      return;
    }
    setDraggingImage({ idx, isNew });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const pickColorFromImage = (idx, isNew, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const img = e.currentTarget.querySelector('img');
    if (!img) return;
    
    try {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create canvas to get pixel color
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      // Set canvas size to match displayed image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the current img element directly
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get pixel at click position
      const pixelData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
      const hex = `#${[pixelData[0], pixelData[1], pixelData[2]].map(x => x.toString(16).padStart(2, '0')).join('')}`;
      
      const setFeatures = isNew ? setImageFeatures : setExistingImageFeatures;
      setFeatures((prev) => ({
        ...prev,
        [idx]: { ...prev[idx], colorHex: hex, featureValue: hex },
      }));
    } catch (err) {
      if (err.name === 'SecurityError') {
        setError('Cannot pick color from external images. Please use images uploaded locally or enable CORS on the server.');
      } else {
        setError('Error picking color. Please try again.');
      }
      console.error('Color picker error:', err);
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingImage) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const { idx, isNew } = draggingImage;
    const setOffset = isNew ? setNewImageDragOffsets : setImageDragOffsets;
    setOffset((prev) => ({
      ...prev,
      [idx]: {
        x: (prev[idx]?.x || 0) + deltaX,
        y: (prev[idx]?.y || 0) + deltaY,
      },
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDraggingImage(null);
  };

  useEffect(() => {
    if (draggingImage) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingImage, dragStart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, files }));
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Product name is required");
      return;
    }
    if (!formData.categories || formData.categories.length === 0) {
      setError("Please select at least one category");
      return;
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      setError("Please enter a valid price");
      return;
    }
    if (!formData.searchKeywords || formData.searchKeywords.length === 0) {
      setError("Please add at least one search keyword");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        categories: formData.categories,
        price: formData.price,
        stock: formData.stock,
        offer: formData.offer,
        features: formData.features,
        searchKeywords: formData.searchKeywords,
        files: formData.files,
        imageFeatures: { ...existingImageFeatures, ...imageFeatures },
      };
      await updateProduct(product._id, payload);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="edit-product-form" onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Categories * (hold Ctrl/Cmd for multiple)
              </label>
              <select
                multiple
                value={formData.categories}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                  setFormData((prev) => ({ ...prev, categories: selected }));
                }}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              {formData.categories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.categories.map((catId) => {
                    const cat = categories.find((c) => c._id === catId);
                    return (
                      <span key={catId} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded">
                        {cat?.name}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              categories: prev.categories.filter((id) => id !== catId),
                            }));
                          }}
                          className="ml-1 hover:font-bold"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Offer (optional)
              </label>
              <input
                type="text"
                name="offer"
                value={formData.offer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 20% off, Buy 1 Get 1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Features (optional)
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Feature name (e.g., Color, Size)"
                    value={feature.name}
                    onChange={(e) => {
                      const updated = [...formData.features];
                      updated[idx].name = e.target.value;
                      setFormData((prev) => ({ ...prev, features: updated }));
                    }}
                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., Red, Large)"
                    value={feature.value}
                    onChange={(e) => {
                      const updated = [...formData.features];
                      updated[idx].value = e.target.value;
                      setFormData((prev) => ({ ...prev, features: updated }));
                    }}
                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.features.filter((_, i) => i !== idx);
                      setFormData((prev) => ({ ...prev, features: updated }));
                    }}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    features: [...prev.features, { name: "", value: "" }],
                  }));
                }}
                className="mt-2 px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                + Add Feature
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Search Keywords *
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="search-keyword-input"
                  placeholder="Enter a search keyword"
                  className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      e.preventDefault();
                      const newKeyword = e.target.value.trim().toLowerCase();
                      if (!formData.searchKeywords.includes(newKeyword)) {
                        setFormData((prev) => ({
                          ...prev,
                          searchKeywords: [...prev.searchKeywords, newKeyword],
                        }));
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('search-keyword-input');
                    const newKeyword = input.value.trim().toLowerCase();
                    if (newKeyword && !formData.searchKeywords.includes(newKeyword)) {
                      setFormData((prev) => ({
                        ...prev,
                        searchKeywords: [...prev.searchKeywords, newKeyword],
                      }));
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.searchKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.searchKeywords.map((keyword, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm rounded-full">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            searchKeywords: prev.searchKeywords.filter((_, i) => i !== idx),
                          }));
                        }}
                        className="ml-1 hover:font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Images
            </label>
            {existingImages.length === 0 ? (
              <p className="text-sm text-slate-500">No images uploaded.</p>
            ) : (
              <div className="space-y-3">
{formData.features.length > 0 && (
                  <div className="mt-3 space-y-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Update image features:</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">💡 For Color: Click directly on image to pick • For others: Drag to reposition</p>
                    <div className="grid grid-cols-2 gap-3">
                      {existingImages.map((img, idx) => (
                        <div key={idx} className="space-y-2 p-2 border border-slate-200 dark:border-slate-600 rounded-lg">
                          <div 
                            className={`w-full h-24 rounded overflow-hidden bg-slate-100 dark:bg-slate-700 relative ${
                              existingImageFeatures[idx]?.featureName?.toLowerCase() === "color"
                                ? "cursor-crosshair"
                                : "cursor-grab active:cursor-grabbing"
                            }`}
                            onClick={(e) => {
                              if (existingImageFeatures[idx]?.featureName?.toLowerCase() === "color") {
                                pickColorFromImage(idx, false, e);
                              }
                            }}
                          >
                            <img
                              src={img.url}
                              alt={`Existing ${idx + 1}`}
                              crossOrigin="anonymous"
                              className="w-full h-full object-contain pointer-events-none select-none"
                              onMouseDown={(e) => handleImageMouseDown(e, idx, false)}
                              style={{
                                transform: `translate(${imageDragOffsets[idx]?.x || 0}px, ${imageDragOffsets[idx]?.y || 0}px)`,
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <select
                              value={existingImageFeatures[idx]?.featureName || ""}
                              onChange={(e) => {
                                setExistingImageFeatures((prev) => ({
                                  ...prev,
                                  [idx]: { ...prev[idx], featureName: e.target.value, featureValue: "" },
                                }));
                              }}
                              className="w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                              <option value="">Select feature</option>
                              {formData.features.map((f, fIdx) => (
                                <option key={fIdx} value={f.name}>
                                  {f.name}
                                </option>
                              ))}
                            </select>
                            {existingImageFeatures[idx]?.featureName && (
                              <>
                                {existingImageFeatures[idx]?.featureName?.toLowerCase() !== "color" && (
                                  <select
                                    value={existingImageFeatures[idx]?.featureValue || ""}
                                    onChange={(e) => {
                                      setExistingImageFeatures((prev) => ({
                                        ...prev,
                                        [idx]: { ...prev[idx], featureValue: e.target.value },
                                      }));
                                    }}
                                    className="w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                  >
                                    <option value="">Select value</option>
                                    {formData.features
                                      .find((f) => f.name === existingImageFeatures[idx]?.featureName)
                                      ?.values?.split(",")
                                      .map((v) => (
                                        <option key={v.trim()} value={v.trim()}>
                                          {v.trim()}
                                        </option>
                                      )) || null}
                                  </select>
                                )}
                                {existingImageFeatures[idx]?.featureName?.toLowerCase() === "color" && (
                                  <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600">
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Click image to pick color</span>
                                    {existingImageFeatures[idx]?.colorHex && (
                                      <div 
                                        className="w-6 h-6 rounded border-2 border-white shadow-sm"
                                        style={{ backgroundColor: existingImageFeatures[idx]?.colorHex }}
                                        title={existingImageFeatures[idx]?.colorHex}
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Replace Images (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="block w-full text-sm text-slate-600 dark:text-slate-300"
            />
{previews.length > 0 && (
              <div className="mt-4 space-y-3">
                {formData.features.length > 0 && (
                  <div className="space-y-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Map new images to features:</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">💡 For Color: Click directly on image to pick • For others: Drag to reposition</p>
                    <div className="grid grid-cols-2 gap-3">
                      {previews.map((src, idx) => (
                        <div key={idx} className="space-y-2 p-2 border border-slate-200 dark:border-slate-600 rounded-lg">
                          <div 
                            className={`w-full h-24 rounded overflow-hidden bg-slate-100 dark:bg-slate-700 relative ${
                              imageFeatures[idx]?.featureName?.toLowerCase() === "color"
                                ? "cursor-crosshair"
                                : "cursor-grab active:cursor-grabbing"
                            }`}
                            onClick={(e) => {
                              if (imageFeatures[idx]?.featureName?.toLowerCase() === "color") {
                                pickColorFromImage(idx, true, e);
                              }
                            }}
                          >
                            <img
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              crossOrigin="anonymous"
                              className="w-full h-full object-contain pointer-events-none select-none"
                              onMouseDown={(e) => handleImageMouseDown(e, idx, true)}
                              style={{
                                transform: `translate(${newImageDragOffsets[idx]?.x || 0}px, ${newImageDragOffsets[idx]?.y || 0}px)`,
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <select
                              value={imageFeatures[idx]?.featureName || ""}
                              onChange={(e) => {
                                setImageFeatures((prev) => ({
                                  ...prev,
                                  [idx]: { ...prev[idx], featureName: e.target.value, featureValue: "" },
                                }));
                              }}
                              className="w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                              <option value="">Select feature</option>
                              {formData.features.map((f, fIdx) => (
                                <option key={fIdx} value={f.name}>
                                  {f.name}
                                </option>
                              ))}
                            </select>
                            {imageFeatures[idx]?.featureName && (
                              <>
                                {imageFeatures[idx]?.featureName?.toLowerCase() !== "color" && (
                                  <select
                                    value={imageFeatures[idx]?.featureValue || ""}
                                    onChange={(e) => {
                                      setImageFeatures((prev) => ({
                                        ...prev,
                                        [idx]: { ...prev[idx], featureValue: e.target.value },
                                      }));
                                    }}
                                    className="w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                  >
                                    <option value="">Select value</option>
                                    {formData.features
                                      .find((f) => f.name === imageFeatures[idx]?.featureName)
                                      ?.values?.split(",")
                                      .map((v) => (
                                        <option key={v.trim()} value={v.trim()}>
                                          {v.trim()}
                                        </option>
                                      )) || null}
                                  </select>
                                )}
                                {imageFeatures[idx]?.featureName?.toLowerCase() === "color" && (
                                  <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600">
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Click image to pick color</span>
                                    {imageFeatures[idx]?.colorHex && (
                                      <div 
                                        className="w-6 h-6 rounded border-2 border-white shadow-sm"
                                        style={{ backgroundColor: imageFeatures[idx]?.colorHex }}
                                        title={imageFeatures[idx]?.colorHex}
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2">Leave empty to keep existing images. Uploading new files replaces images.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Update Product"}
            </button>
          </div>
        </form>

        <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            form="edit-product-form"
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Update Product"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default EditProduct;
