import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaUserPlus } from "react-icons/fa";

const OrganDonation = () => {
  const navigate = useNavigate();

  return (
    <section className="home-section" id="organ-donation">
      <div className="container">
        <motion.div
          className="home-donate-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Organ Donation"
              style={{
                width: "100%",
                maxWidth: "520px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              }}
            />
          </div>

          {/* Right Content */}
          <div>
            <div className="donate-cta-icon">
              <FaHandHoldingHeart />
            </div>

            <h2>Become an Organ Donor</h2>

            <p
              style={{
                marginTop: "15px",
                marginBottom: "25px",
                lineHeight: "1.8",
                opacity: "0.9",
              }}
            >
              Join NovaLife AI as a registered organ donor and help save lives.
              Our intelligent platform securely manages donor information and
              assists healthcare professionals in matching compatible donors and
              recipients based on blood group, organ type, and medical
              compatibility for a faster and more efficient transplant process.
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/register?role=Donor")}
            >
              <FaUserPlus style={{ marginRight: "8px" }} />
              Register as Donor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganDonation;