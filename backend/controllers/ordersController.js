// const Order = require("../models/Order");

// // الحصول على جميع طلبات المستخدم
// exports.getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id; // افترضنا أن لديك نظام مصادقة
//     const orders = await Order.find({ user: userId })
//       .populate("items.product", "name price image")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "حدث خطأ أثناء جلب الطلبات",
//       error: error.message,
//     });
//   }
// };


const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

exports.getUserOrders = async (req, res) => {
  console.log("Token from cookies:", req.cookies.token);
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authorization token missing' 
      });
    }
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user ID:", decoded.userId );

    const orders = await Order.find({ user: decoded.userId  })
      .populate('products.product', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Controller Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};





// GET /api/orders/:id => جلب تفاصيل الطلب بعد الدفع
exports.thankYou = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email') // جلب اسم وبريد المستخدم
      .populate('shippingAddress'); // إذا كان عندك موديل مرتبط

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    // التأكد أن المستخدم الحالي هو من يملك الطلب (أو admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'ليس لديك صلاحية لعرض هذا الطلب' });
    }

    res.status(200).json({ order });
  } catch (err) {
    console.error('فشل في جلب تفاصيل الطلب:', err);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};



// exports.thankYou = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate({
//         path: 'user',
//         model: 'users',
//         select: 'username email' // استخدم username إذا كان هذا هو الحقل في الموديل
//       })
//       .populate({
//         path: 'products.product',
//         model: 'Product',
//         select: 'name price images' // تغيير من image إلى images لاسترجاع المصفوفة
//       })
//       .populate('shippingAddress');
//     if (!order) {
//       return res.status(404).json({ message: 'الطلب غير موجود' });
//     }

//     // التحقق من صلاحية المستخدم
//     if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'ليس لديك صلاحية لعرض هذا الطلب' });
//     }

//     // تعديل هيكل البيانات المرجعة لسهولة الاستخدام في الواجهة
//     const responseData = {
//       order: {
//         ...order._doc,
//         products: order.products.map(item => ({
//           ...item._doc,
//           product: {
//             ...item.product._doc,
//             // نأخذ أول صورة إذا كانت images موجودة ومليئة
//             mainImage: item.product.images?.length > 0 ? item.product.images[0] : null
//           }
//         }))
//       }
//     };

//     res.status(200).json(responseData);
//   } catch (err) {
//     console.error('فشل في جلب تفاصيل الطلب:', err);
//     res.status(500).json({ message: 'خطأ في الخادم' });
//   }
// };