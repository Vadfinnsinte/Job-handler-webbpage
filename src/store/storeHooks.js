import { store } from "./store";

export const storeHooks = () => {
  const posts = store((state) => state.posts);
  const setPosts = store((state) => state.setPosts);

  const chosenPost = store((state) => state.chosenPost);
  const setChosenPost = store((state) => state.setChosenPost);
  return { posts, setPosts, chosenPost, setChosenPost };
};
