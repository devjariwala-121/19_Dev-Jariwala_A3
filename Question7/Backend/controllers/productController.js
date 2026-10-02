const Product = require("../models/Product");

// Add Product
const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("categoryId", "categoryName")
            .populate("subCategoryId", "subCategoryName");

        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};