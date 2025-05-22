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
      sort.sold = -1; // تنازلي (الأكثر شهرة)
    } else {
      // الفرز الافتراضي (الأحدث أولاً)
      sort.createdAt = -1;
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
    const { sortBy, region, page = 1, limit = 4 } = req.query;

    const query = {
      category: "women",
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
      sort.sold = -1; // تنازلي (الأكثر شهرة)
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
    console.error("Error fetching women products:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب المنتجات" });
  }
};

exports.getKidsProducts = async (req, res) => {
  try {
    const { sortBy, region, page = 1, limit = 4 } = req.query;

    const query = {
      category: "kids",
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
      sort.sold = -1; // تنازلي (الأكثر شهرة)
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
    console.error("Error fetching kids products:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب المنتجات" });
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
    }).limit(8).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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


// exports.offers = async (req, res) => {
//   try {
//     const { sortBy, page = 1, limit = 4 } = req.query;

//     const query = { discount: { $gt: 0 } }; // فقط المنتجات التي تحتوي على خصم

//     let sortOptions = {};
//     if (sortBy === 'price') {
//       sortOptions.price = 1;
//     } else if (sortBy === 'popularity') {
//       sortOptions.sold = -1;
//     } else {
//       sortOptions.createdAt = -1; // الأحدث أولًا
//     }

//     const totalCount = await Product.countDocuments(query);
//     const totalPages = Math.ceil(totalCount / limit);

//     const products = await Product.find(query)
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     res.json({
//       products,
//       currentPage: Number(page),
//       totalPages,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'حدث خطأ في الخادم.' });
//   }
// };

exports.offers = async (req, res) => {
  try {
    const {
      sortBy,
      page = 1,
      limit = 4,
      minDiscount,
      maxDiscount,
      startDate,
      endDate,
    } = req.query;

    // التاريخ الحالي
    const currentDate = new Date();

    // بناء الاستعلام الأساسي
    const query = {
      discount: { $gt: 0 }, // شرط أساسي لوجود خصم
      $or: [
        { offerEndDate: { $exists: false } }, // المنتجات بدون تاريخ انتهاء
        { offerEndDate: null }, // المنتجات التي لديها قيمة null
        {
          $and: [
            { offerEndDate: { $exists: true } },
            { offerEndDate: { $gt: currentDate } } // المنتجات التي لم تنتهي بعد
          ]
        }
      ]
    };

    // إضافة فلتر حسب قيمة الخصم
    if (minDiscount || maxDiscount) {
      query.discount = {
        $gt: 0, // الحفاظ على الشرط الأساسي
        ...(minDiscount && { $gte: Number(minDiscount) }),
        ...(maxDiscount && { $lte: Number(maxDiscount) })
      };
    }

    // إعداد خيارات الترتيب
    let sortOptions = {};
    if (sortBy === 'price') {
      sortOptions.price = 1;
    } else if (sortBy === 'popularity') {
      sortOptions.sold = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    // تنفيذ الاستعلام
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      products,
      currentPage: Number(page),
      totalPages,
    });
  } catch (err) {
    console.error('خطأ في جلب العروض:', err);
    res.status(500).json({
      message: 'حدث خطأ في الخادم',
      error: err.message
    });
  }
};


exports.getBestSellers = async (req, res) => {
  try {
    const {
      sortBy = 'sold',
      page = 1,
      limit = 4,
      minPrice,
      maxPrice,
      category
    } = req.query;

    // بناء الاستعلام الأساسي
    const query = { sold: { $gt: 0 } }; // فقط المنتجات التي تم بيعها

    // إضافة فلتر حسب الفئة
    if (category) {
      query.category = category;
    }

    // إضافة فلتر حسب السعر
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // إعداد خيارات الترتيب
    let sortOptions = {};
    if (sortBy === 'price') {
      sortOptions.price = 1;
    } else if (sortBy === "popularity") {
      sortOptions.sold = -1; // تنازلي (الأكثر شهرة)
    } else {
      sortOptions.sold = -1; // افتراضي حسب الأكثر مبيعاً
    }

    // حساب العدد الإجمالي
    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    // جلب المنتجات
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      products,
      currentPage: Number(page),
      totalPages,
      totalProducts: totalCount
    });
  } catch (err) {
    console.error('خطأ في جلب المنتجات الأكثر مبيعًا:', {
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      message: 'حدث خطأ في الخادم',
      error: err.message
    });
  }
};



// exports.getFeaturedAccessories = async (req, res) => {
//   try {
//     const {
//       sortBy = 'sold',
//       page = 1,
//       limit = 4,
//       minPrice,
//       maxPrice,
//     } = req.query;

//     // بناء الاستعلام الأساسي للإكسسوارات المميزة
//     const query = { 
//       type: 'accessories',
//     };

   
//   // إضافة فلتر حسب السعر
//   if (minPrice || maxPrice) {
//     query.price = {};
//     if (minPrice) query.price.$gte = Number(minPrice);
//     if (maxPrice) query.price.$lte = Number(maxPrice);
//   }


    
//      // إعداد خيارات الترتيب
//      let sortOptions = {};
//      if (sortBy === 'price') {
//        sortOptions.price = 1;
//      } else if (sortBy === "popularity") {
//        sortOptions.sold = -1; // تنازلي (الأكثر شهرة)
//      } else {
//        sortOptions.sold = -1; // افتراضي حسب الأكثر مبيعاً
//      }
 
 
//    // حساب العدد الإجمالي
//    const totalCount = await Product.countDocuments(query);
//    const totalPages = Math.ceil(totalCount / limit);

//    // جلب المنتجات
//    const products = await Product.find(query)
//      .sort(sortOptions)
//      .skip((page - 1) * limit)
//      .limit(Number(limit));

//    res.json({
//      products,
//      currentPage: Number(page),
//      totalPages,
//      totalProducts: totalCount
//    });
//  } catch (err) {
//    console.error('خطأ في جلب المنتجات الأكثر مبيعًا:', {
//      message: err.message,
//      stack: err.stack
//    });
//    res.status(500).json({
//      message: 'حدث خطأ في الخادم',
//      error: err.message
//    });
//  }
// };
