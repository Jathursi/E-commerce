import http from "../../../services/http.service";

const loginUser = (email, password) =>
  http.post("/auth/login", { email, password });
const registerUser = (userData) => http.post("/auth/register", userData);

// export default { loginUser, registerUser };
export { loginUser, registerUser };