import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateRegistrationForm } from '../../utils/validators';

export const NGORegistration = () => {
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [e.target.name]: file.name });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setErrorMsg('');

        if (passwordIsWeak) {
            setErrorMsg('Please enter a stronger password before proceeding.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }

        const submissionData = { ...formData, name: formData.ngoName };

        const validation = validateRegistrationForm ? validateRegistrationForm(submissionData, 'NGO') : { isValid: true };
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = register ? register(submissionData, 'NGO') : { success: true };
            setLoading(false);
            if (result.success) {
                navigate('/ngo/dashboard');
            } else {
                setErrorMsg(result.message || 'Registration failed');
            }
        }, 1000);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="form-grid"
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}
        >
            {errorMsg && (
                <div
                    className="alert alert-danger"
                    style={{
                        color: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                    }}
                >
                    {errorMsg}
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
                    required
                />
                {errors.name && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</span>}
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
                    required
                />
                {errors.email && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</span>}
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
                        style={{ paddingRight: '40px', width: '100%' }}
                        required
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
                    <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>
                        ⚠️ Weak password! Must be at least 8 characters and contain both letters and numbers.
                    </span>
                )}
                {errors.password && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password}</span>}
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
                        style={{ paddingRight: '40px', width: '100%' }}
                        required
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
                {!passwordsMatch && (
                    <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>
                        ❌ Passwords do not match
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
                    required
                />
                {errors.registrationNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.registrationNumber}</span>}
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
                    required
                />
                {errors.contactPerson && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.contactPerson}</span>}
            </div>

            {/* 7. Contact Phone Number */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Contact Phone Number *</label>
                <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.phone}</span>}
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
                    required
                />
                {errors.operatingRegion && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.operatingRegion}</span>}
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
                />
            </div>

            {/* 10. Upload Registration Certificate */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Upload NGO Registration Certificate (80G / Trust Deed) *</label>
                <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
                    <FaCloudUploadAlt className="file-upload-icon" />
                    <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px' }}>
                        {formData.trustCertificate ? formData.trustCertificate : 'Upload NGO registration certificate (PDF/Image)'}
                    </span>
                    <input
                        type="file"
                        name="trustCertificate"
                        accept=".pdf,.png,.jpg,.jpeg"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        required
                    />
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !passwordsMatch || passwordIsWeak}
                style={{ marginTop: '10px', width: '100%', padding: '12px' }}
            >
                {loading ? 'Submitting registration...' : <><FaSave /> Register NGO Partner</>}
            </button>
        </form>
    );
};

export default NGORegistration;