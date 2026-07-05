const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { buildSort, buildPagination } = require("../utils/productQuery");

// دالة عامة تبني handler لعرض منتجات فئة معينة مع الفرز والباجنيشن —
// كانت هذه المنطقية مكررة 5 مرات (رجالي/نسائي/أطفال/إكسسوارات رجالية/نسائية)
const listByFilter = (baseFilter) =>
  asyncHandler(async (req, res) => {
    const { sortBy, region, page: pageQ, limit: limitQ } = req.query;
    const { page, limit, skip } = buildPagination(pageQ, limitQ);

    const query = { ...baseFilter };
    if (region) query.region = region;

    const [totalCount, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).sort(buildSort(sortBy)).skip(skip).limit(limit),
    ]);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  }, "حدث خطأ أثناء جلب المنتجات");

exports.getMenProducts = listByFilter({ category: "men" });
exports.getWomenProducts = listByFilter({ category: "women" });
exports.getKidsProducts = listByFilter({ category: "kids" });
exports.getMenAccessories = listByFilter({ type: "accessory", category: "accessory-men" });
exports.getWomenAccessories = listByFilter({ type: "accessory", category: "accessory-women" });

// جلب تفاصيل منتج معين
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "المنتج غير موجود" });
  }
  res.status(200).json(product);
}, "حدث خطأ أثناء جلب المنتج");

// جلب المنتجات ذات الصلة (من نفس الفئة)
exports.getRelatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category })
    .limit(8)
    .sort({ createdAt: -1 });
  res.status(200).json(products);
}, "حدث خطأ أثناء جلب المنتجات ذات الصلة");

// تقييم منتج (إضافة تقييم جديد أو تحديث تقييم المستخدم السابق)
exports.rateProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user._id;

  const ratingNum = Number(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ message: "التقييم يجب أن يكون بين 1 و 5" });
  }

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "المنتج غير موجود" });

  const existingRating = product.ratings.find((r) => r.userId.equals(userId));
  if (existingRating) {
    existingRating.rating = ratingNum;
    existingRating.comment = comment;
  } else {
    product.ratings.push({ userId, rating: ratingNum, comment });
  }

  // حساب متوسط التقييمات وحفظ المنتج
  await product.calculateAverageRating();

  res.status(200).json({ message: "تم التقييم بنجاح", product });
}, "حدث خطأ أثناء حفظ التقييم");

// العروض: المنتجات التي عليها خصم ولم تنتهِ صلاحية عرضها
exports.offers = asyncHandler(async (req, res) => {
  const { sortBy, page: pageQ, limit: limitQ, minDiscount, maxDiscount } = req.query;
  const { page, limit, skip } = buildPagination(pageQ, limitQ);

  const query = {
    discount: {
      $gt: 0,
      ...(minDiscount && { $gte: Number(minDiscount) }),
      ...(maxDiscount && { $lte: Number(maxDiscount) }),
    },
    $or: [
      { offerEndDate: { $exists: false } },
      { offerEndDate: null },
      { offerEndDate: { $gt: new Date() } },
    ],
  };

  const [totalCount, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).sort(buildSort(sortBy)).skip(skip).limit(limit),
  ]);

  res.json({
    products,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  });
}, "حدث خطأ أثناء جلب العروض");

// الأكثر مبيعاً مع فلاتر السعر والفئة
exports.getBestSellers = asyncHandler(async (req, res) => {
  const { sortBy, page: pageQ, limit: limitQ, minPrice, maxPrice, category } = req.query;
  const { page, limit, skip } = buildPagination(pageQ, limitQ);

  const query = { sold: { $gt: 0 } };
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
  }

  const [totalCount, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).sort(buildSort(sortBy, { sold: -1 })).skip(skip).limit(limit),
  ]);

  res.json({
    products,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalProducts: totalCount,
  });
}, "حدث خطأ أثناء جلب المنتجات الأكثر مبيعاً");
