const Category = require("../models/Category");

exports.fetchCategories = async () => {
  const categories = await Category.find();
  return categories;
};

exports.addCategory = async ({ name, description, image, imageType, imageUrl }) => {
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) throw new Error("Category already exists");

  const category = await Category.create({ name, description, image, imageType, imageUrl });
  return category;
};

exports.updateCategory = async (id, { name, description, imageUrl, imageType }) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  if (name && name !== category.name) {
    const categoryExists = await Category.findOne({ name, _id: { $ne: id } });
    if (categoryExists) throw new Error("Category name already exists");
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    { name, description, imageUrl, imageType },
    { new: true, runValidators: true }
  );
  return updated;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");
  await Category.findByIdAndDelete(id);
  return { message: "Category deleted successfully" };
};
