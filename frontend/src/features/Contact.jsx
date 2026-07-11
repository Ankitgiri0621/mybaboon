import { useState } from "react";
import { submitContact } from "../services/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p>
            Questions about a stay, a group booking, or just want directions
            to the trailhead? Send us a note and we'll write back within a
            day.
          </p>

          <div className="info-box">
            <h4>Address</h4>
            <p>New Delhi, India</p>
          </div>

          <div className="info-box">
            <h4>Email</h4>
            <p>hello@mywoods.example</p>
          </div>

          <div className="info-box">
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          {status === "success" && (
            <div className="form-success">
              Thanks — your message is on its way. We'll reply soon.
            </div>
          )}
          {status === "error" && (
            <div style={{ color: "red", padding: "0.5rem" }}>
              {errorMessage}
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
          ></textarea>

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
