const Product = require("../models/Product"); // استيراد نموذج المنتج


exports.getMenProducts = async (req, res) => {
  try {
    const { sortBy, region, page = 1, limit = 4 } = req.query;

    const query = {
      category: "men",
    };

    // فلترة حسب المنطقة
    if (region) {
      query.region = region;
    }

    // إعداد الفرز
    let sort = {};
    if (sortBy === "price") {
      sort.price = 1; // تصاعدي
    } else if (sortBy === "popularity") {
      sort.popularity = -1; // تنازلي (الأكثر شهرة)
    }

    // حساب عدد المنتجات الكلي
    const totalProducts = await Product.countDocuments(query);

    // استعلام المنتجات مع الباجنيشن والفرز
    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching men products:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب المنتجات" });
  }
};
 

exports.getWomenProducts = async (req, res) => {
  try {
    const { region, sortBy, minPrice, maxPrice } = req.query;

    // فلتر أساسي على فئة "رجالي"
    let filter = { category: "women" };

    // فلترة حسب المنطقة (إن وجدت)
    if (region) {
      filter.region = region;
    }

    // فلترة حسب السعر (إن وجدت)
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }

    // ترتيب حسب الطلب
    let sortOption = {};
    if (sortBy === "price") {
      sortOption.price = 1; // ترتيب تصاعدي
    } else if (sortBy === "popularity") {
      sortOption.popularity = -1; // ترتيب تنازلي
    }

    const products = await Product.find(filter).sort(sortOption);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    }).limit(8).sort({createdAt: -1});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.rateProduct = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const { productId } = req.params;
//     const userId = req.user._id; // تأكد إنك مستخدم authMiddleware لتعرف المستخدم

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "المنتج غير موجود" });

//     // تحقق إذا المستخدم سبق وقيّم
//     const existingRating = product.ratings.find((r) => r.userId.toString() === userId.toString());

//     if (existingRating) {
//       // تحديث التقييم والتعليق إذا كان موجود
//       existingRating.rating = rating;
//       existingRating.comment = comment;
//     } else {
//       // إضافة تقييم جديد
//       product.ratings.push({ userId, rating, comment });
//     }

//     // ✅ احسب المتوسط وحدثه
//     await product.calculateAverageRating();

//     res.status(200).json({ message: "تم حفظ التقييم بنجاح", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "حدث خطأ أثناء التقييم" });
//   }
// };
exports.rateProduct = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user._id;

    // تحقق من أن التقييم رقم صالح بين 1 و 5
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'التقييم يجب أن يكون بين 1 و 5' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });

    // تحقق من عدم وجود تقييم سابق لنفس المستخدم
    const existingRatingIndex = product.ratings.findIndex(r => r.userId.equals(userId));
    
    if (existingRatingIndex >= 0) {
      // تحديث التقييم الموجود
      product.ratings[existingRatingIndex].rating = ratingNum;
      product.ratings[existingRatingIndex].comment = comment;
    } else {
      // إضافة تقييم جديد
      product.ratings.push({ userId, rating: ratingNum, comment });
    }

    // حساب متوسط التقييمات وحفظ المنتج
    await product.calculateAverageRating();

    res.status(200).json({ message: 'تم التقييم بنجاح', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء حفظ التقييم' });
  }
};
