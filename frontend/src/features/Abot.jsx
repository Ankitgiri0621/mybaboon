export default function AboutDeatil() {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://www.impactplus.com/hubfs/blog-image-uploads/best-about-us-pages.jpg"
            alt="Team"
          />
        </div>

        <div className="about-content">
          <span className="about-tag">Who We Are</span>

          <h1>Building Digital Experiences That Matter</h1>

          <p>
            We are a passionate team of developers and designers dedicated to
            creating modern, responsive, and user-friendly web applications.
            Our mission is to transform ideas into powerful digital products.
          </p>

          <div className="about-stats">
            <div className="stat">
              <h2>150+</h2>
              <p>Projects</p>
            </div>

            <div className="stat">
              <h2>80+</h2>
              <p>Clients</p>
            </div>

            <div className="stat">
              <h2>5+</h2>
              <p>Years Experience</p>
            </div>
          </div>

          <button className="btn">Learn More</button>
        </div>
      </div>
    </section>
  );
}