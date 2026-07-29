import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateRegistrationForm } from '../../utils/validators';

export const GovernmentRegistration = ({ onSuccess }) => {
    const authContext = useContext(AuthContext);
    const register = authContext?.register;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        officerName: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        designation: '',
        govtIdNumber: '',
        jurisdictionRegion: '',
        authorizationLetter: '',
        profilePhoto: ''
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name] || (name === 'officerName' && errors.name)) {
            setErrors((prev) => ({ ...prev, [name]: null, name: null }));
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, [e.target.name]: file.name }));
            if (errors[e.target.name]) {
                setErrors((prev) => ({ ...prev, [e.target.name]: null }));
            }
        }
    };

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

    const validateForm = () => {
        let customErrors = {};

        // 1. Officer Name
        if (!formData.officerName.trim()) {
            customErrors.officerName = 'Authorized Officer Name is required.';
        }

        // 2. Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            customErrors.email = 'Official Email Address is required.';
        } else if (!emailRegex.test(formData.email.trim())) {
            customErrors.email = 'Please enter a valid email address.';
        }

        // 3. Password Check (At least 8 chars, 1 letter, 1 number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!formData.password) {
            customErrors.password = 'Password is required.';
        } else if (!passwordRegex.test(formData.password)) {
            customErrors.password = 'Must be at least 8 characters long and contain both letters and numbers.';
        }

        // 4. Confirm Password Check
        if (!formData.confirmPassword) {
            customErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            customErrors.confirmPassword = 'Passwords do not match.';
        }

        // 5. Department Validation
        if (!formData.department.trim()) {
            customErrors.department = 'Government Department / Authority is required.';
        }

        // 6. Designation Validation
        if (!formData.designation.trim()) {
            customErrors.designation = 'Official Designation is required.';
        }

        // 7. Govt ID Number Validation
        if (!formData.govtIdNumber.trim()) {
            customErrors.govtIdNumber = 'Government ID / Service Number is required.';
        }

        // 8. Jurisdiction Region Validation
        if (!formData.jurisdictionRegion) {
            customErrors.jurisdictionRegion = 'Jurisdiction Region selection is required.';
        }

        // 9. Authorization Letter Check
        if (!formData.authorizationLetter) {
            customErrors.authorizationLetter = 'Authorization Letter / ID Badge document is required.';
        }

        // 10. Profile Photo Check
        if (!formData.profilePhoto) {
            customErrors.profilePhoto = 'Profile Photo upload is required.';
        }

        // External Validator fallback
        const submissionData = { ...formData, name: formData.officerName };
        const validation = typeof validateRegistrationForm === 'function'
            ? validateRegistrationForm(submissionData, 'Government')
            : { isValid: true, errors: {} };

        const mergedErrors = { ...validation.errors, ...customErrors };
        setErrors(mergedErrors);

        return Object.keys(mergedErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const isValid = validateForm();

        if (!isValid) {
            setErrorMsg('Please resolve all highlighted red fields before submitting.');
            return;
        }

        setLoading(true);

        try {
            const submissionData = { ...formData, name: formData.officerName };

            if (register) {
                await register(submissionData, 'Government');
            }

            if (onSuccess) {
                onSuccess(submissionData);
            } else {
                navigate('/government/dashboard');
            }
        } catch (err) {
            setErrorMsg('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
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

            {/* 1. Authorized Officer Name */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Authorized Officer Name *</label>
                <input
                    type="text"
                    name="officerName"
                    className="form-input"
                    placeholder="e.g. Inspector General Vijay Sharma"
                    value={formData.officerName}
                    onChange={handleChange}
                    style={getInputStyle(errors.officerName || errors.name)}
                />
                {(errors.officerName || errors.name) && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.officerName || errors.name}
                    </span>
                )}
            </div>

            {/* 2. Official Email Address */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Official Government Email *</label>
                <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. officer@health.gov.in"
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
                        placeholder="Min 8 chars (letters & numbers)"
                        value={formData.password}
                        onChange={handleChange}
                        style={getInputStyle(errors.password, true)}
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
                        style={getInputStyle(errors.confirmPassword, true)}
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
                {errors.confirmPassword && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.confirmPassword}
                    </span>
                )}
            </div>

            {/* 5. Department / Authority */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Government Department / Authority *</label>
                <input
                    type="text"
                    name="department"
                    className="form-input"
                    placeholder="e.g. Directorate of Health Services / NOTTO"
                    value={formData.department}
                    onChange={handleChange}
                    style={getInputStyle(errors.department)}
                />
                {errors.department && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.department}
                    </span>
                )}
            </div>

            {/* 6. Designation */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Official Designation *</label>
                <input
                    type="text"
                    name="designation"
                    className="form-input"
                    placeholder="e.g. Senior Medical Officer / Compliance Lead"
                    value={formData.designation}
                    onChange={handleChange}
                    style={getInputStyle(errors.designation)}
                />
                {errors.designation && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.designation}
                    </span>
                )}
            </div>

            {/* 7. Government ID */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Government ID / Service Number *</label>
                <input
                    type="text"
                    name="govtIdNumber"
                    className="form-input"
                    placeholder="Official Employee / Govt Identification Code"
                    value={formData.govtIdNumber}
                    onChange={handleChange}
                    style={getInputStyle(errors.govtIdNumber)}
                />
                {errors.govtIdNumber && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.govtIdNumber}
                    </span>
                )}
            </div>

            {/* 8. Jurisdiction */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Jurisdiction Region / Zone *</label>
                <select
                    name="jurisdictionRegion"
                    className="form-select"
                    value={formData.jurisdictionRegion}
                    onChange={handleChange}
                    style={getInputStyle(errors.jurisdictionRegion)}
                >
                    <option value="">Select Jurisdiction</option>
                    <option value="National">National Level</option>
                    <option value="North Zone">North Zone</option>
                    <option value="South Zone">South Zone</option>
                    <option value="East Zone">East Zone</option>
                    <option value="West Zone">West Zone</option>
                    <option value="Central Zone">Central Zone</option>
                </select>
                {errors.jurisdictionRegion && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.jurisdictionRegion}
                    </span>
                )}
            </div>

            {/* 9. Upload Authorization */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Upload Authorization Letter / Official ID Badge *</label>
                <label
                    className="file-upload-input"
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: errors.authorizationLetter ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
                        backgroundColor: errors.authorizationLetter ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                        padding: '16px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.authorizationLetter ? '#ef4444' : '#64748b' }} />
                    <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px', color: errors.authorizationLetter ? '#ef4444' : 'inherit' }}>
                        {formData.authorizationLetter ? formData.authorizationLetter : 'Upload official clearance credential (PDF/Image)'}
                    </span>
                    <input
                        type="file"
                        name="authorizationLetter"
                        accept=".pdf,.png,.jpg,.jpeg"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                </label>
                {errors.authorizationLetter && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.authorizationLetter}
                    </span>
                )}
            </div>

            {/* 10. Profile Photo Upload */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Profile Photo *</label>
                <label
                    className="file-upload-input"
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: errors.profilePhoto ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
                        backgroundColor: errors.profilePhoto ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                        padding: '16px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.profilePhoto ? '#ef4444' : '#64748b' }} />
                    <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px', color: errors.profilePhoto ? '#ef4444' : 'inherit' }}>
                        {formData.profilePhoto ? formData.profilePhoto : 'Click to Upload Profile Picture (JPG/PNG)'}
                    </span>
                    <input
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                </label>
                {errors.profilePhoto && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                        <FaExclamationCircle /> {errors.profilePhoto}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Submitting registration...' : <><FaSave /> Register as Government Officer</>}
            </button>
        </form>
    );
};

export default GovernmentRegistration;