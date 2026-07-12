const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "/api"
    : "https://mybaboon-1.onrender.com/api";

// Helper function to get token and headers
const getAuthHeaders = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : null;
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

// Helper function to process response safely and prevent JSON parse errors
const handleResponse = async (response, defaultErrorMsg) => {
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error(`Server connection error (${response.status}): The server returned an invalid response format. Please check if the backend is running.`);
  }

  if (!response.ok) {
    throw new Error(data.message || defaultErrorMsg);
  }
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response, "Login failed");
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(response, "Registration failed");
};

export const getWoods = async (limit) => {
  const url = limit ? `${API_BASE}/woods?limit=${limit}` : `${API_BASE}/woods`;
  const response = await fetch(url);
  return handleResponse(response, "Failed to fetch stays");
};

export const getWood = async (id) => {
  const response = await fetch(`${API_BASE}/woods/${id}`);
  return handleResponse(response, "Failed to fetch stay");
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
  return handleResponse(response, "Failed to create stay");
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
  return handleResponse(response, "Failed to update stay");
};

export const deleteWood = async (id) => {
  const response = await fetch(`${API_BASE}/woods/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response, "Failed to delete stay");
};

export const submitContact = async (contactData) => {
  const response = await fetch(`${API_BASE}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  return handleResponse(response, "Failed to submit contact");
};
