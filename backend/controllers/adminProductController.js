const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => { 
  try {
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    const newProduct = new Product({
      ...req.body,
      images: imagePaths,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", data: newProduct });
  } catch (error) {
    res.status(400).json({ error: "Failed to create product", details: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const imagePaths = req.files?.length > 0
      ? req.files.map(file => `/uploads/${file.filename}`)
      : undefined;

    const updatedFields = {
      ...req.body,
      updatedAt: new Date(),
    };

    if (imagePaths) updatedFields.images = imagePaths;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: "Failed to update product", details: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
