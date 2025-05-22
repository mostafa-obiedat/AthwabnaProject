const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Contact = require("../models/Contact")
const Workshop = require("../models/Workshop")
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


// إنشاء توكن JWT
const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.checkAuth = (req, res) => {
    res.status(200).json({
        isAuthenticated: true,
        user: req.user,
    });
};


// exports.registerAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // التحقق من وجود المستخدم مسبقًا
//     const adminExists = await Admin.findOne({ email });
//     if (adminExists)
//       return res.status(400).json({ message: "Admin already exists" });

//     // إنشاء مستخدم جديد
//     const admin = await Admin.create({ email, password });

//     // إنشاء توكن
//     const token = generateToken(admin._id, "admin");
//     console.log("Generated Token:", token);
//     // إرسال التوكن في الكوكيز
//     res
//       .cookie("token", token, { httpOnly: true })
//       .status(201)
//       .json({ message: "Admin registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // تسجيل الدخول
// exports.loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Admin.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
//     }

//     const token = jwt.sign({ userId: user._id, role:"admin"}, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     // إرسال الـ Token في الكوكيز
//     res.cookie("token", token, {
//       httpOnly: true,
//     });

//     res.status(200).json({ message: "تم تسجيل الدخول بنجاح" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getOverviewStats = async (req, res) => {
//     try {
//       // إجمالي عدد المستخدمين
//       const usersCount = await User.countDocuments();

//       // إجمالي عدد المنتجات
//       const productsCount = await Product.countDocuments();

//       // إجمالي عدد الطلبات
//       const orders = await Order.find();
//       const ordersCount = orders.length;

//       // إجمالي الإيرادات
//       const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
//         // إنشاء إيرادات كل شهر (مصفوفة فيها 12 شهر)
//     const monthlyRevenue = Array(12).fill(0);
//     orders.forEach(order => {
//       const month = new Date(order.createdAt).getMonth(); // 0 = Jan, 11 = Dec
//       monthlyRevenue[month] += order.total || 0;
//     });

//       // إحصائيات العملاء
//       const totalCustomers = await User.countDocuments({ role: 'customer' });
//       const men = await User.countDocuments({ role: 'customer', gender: 'male' });
//       const women = await User.countDocuments({ role: 'customer', gender: 'female' });
//       const kids = await User.countDocuments({ role: 'customer', gender: 'kid' }); // إذا عندك تصني



//       res.status(200).json({
//         success: true,
//         data: {
//           usersCount,
//           productsCount,
//           ordersCount,
//           totalRevenue,
//           monthlyRevenue,
//           totalCustomers,
//           genderStats: {
//             men,
//             women,
//             kids,
//           }
//         }
//       });
//     } catch (err) {
//       console.error("Overview error:", err);
//       res.status(500).json({
//         success: false,
//         message: "حدث خطأ أثناء جلب البيانات"
//       });
//     }
//   };
exports.getOverviewStats = async (req, res) => {
    try {
        // إجمالي عدد المستخدمين
        const usersCount = await User.countDocuments();

        // إجمالي عدد المنتجات
        const productsCount = await Product.countDocuments();

        // إجمالي عدد الطلبات + تعبئة المنتجات
        const orders = await Order.find().populate('products.product');
        const ordersCount = orders.length;

        // إجمالي الإيرادات
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

        // إيرادات كل شهر
        const monthlyRevenue = Array(12).fill(0);
        orders.forEach(order => {
            const month = new Date(order.createdAt).getMonth(); // 0 = Jan, 11 = Dec
            monthlyRevenue[month] += order.total || 0;
        });

        // تحليل الزبائن حسب المنتجات المشتراة (men/women/kids)
        const genderCounts = {
            men: 0,
            women: 0,
            kids: 0
        };

        orders.forEach(order => {
            order.products.forEach(item => {
                const product = item.product;
                const category = product?.category;
                if (category === 'men') genderCounts.men += item.quantity;
                else if (category === 'women') genderCounts.women += item.quantity;
                else if (category === 'kids') genderCounts.kids += item.quantity;
            });
        });

        // مجموع الزبائن لأجل النسبة المئوية
        const totalCustomerBasedOnPurchase =
            genderCounts.men + genderCounts.women + genderCounts.kids;

        const productSales = {};  // لتخزين مبيعات كل منتج

        orders.forEach(order => {
            order.products.forEach(item => {
                // التحقق من أن المنتج موجود
                const product = item.product;
                if (product) {
                    const productId = product._id.toString();  // استخدم الـ _id لتحديد المنتج
                    const quantity = item.quantity;

                    // إذا كان المنتج غير موجود في المنتجSales، أنشئه
                    if (!productSales[productId]) {
                        productSales[productId] = { sold: 0, name: product.name, price: product.price };
                    }
                    // أضف الكمية المباعة
                    productSales[productId].sold += quantity;
                }
            });
        });

        // تحويل المبيعات إلى مصفوفة من المنتجات
        const topProducts = Object.values(productSales).sort((a, b) => b.sold - a.sold).slice(0, 5);  // ترتيب المنتجات حسب المبيعات واختيار أعلى 5 منتجات

        res.status(200).json({
            success: true,
            data: {
                usersCount,
                productsCount,
                ordersCount,
                totalRevenue,
                monthlyRevenue,
                totalCustomers: totalCustomerBasedOnPurchase,
                genderStats: genderCounts,
                topProducts  // إضافة مبيعات المنتجات الأكثر مبيعًا
            },
        });
    } catch (err) {
        console.error("Overview error:", err);
        res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء جلب البيانات"
        });
    }
};

