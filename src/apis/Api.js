import axios from "axios";

// create config
const Api = axios.create({
    baseURL: "https://online-bazar-backend.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    },
});

const config  = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
}
// user route
export const testApi = () => Api.get("/api/user/test",config);
export const loginUser = (data) => Api.post("/api/user/login", data);
export const registerUser = (data) => Api.post("/api/user/register", data);
export const getDashboard = () => Api.get("/api/user/dashboard");

// product route
export const addProduct = (data) => Api.post("/api/product/add", data, config);

export const getProducts = () => Api.get("/api/product/get_products");

export const getProduct = (id) => Api.get(`/api/product/get_product/${id}`);

// update api
export const editProduct = (id, data) => Api.put(`/api/product/update/${id}`, data, config);

// delete api
export const deleteProduct = (id) => Api.delete(`/api/product/delete/${id}`, config);

//  create order
export const createOrder = (data) => Api.post("/api/order/create", data, config);

// get orders by user
export const getOrders = () => Api.get("/api/order/getOrdersByUserId", config);

// get all orders
export const getAllOrders = () => Api.get("/api/order/getAllOrders");

// update order status
export const updateOrderStatus = (id, data) => Api.put(`/api/order/change_status/${id}`, data);

// search
export const searchProduct = (query) => Api.get(`/api/product/search/${query}`);

// get counts
export const getCounts = () => Api.get("/api/product/get_counts");

// update profile
export const updateProfile = (data) => Api.put("/api/user/update_profile", data, config);

// forgot password
export const forgotPassword = (data) => Api.post("/api/user/forgot_password", data);


