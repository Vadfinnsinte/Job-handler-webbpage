import { store } from "./store";

export const storeHooks = () => {
  const posts = store((state) => state.posts);
  const setPosts = store((state) => state.setPosts);

  return { posts, setPosts };
};
