import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/client";
import { addToCart } from "../redux/slices/cartSlice";
import { addProductToLocalCart } from "../utils/cartStorage";
import useFavorites from "../hooks/useFavorites";
import useOfferTimers from "../hooks/useOfferTimers";
import ProductCard from "../components/common/ProductCard";
import Pagination from "../components/common/Pagination";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Offers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minDiscount, setMinDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");

  const dispatch = useDispatch();
  const { favorites, addToFavorites } = useFavorites();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products/offers", {
        params: {
          sortBy: sortBy || undefined,
          page: currentPage,
          limit: 4,
          minDiscount: minDiscount || undefined,
          maxDiscount: maxDiscount || undefined,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy, currentPage, minDiscount, maxDiscount]);

  const timers = useOfferTimers(products, fetchProducts);

  const addToCartHandler = (e, product) => {
    e.stopPropagation();

    if (!product || !product._id) {
      toast.error("منتج غير صالح للإضافة");
      return;
    }

    const newItem = addProductToLocalCart(product);
    dispatch(addToCart(newItem));
    toast.success("تمت إضافة المنتج إلى السلة بنجاح");
  };

  const resetFilters = () => {
    setSortBy("");
    setMinDiscount("");
    setMaxDiscount("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl text-red-700 font-bold mb-6 pb-2 border-b border-gray-200">
          قسم العروض والتخفيضات
        </h2>

        {/* قائمة الفلترة */}
        <div className="filter grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 items-center mb-6">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="sort" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              ترتيب حسب:
            </label>
            <select
              id="sort"
              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              value={sortBy}
            >
              <option value="">الافتراضي</option>
              <option value="price">حسب السعر</option>
              <option value="popularity">حسب الشعبية</option>
            </select>
          </div>

          <div>
            <label htmlFor="minDiscount" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              أقل خصم %
            </label>
            <input
              type="number"
              id="minDiscount"
              placeholder="0"
              min="0"
              max="100"
              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={minDiscount}
              onChange={(e) => {
                setMinDiscount(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div>
            <label htmlFor="maxDiscount" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              أعلى خصم %
            </label>
            <input
              type="number"
              id="maxDiscount"
              placeholder="100"
              min="0"
              max="100"
              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={maxDiscount}
              onChange={(e) => {
                setMaxDiscount(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="self-end col-span-2 sm:col-span-1">
            <button
              onClick={resetFilters}
              className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-red-700 text-white text-xs sm:text-sm rounded-md hover:bg-red-800 cursor-pointer"
            >
              إعادة الضبط
            </button>
          </div>
        </div>

        {/* المنتجات */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.length === 0 && (
                <div className="text-center py-10 text-gray-600 text-lg col-span-full">
                  لا توجد عروض حالياً
                </div>
              )}

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={addToCartHandler}
                  onAddToFavorite={addToFavorites}
                  isFavorite={favorites.includes(product._id)}
                  offerTimer={timers[product._id]}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Offers;
