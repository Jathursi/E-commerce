import http from "../../../services/http.service";

export const addToCart = (payload) => http.post("/cart", payload);
export const getCart = () => http.get("/cart");
export const updateCartQuantity = (cartId, quantity) => http.patch(`/cart/${cartId}`, { quantity });
export const deleteCartItem = (cartId) => http.delete(`/cart/${cartId}`);
