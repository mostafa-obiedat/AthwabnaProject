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