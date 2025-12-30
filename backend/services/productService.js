const Product = require("../models/Product");
const Category = require("../models/Category");

exports.fetchProducts = async (filters = {}) => {
	const { category, search } = filters;
	let query = {};
	
	// Filter by category name if provided
	if (category) {
		const categoryDoc = await Category.findOne({ name: new RegExp(`^${category}$`, 'i') });
		if (categoryDoc) {
			// Category exists - filter by category ID
			query.categories = categoryDoc._id;
		} else {
			// Category doesn't exist - search in searchKeywords only (exact match)
			query.searchKeywords = { $elemMatch: { $regex: `^${category}$`, $options: 'i' } };
		}
	}
	
	// Filter by search keyword if provided (search in searchKeywords AND category names)
	if (search) {
		// First check if search term matches a category name
		const categoryDoc = await Category.findOne({ name: new RegExp(`^${search}$`, 'i') });
		
		if (categoryDoc) {
			// Search term matches a category - filter by category ID
			const searchCondition = { categories: categoryDoc._id };
			if (query.categories || query.searchKeywords) {
				query = { $and: [query, searchCondition] };
			} else {
				query = searchCondition;
			}
		} else {
			// Search term doesn't match category - search in searchKeywords (exact match)
			const searchCondition = {
				searchKeywords: { $elemMatch: { $regex: `^${search}$`, $options: 'i' } }
			};
			if (query.searchKeywords || query.categories) {
				query = { $and: [query, searchCondition] };
			} else {
				query = searchCondition;
			}
		}
	}
	
	const products = await Product.find(query).populate("categories", "name");
	return products;
};

exports.fetchProductById = async (id) => {
	const product = await Product.findById(id).populate("categories", "name");
	if (!product) throw new Error("Product not found");
	return product;
};

exports.addProduct = async ({ name, description, categories, images, price, stock, offer, features, searchKeywords }) => {
	if (!categories || !Array.isArray(categories) || categories.length === 0) throw new Error("At least one category is required");
	if (price === undefined || price === null) throw new Error("Price is required");

	for (const catId of categories) {
		const categoryExists = await Category.findById(catId);
		if (!categoryExists) throw new Error(`Category ${catId} not found`);
	}

	const productExists = await Product.findOne({ name });
	if (productExists) throw new Error("Product already exists");

	const product = await Product.create({ 
		name, 
		description, 
		categories, 
		images, 
		price,
		stock: stock !== undefined ? stock : 0, 
		offer, 
		features: features || [],
		searchKeywords: searchKeywords || []
	});
	return product.populate("categories", "name");
};

exports.updateProduct = async (id, { name, description, categories, images, price, stock, offer, features, searchKeywords }) => {
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

	if (searchKeywords !== undefined) {
		updateData.searchKeywords = searchKeywords;
	}

	if (stock !== undefined) {
		updateData.stock = stock;
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
