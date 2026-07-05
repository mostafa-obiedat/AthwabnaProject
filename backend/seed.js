require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const Product = require("./models/Product");
const Workshop = require("./models/Workshop");
const Coupon = require("./models/Coupon");
const User = require("./models/User");
const Notification = require("./models/Notification");

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear all collections
  await Promise.all([
    Admin.deleteMany({}),
    Product.deleteMany({}),
    Workshop.deleteMany({}),
    Coupon.deleteMany({}),
    Notification.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  // ─── Admin ───────────────────────────────────────────────
  await Admin.create({
    email: "mustafaobiedat3@gmail.com",
    password: "mustafa1234",
  });
  console.log("✓ Admin created");

  // ─── Products ────────────────────────────────────────────
  await Product.insertMany([
    // Men
    {
      name: "ثوب رجالي كلاسيكي أبيض",
      description: "ثوب رجالي من القماش الفاخر، مناسب للمناسبات الرسمية واليومية",
      price: 120,
      discount: 0,
      category: "men",
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["أبيض"],
      images: [],
      stock: 50,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "ثوب رجالي بيج فاخر",
      description: "ثوب رجالي بلون البيج المميز، خامة قطنية عالية الجودة",
      price: 135,
      discount: 10,
      offerEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      category: "men",
      size: ["M", "L", "XL", "XXL"],
      color: ["بيج"],
      images: [],
      stock: 40,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "ثوب رجالي أزرق سماوي",
      description: "ثوب رجالي عصري بلون أزرق سماوي مميز",
      price: 110,
      discount: 0,
      category: "men",
      size: ["S", "M", "L", "XL"],
      color: ["أزرق"],
      images: [],
      stock: 35,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    // Women
    {
      name: "عباية نسائية سوداء كلاسيكية",
      description: "عباية نسائية أنيقة من قماش الكريب الفاخر",
      price: 180,
      discount: 0,
      category: "women",
      size: ["S", "M", "L", "XL"],
      color: ["أسود"],
      images: [],
      stock: 45,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "عباية نسائية مطرزة",
      description: "عباية نسائية مزينة بتطريز يدوي راقٍ، تناسب المناسبات الخاصة",
      price: 250,
      discount: 15,
      offerEndDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      category: "women",
      size: ["S", "M", "L"],
      color: ["أسود", "كحلي"],
      images: [],
      stock: 25,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "فستان نسائي ورديّ",
      description: "فستان نسائي بلون وردي ناعم، مريح وأنيق",
      price: 160,
      discount: 0,
      category: "women",
      size: ["XS", "S", "M", "L"],
      color: ["وردي"],
      images: [],
      stock: 30,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    // Kids
    {
      name: "ثوب أطفال أبيض",
      description: "ثوب للأطفال من قماش ناعم ومريح، مناسب للمناسبات",
      price: 75,
      discount: 0,
      category: "kids",
      size: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
      color: ["أبيض"],
      images: [],
      stock: 60,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "فستان بنات ملون",
      description: "فستان للبنات بألوان زاهية، قطن 100% ناعم على البشرة",
      price: 85,
      discount: 10,
      offerEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      category: "kids",
      size: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
      color: ["وردي", "أصفر", "أزرق"],
      images: [],
      stock: 40,
      type: "product",
      sold: 0,
      averageRating: 0,
    },
    // Accessories - Men
    {
      name: "شماغ أحمر فاخر",
      description: "شماغ رجالي أحمر عالي الجودة، خامة ناعمة ومريحة",
      price: 45,
      discount: 0,
      category: "accessory-men",
      color: ["أحمر"],
      images: [],
      stock: 100,
      type: "accessory",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "عقال ذهبي",
      description: "عقال رجالي بحافة ذهبية أنيقة",
      price: 35,
      discount: 0,
      category: "accessory-men",
      color: ["أسود", "ذهبي"],
      images: [],
      stock: 80,
      type: "accessory",
      sold: 0,
      averageRating: 0,
    },
    // Accessories - Women
    {
      name: "حجاب شيفون ناعم",
      description: "حجاب شيفون بألوان متعددة، خفيف وأنيق",
      price: 30,
      discount: 0,
      category: "accessory-women",
      color: ["أسود", "كحلي", "رمادي", "بيج", "وردي"],
      images: [],
      stock: 150,
      type: "accessory",
      sold: 0,
      averageRating: 0,
    },
    {
      name: "حقيبة يد نسائية جلد",
      description: "حقيبة يد نسائية من الجلد الطبيعي، أنيقة وعملية",
      price: 220,
      discount: 20,
      offerEndDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      category: "accessory-women",
      color: ["بني", "أسود"],
      images: [],
      stock: 20,
      type: "accessory",
      sold: 0,
      averageRating: 0,
    },
  ]);
  console.log("✓ Products created (12)");

  // ─── Workshops ───────────────────────────────────────────
  await Workshop.insertMany([
    {
      title: "ورشة الخياطة التقليدية",
      description: "تعلم فن الخياطة التقليدية والتطريز اليدوي مع محترفين متخصصين",
      date: "2026-08-10",
      time: "10:00 AM",
      location: "عمّان - مركز الحرف اليدوية",
      ageRange: "18-50",
      price: 0,
      isFree: true,
      ratings: [],
      registrations: [],
    },
    {
      title: "ورشة تصميم الأزياء العربية",
      description: "ورشة احترافية لتصميم الأزياء العربية الأصيلة والمعاصرة",
      date: "2026-08-20",
      time: "2:00 PM",
      location: "عمّان - فندق الماريوت",
      ageRange: "20-45",
      price: 50,
      isFree: false,
      ratings: [],
      registrations: [],
    },
    {
      title: "ورشة التطريز للأطفال",
      description: "ورشة ممتعة لتعليم الأطفال أساسيات التطريز والخياطة",
      date: "2026-09-05",
      time: "11:00 AM",
      location: "عمّان - مركز الأطفال الإبداعي",
      ageRange: "8-14",
      price: 25,
      isFree: false,
      ratings: [],
      registrations: [],
    },
  ]);
  console.log("✓ Workshops created (3)");

  // ─── Coupons ─────────────────────────────────────────────
  await Coupon.insertMany([
    {
      code: "WELCOME10",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 50,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      isActive: true,
      maxUses: 100,
      currentUses: 0,
      onlyOncePerUser: true,
    },
    {
      code: "SAVE20",
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 150,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      isActive: true,
      maxUses: 50,
      currentUses: 0,
      onlyOncePerUser: true,
    },
    {
      code: "FIXED15",
      discountType: "fixed",
      discountValue: 15,
      minOrderAmount: 100,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      isActive: true,
      maxUses: 200,
      currentUses: 0,
      onlyOncePerUser: false,
    },
  ]);
  console.log("✓ Coupons created (3)");

  // ─── Notifications ───────────────────────────────────────
  await Notification.insertMany([
    {
      message: "مرحباً بك في متجر أثوابنا! تم إعادة تشغيل المتجر بنجاح.",
      type: "other",
      isRead: false,
    },
    {
      message: "تم إضافة منتجات جديدة لهذا الموسم.",
      type: "other",
      isRead: false,
    },
  ]);
  console.log("✓ Notifications created (2)");

  console.log("\n✅ Database seeded successfully!");
  console.log("─────────────────────────────────");
  console.log("Admin email:    mustafaobiedat3@gmail.com");
  console.log("Admin password: mustafa1234");
  console.log("─────────────────────────────────");

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
