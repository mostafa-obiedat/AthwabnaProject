import React from "react";
import CategoryProductsPage from "../components/common/CategoryProductsPage";

const Kids = () => (
  <CategoryProductsPage
    title="قسم ملابس الأطفال"
    endpoint="/products/kids"
    showRegionFilter
  />
);

export default Kids;
