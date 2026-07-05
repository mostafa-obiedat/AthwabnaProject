import React from "react";

// شريط تنقل بين الصفحات موحد (السابق / س من ص / التالي)
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
      <div className="bg-white rounded-lg shadow-sm sm:shadow-md inline-flex p-1">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm md:text-base ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer"
          } transition-colors duration-300`}
        >
          السابق
        </button>

        <span className="px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 flex items-center text-xs sm:text-sm md:text-base">
          <span className="text-[#AA1313] font-bold">{currentPage}</span>
          <span className="mx-1">من</span>
          <span className="text-[#2B2B2B]">{totalPages}</span>
        </span>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm md:text-base ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer"
          } transition-colors duration-300`}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default Pagination;
