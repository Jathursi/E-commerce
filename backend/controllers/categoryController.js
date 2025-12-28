const categoryService = require("../services/categoryService");

exports.fetchCategories = async (req, res) => {
    try {
        const categories = await categoryService.fetchCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description, imageUrl: bodyImageUrl, imageType: bodyImageType } = req.body;
        const file = req.file;

        const relativePath = file ? `/uploads/categories/${file.filename}` : bodyImageUrl;
        const absoluteUrl = relativePath
            ? (relativePath.startsWith('http') ? relativePath : `${req.protocol}://${req.get("host")}${relativePath}`)
            : null;

        const payload = {
            name,
            description,
            imageUrl: absoluteUrl,
            imageType: file ? file.mimetype : bodyImageType,
        };

        const newCategory = await categoryService.addCategory(payload);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(201).json({ url, filename: req.file.filename });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, imageUrl: bodyImageUrl, imageType: bodyImageType } = req.body;
        const file = req.file;

        const relativePath = file ? `/uploads/categories/${file.filename}` : bodyImageUrl;
        const absoluteUrl = relativePath
            ? (relativePath.startsWith('http') ? relativePath : `${req.protocol}://${req.get("host")}${relativePath}`)
            : null;

        const payload = {
            name,
            description,
            imageUrl: absoluteUrl,
            imageType: file ? file.mimetype : bodyImageType,
        };

        const updatedCategory = await categoryService.updateCategory(id, payload);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoryService.deleteCategory(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};