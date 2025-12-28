import http from '../../../../services/http.service';

export const fetchCategories = () => http.get('/categories');

export const addCategory = (payload) => {
  const { file, ...rest } = payload;
  if (file) {
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    formData.append('image', file);
    return http.postForm('/category', formData);
  }
  return http.post('/category', rest);
};

export const updateCategory = (id, payload) => {
  const { file, ...rest } = payload;
  if (file) {
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    formData.append('image', file);
    return http.putForm(`/category/${id}`, formData);
  }
  return http.put(`/category/${id}`, rest);
};

export const deleteCategory = (id) => http.delete(`/category/${id}`);
