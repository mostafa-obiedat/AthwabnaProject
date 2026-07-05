import React from "react";
import CategoryProductsPage from "../components/common/CategoryProductsPage";

const Women = () => (
  <CategoryProductsPage
    title="قسم الملابس النسائية"
    endpoint="/products/women"
    showRegionFilter
  />
);

export default Women;
