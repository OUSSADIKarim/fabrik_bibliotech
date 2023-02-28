import { Category } from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const createCategory = async (req, res) => {
  const { employeeId, title } = req.body;
  const category = new Category({ employee: employeeId, title: title });
  try {
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategoriesIds = async (categories) => {
  const categoriesIds = [];
  try {
    await Promise.all(
      categories.map(async (category) => {
        const categoryFound = await Category.findOne({ title: category });
        const categoryId = categoryFound._id;
        categoriesIds.push(categoryId);
      })
    );
  } catch (error) {
    console.log(error);
  }
  return categoriesIds;
};
