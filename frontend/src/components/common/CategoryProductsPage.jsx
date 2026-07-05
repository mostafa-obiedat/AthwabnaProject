import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/client";
import { addToCart } from "../../redux/slices/cartSlice";
import { addProductToLocalCart } from "../../utils/cartStorage";
import useFavorites from "../../hooks/useFavorites";
import useOfferTimers from "../../hooks/useOfferTimers";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";

// صفحة فئة منتجات موحدة — كانت مكررة في 5 صفحات
// (رجالي / نسائي / أطفال / إكسسوارات رجالية / إكسسوارات نسائية)
const CategoryProductsPage = ({ title, endpoint, showRegionFilter = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const { favorites, addToFavorites } = useFavorites();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint, {
        params: {
          sortBy: sortBy || undefined,
          region: region || undefined,
          page: currentPage,
          limit: 4,
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
  }, [sortBy, region, currentPage]);

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

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto py-4 md:py-8 px-2 sm:px-4 text-[#2B2B2B]">
        <h2 className="text-xl sm:text-2xl text-red-700 font-bold mb-4 sm:mb-6 pb-2 border-b border-gray-200">
          {title}
        </h2>

        {/* فلترة البحث */}
        <div className="filter flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-4 sm:mb-6">
          <div className="w-full sm:w-auto">
            <label htmlFor="sort" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              ترتيب حسب:
            </label>
            <select
              id="sort"
              className="w-full text-xs sm:text-sm text-red-700 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#2B2B2B] cursor-pointer"
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

          {showRegionFilter && (
            <div className="w-full sm:w-auto">
              <label htmlFor="region" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                حسب المنطقة:
              </label>
              <select
                id="region"
                className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#2B2B2B] cursor-pointer"
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCurrentPage(1);
                }}
                value={region}
              >
                <option value="">الكل</option>
                <option value="Amman">عمان</option>
                <option value="Irbid">اربد</option>
                <option value="Zarqa">الزرقاء</option>
              </select>
            </div>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-5 text-red-500 text-sm sm:text-base">
            حدث خطأ: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CategoryProductsPage;
