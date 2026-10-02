const express = require("express");

const router = express.Router();

const {
    addSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory
} = require("../controllers/subCategoryController");

router.post("/", addSubCategory);
router.get("/", getSubCategories);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

module.exports = router;