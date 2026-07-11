import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext";
import { getWoods, createWood, updateWood, deleteWood } from "../services/api";

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800",
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"
];

const CMS = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [woods, setWoods] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Alert message states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    category: "Cabin",
    title: "",
    description: "",
    price: "",
    unit: "per night",
    image: ""
  });

  // Fetch all stays from API
  const fetchStays = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getWoods();
      setWoods(data);
    } catch (err) {
      console.error("Error fetching stays:", err);
      setErrorMsg("Failed to load listings from database. Ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStays();
    }
  }, [user]);

  // Open modal in ADD mode
  const handleOpenAdd = () => {
    // Select a random forest image for convenience
    const randomImage = PRESET_IMAGES[Math.floor(Math.random() * PRESET_IMAGES.length)];
    
    setFormData({
      category: "Cabin",
      title: "",
      description: "",
      price: "",
      unit: "per night",
      image: randomImage
    });
    setModalMode("add");
    setCurrentId(null);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  // Open modal in EDIT mode
  const handleOpenEdit = (stay) => {
    setFormData({
      category: stay.category || "Cabin",
      title: stay.title || "",
      description: stay.description || "",
      price: stay.price || "",
      unit: stay.unit || "per night",
      image: stay.image || ""
    });
    setModalMode("edit");
    setCurrentId(stay._id);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  // Delete a stay listing
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this stay listing?")) {
      return;
    }
    
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await deleteWood(id);
      setSuccessMsg("Listing deleted successfully.");
      // Refresh list
      setWoods((prev) => prev.filter((wood) => wood._id !== id));
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error deleting stay:", err);
      setErrorMsg(err.message || "Failed to delete the listing.");
    }
  };

  // Handle Form Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Form Submit Handler (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validation checks
    if (!formData.title.trim()) return setErrorMsg("Title is required.");
    if (!formData.description.trim()) return setErrorMsg("Description is required.");
    if (!formData.price.trim()) return setErrorMsg("Price is required (e.g. ₹4,200).");
    if (!formData.image.trim()) return setErrorMsg("Image URL is required.");

    try {
      if (modalMode === "add") {
        const newStay = await createWood(formData);
        setWoods((prev) => [newStay, ...prev]);
        setSuccessMsg(`"${formData.title}" added successfully!`);
      } else {
        const updatedStay = await updateWood(currentId, formData);
        setWoods((prev) => prev.map((wood) => (wood._id === currentId ? updatedStay : wood)));
        setSuccessMsg(`"${formData.title}" updated successfully!`);
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error saving listing:", err);
      setErrorMsg(err.message || "Failed to save the listing. Please check input requirements.");
    }
  };

  // If Auth check is loading
  if (authLoading) {
    return (
      <div className="table-top-container" style={{ textAlign: "center", padding: "5rem 0" }}>
        <h3>Loading authentication details...</h3>
      </div>
    );
  }

  // Auth Guard: Block unauthorized access
  if (!user) {
    return (
      <div className="denied-container">
        <div className="denied-icon">🔒</div>
        <h2>Access Denied</h2>
        <p>You must be signed in to access the Content Management System (CMS) and manage stays.</p>
        <Link to="/login" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
          Log In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="table-top-container">
        
        {/* Header row with Add button below Header */}
        <div className="cms-header-row">
          <div>
            <h1>CMS Stay Listings</h1>
            <p style={{ color: "var(--gray-500)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Add, update, or remove retreat properties displayed on Mywoods.
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            ➕ Add New Stay
          </button>
        </div>

        {/* Global status messages */}
        {errorMsg && <div className="cms-alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="cms-alert alert-success">{successMsg}</div>}

        {/* CMS Table */}
        <div className="table-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <h3>Fetching listings...</h3>
            </div>
          ) : woods.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "var(--gray-500)", marginBottom: "1rem" }}>No listings found in the database.</p>
              <button className="btn btn-outline" onClick={fetchStays}>Reload</button>
            </div>
          ) : (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price / Unit</th>
                  <th>Description</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {woods.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: "65px", height: "45px", objectFit: "cover", borderRadius: "4px" }} 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800"; }}
                      />
                    </td>
                    <td style={{ fontWeight: "600", color: "var(--gray-900)" }}>{item.title}</td>
                    <td>
                      <span className="section-tag" style={{ margin: 0, fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <strong>{item.price}</strong> 
                      <span style={{ color: "var(--gray-500)", fontSize: "0.8rem" }}> / {item.unit || "per night"}</span>
                    </td>
                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.description}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button className="btn btn-primary" onClick={() => handleOpenEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === "add" ? "➕ Add New Stay" : "✏️ Edit Stay"}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Cabin">Cabin</option>
                  <option value="Treehouse">Treehouse</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Lodge">Lodge</option>
                </select>
              </div>

              <div className="form-group">
                <label>Stay Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Pinecrest Cabin"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g. ₹4,200"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Billing Unit</label>
                <input
                  type="text"
                  name="unit"
                  placeholder="e.g. per night"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  placeholder="Image link (Unsplash, etc.)"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
                {formData.image && (
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="img-preview" 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800"; }}
                  />
                )}
              </div>

              <div className="form-group">
                <label>Description (Max 500 characters)</label>
                <textarea
                  name="description"
                  placeholder="Describe this listing..."
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={500}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === "add" ? "Save Stay" : "Update Stay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CMS;