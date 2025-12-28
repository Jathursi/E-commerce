const Product = require("../models/Product");
const Category = require("../models/Category");

exports.fetchProducts = async () => {
	const products = await Product.find().populate("categories", "name");
	return products;
};

exports.fetchProductById = async (id) => {
	const product = await Product.findById(id).populate("categories", "name");
	if (!product) throw new Error("Product not found");
	return product;
};

exports.addProduct = async ({ name, description, categories, images, price, offer, features }) => {
	if (!categories || !Array.isArray(categories) || categories.length === 0) throw new Error("At least one category is required");
	if (price === undefined || price === null) throw new Error("Price is required");

	for (const catId of categories) {
		const categoryExists = await Category.findById(catId);
		if (!categoryExists) throw new Error(`Category ${catId} not found`);
	}

	const productExists = await Product.findOne({ name });
	if (productExists) throw new Error("Product already exists");

	const product = await Product.create({ name, description, categories, images, price, offer, features: features || [] });
	return product.populate("categories", "name");
};

exports.updateProduct = async (id, { name, description, categories, images, price, offer, features }) => {
	const product = await Product.findById(id);
	if (!product) throw new Error("Product not found");

	if (name && name !== product.name) {
		const duplicate = await Product.findOne({ name, _id: { $ne: id } });
		if (duplicate) throw new Error("Product name already exists");
	}

	if (categories && Array.isArray(categories) && categories.length > 0) {
		for (const catId of categories) {
			const categoryExists = await Category.findById(catId);
			if (!categoryExists) throw new Error(`Category ${catId} not found`);
		}
	}

	const updateData = {
		name: name ?? product.name,
		description: description ?? product.description,
		categories: categories ?? product.categories,
	};

	if (images !== undefined) {
		updateData.images = images;
	}

	if (price !== undefined && price !== null) {
		updateData.price = price;
	}

	if (offer !== undefined) {
		updateData.offer = offer;
	}

	if (features !== undefined) {
		updateData.features = features;
	}

	const updated = await Product.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	}).populate("categories", "name");

	return updated;
};

exports.deleteProduct = async (id) => {
	const product = await Product.findById(id);
	if (!product) throw new Error("Product not found");
	await Product.findByIdAndDelete(id);
	return { message: "Product deleted successfully" };
};
