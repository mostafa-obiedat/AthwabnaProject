const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

// إنشاء منتج جديد (مع رفع حتى 5 صور)
exports.createProduct = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const newProduct = new Product({
      ...req.body,
      images: imagePaths,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", data: newProduct });
  } catch (error) {
    res.status(400).json({ error: "Failed to create product", details: error.message });
  }
};

// تعديل منتج (الصور اختيارية)
exports.updateProduct = async (req, res) => {
  try {
    const imagePaths =
      req.files?.length > 0
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : undefined;

    const updatedFields = { ...req.body, updatedAt: new Date() };
    if (imagePaths) updatedFields.images = imagePaths;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: "Failed to update product", details: error.message });
  }
};

// حذف منتج
exports.deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.json({ message: "Product deleted" });
}, "Failed to delete product");
