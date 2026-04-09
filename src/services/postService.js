import { getToken } from "../functions/helpers/token"

const API = import.meta.env.VITE_BACKEND_CONNECTION

export const createPost = async (postData) => {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(postData)
  })

  if (!response.ok) {
    throw new Error("Failed to create post")
  }

  return await response.json()
}