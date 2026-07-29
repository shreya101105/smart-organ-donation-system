import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateRegistrationForm } from '../../utils/validators';

export const GovernmentRegistration = () => {
    const { register } = useContext(AuthContext);
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
        authorizationLetter: ''
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

        const submissionData = { ...formData, name: formData.officerName };

        const validation = validateRegistrationForm ? validateRegistrationForm(submissionData, 'Government') : { isValid: true };
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = register ? register(submissionData, 'Government') : { success: true };
            setLoading(false);
            if (result.success) {
                navigate('/government/dashboard');
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
                    required
                />
                {errors.name && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</span>}
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
                    required
                />
                {errors.department && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.department}</span>}
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
                    required
                />
                {errors.designation && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.designation}</span>}
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
                    required
                />
                {errors.govtIdNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.govtIdNumber}</span>}
            </div>

            {/* 8. Jurisdiction */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Jurisdiction Region / Zone *</label>
                <select
                    name="jurisdictionRegion"
                    className="form-select"
                    value={formData.jurisdictionRegion}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Jurisdiction</option>
                    <option value="National">National Level</option>
                    <option value="North Zone">North Zone</option>
                    <option value="South Zone">South Zone</option>
                    <option value="East Zone">East Zone</option>
                    <option value="West Zone">West Zone</option>
                    <option value="Central Zone">Central Zone</option>
                </select>
                {errors.jurisdictionRegion && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.jurisdictionRegion}</span>}
            </div>

            {/* 9. Upload Authorization */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className="form-label">Upload Authorization Letter / Official ID Badge *</label>
                <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
                    <FaCloudUploadAlt className="file-upload-icon" />
                    <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '4px' }}>
                        {formData.authorizationLetter ? formData.authorizationLetter : 'Upload official clearance credential (PDF/Image)'}
                    </span>
                    <input
                        type="file"
                        name="authorizationLetter"
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
                {loading ? 'Submitting registration...' : <><FaSave /> Register as Government Officer</>}
            </button>
        </form>
    );
};

export default GovernmentRegistration;