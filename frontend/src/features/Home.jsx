import { useState, useEffect } from "react";
import { Link } from "react-router";
import Card from "../components/molecule/card";
import { getWoods } from "../services/api";

const HomeDetail = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getWoods(3); // Fetch 3 items
        setFeatured(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Forest Retreats · India</span>
          <h1>
            Slow down in <em>the woods</em>
          </h1>
          <p>
            Handpicked cabins, treehouses, and cottages set among the pines —
            no wifi anxiety, no city noise, just fresh air and a good fire.
          </p>
          <div className="hero-actions">
            <Link to="/woods" className="btn">
              Browse Stays
            </Link>
            <Link to="/about" className="btn btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="section-tag">Signature Stays</span>
          <h2>A few of our favorite hideaways</h2>
          <p>Each stay is chosen for its setting, its quiet, and its view.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading stays...</p>
        ) : error ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</p>
        ) : (
          <div className="cardsClass">
            {featured.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      <div className="features-strip">
        <div className="feature-item">
          <div className="feature-icon">🥾</div>
          <h3>Trail Access</h3>
          <p>Every stay opens onto a marked trail, no driving required.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔥</div>
          <h3>Wood-Fired Warmth</h3>
          <p>Real fireplaces and stoves, stocked with firewood on arrival.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">✨</div>
          <h3>Dark-Sky Views</h3>
          <p>Far from city light, built for stargazing after sunset.</p>
        </div>
      </div>

      <div className="cta-banner">
        <h2>Ready to trade your calendar for a campfire?</h2>
        <Link to="/woods" className="btn">
          Find Your Cabin
        </Link>
      </div>
    </>
  );
};

export default HomeDetail;
