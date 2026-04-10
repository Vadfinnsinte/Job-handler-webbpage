import { store } from "./store";

export const storeHooks = () => {
  const posts = store((state) => state.posts);
  const setPosts = store((state) => state.setPosts);

  const openPost = store((state) => state.openPost);
  const setOpenPost = store((state) => state.setOpenPost);

  const chosenPost = store((state) => state.chosenPost);
  const setChosenPost = store((state) => state.setChosenPost);

  const showEdit = store((state) => state.showEdit);
  const setShowEdit = store((state) => state.setShowEdit);
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
    openPost,
    setOpenPost,
    showEdit,
    setShowEdit,
  };
};
