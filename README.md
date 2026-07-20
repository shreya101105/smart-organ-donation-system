# Smart Organ Disease Detection and Organ Donation Management System

An intelligent, cloud-integrated React.js web portal designed to streamline early-stage organ failure risk calculations, simplify donor pledges, and automate tissue cross-matching. 

This platform connects **Patients**, **Recipients**, **Donors**, **Doctors**, **Hospitals**, and **Laboratories** under a unified, secure database ledger.

---

## 🚀 Tech Stack
- **Frontend Core**: React.js (Vite)
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API & LocalStorage
- **Animations**: Framer Motion
- **Icons**: React Icons (FontAwesome)
- **Styling**: Vanilla CSS3 (Custom Dark Mode & Glassmorphic variables)

---

## 🎨 Theme & Appearance
The portal features a premium **Glassmorphism Dark Theme** by default, styled with vibrant neon highlights:
- **Primary Color**: `#8f2df5` (Neon Purple)
- **Secondary Color**: `#00d2d3` (Vibrant Teal/Cyan)
- **Accent Color**: `#ff9f43` (Sunset Gold)
- **Background**: `#090a0f` (Dark Slate) with floating radial gradient mesh circles.

---

## 🛠️ Installation Guide & How to Run

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16.0.0 or higher recommended).

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/smart-organ-donation.git
   cd smart-organ-donation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📂 Project Folder Structure

```text
smart-organ-donation/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── dashboard.css
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── BackgroundContext.jsx
│   ├── hooks/
│   │   ├── useTheme.js
│   │   └── useBackground.js
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── ... (all 17 landing sections)
│   │   ├── Authentication/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── Auth.css
│   │   ├── RegistrationForms/
│   │   │   ├── PatientRegistration.jsx
│   │   │   ├── RecipientRegistration.jsx
│   │   │   └── ... (6 specific forms)
│   │   ├── Patient/ (Profile, AI Predictions, History, Appointments, Logs)
│   │   ├── Doctor/ (Case logs, verify predictions report, clinical drafts)
│   │   ├── Donor/ (Organ pledges, live crossmatches, smart donor card)
│   │   ├── Recipient/ (Urgency applications, queue positions, compatibility)
│   │   ├── Hospital/ (Cryo-storage, transplant approvals, operating clearances)
│   │   ├── Laboratory/ (HLA typing, Ast/Creatinine GFR files upload desk)
│   │   ├── Admin/ (Theme settings, website wallpapers, manage users index)
│   │   ├── Error/ (NotFound.jsx)
│   │   └── Loading/ (Loader.jsx)
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helper.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── package.json
└── vite.config.js
```

---

## 🧬 Real Clinical Data & AI Models
- **Automated Tissue Crossmatching**: Computes compatibility ratings based on blood typing donor matrices and HLA loci matches (expressing HLA-A, HLA-B, HLA-DR antigen combinations).
- **Early Failing Predictor**: Analyzes serum creatinine levels (mg/dL), eGFR GFR rates, ALT enzymes (U/L), and fasting blood glucose to alert users about impending organ stress.

---

## 🔮 Future Scope
- **Blockchain Ledgering**: Integrate a decentralized blockchain network to prevent queue manipulation and log transplant consent forms unalterably.
- **IoT Cryo-Preservation Telemetry**: Wire active thermal sensors to transit boxes transmitting live oxygenation and thermal indicators directly via MQTT sockets.
- **Deep Learning Classifiers**: Upgrade diagnostic classification scripts from rule-based simulations to multi-layered neural networks trained on clinical EHR databases.

---

## 👥 Contributors
- **Shreya Chandankhede** (Final Year Project Lead)

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
