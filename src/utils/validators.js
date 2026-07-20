export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/; // Indian numbers: 10 digits, starting with 6-9
  return re.test(String(phone));
};

export const validateRequired = (val) => {
  if (Array.isArray(val)) return val.length > 0;
  return val !== undefined && val !== null && String(val).trim() !== '';
};

export const validateRegistrationForm = (data, role) => {
  const errors = {};

  // Common checks
  if (!validateRequired(data.name || data.hospitalName || data.laboratoryName || data.doctorName)) {
    errors.name = 'Name field is required.';
  }
  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters.';
  }
  
  if (role === 'Patient') {
    if (!validatePhone(data.phone)) errors.phone = 'Enter a valid 10-digit phone number.';
    if (!validateRequired(data.dob)) errors.dob = 'Date of Birth is required.';
    if (!validateRequired(data.gender)) errors.gender = 'Gender is required.';
    if (!validateRequired(data.bloodGroup)) errors.bloodGroup = 'Blood Group is required.';
    if (!validateRequired(data.address)) errors.address = 'Address is required.';
    if (!validateRequired(data.height)) errors.height = 'Height is required.';
    if (!validateRequired(data.weight)) errors.weight = 'Weight is required.';
    if (!validateRequired(data.emergencyContact)) errors.emergencyContact = 'Emergency Contact is required.';
  }

  if (role === 'Recipient') {
    if (!validatePhone(data.phone)) errors.phone = 'Enter a valid 10-digit phone number.';
    if (!validateRequired(data.bloodGroup)) errors.bloodGroup = 'Blood Group is required.';
    if (!validateRequired(data.disease)) errors.disease = 'Primary disease state is required.';
    if (!validateRequired(data.requiredOrgan)) errors.requiredOrgan = 'Required organ is required.';
    if (!validateRequired(data.urgency)) errors.urgency = 'Transplant urgency is required.';
    if (!validateRequired(data.emergencyContact)) errors.emergencyContact = 'Emergency Contact is required.';
  }

  if (role === 'Donor') {
    if (!validatePhone(data.phone)) errors.phone = 'Enter a valid 10-digit phone number.';
    if (!validateRequired(data.bloodGroup)) errors.bloodGroup = 'Blood Group is required.';
    if (!data.organsWillingToDonate || data.organsWillingToDonate.length === 0) {
      errors.organsWillingToDonate = 'Select at least one organ to donate.';
    }
    if (!validateRequired(data.emergencyContact)) errors.emergencyContact = 'Emergency Contact is required.';
  }

  if (role === 'Doctor') {
    if (!validateRequired(data.qualification)) errors.qualification = 'Qualification is required.';
    if (!validateRequired(data.experience)) errors.experience = 'Experience is required.';
    if (!validateRequired(data.specialization)) errors.specialization = 'Specialization is required.';
    if (!validateRequired(data.medRegNumber)) errors.medRegNumber = 'Medical Registration Number is required.';
    if (!validateRequired(data.hospital)) errors.hospital = 'Affiliated Hospital is required.';
  }

  if (role === 'Hospital') {
    if (!validateRequired(data.hospitalType)) errors.hospitalType = 'Hospital Type is required.';
    if (!validateRequired(data.registrationNumber)) errors.registrationNumber = 'Registration Certificate Number is required.';
    if (!validateRequired(data.address)) errors.address = 'Address is required.';
    if (!validateRequired(data.city)) errors.city = 'City is required.';
    if (!validateRequired(data.state)) errors.state = 'State is required.';
    if (!validateRequired(data.pinCode) || data.pinCode.length !== 6) {
      errors.pinCode = 'Enter a valid 6-digit PIN code.';
    }
  }

  if (role === 'Laboratory') {
    if (!validateRequired(data.licenseNumber)) errors.licenseNumber = 'License Number is required.';
    if (!validateRequired(data.chiefPathologist)) errors.chiefPathologist = 'Chief Pathologist Name is required.';
    if (!validateRequired(data.services)) errors.services = 'Services offered details are required.';
    if (!validateRequired(data.address)) errors.address = 'Laboratory Address is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
