import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section className="home-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>Have operational questions or need technical support? Send us a message directly.</p>
        </div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            <p style={{ opacity: 0.85, marginBottom: '10px' }}>
              Our support desk coordinates with laboratory and transplant personnel during standard business hours.
            </p>

            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h5 style={{ fontSize: '1rem', margin: 0 }}>Office Address</h5>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Health Informatics Block, Sector 12, Delhi, India</p>
              </div>
            </div>

            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <div>
                <h5 style={{ fontSize: '1rem', margin: 0 }}>Emergency Support</h5>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>+91 11-2345-6789</p>
              </div>
            </div>

            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h5 style={{ fontSize: '1rem', margin: 0 }}>Email Enquiries</h5>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>support@smartorgan.gov.in</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {success && (
              <div className="alert alert-success">
                Thank you! Your support ticket has been logged successfully.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  placeholder="Enter details"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
