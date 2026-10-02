const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.post("/", protect, addCategory);

router.put("/:id", protect, updateCategory);

router.delete("/:id", protect, deleteCategory);

router.get("/", getCategories);
router.post("/", protect, adminOnly, addCategory);

router.put("/:id", protect, adminOnly, updateCategory);

router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;