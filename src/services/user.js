// "name": "TestingPut",
//   "userName": "TestingPut",
//   "email": "admin@test.com",
//   "phoneNumber": "00000000",
//   "employmentStatus": true
import { getToken } from "../functions/helpers/token";
const ConnectionString = import.meta.env.VITE_BACKEND_CONNECTION;

export const editUser = async (name, userName, email, phone, employStatus) => {
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

    if (response.status === 400) {
      throw new Error("Can not leve fields empty");
    }

    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

export const changeUserPassword = async (newPassword, password) => {
  const response = await fetch(`${ConnectionString}/user/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      currentPassword: password,
      newPassword: newPassword,
    }),
  });
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error("Server error, try again later");
    }

    if (response.status === 401) {
      throw new Error("Please sign in and try again");
    }

    if (response.status === 400) {
      throw new Error("Invalid password");
    }

    throw new Error(data?.message || "Something went wrong");
  }
  const data = await response.json();
  return data;
};
