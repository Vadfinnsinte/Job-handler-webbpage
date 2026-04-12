import { getToken } from "../functions/helpers/token";

const API = import.meta.env.VITE_BACKEND_CONNECTION;

export const getAllUsers = async () => {
  const response = await fetch(`${API}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
};