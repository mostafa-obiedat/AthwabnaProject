const Cart = require("../models/Cart");
const Product = require("../models/Product");

// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id }).populate(
//       "products.productId"
//     );

//     if (!cart) {
//       return res.status(404).json({ message: "السلة فارغة" });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.addToCart = async (req, res) => {
//   const { productId, quantity, size } = req.body;

//   // تحقق من وجود المستخدم
//   if (!req.user) {
//     return res.status(401).json({
//       message: "غير مصرح به، يرجى تسجيل الدخول",
//       code: "UNAUTHORIZED",
//     });
//   }
//   const userId = req.user.id; // المستخدم الحالي

//   try {
//     // البحث عن المنتج
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "المنتج غير موجود" });
//     }

//     // البحث عن سلة المستخدم
//     let cart = await Cart.findOne({ userId });

//     // إذا لم تكن هناك سلة، قم بإنشاء واحدة جديدة
//     if (!cart) {
//       cart = new Cart({ userId, products: [], totalAmount: 0 });
//     }

//     // التحقق من وجود المنتج في السلة
//     const existingProduct = cart.products.find(
//       (item) => item.productId.toString() === productId && item.size === size
//     );

//     if (existingProduct) {
//       // إذا كان المنتج موجودًا، قم بزيادة الكمية
//       existingProduct.quantity += quantity;
//     } else {
//       // إذا لم يكن المنتج موجودًا، قم بإضافته
//       cart.products.push({ productId, quantity, size, price: product.price });
//     }

//     // حساب المبلغ الإجمالي للسلة
//     cart.totalAmount = cart.products.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     // حفظ السلة
//     await cart.save();

//     res.status(200).json({ message: "تمت إضافة المنتج إلى السلة بنجاح", cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// cartController.js
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(404).json({ message: "السلة فارغة" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "حدث خطأ أثناء جلب سلة التسوق",
      error: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        products: [],
        totalAmount: 0,
      });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
        size,
        price: product.price,
      });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة المنتج إلى السلة",
      error: error.message,
    });
  }
};


