import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLaptopMedical, FaBrain } from "react-icons/fa";

const DiseasePrediction = () => {
  const navigate = useNavigate();

  return (
    <section className="home-section" id="disease-prediction">
      <div className="container">
        <motion.div
          className="home-predict-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Content */}
          <div>
            <div className="predict-cta-icon">
              <FaBrain />
            </div>

            <h2>AI-Powered Organ Disease Prediction</h2>

            <p
              style={{
                marginTop: "15px",
                marginBottom: "25px",
                opacity: "0.9",
                lineHeight: "1.8",
              }}
            >
              Predict the risk of <strong>Kidney</strong>,{" "}
              <strong>Liver</strong>, and <strong>Heart</strong> diseases using
              Artificial Intelligence. Simply enter the required medical
              parameters, and our intelligent system analyzes the data to
              generate accurate predictions, health insights, and personalized
              recommendations for early diagnosis and better clinical
              decision-making.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/login?role=Patient")}
            >
              <FaLaptopMedical />
              Start AI Prediction
            </button>
          </div>

          {/* Right Image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80"
              alt="AI Organ Disease Prediction"
              style={{
                width: "100%",
                borderRadius: "18px",
                boxShadow: "var(--shadow-md)",
                objectFit: "cover",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiseasePrediction;