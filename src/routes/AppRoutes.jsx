import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Home from '../pages/Home/Home';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import VerifyOTP from '../pages/Authentication/VerifyOTP';
import ResetPassword from '../pages/Authentication/ResetPassword';
import About from '../pages/About/About';
import Services from '../pages/Services/Services';
import Contact from '../pages/Contact/Contact';
import Resources from '../pages/Resources/Resources';

import PatientDashboard from '../pages/Patient/Dashboard';
import DoctorDashboard from '../pages/Doctor/Dashboard';
import DonorDashboard from '../pages/Donor/Dashboard';
import RecipientDashboard from '../pages/Recipient/Dashboard';
import HospitalDashboard from '../pages/Hospital/Dashboard';
import LaboratoryDashboard from '../pages/Laboratory/Dashboard';
import AdminDashboard from '../pages/Admin/Dashboard';

import NotFound from '../pages/Error/NotFound';
import Loader from '../pages/Loading/Loader';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Save current URL for redirects after login
    return <Navigate to={`/login?role=${allowedRole}`} replace />;
  }

  if (currentUser.role.toLowerCase() !== allowedRole.toLowerCase()) {
    // Redirect unauthorized roles back to their respective dashboards
    return <Navigate to={`/${currentUser.role.toLowerCase()}/dashboard`} replace />;
  }

  return children;
};

export const AppRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Role-Protected Dashboards */}
      <Route 
        path="/patient/dashboard" 
        element={
          <ProtectedRoute allowedRole="Patient">
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctor/dashboard" 
        element={
          <ProtectedRoute allowedRole="Doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/donor/dashboard" 
        element={
          <ProtectedRoute allowedRole="Donor">
            <DonorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recipient/dashboard" 
        element={
          <ProtectedRoute allowedRole="Recipient">
            <RecipientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hospital/dashboard" 
        element={
          <ProtectedRoute allowedRole="Hospital">
            <HospitalDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/laboratory/dashboard" 
        element={
          <ProtectedRoute allowedRole="Laboratory">
            <LaboratoryDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
