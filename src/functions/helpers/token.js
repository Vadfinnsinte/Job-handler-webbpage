export const saveToken = (token, expire) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("tokenExpiration", expire);
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};
export const getTokenExpiration = () => {
  return sessionStorage.getItem("tokenExpiration");
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenExpiration");
};
