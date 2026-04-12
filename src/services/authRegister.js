import { getToken } from "../functions/helpers/token";
import { storeHooks } from "../store/storeHooks";

const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const registerUser = async (
  email,
  password,
  userName,
  name,
  addingAdmin,
  isAdmin,
) => {
  let string;
  if (addingAdmin && isAdmin) {
    string = `${ConnectionString}/Auth/create-admin`;
  } else {
    string = `${ConnectionString}/Auth/register`;
  }
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(string, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: email,
      password: password,
      userName: userName,
      name: name,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Registration failed");
  }
  const data = await response.json();

  return data;
};
