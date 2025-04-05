const Product = require("../models/Product"); // استيراد نموذج المنتج

// Controller لجلب المنتجات الخاصة بالرجال
exports.getMenProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "men" }); // جلب المنتجات الخاصة بالرجال
    res.status(200).json(products); // إرسال البيانات كـ JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // إرسال رسالة الخطأ في حالة فشل العملية
  }
};

exports.getWomenProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    res.status(200).json(products); // إرسال البيانات كـ JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // إرسال رسالة الخطأ في حالة فشل العملية
  }
};

exports.getKidsProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "kids" });
    res.status(200).json(products); // إرسال البيانات كـ JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // إرسال رسالة الخطأ في حالة فشل العملية
  }
};

// Controller لجلب تفاصيل منتج معين
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller لجلب المنتجات ذات الصلة (من نفس الفئة)
exports.getRelatedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
