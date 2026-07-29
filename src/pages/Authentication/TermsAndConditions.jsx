import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const TermsAndConditions = () => {
    return (
        <div className="auth-page" style={{ padding: '40px 20px' }}>
            <div className="auth-container" style={{ maxWidth: '800px', width: '100%' }}>
                <div className="auth-card" style={{ textAlign: 'left', padding: '40px' }}>
                    <Link to="/register" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <FaArrowLeft /> Back to Registration
                    </Link>

                    <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-color)' }}>
                        Terms & Conditions
                    </h2>
                    <p style={{ color: 'var(--text-muted, #a1a1aa)', marginBottom: '20px', fontSize: '0.9rem' }}>
                        Last updated: July 2026
                    </p>

                    <div style={{ color: 'var(--text-color)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '8px' }}>1. Acceptance of Terms</h3>
                        <p>By accessing and using NovaLife AI, you agree to comply with and be bound by these Terms and Conditions.</p>

                        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '8px' }}>2. User Responsibilities</h3>
                        <p>Users must provide accurate clinical/personal information and maintain account credential privacy.</p>

                        <h3 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '8px' }}>3. Data Privacy</h3>
                        <p>Your healthcare data is processed in accordance with HIPAA/GDPR clinical compliance protocols.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;