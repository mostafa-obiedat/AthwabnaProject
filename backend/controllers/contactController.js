const Contact = require("../models/Contact")

exports.createContact = async (req, res) => {
  const { name, email, messageType, message, rating } = req.body;

  try {
    // التحقق من البيانات المطلوبة
    if (!name || !email || !message) {
      return res.status(400).json({ message: "الرجاء إدخال جميع الحقول المطلوبة" });
    }

    // التحقق من التقييم إذا كانت رسالة فيدباك
    if (messageType === 'feedback' && (!rating || rating < 1 || rating > 5)) {
      return res.status(400).json({ message: "الرجاء اختيار تقييم صحيح من 1 إلى 5 نجوم" });
    }

    // إنشاء رسالة جديدة
    const newMessage = new Contact({
      name,
      email,
      messageType: messageType || 'inquiry', // افتراضي inquiry إذا لم يتم الإرسال
      message,
      rating: messageType === 'feedback' ? rating : null, // التقييم فقط للفيدباك
      isReplied: false,
      repliedAt: null
    });

    // حفظ الرسالة في قاعدة البيانات
    await newMessage.save();

    res.status(201).json({ 
      success: true,
      message: "تم إرسال رسالتك بنجاح!",
      data: {
        id: newMessage._id,
        messageType: newMessage.messageType
      }
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ 
      success: false,
      message: "حدث خطأ في الخادم أثناء معالجة طلبك",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Contact.find({
      messageType: 'feedback',
      rating: { $exists: true, $gte: 1 } // التأكد من وجود تقييم
    })
      .sort({ createdAt: -1 })
      .limit(5); // جلب آخر 5 تعليقات

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ في جلب التعليقات' });
  }
};
