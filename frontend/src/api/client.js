import axios from "axios";
import { API_URL } from "../config";

// نسخة axios موحدة لجميع طلبات الـ API — ترسل الكوكيز تلقائياً
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export default api;
