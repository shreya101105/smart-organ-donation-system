// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCloudUploadAlt, FaSave, FaCheck } from 'react-icons/fa';
// import { AuthContext } from '../../context/AuthContext';
// import { BLOOD_GROUPS } from '../../utils/constants';
// import { validateRegistrationForm } from '../../utils/validators';

// export const RecipientRegistration = () => {
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     bloodGroup: '',
//     disease: '',
//     requiredOrgan: [], // Can select from the 3 available organ options
//     urgency: '',
//     doctorRecommendation: '',
//     medicalReportFile: '',
//     emergencyContact: '',
//     profilePhoto: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [errorMsg, setErrorMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Exactly 3 organ options
//   const availableOrgans = ['Kidney', 'Liver', 'Heart'];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Toggle selection for the 3 organs
//   const handleOrganToggle = (organ) => {
//     const currentOrgans = formData.requiredOrgan;

//     if (currentOrgans.includes(organ)) {
//       setFormData({
//         ...formData,
//         requiredOrgan: currentOrgans.filter((item) => item !== organ)
//       });
//     } else {
//       setFormData({
//         ...formData,
//         requiredOrgan: [...currentOrgans, organ]
//       });
//     }

//     if (errors.requiredOrgan) {
//       setErrors({ ...errors, requiredOrgan: null });
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, [e.target.name]: file.name });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     setErrorMsg('');

//     if (formData.requiredOrgan.length === 0) {
//       setErrors((prev) => ({ ...prev, requiredOrgan: 'Please select at least 1 organ.' }));
//       return;
//     }

//     const validation = validateRegistrationForm ? validateRegistrationForm(formData, 'Recipient') : { isValid: true };
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setLoading(true);
//     setTimeout(() => {
//       const result = register(formData, 'Recipient');
//       setLoading(false);
//       if (result && result.success) {
//         navigate('/recipient/dashboard');
//       } else {
//         setErrorMsg((result && result.message) || 'Registration failed. Please try again.');
//       }
//     }, 1000);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '18px',
//         width: '100%',
//         maxWidth: '550px',
//         margin: '0 auto'
//       }}
//     >
//       {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

//       {/* Full Name */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Full Name *</label>
//         <input
//           type="text"
//           name="name"
//           className="form-input"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         {errors.name && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</span>}
//       </div>

//       {/* Email Address */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Email Address *</label>
//         <input
//           type="email"
//           name="email"
//           className="form-input"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         {errors.email && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</span>}
//       </div>

//       {/* Password */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Password *</label>
//         <input
//           type="password"
//           name="password"
//           className="form-input"
//           placeholder="Min 6 characters"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         {errors.password && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password}</span>}
//       </div>

//       {/* Phone Number */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Phone Number *</label>
//         <input
//           type="tel"
//           name="phone"
//           className="form-input"
//           placeholder="10-digit number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//         {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.phone}</span>}
//       </div>

//       {/* Blood Group */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Blood Group *</label>
//         <select
//           name="bloodGroup"
//           className="form-select"
//           value={formData.bloodGroup}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Blood Group</option>
//           {BLOOD_GROUPS ? BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>) : (
//             ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)
//           )}
//         </select>
//         {errors.bloodGroup && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.bloodGroup}</span>}
//       </div>

//       {/* Required Organ Selection (Strictly 3 Options Available) */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label" style={{ marginBottom: '4px' }}>
//           Required Organ *
//         </label>

//         <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
//           {availableOrgans.map((organ) => {
//             const isSelected = formData.requiredOrgan.includes(organ);
//             return (
//               <button
//                 type="button"
//                 key={organ}
//                 onClick={() => handleOrganToggle(organ)}
//                 style={{
//                   flex: 1,
//                   padding: '10px',
//                   borderRadius: '10px',
//                   border: isSelected ? '1px solid #00d2d3' : '1px solid #1e293b',
//                   backgroundColor: isSelected ? 'rgba(0, 210, 211, 0.15)' : '#0a1120',
//                   color: isSelected ? '#00d2d3' : '#cbd5e1',
//                   cursor: 'pointer',
//                   fontSize: '0.85rem',
//                   fontWeight: '600',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: '6px',
//                   transition: 'all 0.2s ease-in-out'
//                 }}
//               >
//                 {isSelected && <FaCheck style={{ fontSize: '0.75rem' }} />}
//                 {organ}
//               </button>
//             );
//           })}
//         </div>

//         {errors.requiredOrgan && (
//           <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.requiredOrgan}</span>
//         )}
//       </div>

//       {/* Transplant Urgency */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Transplant Urgency *</label>
//         <select
//           name="urgency"
//           className="form-select"
//           value={formData.urgency}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Urgency</option>
//           <option value="Critical">Critical (Immediate Transplant Needed)</option>
//           <option value="High">High Urgency</option>
//           <option value="Medium">Medium Urgency</option>
//           <option value="Low">Low / Stable</option>
//         </select>
//         {errors.urgency && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.urgency}</span>}
//       </div>

//       {/* Emergency Contact */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Emergency Contact (Name & Tel) *</label>
//         <input
//           type="text"
//           name="emergencyContact"
//           className="form-input"
//           placeholder="Bob Smith (+91 87654...)"
//           value={formData.emergencyContact}
//           onChange={handleChange}
//           required
//         />
//         {errors.emergencyContact && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.emergencyContact}</span>}
//       </div>

//       {/* Primary Diagnosis */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Primary Diagnosis / Disease State *</label>
//         <textarea
//           name="disease"
//           className="form-textarea"
//           rows="3"
//           placeholder="e.g. End-Stage Renal Disease (ESRD) secondary to Diabetes"
//           value={formData.disease}
//           onChange={handleChange}
//           required
//         ></textarea>
//         {errors.disease && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.disease}</span>}
//       </div>

//       {/* Doctor Recommendation */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Doctor Recommendation Summary</label>
//         <textarea
//           name="doctorRecommendation"
//           className="form-textarea"
//           rows="3"
//           placeholder="e.g. Recommended for immediate renal transplant by Dr. Carter"
//           value={formData.doctorRecommendation}
//           onChange={handleChange}
//         ></textarea>
//       </div>

//       {/* Medical Diagnosis Reports Upload */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Upload Medical Diagnosis Reports *</label>
//         <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
//           <FaCloudUploadAlt className="file-upload-icon" />
//           <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
//             {formData.medicalReportFile ? formData.medicalReportFile : 'Upload pathology/clinical scans (PDF)'}
//           </span>
//           <input
//             type="file"
//             name="medicalReportFile"
//             accept=".pdf"
//             style={{ display: 'none' }}
//             onChange={handleFileUpload}
//             required
//           />
//         </label>
//       </div>

//       {/* Profile Photo */}
//       <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//         <label className="form-label">Profile Photo (Optional)</label>
//         <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
//           <FaCloudUploadAlt className="file-upload-icon" />
//           <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
//             {formData.profilePhoto ? formData.profilePhoto : 'Click to Upload JPG/PNG'}
//           </span>
//           <input
//             type="file"
//             name="profilePhoto"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={handleFileUpload}
//           />
//         </label>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="btn btn-primary"
//         disabled={loading}
//         style={{ marginTop: '10px', width: '100%', padding: '12px' }}
//       >
//         {loading ? 'Submitting registration...' : <><FaSave /> Register as Recipient</>}
//       </button>
//     </form>
//   );
// };

// export default RecipientRegistration;