// In production (Render), VITE_API_URL = https://your-backend.onrender.com
// In development, falls back to /api which Vite proxies to localhost:5000
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

// Helper function to get token and headers
const getAuthHeaders = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : null;
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  return response.json();
};

export const getWoods = async (limit) => {
  const url = limit ? `${API_BASE}/woods?limit=${limit}` : `${API_BASE}/woods`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch stays");
  return response.json();
};

export const getWood = async (id) => {
  const response = await fetch(`${API_BASE}/woods/${id}`);
  if (!response.ok) throw new Error("Failed to fetch stay");
  return response.json();
};

export const createWood = async (woodData) => {
  const response = await fetch(`${API_BASE}/woods`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(woodData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create stay");
  }
  return response.json();
};

export const updateWood = async (id, woodData) => {
  const response = await fetch(`${API_BASE}/woods/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(woodData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update stay");
  }
  return response.json();
};

export const deleteWood = async (id) => {
  const response = await fetch(`${API_BASE}/woods/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete stay");
  }
  return response.json();
};

export const submitContact = async (contactData) => {
  const response = await fetch(`${API_BASE}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit contact");
  }
  return response.json();
};
