import { default as Category } from "./category.js";
import { globalScopeCategories } from "./library.js";

const categoryManager = (() => {
  const createCategory = (categoryDetails) => {
    return new Category(categoryDetails);
  };

  const deleteCategory = (category) => {
    globalScopeCategories.removeItem(category);
  };

  const insertCategory = (category) => {
    globalScopeCategories.addItem(category);
  };

  return { createCategory, deleteCategory, insertCategory };
})();

export default categoryManager;
