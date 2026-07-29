import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import Toast from '../../components/Feedback/Toast';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// Background image imports
import bgiImage from '../../components/images/bgi.png';
import bgvImage from '../../components/images/bgv.png';

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Your name is required';
    if (!form.email.trim()) newErrors.email = 'Your email address is required';
    if (!form.message.trim()) newErrors.message = 'A message description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToastOpen(true);
      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="contact-page">
      <Navbar />

      <div className="floating-blob blob-primary" style={{ top: '20%', left: '5%' }} />
      <div className="floating-blob blob-secondary" style={{ bottom: '15%', right: '5%' }} />

      {/* Header Section */}
      <div style={{ padding: '160px 20px 60px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 229, 255, 0.1)',
              color: 'var(--primary-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: '24px',
              border: '1px solid rgba(0, 229, 255, 0.2)'
            }}
          >
            <FaPhoneAlt /> CONTACT OUR DESK
          </motion.div>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-color)', marginBottom: '20px' }}>
            Get in Touch with <span style={{ background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LifeLink Support</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted-color)', lineHeight: '1.7' }}>
            Have clinical questions regarding tissue typing compatibility tests, or seeking tech integration details? Send us a diagnostic request.
          </p>
        </div>
      </div>

      {/* Form and Info Section */}
      <div style={{ padding: '20px 20px 100px 20px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '40px' }}>
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card glow style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '10px' }}>Ecosystem Address</h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>Our centralized medical clearance and technology node operations.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--primary-color)', fontSize: '1.2rem', display: 'flex' }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, color: 'var(--text-color)', marginBottom: '4px' }}>Central Office</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)', lineHeight: '1.5' }}>AIIMS Trauma Building, Sector-4, New Delhi, 110029, India</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--primary-color)', fontSize: '1.2rem', display: 'flex' }}>
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, color: 'var(--text-color)', marginBottom: '4px' }}>Phone Line</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)', lineHeight: '1.5' }}>+91 11-2345-6789</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--primary-color)', fontSize: '1.2rem', display: 'flex' }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, color: 'var(--text-color)', marginBottom: '4px' }}>Email Node</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)', lineHeight: '1.5' }}>clinical@lifelinkai.gov.in</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card glow style={{ padding: '40px' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '24px' }}>Send diagnostic request</h3>

              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <Input
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleInputChange}
                />

                <div className="floating-input-group" style={{ marginBottom: '20px' }}>
                  <textarea
                    name="message"
                    rows="5"
                    className="form-textarea"
                    placeholder="Describe your clinical inquiries or system feedback..."
                    value={form.message}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${errors.message ? '#EF4444' : 'var(--border-color)'}`,
                      color: 'var(--text-color)',
                      outline: 'none',
                      fontFamily: 'var(--font-body)',
                      resize: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                  />
                  {errors.message && (
                    <p style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '5px', fontWeight: '500' }}>{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={FaPaperPlane}
                  style={{ width: '100%' }}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />

      <Toast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        type="success"
        message="Your message has been delivered to LifeLink clinical support teams. We will respond within 24 hours."
      />

      {/* Dynamic background switching & responsive styling */}
      <style>{`
        .contact-page {
          background-color: var(--bg-color);
          background-image: var(--homepage-bg-image, url(${bgiImage}));
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: background-image 0.4s ease-in-out, background-color 0.4s ease-in-out;
        }

        .dark-mode .contact-page {
          background-image: var(--homepage-bg-image, url(${bgvImage}));
        }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1.2fr 1.8fr"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;