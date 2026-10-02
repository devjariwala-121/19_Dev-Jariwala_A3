const Category = require("../models/Category");

// Add Category
const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        const category = await Category.create({
            categoryName
        });

        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.json(categories);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(category);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
};