import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const PrivacyPolicy = () => {
    return (
        <div className="auth-page" style={{ padding: '40px 20px' }}>
            <div className="auth-container" style={{ maxWidth: '800px', width: '100%' }}>
                <div className="auth-card" style={{ textAlign: 'left', padding: '40px' }}>
                    <Link to="/register" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <FaArrowLeft /> Back to Registration
                    </Link>

                    <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-color)' }}>
                        Privacy Policy
                    </h2>
                    <p style={{ color: 'var(--text-muted, #a1a1aa)', marginBottom: '20px', fontSize: '0.9rem' }}>
                        Last updated: July 2026
                    </p>

                    <div style={{ color: 'var(--text-color)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '8px' }}>1. Information We Collect</h3>
                        <p>We collect personal details, medical diagnosis records, and lab parameters required for AI analysis.</p>

                        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '8px' }}>2. How We Use Data</h3>
                        <p>Data is strictly utilized for diagnostic assistance, patient management, and portal operations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;