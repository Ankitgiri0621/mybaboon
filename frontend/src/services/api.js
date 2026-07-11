const API_BASE = "/api";

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
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
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
