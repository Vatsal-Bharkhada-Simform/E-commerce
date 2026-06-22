import axios from "axios";
import { handleResponseError, sanitizeData } from "./responseInterceptors";

const productInstance = axios.create({
	baseURL: "https://api.escuelajs.co/api/v1",
	timeout: 10000,
});

productInstance.interceptors.response.use(sanitizeData, handleResponseError);

export { productInstance };
