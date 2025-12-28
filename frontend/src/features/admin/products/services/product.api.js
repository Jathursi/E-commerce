import http from "../../../../services/http.service";

export const fetchProducts = () => http.get("/products");

export const addProduct = (payload) => {
  const { files, ...rest } = payload;
  if (files && files.length) {
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Stringify arrays and objects for FormData
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });
    files.forEach((file) => formData.append("images", file));
    return http.postForm("/products", formData);
  }
  return http.post("/products", rest);
};

export const updateProduct = (id, payload) => {
  const { files, ...rest } = payload;
  if (files && files.length) {
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Stringify arrays and objects for FormData
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });
    files.forEach((file) => formData.append("images", file));
    return http.putForm(`/products/${id}`, formData);
  }
  return http.put(`/products/${id}`, rest);
};

export const deleteProduct = (id) => http.delete(`/products/${id}`);
