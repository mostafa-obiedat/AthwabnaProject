const Workshop = require('../models/Workshop');

// جلب تفاصيل ورشة واحدة
exports.getWorkshopDetails = async (req, res) => {
    try {
        const workshop = await Workshop.findById(req.params.id);
        if (!workshop) return res.status(404).json({ success: false, message: 'الورشة غير موجودة' });
    
        const average = workshop.getAverageRating();
        res.json({ success: true, data: { ...workshop.toObject(), averageRating: average } });
      } catch (err) {
        res.status(500).json({ success: false, message: 'خطأ في الخادم' });
      }
};

exports.rate = async (req, res) => {
    const { rating } = req.body;
  
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'التقييم يجب أن يكون بين 1 و 5' });
    }
  
    try {
      const workshop = await Workshop.findById(req.params.id);
      if (!workshop) return res.status(404).json({ success: false, message: 'الورشة غير موجودة' });
  
      workshop.ratings.push(rating);
      await workshop.save();
  
      const average = workshop.getAverageRating();
      res.json({ success: true, averageRating: average });
    } catch (err) {
      res.status(500).json({ success: false, message: 'خطأ في الخادم' });
    }
  };
