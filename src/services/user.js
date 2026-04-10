// "name": "TestingPut",
//   "userName": "TestingPut",
//   "email": "admin@test.com",
//   "phoneNumber": "00000000",
//   "employmentStatus": true
import { getToken } from "../functions/helpers/token";
const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const addComment = async (
  name,
  userName,
  email,
  phone,
  employStatus,
) => {
  const response = await fetch(`${ConnectionString}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name: name,
      userName: userName,
      email: email,
      phoneNumber: phone,
      employmentStatus: employStatus,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, try again later");
    }

    if (response.status === 401) {
      throw new Error("Please sign in and try again");
    }

    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};
