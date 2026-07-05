import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

// عرض نجوم التقييم — كانت الدالة مكررة في جميع صفحات المنتجات
const RatingStars = ({ rating = 0, count }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars || (i === fullStars + 1 && hasHalfStar)) {
      stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
    }
  }

  return (
    <div className="flex items-center">
      {stars}
      {count !== undefined && (
        <span className="text-gray-500 text-2xs xs:text-xs mr-1">({count})</span>
      )}
    </div>
  );
};

export default RatingStars;
