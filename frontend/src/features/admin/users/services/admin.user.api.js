import http from "../../../../services/http.service";

const fetchUser = async () => {
    const response = await http.get("/admin/user-details");
    return response;
}

const addUser = async (userData) => {
    const response = await http.post("/admin/add-user", userData);
    return response;
}

const deleteUser = async (id) => {
    const response = await http.delete(`/admin/user/${id}`);
    return response;
}

// export default { loginUser, registerUser };
export { fetchUser, addUser, deleteUser };