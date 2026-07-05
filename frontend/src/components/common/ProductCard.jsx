import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import RatingStars from "./RatingStars";
import { imageUrl } from "../../config";

// بطاقة منتج موحدة: صورة، تقييم، سعر مع الخصم، مقاسات، أزرار السلة والمفضلة
const ProductCard = ({
  product,
  onAddToCart,
  onAddToFavorite,
  isFavorite = false,
  offerTimer,
}) => {
  const navigate = useNavigate();
  const goToDetails = () => navigate(`/product/${product._id}`);

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transition flex flex-col relative">
      {/* صورة المنتج */}
      <div
        className="relative h-40 sm:h-48 overflow-hidden cursor-pointer"
        onClick={goToDetails}
      >
        <img
          src={imageUrl(product.images?.[0])}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-100 text-red-600 text-2xs xs:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">
            خصم {product.discount}%
          </div>
        )}
      </div>

      {/* محتوى البطاقة */}
      <div className="p-2 sm:p-3 md:p-4 flex-grow">
        <h3
          className="font-semibold text-sm sm:text-base md:text-lg mb-1 cursor-pointer hover:text-gray-600"
          onClick={goToDetails}
        >
          {product.name}
        </h3>

        <div className="mb-1 sm:mb-2">
          <RatingStars
            rating={product.averageRating || 0}
            count={product.ratings?.length || 0}
          />
        </div>

        {/* السعر */}
        <div className="flex items-center gap-1">
          <p className="text-red-700 font-bold text-xs sm:text-sm md:text-base">
            {discountedPrice} د.أ
          </p>
          {product.discount > 0 && (
            <p className="line-through text-2xs xs:text-xs text-gray-500">
              {product.price} د.أ
            </p>
          )}
        </div>

        {/* عدّاد انتهاء العرض */}
        {product.discount > 0 && (
          <div className="mt-1">
            {product.offerEndDate ? (
              <span className="text-[7px] xs:text-[8px] sm:text-[8.6px] bg-red-100 text-red-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                ينتهي خلال: {offerTimer || "..."}
              </span>
            ) : (
              <span className="text-[7px] xs:text-[8px] sm:text-[8.6px] bg-green-100 text-green-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                عرض مستمر
              </span>
            )}
          </div>
        )}

        {/* المقاسات */}
        {product.size?.length > 0 && (
          <p className="text-2xs xs:text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            المقاسات: {product.size.join(", ")}
          </p>
        )}
      </div>

      {/* زر إضافة إلى السلة */}
      <div className="p-2 sm:p-3 md:p-4 pt-0 flex justify-between gap-1 sm:gap-2">
        <button
          onClick={(e) => onAddToCart(e, product)}
          className="flex-1 bg-[#2B2B2B] hover:bg-[#222222] text-white py-1 sm:py-2 px-2 sm:px-3 rounded flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer"
          disabled={!product._id}
        >
          <FaShoppingCart className="text-xs sm:text-sm" /> <span>اضف الى السلة</span>
        </button>
      </div>

      {/* زر المفضلة */}
      <button
        onClick={(e) => onAddToFavorite(e, product._id)}
        className={`absolute top-1 sm:top-2 right-1 sm:right-2 p-1 sm:p-2 rounded-full border cursor-pointer text-xs sm:text-sm ${
          isFavorite
            ? "text-red-500 border-red-500 bg-red-50 hover:bg-red-100"
            : "text-gray-500 border-gray-300 hover:border-gray-400 bg-white"
        }`}
      >
        <FaHeart />
      </button>
    </div>
  );
};

export default ProductCard;
