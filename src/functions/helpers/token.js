export const saveToken = (token, expire, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("tokenExpiration", expire);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const getRole = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getTokenExpiration = () => {
  return sessionStorage.getItem("tokenExpiration");
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenExpiration");
  sessionStorage.removeItem("user");
};

export const updateUserInStorage = (name) => {
  const user = getRole();
  if (!user) return null;

  const updatedUser = {
    ...user,
    name: name,
  };
  sessionStorage.removeItem("user");
  sessionStorage.setItem("user", JSON.stringify(updatedUser));

  return;
};
