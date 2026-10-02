const SubCategory = require("../models/SubCategory");

// Add SubCategory
const addSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryName } = req.body;

        const subCategory = await SubCategory.create({
            categoryId,
            subCategoryName
        });

        res.status(201).json(subCategory);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All SubCategories
const getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find()
            .populate("categoryId", "categoryName");

        res.json(subCategories);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update SubCategory
const updateSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(subCategory);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete SubCategory
const deleteSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id);

        res.json({
            message: "SubCategory Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory
};