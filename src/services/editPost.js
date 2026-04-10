import { getToken } from "../functions/helpers/token";

const API = import.meta.env.VITE_BACKEND_CONNECTION;

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API}/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error("Failed to edit post");
  }

  return true;
};