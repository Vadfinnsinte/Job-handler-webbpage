import { saveToken } from "../functions/helpers/token";

const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const signInUser = async (email, password) => {
  const response = await fetch(`${ConnectionString}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }
  const data = await response.json();
  saveToken(data.token, data.expiration, data.user);

  return data;
};
