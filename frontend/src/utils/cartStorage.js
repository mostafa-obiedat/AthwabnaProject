// إضافة منتج إلى سلة localStorage — منطق مشترك بين صفحات المنتجات
// يرجع العنصر المُضاف حتى يُرسل أيضاً إلى redux
export const addProductToLocalCart = (product) => {
  const newItem = {
    productId: product._id,
    title: product.name || "منتج غير معروف",
    price: product.price || 0,
    image: product.images?.[0] || "/placeholder-product.jpg",
    quantity: 1,
    size: product.size?.[0] || "UNKNOWN",
    availableSizes: product.size,
    discount: product.discount,
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(
    (item) => item.productId === newItem.productId && item.size === newItem.size
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return newItem;
};
