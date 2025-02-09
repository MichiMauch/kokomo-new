"use client"
import { useState } from "react";
import config from "@config/config";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const { contact_form_action } = config.params;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(contact_form_action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="section">
      <div className="container max-w-[700px]">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <p className="text-center">Du kannst uns einfach über das Formular erreichen. Wir melden uns so schnell wie möglich.</p>

        <form className="contact-form mt-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="name">
              Name
            </label>
            <input className="form-input w-full" name="name" type="text" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="email">
              E-Mail
            </label>
            <input className="form-input w-full" name="email" type="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="subject">
              Betreff
            </label>
            <input className="form-input w-full" name="subject" type="text" required value={formData.subject} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="mb-2 block" htmlFor="message">
              Nachricht
            </label>
            <textarea className="form-textarea w-full" rows="7" name="message" required value={formData.message} onChange={handleChange} />
          </div>
          <button className="btn btn-outline-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Senden..." : "Absenden"}
          </button>
          {status === "success" && <p className="text-green-500 mt-4">✅ Nachricht erfolgreich gesendet!</p>}
          {status === "error" && <p className="text-red-500 mt-4">❌ Fehler beim Senden der Nachricht.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
