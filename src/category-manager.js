import { Category } from "./category.js";

const CategoriesManager = (() => {
  const createCategory = (categoryDetails) => {
    return new Category(categoryDetails);
  };

  const deleteCategory = (library, category) => {
    library.removeItem(category);
  };

  const insertCategory = (library, category) => {
    library.addItem(category);
  };

  return { createCategory, deleteCategory, insertCategory };
})();
