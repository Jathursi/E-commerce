import http from "../../../services/http.service";

export const createOrder = (orderData) => http.post("/orders", orderData);
export const getUserOrders = () => http.get("/orders");
export const getOrderById = (orderId) => http.get(`/orders/${orderId}`);
export const addAddress = (addressData) => http.post("/addresses", addressData);
export const getUserAddresses = () => http.get("/addresses");
export const deleteAddress = (addressId) => http.delete(`/addresses/${addressId}`);
export const getPaymentMethods = () => http.get("/payment-methods");
export const deletePaymentMethod = (paymentId) => http.delete(`/payment-methods/${paymentId}`);
