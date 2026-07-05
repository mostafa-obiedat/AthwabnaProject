import React from "react";

// مؤشر تحميل موحد لجميع الصفحات
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px] sm:min-h-[300px]">
    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export default LoadingSpinner;
