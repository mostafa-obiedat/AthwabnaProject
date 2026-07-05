import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/client";

// جلب مفضلة المستخدم وإضافة منتجات إليها — منطق مشترك بين صفحات المنتجات
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorites");
        setFavorites(response.data.map((fav) => fav.product._id));
      } catch {
        // المستخدم غير مسجل الدخول — لا مفضلة لعرضها
      }
    };
    fetchFavorites();
  }, []);

  const addToFavorites = async (e, productId) => {
    e.stopPropagation();

    if (favorites.includes(productId)) {
      toast.error("هذا المنتج مضاف مسبقاً إلى المفضلة");
      return;
    }

    try {
      await api.post("/favorites/add", { productId });
      setFavorites((prev) => [...prev, productId]);
      toast.success("تمت الإضافة إلى المفضلة بنجاح!");
    } catch (err) {
      console.error("خطأ أثناء إضافة المفضلة:", err);
      if (err.response && err.response.status === 401) {
        toast.error("يجب تسجيل الدخول أولًا لإضافة إلى المفضلة");
      } else {
        toast.error("حدث خطأ أثناء إضافة المنتج للمفضلة");
      }
    }
  };

  return { favorites, addToFavorites };
};

export default useFavorites;
