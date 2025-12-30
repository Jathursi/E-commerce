const productService = require("../services/productService");

exports.fetchProducts = async (req, res) => {
	try {
		const { category, search } = req.query;
		const products = await productService.fetchProducts({ category, search });
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.fetchProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await productService.fetchProductById(id);
		res.status(200).json(product);
	} catch (error) {
		const status = error.message === "Product not found" ? 404 : 400;
		res.status(status).json({ message: error.message });
	}
};

exports.createProduct = async (req, res) => {
	try {
		const { name, description, categories, price, stock, offer, features, searchKeywords, imageFeatures } = req.body;
		const files = req.files || [];

		const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : (features || []);
		const parsedImageFeatures = typeof imageFeatures === 'string' ? JSON.parse(imageFeatures) : (imageFeatures || {});
		const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : (categories || []);
		const parsedSearchKeywords = typeof searchKeywords === 'string' ? JSON.parse(searchKeywords) : (searchKeywords || []);

		const images = files.map((file, idx) => {
			const relativePath = `/uploads/products/${file.filename}`;
			const url = `${req.protocol}://${req.get("host")}${relativePath}`;
			const imgFeature = parsedImageFeatures[idx] || {};
			return {
				url,
				type: file.mimetype,
				featureName: imgFeature.featureName || null,
				featureValue: imgFeature.featureValue || null,
				colorHex: imgFeature.colorHex || null,
			};
		});

		const newProduct = await productService.addProduct({
			name,
			description,
			categories: parsedCategories,
			images,
			price: price ? parseFloat(price) : undefined,
			stock: stock !== undefined ? parseInt(stock) : 0,
			offer,
			features: parsedFeatures,
			searchKeywords: parsedSearchKeywords,
		});

		res.status(201).json(newProduct);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, categories, price, stock, offer, features, searchKeywords, imageFeatures } = req.body;
		const files = req.files || [];

		const parsedImageFeatures = typeof imageFeatures === 'string' ? JSON.parse(imageFeatures) : (imageFeatures || {});
		const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
		const parsedSearchKeywords = typeof searchKeywords === 'string' ? JSON.parse(searchKeywords) : (searchKeywords || []);

		const images = files.length
			? files.map((file, idx) => {
				const relativePath = `/uploads/products/${file.filename}`;
				const url = `${req.protocol}://${req.get("host")}${relativePath}`;
				const imgFeature = parsedImageFeatures[idx] || {};
				return {
					url,
					type: file.mimetype,
					featureName: imgFeature.featureName || null,
					featureValue: imgFeature.featureValue || null,
					colorHex: imgFeature.colorHex || null,
				};
			})
			: undefined;

		const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;

		const updated = await productService.updateProduct(id, {
			name,
			description,
			categories: parsedCategories,
			images,
			price: price !== undefined ? parseFloat(price) : undefined,
			stock: stock !== undefined ? parseInt(stock) : undefined,
			offer,
			features: parsedFeatures,
			searchKeywords: parsedSearchKeywords,
		});

		res.status(200).json(updated);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await productService.deleteProduct(id);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
