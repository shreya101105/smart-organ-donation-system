import React from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import aboutImage from "../../components/images/1.png";

const AboutSystem = () => {
  return (
    <section className="home-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={aboutImage}
              alt="NovaLife AI Healthcare"
              style={{
                width: "100%",
                maxWidth: "550px",
                borderRadius: "20px",
                objectFit: "cover",
                display: "block",
                alignItems: "center",
                marginLeft: "8%",
              }}
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="about-details"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--primary-color)",
                marginBottom: "12px",
                fontWeight: "600",
              }}
            >
              <FaInfoCircle />
              <span>WHO WE ARE</span>
            </div>

            <h2 style={{ marginBottom: "20px" }}>
              Revolutionizing Organ Healthcare with Artificial Intelligence
            </h2>

            <p style={{ lineHeight: "1.8", marginBottom: "16px" }}>
              <strong>NovaLife AI</strong> is an intelligent healthcare platform
              designed for early organ disease detection and smart organ donation
              management. Using Artificial Intelligence and Machine Learning,
              the system predicts kidney, liver, and heart diseases, helping
              healthcare professionals make faster and more accurate decisions.
            </p>

            <p style={{ lineHeight: "1.8" }}>
              Our secure digital platform connects patients, donors, doctors,
              hospitals, and administrators through a unified ecosystem. With
              AI-powered disease prediction, smart donor-recipient matching, and
              real-time transplant coordination, NovaLife AI aims to improve
              healthcare accessibility and save lives.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              <div>
                <h3 style={{ color: "var(--primary-color)", fontSize: "2rem" }}>
                  3
                </h3>
                <p>Supported Organs</p>
              </div>

              <div>
                <h3
                  style={{
                    color: "var(--secondary-color)",
                    fontSize: "2rem",
                  }}
                >
                  AI
                </h3>
                <p>Disease Prediction</p>
              </div>

              <div>
                <h3 style={{ color: "var(--accent-color)", fontSize: "2rem" }}>
                  24/7
                </h3>
                <p>Emergency Search</p>
              </div>

              <div>
                <h3 style={{ color: "#16a34a", fontSize: "2rem" }}>
                  95%+
                </h3>
                <p>Prediction Accuracy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSystem;