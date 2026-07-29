import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

// Setup pre-populated mock profiles for each role
const MOCK_USERS = [
  {
    role: 'Admin',
    name: 'System Admin',
    email: 'admin@system.com',
    password: 'admin123',
    passwordHistory: ['admin123']
  },
  {
    role: 'Patient',
    name: 'John Doe',
    email: 'patient@system.com',
    password: 'patient123',
    passwordHistory: ['patient123'],
    phone: '9876543210',
    dob: '1995-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '123 Health Ave, New Delhi, India',
    height: '175',
    weight: '70',
    medicalHistory: 'Mild Asthma in childhood',
    allergies: 'Penicillin',
    emergencyContact: 'Jane Doe (+91 9876543211)',
    aadhaarFile: 'aadhaar_mock.pdf',
    profilePhoto: '',
  },
  {
    role: 'Recipient',
    name: 'Alice Smith',
    email: 'recipient@system.com',
    password: 'recipient123',
    passwordHistory: ['recipient123'],
    phone: '8765432109',
    bloodGroup: 'A-',
    disease: 'End-Stage Renal Disease (ESRD)',
    requiredOrgan: 'Kidney',
    urgency: 'High',
    doctorRecommendation: 'Dr. Robert Carter - Immediate transplant recommended.',
    medicalReportFile: 'renal_scan.pdf',
    emergencyContact: 'Bob Smith (+91 8765432100)',
    profilePhoto: '',
  },
  {
    role: 'Donor',
    name: 'Robert Stark',
    email: 'donor@system.com',
    password: 'donor123',
    passwordHistory: ['donor123'],
    phone: '7654321098',
    bloodGroup: 'O+',
    medicalHistory: 'None, completely healthy',
    organsWillingToDonate: ['Kidney', 'Cornea'],
    consentFormFile: 'consent_signed.pdf',
    healthCertificateFile: 'health_cert.pdf',
    emergencyContact: 'Ned Stark (+91 7654321000)',
    profilePhoto: '',
  },
  {
    role: 'Doctor',
    name: 'Dr. Robert Carter',
    email: 'doctor@system.com',
    password: 'doctor123',
    passwordHistory: ['doctor123'],
    qualification: 'MD, DM (Nephrology)',
    experience: '12 Years',
    specialization: 'Nephrologist / Transplant Specialist',
    medRegNumber: 'MCI-87654',
    hospital: 'Apex Multispeciality Hospital',
    licenseFile: 'license_carter.pdf',
  },
  {
    role: 'Hospital',
    name: 'Apex Multispeciality Hospital',
    email: 'hospital@system.com',
    password: 'hospital123',
    passwordHistory: ['hospital123'],
    hospitalType: 'Private',
    registrationNumber: 'HOSP-2026-99',
    address: 'Sector 52, Noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pinCode: '201301',
    logo: '',
    certFile: 'hosp_reg_cert.pdf',
  },
  {
    role: 'Laboratory',
    name: 'Metro Diagnostics & Pathlabs',
    email: 'lab@system.com',
    password: 'lab123',
    passwordHistory: ['lab123'],
    licenseNumber: 'LAB-LIC-775',
    chiefPathologist: 'Dr. Sarah Connor',
    services: 'HLA Typing, Crossmatching, Blood Analysis, Organ Health Profiles',
    address: 'Plot 10, Connaught Place, New Delhi',
    logo: '',
    licenseFile: 'lab_lic.pdf',
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('smart_organ_users');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      localStorage.setItem('smart_organ_users', JSON.stringify(MOCK_USERS));
      return MOCK_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('smart_organ_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [otpVerificationState, setOtpVerificationState] = useState(null);

  const login = (email, password, role) => {
    const foundUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role.toLowerCase() === role.toLowerCase()
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('smart_organ_current_user', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Invalid credentials or role selection.' };
  };

  // Google Login Function Implementation
  const googleLogin = async (selectedRole) => {
    try {
      let existingUser = users.find(
        u => u.role.toLowerCase() === selectedRole.toLowerCase()
      );

      if (existingUser) {
        setCurrentUser(existingUser);
        localStorage.setItem('smart_organ_current_user', JSON.stringify(existingUser));
        return { success: true, user: existingUser };
      }

      const newGoogleUser = {
        name: 'Google User',
        email: `google_${selectedRole.toLowerCase()}@system.com`,
        role: selectedRole,
        isGoogleAccount: true,
        passwordHistory: []
      };

      const updatedUsers = [...users, newGoogleUser];
      setUsers(updatedUsers);
      localStorage.setItem('smart_organ_users', JSON.stringify(updatedUsers));

      setCurrentUser(newGoogleUser);
      localStorage.setItem('smart_organ_current_user', JSON.stringify(newGoogleUser));

      return { success: true, user: newGoogleUser };
    } catch (err) {
      return { success: false, message: 'Google Authentication failed.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smart_organ_current_user');
  };

  const register = (userData, role) => {
    const emailExists = users.some(
      u => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (emailExists) {
      return { success: false, message: 'Email is already registered.' };
    }

    const newUser = {
      ...userData,
      role,
      passwordHistory: userData.password ? [userData.password] : []
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('smart_organ_users', JSON.stringify(updatedUsers));

    // Automatically log them in after registration
    setCurrentUser(newUser);
    localStorage.setItem('smart_organ_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return { success: false, message: 'No user logged in.' };

    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem('smart_organ_current_user', JSON.stringify(updatedUser));

    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('smart_organ_users', JSON.stringify(updatedUsers));
    return { success: true };
  };

  const initiateForgotPassword = (email) => {
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtpVerificationState({ email, otp: mockOtp });
      console.log(`[MOCK OTP SENT] to ${email}: ${mockOtp}`);
      alert(`[MOCK OTP SENT] Your OTP is: ${mockOtp}`);
      return { success: true, otp: mockOtp };
    }
    return { success: false, message: 'Email address not found in our database.' };
  };

  const verifyOTP = (email, enteredOtp) => {
    if (otpVerificationState &&
      otpVerificationState.email.toLowerCase() === email.toLowerCase() &&
      otpVerificationState.otp === enteredOtp) {
      return { success: true };
    }
    return { success: false, message: 'Incorrect or expired OTP code.' };
  };

  // CHECK IF PASSWORD WAS PREVIOUSLY USED
  const checkPasswordReused = (email, newPassword) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return false;

    const history = user.passwordHistory || (user.password ? [user.password] : []);
    return history.includes(newPassword);
  };

  // RESET PASSWORD WITH REUSE GUARD
  const resetPassword = (email, newPassword) => {
    if (checkPasswordReused(email, newPassword)) {
      return { success: false, message: 'You cannot reuse a previously used password.' };
    }

    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        const history = u.passwordHistory || (u.password ? [u.password] : []);
        return {
          ...u,
          password: newPassword,
          passwordHistory: [...history, newPassword]
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('smart_organ_users', JSON.stringify(updatedUsers));

    // Update currentUser in localStorage if currently logged in
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      const updatedUser = {
        ...currentUser,
        password: newPassword,
        passwordHistory: [...(currentUser.passwordHistory || []), newPassword]
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('smart_organ_current_user', JSON.stringify(updatedUser));
    }

    setOtpVerificationState(null); // Clear OTP state
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      googleLogin,
      logout,
      register,
      updateProfile,
      initiateForgotPassword,
      verifyOTP,
      checkPasswordReused,
      resetPassword,
      otpState: otpVerificationState
    }}>
      {children}
    </AuthContext.Provider>
  );
};