export const ROLES = {
  PATIENT: 'Patient',
  RECIPIENT: 'Recipient',
  DONOR: 'Donor',
  DOCTOR: 'Doctor',
  HOSPITAL: 'Hospital',
  LABORATORY: 'Laboratory',
  ADMIN: 'Admin'
};

export const ORGANS = ['Kidney', 'Liver', 'Heart', 'Lung', 'Pancreas', 'Cornea'];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DISEASES = [
  { id: 'kidney', name: 'Chronic Kidney Disease (CKD)', affectedOrgan: 'Kidney' },
  { id: 'liver', name: 'Cirrhosis & Fatty Liver Disease', affectedOrgan: 'Liver' },
  { id: 'heart', name: 'Congestive Heart Failure / Cardiomyopathy', affectedOrgan: 'Heart' },
  { id: 'lung', name: 'Pulmonary Fibrosis / COPD', affectedOrgan: 'Lung' },
  { id: 'pancreas', name: 'Pancreatic Cancer / Severe Pancreatitis', affectedOrgan: 'Pancreas' },
  { id: 'cornea', name: 'Corneal Dystrophy / Corneal Blindness', affectedOrgan: 'Cornea' }
];

export const SPECIALIZATIONS = [
  'Nephrologist',
  'Hepatologist',
  'Cardiologist',
  'Pulmonologist',
  'Ophthalmologist',
  'Transplant Surgeon'
];

export const HOSPITAL_TYPES = ['Government', 'Private', 'Trust / Non-Profit', 'Semi-Government'];

export const EXPERIENCES = ['1-3 Years', '4-7 Years', '8-12 Years', '12+ Years'];

export const STATS = [
  { value: '12,540+', label: 'Registered Donors' },
  { value: '8,920+', label: 'Successful Transplants' },
  { value: '450+', label: 'Empaneled Hospitals' },
  { value: '98.8%', label: 'Prediction Accuracy' }
];

export const SPECIALISTS = [
  {
    name: 'Dr. Robert Carter',
    role: 'Chief Nephrologist & Transplant Specialist',
    hosp: 'Apex Multispeciality Hospital',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Dr. Alisha Sharma',
    role: 'Senior Cardiac Surgeon',
    hosp: 'Metro Heart Institute',
    img: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Dr. David Miller',
    role: 'Liver Transplant Consultant',
    hosp: 'City Care Hospital',
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
  }
];

export const FAQS = [
  {
    question: 'How does the Smart Disease Prediction model work?',
    answer: 'The system uses advanced machine learning classifiers analyzing blood chemistry, demographic data, and medical histories to evaluate organ stress levels and predict potential failure risks before they escalate.'
  },
  {
    question: 'Who can register as an organ donor?',
    answer: 'Anyone aged 18 or above can express their consent to donate organs. Donors submit basic health information, sign legal forms, and receive a digital Donor Card that can be shared with family members.'
  },
  {
    question: 'How are donors and recipients matched?',
    answer: 'Our algorithm performs cross-matching based on Blood Group Compatibility, HLA (Human Leukocyte Antigen) typing, geographical distance (transplant window), size suitability, and case urgency scores.'
  },
  {
    question: 'Are my medical data and uploads secure?',
    answer: 'Yes. All personal information, Aadhaar numbers, and clinical reports are stored securely and visible only to verified clinical personnel (doctors/laboratories) directly involved in your evaluation.'
  }
];

export const NEWS = [
  {
    title: 'New AI Breakthrough in Pre-Transplant HLA Matching',
    date: 'July 15, 2026',
    desc: 'Research integration has improved virtual cross-matching success rates by 22% in multi-center clinical trials.',
    source: 'HealthTech Journal'
  },
  {
    title: 'National Organ Donation Drive Surpasses Annual Milestones',
    date: 'June 28, 2026',
    desc: 'Over 5,000 new donors registered on our smart portal this month, setting a national record.',
    source: 'National Organ Registry'
  },
  {
    title: 'Hospital Network Upgrades Cryo-Storage Telemetry',
    date: 'June 10, 2026',
    desc: 'New sensor hubs transmit real-time oxygenation and thermal logs directly to the transplant coordination dashboards.',
    source: 'BioMed Engineering'
  }
];
