const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

const uploadDir = path.join(__dirname, "../public/uploads/categories");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadDir),
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
		cb(null, `${base || "category"}-${Date.now()}${ext}`);
	},
});

const upload = multer({ storage });

router.get("/categories", CategoryController.fetchCategories);
router.post("/category", upload.single("image"), CategoryController.createCategory);
router.put("/category/:id", upload.single("image"), CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

module.exports = router;