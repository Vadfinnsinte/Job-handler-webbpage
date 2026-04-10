import { create } from "zustand";

export const store = create((set) => ({
  posts: [],
  setPosts: (value) => set({ posts: value }),

  openPost: false,
  setOpenPost: (value) => set({ openPost: value }),
  chosenPost: null,
  setChosenPost: (value) => set({ chosenPost: value }),

  showEdit: false,
  setShowEdit: (value) => set({ showEdit: value }),

  addingAdmin: false,
  setAddingAdmin: (value) => set({ addingAdmin: value }),
  isAdmin: false,
  setIsAdmin: (value) => set({ isAdmin: value }),
  addedAdminUser: false,
  setAddedAdminUser: (value) => set({ addedAdminUser: value }),
}));
