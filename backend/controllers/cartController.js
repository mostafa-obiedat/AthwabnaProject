const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

// جلب سلة المستخدم الحالي
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "products.productId"
  );

  if (!cart) {
    return res.status(404).json({ message: "السلة فارغة" });
  }

  res.status(200).json(cart);
}, "حدث خطأ أثناء جلب سلة التسوق");

// إضافة منتج إلى السلة (أو زيادة الكمية إذا كان موجوداً بنفس المقاس)
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "المنتج غير موجود" });
  }

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    cart = new Cart({ userId: req.user.id, products: [], totalAmount: 0 });
  }

  const existingProduct = cart.products.find(
    (item) => item.productId.toString() === productId && item.size === size
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity, size, price: product.price });
  }

  cart.totalAmount = cart.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "تمت إضافة المنتج إلى السلة بنجاح",
    cart,
  });
}, "حدث خطأ أثناء إضافة المنتج إلى السلة");
