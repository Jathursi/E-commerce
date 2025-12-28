const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const ProductController = require("../controllers/productController");

const uploadDir = path.join(__dirname, "../public/uploads/products");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadDir),
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const base = path
			.basename(file.originalname, ext)
			.replace(/[^a-z0-9]+/gi, "-")
			.toLowerCase();
		cb(null, `${base || "product"}-${Date.now()}${ext}`);
	},
});

const upload = multer({ storage });

router.get("/products/:id", ProductController.fetchProductById);
router.get("/products", ProductController.fetchProducts);
router.post("/products", upload.array("images", 5), ProductController.createProduct);
router.put("/products/:id", upload.array("images", 5), ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
