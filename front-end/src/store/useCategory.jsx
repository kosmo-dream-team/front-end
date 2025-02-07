import create from "zustand";

const useCategoryStore = create((set) => ({
  categories: [],
  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
  updateCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? updatedCategory : category
      ),
    })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));

export default useCategoryStore;
