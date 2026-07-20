// LocalStorage operations safely wrapped
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
};

// Date Formatter
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Mock Organ Compatibility Calculator
export const calculateCompatibility = (donor, recipient) => {
  if (!donor || !recipient) return 0;
  
  // Blood group compatibility matrices
  // Donor compatibility for Recipients:
  // O- can give to anyone (Universal Donor)
  // O+ can give to O+, A+, B+, AB+
  // A- can give to A-, A+, AB-, AB+
  // A+ can give to A+, AB+
  // B- can give to B-, B+, AB-, AB+
  // B+ can give to B+, AB+
  // AB- can give to AB-, AB+
  // AB+ can give to AB+ (Universal Recipient)
  const donorBg = donor.bloodGroup || donor.bloodType;
  const recBg = recipient.bloodGroup || recipient.bloodType;

  if (!donorBg || !recBg) return 50; // default average

  let bloodCompat = false;
  if (donorBg === 'O-') bloodCompat = true;
  else if (donorBg === 'O+') bloodCompat = ['O+', 'A+', 'B+', 'AB+'].includes(recBg);
  else if (donorBg === 'A-') bloodCompat = ['A-', 'A+', 'AB-', 'AB+'].includes(recBg);
  else if (donorBg === 'A+') bloodCompat = ['A+', 'AB+'].includes(recBg);
  else if (donorBg === 'B-') bloodCompat = ['B-', 'B+', 'AB-', 'AB+'].includes(recBg);
  else if (donorBg === 'B+') bloodCompat = ['B+', 'AB+'].includes(recBg);
  else if (donorBg === 'AB-') bloodCompat = ['AB-', 'AB+'].includes(recBg);
  else if (donorBg === 'AB+') bloodCompat = recBg === 'AB+';

  if (!bloodCompat) return 15; // Critical mismatch (only 15% HLA crossmatch success chance)

  // Base compatibility starts at 60% if blood groups match
  let score = 65;

  // Add random/mock factors based on names or emails to lock consistent mock scores
  const hashString = (donor.email || '') + (recipient.email || '');
  let hashVal = 0;
  for (let i = 0; i < hashString.length; i++) {
    hashVal += hashString.charCodeAt(i);
  }
  const hlaScore = 50 + (hashVal % 45); // generates 50% to 95% HLA match
  const ageDiffFactor = Math.max(0, 10 - (hashVal % 10)); // subtract minor penalty for huge age gap

  score = Math.round((score * 0.4) + (hlaScore * 0.6) - ageDiffFactor);
  return Math.min(100, Math.max(20, score));
};

// Mock AI Disease Prediction Algorithm
// Returns high, medium, low risk and key health metrics breakdown
export const simulateDiseasePrediction = (metrics, organ) => {
  // metrics: { creatinine, egfr, bilirubin, alt, ast, bloodPressure, heartRate, glucose, etc. }
  let score = 30; // base healthy baseline

  // Organ-specific logic
  if (organ === 'Kidney') {
    const cr = parseFloat(metrics.creatinine || 1.0);
    const egfr = parseFloat(metrics.egfr || 90);
    if (cr > 1.2) score += (cr - 1.2) * 30;
    if (egfr < 60) score += (60 - egfr) * 1.2;
  } else if (organ === 'Liver') {
    const bili = parseFloat(metrics.bilirubin || 0.8);
    const alt = parseFloat(metrics.alt || 25);
    if (bili > 1.2) score += (bili - 1.2) * 25;
    if (alt > 40) score += (alt - 40) * 0.8;
  } else if (organ === 'Heart') {
    const bp = metrics.bloodPressure || '120/80';
    const hr = parseInt(metrics.heartRate || 75);
    const sys = parseInt(bp.split('/')[0] || 120);
    const dia = parseInt(bp.split('/')[1] || 80);
    if (sys > 140) score += (sys - 140) * 0.8;
    if (dia > 90) score += (dia - 90) * 1.5;
    if (hr > 100 || hr < 55) score += 15;
  } else if (organ === 'Pancreas') {
    const glucose = parseFloat(metrics.glucose || 90);
    if (glucose > 125) score += (glucose - 125) * 0.5;
    if (glucose < 70) score += (70 - glucose) * 0.8;
  } else {
    // General default
    score += (Math.random() * 40);
  }

  score = Math.min(100, Math.round(score));
  
  let riskLevel = 'Low';
  let message = 'No immediate organ issues detected. Continue routine checkups.';
  let color = '#28A745'; // Green

  if (score >= 70) {
    riskLevel = 'Critical';
    message = 'CRITICAL: Severe abnormal metrics. Direct transplant consultation is advised.';
    color = '#DC3545'; // Red
  } else if (score >= 45) {
    riskLevel = 'Moderate';
    message = 'MODERATE: Elevated clinical stress levels. Medical supervision and follow-up is recommended.';
    color = '#FFC107'; // Yellow
  }

  return {
    score,
    riskLevel,
    message,
    color,
    timestamp: new Date().toISOString(),
    metricsAnalyzed: metrics,
    organAnalyzed: organ
  };
};
