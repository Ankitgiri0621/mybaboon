import { useState, useEffect } from "react";
import { getWoods, createWood, updateWood, deleteWood } from "../services/api";

const CMS = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Cabin",
    price: "",
    unit: "per night",
    description: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const woods = await getWoods();
      setData(woods);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setForm({
      title: item.title,
      category: item.category,
      price: item.price,
      unit: item.unit,
      description: item.description,
      image: item.image,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stay?")) {
      try {
        await deleteWood(id);
        fetchData();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateWood(currentId, form);
      } else {
        await createWood(form);
      }
      // Reset form
      setIsEditing(false);
      setCurrentId(null);
      setForm({
        title: "",
        category: "Cabin",
        price: "",
        unit: "per night",
        description: "",
        image: "",
      });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="table-top-container">
        <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "white", borderRadius: "12px", border: "1px solid var(--gray-200)", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: "1rem" }}>{isEditing ? "Edit Stay" : "Add New Stay"}</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
            <select name="category" value={form.category} onChange={handleChange} required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
              <option value="Cabin">Cabin</option>
              <option value="Treehouse">Treehouse</option>
              <option value="Cottage">Cottage</option>
              <option value="Lodge">Lodge</option>
            </select>
            <input type="text" name="price" placeholder="Price (e.g. ₹4,200)" value={form.price} onChange={handleChange} required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
            <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ gridColumn: "1 / -1", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", minHeight: "80px" }} />
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "1rem" }}>
              <button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Create"}</button>
              {isEditing && (
                <button type="button" className="btn btn-outline" onClick={() => { setIsEditing(false); setCurrentId(null); setForm({ title: "", category: "Cabin", price: "", unit: "per night", description: "", image: "" }); }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ textAlign: "center" }}>Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan="4" style={{ textAlign: "center", color: "red" }}>{error}</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: "center" }}>No stays found.</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CMS;