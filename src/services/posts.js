import { getToken } from "../functions/helpers/token";

const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const getPosts = async () => {
  const response = await fetch(`${ConnectionString}/Post/my-posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error("Unauthorized ");
      case 404:
        throw new Error("Server not found, try again later");
      default:
        throw new Error(`Unknown error: ${response.status}`);
    }
  }
  const data = await response.json();

  return data;
};

export const deletePost = async (id) => {
  const response = await fetch(`${ConnectionString}/Post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, try again later");
    }

    if (response.status === 401) {
      throw new Error("Please sign in and try again");
    }

    throw new Error(data?.message || "Something went wrong");
  }

  return true;
};
