const Contact = require("../models/Contact")

exports.createContact = async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      // إنشاء رسالة جديدة وتخزينها في قاعدة البيانات
      const newMessage = new Contact({
        name,
        email,
        message,
      });
  
      // حفظ الرسالة في قاعدة البيانات
      await newMessage.save();
  
      res.status(200).json({ message: "تم إرسال رسالتك بنجاح!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء إرسال الرسالة" });
    }
  };

