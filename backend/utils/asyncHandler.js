// يغلف الدوال غير المتزامنة لتوحيد معالجة الأخطاء بدل تكرار try/catch في كل controller
const asyncHandler = (fn, fallbackMessage = "حدث خطأ في الخادم") =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      if (res.headersSent) return next(error);
      res.status(500).json({
        success: false,
        message: fallbackMessage,
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  };

module.exports = asyncHandler;
