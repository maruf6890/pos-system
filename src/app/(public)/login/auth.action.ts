import { API_URL } from "@/lib/const";
import { setCookie } from "@/lib/cookies";

type UserCredentials = {
  identifier: string;
  password: string;
};

export const login = async ({ identifier, password }: UserCredentials) => {
  if (!identifier || !password) {
    return {
      success: false,
      message: "Please enter proper credentials",
    };
  }
  const data = JSON.stringify({ identifier, password }); 
  console.log(data);

  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Login failed" };
    }

    setCookie('user', JSON.stringify(result.user));
    return { success: true, ...result };
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return {
      success: false,
      message: error.message || "Something went wrong, please try again later",
    };
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/users/logout`, {
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      console.log(result.error);
      return { success: false, message: result.message || "Logout failed" };
    }

    return { success: true, ...result };
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return {
      success: false,
      message: error.message || "Something went wrong, please try again later",
    };
  }
};
