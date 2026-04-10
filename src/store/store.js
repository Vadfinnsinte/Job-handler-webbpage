import { create } from "zustand";

export const store = create((set) => ({
  posts: [],
  setPosts: (value) => set({ posts: value }),

  chosenPost: null,
  setChosenPost: (value) => set({ chosenPost: value }),

  addingAdmin: false,
  setAddingAdmin: (value) => set({ addingAdmin: value }),
  isAdmin: false,
  setIsAdmin: (value) => set({ isAdmin: value }),
  addedAdminUser: false,
  setAddedAdminUser: (value) => set({ addedAdminUser: value }),
}));
