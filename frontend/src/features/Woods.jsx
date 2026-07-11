import { useState, useEffect } from "react";
import Card from "../components/molecule/card";
import { getWoods } from "../services/api";

const WoodsPage = () => {
  const [woods, setWoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWoods = async () => {
      try {
        const data = await getWoods();
        setWoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWoods();
  }, []);

  return (
    <>
      <section className="section">
        <div className="section-head">
          <span className="section-tag">All Stays</span>
          <h2>Every cabin, treehouse, and cottage</h2>
          <p>Filter by the kind of quiet you're looking for.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading stays...</p>
        ) : error ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</p>
        ) : (
          <div className="cardsClass" style={{ width: '100%' }}>
            {woods.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default WoodsPage;
