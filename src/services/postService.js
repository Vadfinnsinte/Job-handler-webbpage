const API = import.meta.env.VITE_BACKEND_CONNECTION

export const createPost = async (postData) => {

  const response = await fetch(`${API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })

  if (!response.ok) {
    throw new Error("Failed to create post")
  }

  return await response.json()
}