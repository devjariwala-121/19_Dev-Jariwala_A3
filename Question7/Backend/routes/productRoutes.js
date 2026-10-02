const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", protect, addProduct);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

router.get("/", getProducts);

module.exports = router;