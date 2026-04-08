import { create } from "zustand";

export const store = create((set) => ({
  posts: [],
  setPosts: (value) => set({ posts: value }),
}));
