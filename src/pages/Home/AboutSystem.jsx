import React from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import aboutImage from "../../components/images/1.png";

const AboutSystem = () => {
  return (
    <section className="home-section" id="about" style={{ padding: "60px 0" }}>
      <div
        className="container"
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}
      >
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: "100px",
            alignItems: "center",
          }}
        >
          {/* Left Side: Animated Image (380px Size) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              background: "none",
              border: "none",
              boxShadow: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <motion.img
              src={aboutImage}
              alt="NovaLife AI Healthcare"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "100%",
                maxWidth: "380px",
                height: "auto",
                display: "block",
                objectFit: "contain",
                background: "transparent",
                marginLeft: 0,
              }}
            />
          </motion.div>

          {/* Right Side: Information Content (Hero Theme Matching) */}
          <motion.div
            className="about-details"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              width: "100%",
              paddingLeft: "20px",
            }}
          >
            {/* Tag / Badge - Matches Hero Pill Badge Styling */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "rgba(0, 229, 255, 0.1)",
                border: "1px solid rgba(0, 229, 255, 0.25)",
                color: "var(--primary-color)",
                borderRadius: "40px",
                fontSize: "0.85rem",
                fontWeight: "700",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              <FaInfoCircle /> WHO WE ARE
            </span>

            {/* Title - Uses var(--text-color) & var(--font-heading) */}
            <h2
              style={{
                fontFamily: "var(--font-heading, inherit)",
                fontSize: "2.2rem",
                fontWeight: "700",
                lineHeight: "1.3",
                color: "var(--text-color)",
                textAlign: "left",
                margin: "0 0 20px 0",
              }}
            >
              Revolutionizing Organ Healthcare with Artificial Intelligence
            </h2>

            {/* Paragraphs - Uses var(--text-color) with opacity for crisp look in both themes */}
            <div
              style={{
                color: "var(--text-color)",
                opacity: 0.85,
                fontSize: "1.05rem",
                lineHeight: "1.7",
                textAlign: "left",
                width: "100%",
              }}
            >
              <p style={{ marginBottom: "16px", textAlign: "left" }}>
                <strong style={{ opacity: 1, color: "var(--text-color)" }}>
                  NovaLife AI
                </strong>{" "}
                is an intelligent healthcare platform designed for early organ
                disease detection and smart organ donation management. Using
                Artificial Intelligence and Machine Learning, the system
                predicts kidney, liver, and heart diseases, helping healthcare
                professionals make faster and more accurate decisions.
              </p>

              <p style={{ marginBottom: "28px", textAlign: "left" }}>
                Our secure digital platform connects patients, donors, doctors,
                hospitals, and administrators through a unified ecosystem. With
                AI-powered disease prediction, smart donor-recipient matching,
                and real-time transplant coordination, NovaLife AI aims to
                improve healthcare accessibility and save lives.
              </p>
            </div>

            {/* Stats Grid - Hero Theme Adaptive Colors */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                width: "100%",
                paddingTop: "12px",
                borderTop: "none",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h3
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    margin: "0 0 4px 0",
                  }}
                >
                  3
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted-color, var(--text-color))",
                    opacity: 0.75,
                    margin: 0,
                    fontWeight: "600",
                    lineHeight: "1.3",
                  }}
                >
                  Supported Organs
                </p>
              </div>

              <div style={{ textAlign: "left" }}>
                <h3
                  style={{
                    color: "var(--secondary-color, var(--primary-color))",
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    margin: "0 0 4px 0",
                  }}
                >
                  AI
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted-color, var(--text-color))",
                    opacity: 0.75,
                    margin: 0,
                    fontWeight: "600",
                    lineHeight: "1.3",
                  }}
                >
                  Disease Prediction
                </p>
              </div>

              <div style={{ textAlign: "left" }}>
                <h3
                  style={{
                    color: "var(--accent-color, #f59e0b)",
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    margin: "0 0 4px 0",
                  }}
                >
                  24/7
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted-color, var(--text-color))",
                    opacity: 0.75,
                    margin: 0,
                    fontWeight: "600",
                    lineHeight: "1.3",
                  }}
                >
                  Emergency Search
                </p>
              </div>

              <div style={{ textAlign: "left" }}>
                <h3
                  style={{
                    color: "#22c55e",
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    margin: "0 0 4px 0",
                  }}
                >
                  95%+
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted-color, var(--text-color))",
                    opacity: 0.75,
                    margin: 0,
                    fontWeight: "600",
                    lineHeight: "1.3",
                  }}
                >
                  Prediction Accuracy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Embedded CSS for responsive layout */}
      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-details {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSystem;