import { store } from "./store";

export const storeHooks = () => {
  const posts = store((state) => state.posts);
  const setPosts = store((state) => state.setPosts);

  const chosenPost = store((state) => state.chosenPost);
  const setChosenPost = store((state) => state.setChosenPost);

  const addingAdmin = store((state) => state.addingAdmin);
  const setAddingAdmin = store((state) => state.setAddingAdmin);

  const isAdmin = store((state) => state.isAdmin);
  const setIsAdmin = store((state) => state.setIsAdmin);

  const addedAdminUser = store((state) => state.addedAdminUser);
  const setAddedAdminUser = store((state) => state.setAddedAdminUser);
  return {
    posts,
    setPosts,
    chosenPost,
    setChosenPost,
    addingAdmin,
    setAddingAdmin,
    isAdmin,
    setIsAdmin,
    addedAdminUser,
    setAddedAdminUser,
  };
};