// Get products with pagination and search
exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const query = {
            name: { $regex: search, $options: "i" } // بحث غير حساس لحالة الأحرف
        };

        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            data: products,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};


// Get all workshops with search and pagination
exports.getWorkshops = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page
      const limit = parseInt(req.query.limit) || 6; // Items per page
      const skip = (page - 1) * limit;
      const search = req.query.search || "";
  
      const query = {
        title: { $regex: search, $options: "i" },
      };
  
      const [workshops, total] = await Promise.all([
        Workshop.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        Workshop.countDocuments(query),
      ]);
  
      res.json({
        workshops,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error("Error fetching workshops:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
// Create new workshop
exports.createWorkshop = async (req, res) => {
    try {
        const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
        const workshop = new Workshop({
            ...req.body,
            image: imagePath,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await workshop.save();
        res.status(201).json(workshop);
    } catch (err) {
        res.status(400).json({ error: "Failed to create workshop" });
    }
};

// Update workshop
exports.updateWorkshop = async (req, res) => {
    try {
        const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
        const updateData = {
            ...req.body,
            updatedAt: new Date()
        };

        if (imagePath) {
            updateData.image = imagePath;
        }
        const workshop = await Workshop.findByIdAndUpdate(req.params.id, updateData, { new: true, });

        if (!workshop) return res.status(404).json({ error: "Workshop not found" });
        res.json(workshop);
    } catch (err) {
        res.status(400).json({ error: "Failed to update workshop" });
    }
};

// Delete workshop
exports.deleteWorkshop = async (req, res) => {
    try {
        const workshop = await Workshop.findByIdAndDelete(req.params.id);
        if (!workshop) return res.status(404).json({ error: "Workshop not found" });
        res.json({ message: "Workshop deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete workshop" });
    }
};

// Get all customers with pagination and search
exports.getCustomers = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
  
      const query = {
        role: "user",
        username: { $regex: search, $options: "i" },
      };
  
      const customers = await User.find(query)
        .select("-password")
        .populate("savedAddresses")
        .populate("orders")
        .populate("coupons")
        .populate("likedProducts")
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
  
      const total = await User.countDocuments(query);
  
      res.json({
        data: customers,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalCustomers: total,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  };
  

// تعديل بيانات مستخدم
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};


// Get all orders with pagination
exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalOrders = await Order.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);

        const orders = await Order.find()
            .populate('shippingAddress')
            .sort({ createdAt: -1 }) // أحدث الطلبات أولاً
            .skip(skip)
            .limit(limit);

        res.json({
            data: orders,
            currentPage: page,
            totalPages,
            totalOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'فشل في جلب الطلبات' });
    }
};


// Get all messages
exports.getMessages = async (req, res) => {
    const messages = await Contact.find({ messageType: "inquiry" }).sort({ createdAt: -1 });
    res.json(messages);
};



exports.replyToMessage = async (req, res) => {
    const { to, subject, text, messageId } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, // بريد الأدمن
                pass: process.env.EMAIL_PASSWORD, // كلمة مرور أو app password
            },
        });

        const mailOptions = {
            from: `AthwabnaCompany ${process.env.EMAIL_USERNAME}`,
            to,
            subject,
            text,
            // نسخة إلى الأدمن
            cc: process.env.EMAIL_USERNAME,
        };

        await transporter.sendMail(mailOptions);
        await Contact.findByIdAndUpdate(messageId, {
            isReplied: true,
            repliedAt: new Date(),
        });

        res.status(200).json({ message: "Reply sent successfully" });
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({ error: "Failed to send reply" });
    }
};

// ✅ Get admin settings
exports.getAdminInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("username phonenumber role");
        if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });
        res.json({ name: user.username, phonenumber: user.phonenumber });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update admin info (name + phone)
exports.updateAdmin = async (req, res) => {
    const { name, phone } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        user.username = name;
        user.phonenumber = phone;
        await user.save();
        res.json({ message: "Info updated" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update admin password
exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });
        user.password = newPassword;
        await user.save();
        console.log("New hashed password:", user.password);

        res.json({ message: "Password updated" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
      res.json({ data: notifications });
    } catch (error) {
      res.status(500).json({ error: "Error fetching notifications" });
    }
  };
  
  exports.markAsRead = async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
      res.json({ message: "Marked as read" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update notification" });
    }
  };


