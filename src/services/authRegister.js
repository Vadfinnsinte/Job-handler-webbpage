const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const registerUser = async (email, password, userName, name) => {
  const response = await fetch(`${ConnectionString}/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
