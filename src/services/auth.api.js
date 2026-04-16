import { API_BASE_URL } from "../constants/config";

export const authApi = {
  async signUp(email, password, username) {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    const text = await res.text();

    console.log("STATUS:", res.status);
    console.log("RAW RESPONSE:", text);

    if (!res.ok) {
      throw new Error(text);
    }

    return JSON.parse(text || "{}");
  },
};
