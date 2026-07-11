function Card({ item }) {
  return (
    <div className="card">
      <div className="card-image-wrap">
        <img src={item.image} alt={item.title} className="card-image" />
        <span className="category">{item.category}</span>
      </div>

      <div className="card-content">
        <h2>{item.title}</h2>
        <p>{item.description}</p>

        <div className="card-footer">
          <div>
            <h3>{item.price}</h3>
            {item.unit && <span className="unit">{item.unit}</span>}
          </div>
          <button>Book Now →</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
