const Product = require('../models/Product');

exports.MenAccessories = async (req, res) => {
    try {
      const { sortBy, page = 1, limit = 4 } = req.query;
  
      // بناء الفلتر
      const filter = {
        type: "accessory",
        category: "accessory-men",
      };

      // الترتيب
      let sortOption = {};
      if (sortBy === 'price') {
        sortOption.price = 1; // من الأقل للأعلى
      } else if (sortBy === 'popularity') {
        sortOption.sold = -1; // الأكثر مبيعاً
      } else {
        sortOption.createdAt = -1; // الأحدث أولاً
      }
  
      // لحساب عدد الصفحات الكلية
      const totalCount = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);
  
      // جلب المنتجات مع الباجنيشن
      const menAccessories = await Product.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      res.json({
        products: menAccessories,
        currentPage: Number(page),
        totalPages,
        totalCount,
      });
  
    } catch (error) {
      console.error("Error fetching men accessories:", error);
      res.status(500).json({ message: "حدث خطأ أثناء جلب الإكسسوارات" });
    }
  };
  
// backend controller for women accessories
exports.WomenAccessories = async (req, res) => {
    try {
      const { sortBy, region, page = 1, limit = 4 } = req.query;
  
      const filter = {
        type: "accessory",
        category: "accessory-women",
      };
  
      if (region) {
        filter.region = region;
      }
  
      let sortOption = {};
      if (sortBy === 'price') {
        sortOption.price = 1;
      } else if (sortBy === 'popularity') {
        sortOption.sold = -1;
      } else {
        sortOption.createdAt = -1;
      }
  
      const totalCount = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);
  
      const womenAccessories = await Product.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      res.json({
        products: womenAccessories,
        currentPage: Number(page),
        totalPages,
        totalCount,
      });
  
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء جلب الإكسسوارات النسائية" });
    }
  };
  