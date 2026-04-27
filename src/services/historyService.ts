import { API_BASE_URL, AUTH_TOKEN } from "../constants/config";

const authHeader = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  Accept: "application/json",
};

export const historyService = {
  async getHistory() {
    const res = await fetch(`${API_BASE_URL}/history/`, {
      method: "GET",
      headers: authHeader,
    });

    if (!res.ok) {
      const error = await res.text();
      console.log("HISTORY ERROR:", error);
      throw new Error("Failed to load history");
    }

    return res.json();
  },
};
