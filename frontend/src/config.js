// عنوان الخادم — يمكن تغييره عبر متغير البيئة VITE_API_URL عند النشر
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// يبني رابط صورة كامل من المسار المخزن في قاعدة البيانات (/uploads/..)
export const imageUrl = (path) => (path ? `${API_URL}${path}` : "/placeholder-product.jpg");
