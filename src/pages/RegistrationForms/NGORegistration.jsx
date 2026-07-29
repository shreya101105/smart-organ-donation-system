import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateRegistrationForm } from '../../utils/validators';

export const NGORegistration = ({ onSuccess }) => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ngoName: '',
        email: '',
        password: '',
        confirmPassword: '',
        registrationNumber: '',
        contactPerson: '',
        phone: '',
        operatingRegion: '',
        websiteUrl: '',
        trustCertificate: ''
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Helper to check password strength (At least 8 chars, 1 letter, 1 number)
    const isPasswordWeak = (pass) => {
        if (!pass) return false;
        return pass.length < 8 || !/\d/.test(pass) || !/[a-zA-Z]/.test(pass);
    };

    const passwordIsWeak = isPasswordWeak(formData.password);
    const passwordsMatch = formData.confirmPassword
        ? formData.password === formData.confirmPassword
        : true;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear individual error as user types
        if (errors[name] || (name === 'ngoName' && errors.name)) {
            setErrors((prev) => ({ ...prev, [name]: null, name: null }));
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [e.target.name]: file.name });
            if (errors[e.target.name]) {
                setErrors((prev) => ({ ...prev, [e.target.name]: null }));
            }
        }
    };

    // Helper function for Dynamic Red Alert Box styling
    const getInputStyle = (hasError, extraPadding = false) => ({
        width: '100%',
        padding: extraPadding ? '10px 40px 10px 12px' : '10px 12px',
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.25s ease',
        border: hasError ? '2px solid #ef4444' : '1px solid #cbd5e1',
        backgroundColor: hasError ? 'rgba(239, 68, 68, 0.06)' : '#ffffff',
        boxShadow: hasError ? '0 0 10px rgba(239, 68, 68, 0.25)' : 'none',
        color: '#1e293b'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setErrorMsg('');

        let customErrors = {};

        // 1. Mandatory Name Validation
        if (!formData.ngoName.trim()) {
            customErrors.ngoName = 'NGO / Foundation Name is required.';
            customErrors.name = 'NGO / Foundation Name is required.';
        }

        // 2. Official Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            customErrors.email = 'Official Email Address is required.';
        } else if (!emailRegex.test(formData.email.trim())) {
            customErrors.email = 'Please enter a valid email address.';
        }

        // 3. Strict 10-Digit Mobile Number Validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!formData.phone.trim()) {
            customErrors.phone = 'Contact Phone Number is required.';
        } else if (!phoneRegex.test(formData.phone.trim())) {
            customErrors.phone = 'Mobile number is not correct (Enter a valid 10-digit number).';
        }

        // 4. Registration Number Check
        if (!formData.registrationNumber.trim()) {
            customErrors.registrationNumber = 'Registration / Trust Number is required.';
        }

        // 5. Contact Person Check
        if (!formData.contactPerson.trim()) {
            customErrors.contactPerson = 'Authorized Contact Person name is required.';
        }

        // 6. Operating Region Check
        if (!formData.operatingRegion.trim()) {
            customErrors.operatingRegion = 'Operating State / Region is required.';
        }

        // 7. Trust Certificate Check
        if (!formData.trustCertificate) {
            customErrors.trustCertificate = 'NGO Registration Certificate is required.';
        }

        // 8. Password Match & Strength Check
        if (passwordIsWeak) {
            customErrors.password = 'Weak password! Use at least 8 chars with letters & numbers.';
        }

        if (formData.password !== formData.confirmPassword) {
            customErrors.confirmPassword = 'Passwords do not match.';
        }

        // 9. External Validator Integration
        const submissionData = { ...formData, name: formData.ngoName, role: 'NGO' };
        const validation = validateRegistrationForm ? validateRegistrationForm(submissionData, 'NGO') : { isValid: true, errors: {} };
        const mergedErrors = { ...validation.errors, ...customErrors };

        if (Object.keys(mergedErrors).length > 0) {
            setErrors(mergedErrors);
            setErrorMsg('Please fix all highlighted red fields before submitting.');
            return;
        }

        setLoading(true);
        try {
            let result = { success: true };

            if (register) {
                result = await register(submissionData, 'NGO');
            }

            if (result && result.success === false) {
                setErrorMsg(result.message || 'Registration failed. Please try again.');
                setLoading(false);
                return;
            }

            // Execute parent callback if provided, else route directly
            if (typeof onSuccess === 'function') {
                await onSuccess(submissionData);
            } else {
                navigate('/ngo/dashboard');
            }
        } catch (err) {
            setErrorMsg(err.message || 'An unexpected error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate /* Bypasses native browser tooltip errors */
            className="form-grid"
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}
        >
            {/* Top Error Alert Banner */}
            {errorMsg && (
                <div
                    className="alert alert-danger"
                    style={{
                        color: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid #ef4444',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <FaExclamationCircle style={{ fontSize: '1.1rem', flexShrink: 0 }} />
                    <span>{errorMsg}</span>
                </div>
            )}

            {/* 1. NGO / Foundation Name */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">NGO / Foundation Name *</label>
                <input
                    type="text"
                    name="ngoName"
                    className="form-input"
                    placeholder="e.g. LifeGift Organ Donation Foundation"
                    value={formData.ngoName}
                    onChange={handleChange}
                    style={getInputStyle(errors.ngoName || errors.name)}
                />
                {(errors.ngoName || errors.name) && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.ngoName || errors.name}
                    </span>
                )}
            </div>

            {/* 2. Official Email Address */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Official Email Address *</label>
                <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. contact@lifegiftngo.org"
                    value={formData.email}
                    onChange={handleChange}
                    style={getInputStyle(errors.email)}
                />
                {errors.email && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.email}
                    </span>
                )}
            </div>

            {/* 3. Password Field */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Password *</label>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-input"
                        placeholder="Min 8 chars (include letters & numbers)"
                        value={formData.password}
                        onChange={handleChange}
                        style={getInputStyle(errors.password || passwordIsWeak, true)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        tabIndex="-1"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {passwordIsWeak && (
                    <span style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>
                        ⚠️ Weak password! Must be at least 8 characters and contain both letters and numbers.
                    </span>
                )}
                {errors.password && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.password}
                    </span>
                )}
            </div>

            {/* 4. Confirm Password Field */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Confirm Password *</label>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className="form-input"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={getInputStyle(errors.confirmPassword || !passwordsMatch, true)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        tabIndex="-1"
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {(!passwordsMatch || errors.confirmPassword) && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.confirmPassword || 'Passwords do not match'}
                    </span>
                )}
            </div>

            {/* 5. NGO Registration / Trust Number */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">NGO Registration / Trust Number *</label>
                <input
                    type="text"
                    name="registrationNumber"
                    className="form-input"
                    placeholder="Societies / Trust Reg. No."
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    style={getInputStyle(errors.registrationNumber)}
                />
                {errors.registrationNumber && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.registrationNumber}
                    </span>
                )}
            </div>

            {/* 6. Authorized Contact Person */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Authorized Contact Person *</label>
                <input
                    type="text"
                    name="contactPerson"
                    className="form-input"
                    placeholder="Full Name of Representative"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    style={getInputStyle(errors.contactPerson)}
                />
                {errors.contactPerson && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.contactPerson}
                    </span>
                )}
            </div>

            {/* 7. Contact Phone Number (Red Glow Box Alert) */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Contact Phone Number *</label>
                <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={getInputStyle(errors.phone)}
                />
                {errors.phone && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                        <FaExclamationCircle /> {errors.phone}
                    </span>
                )}
            </div>

            {/* 8. Operating State / Region */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Operating State / Region *</label>
                <input
                    type="text"
                    name="operatingRegion"
                    className="form-input"
                    placeholder="e.g. Maharashtra / Pan-India"
                    value={formData.operatingRegion}
                    onChange={handleChange}
                    style={getInputStyle(errors.operatingRegion)}
                />
                {errors.operatingRegion && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.operatingRegion}
                    </span>
                )}
            </div>

            {/* 9. NGO Website */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">NGO Website (Optional)</label>
                <input
                    type="url"
                    name="websiteUrl"
                    className="form-input"
                    placeholder="https://www.lifegiftngo.org"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    style={getInputStyle(false)}
                />
            </div>

            {/* 10. Upload Registration Certificate */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Upload NGO Registration Certificate (80G / Trust Deed) *</label>
                <label
                    className="file-upload-input"
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: errors.trustCertificate ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
                        backgroundColor: errors.trustCertificate ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                        padding: '16px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.trustCertificate ? '#ef4444' : '#64748b' }} />
                    <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px', color: errors.trustCertificate ? '#ef4444' : 'inherit' }}>
                        {formData.trustCertificate ? formData.trustCertificate : 'Upload NGO registration certificate (PDF/Image)'}
                    </span>
                    <input
                        type="file"
                        name="trustCertificate"
                        accept=".pdf,.png,.jpg,.jpeg"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                </label>
                {errors.trustCertificate && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.trustCertificate}
                    </span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: '600',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Submitting registration...' : <><FaSave /> Register NGO Partner</>}
            </button>
        </form>
    );
};

export default NGORegistration;