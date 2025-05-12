const Favorite =  require("../models/Favorite");
const User = require("../models/User");

exports.addToFavorites = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  console.log("User:", req.user);
  console.log("Body:", req.body);
  try {
    // تأكد إنه المنتج مش مضاف قبل
    const alreadyExists = await Favorite.findOne({ user: userId, product: productId });
    if (alreadyExists) {
      return res.status(400).json({ message: "المنتج موجود بالفعل في المفضلة" });
    }

    const favorite = new Favorite({ user: userId, product: productId });
    await favorite.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { likedProducts: productId } });

    res.status(201).json({ message: "تمت الإضافة إلى المفضلة", favorite });
  } catch (error) {
    res.status(500).json({ message: "فشل في الإضافة إلى المفضلة", error });
  }
};

exports.getFavorites = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const favorites = await Favorite.find({ user: userId }).populate('product');
  
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ message: 'حدث خطأ أثناء جلب المفضلة', error });
    }
  };

  exports.removeFromFavorites = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
  
    try {
      await Favorite.findOneAndDelete({ user: userId, product: productId });
      res.status(200).json({ message: 'تمت الإزالة من المفضلة بنجاح' });
    } catch (error) {
      res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error });
    }
  };
  
  
