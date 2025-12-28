import React, { useEffect, useState } from "react";
import { addProduct } from "../services/product.api";
import { fetchCategories } from "../../category/services/category.api";

function AddProduct({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: [],
    price: "",
    offer: "",
    features: [],
    files: [],
  });
  const [previews, setPreviews] = useState([]);
  const [imageFeatures, setImageFeatures] = useState({});
  const [imagePositions, setImagePositions] = useState({});
  const [draggedImage, setDraggedImage] = useState(null);
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

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, files }));
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    setImagePositions({});
    setError("");
  };

  const handleImageMouseDown = (idx, e) => {
    // If color feature is selected, don't drag - we're in color picking mode
    if (imageFeatures[idx]?.featureName?.toLowerCase() === "color") {
      return;
    }
    setDraggedImage({ idx, startX: e.clientX, startY: e.clientY, startPosX: imagePositions[idx]?.x || 0, startPosY: imagePositions[idx]?.y || 0 });
  };

  const pickColorFromImage = (idx, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const img = e.currentTarget.querySelector('img');
    if (!img) return;
    
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
    
    setImageFeatures((prev) => ({
      ...prev,
      [idx]: { ...prev[idx], colorHex: hex, featureValue: hex },
    }));
  };

  const handleImageMouseMove = (e) => {
    if (!draggedImage) return;
    const deltaX = e.clientX - draggedImage.startX;
    const deltaY = e.clientY - draggedImage.startY;
    setImagePositions((prev) => ({
      ...prev,
      [draggedImage.idx]: { x: draggedImage.startPosX + deltaX, y: draggedImage.startPosY + deltaY },
    }));
  };

  const handleImageMouseUp = () => {
    setDraggedImage(null);
  };

  useEffect(() => {
    if (draggedImage) {
      document.addEventListener("mousemove", handleImageMouseMove);
      document.addEventListener("mouseup", handleImageMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleImageMouseMove);
        document.removeEventListener("mouseup", handleImageMouseUp);
      };
    }
  }, [draggedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    setIsSubmitting(true);
    setError("");

    try {
      await addProduct({ ...formData, imageFeatures });
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {draggedImage !== null && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onMouseUp={handleImageMouseUp} onMouseMove={handleImageMouseMove}>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 max-w-2xl">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Drag to position • Release to finish</p>
            <div className="w-96 h-96 bg-slate-100 dark:bg-slate-700 rounded overflow-hidden relative border-2 border-slate-300 dark:border-slate-600">
              <img
                src={previews[draggedImage.idx]}
                alt="Drag Preview"
                className="w-full h-full object-contain"
                style={{
                  transform: `translate(${imagePositions[draggedImage.idx]?.x || 0}px, ${imagePositions[draggedImage.idx]?.y || 0}px)`,
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add Product</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="add-product-form" onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              Product Images (multiple)
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
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Map images to features:</p>
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
                            onMouseDown={(e) => handleImageMouseDown(idx, e)}
                            onClick={(e) => {
                              if (imageFeatures[idx]?.featureName?.toLowerCase() === "color") {
                                pickColorFromImage(idx, e);
                              }
                            }}
                          >
                            <img 
                              src={src} 
                              alt={`Preview ${idx + 1}`} 
                              className="w-full h-full object-contain pointer-events-none select-none"
                              style={{
                                transform: `translate(${imagePositions[idx]?.x || 0}px, ${imagePositions[idx]?.y || 0}px)`,
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
            form="add-product-form"
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Add Product"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default AddProduct;
