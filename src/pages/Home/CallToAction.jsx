// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export const CallToAction = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="cta-section">
//       <div className="container cta-container">
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2>Ready to Make an Impact?</h2>
//           <p>
//             Whether you want to consult the disease prediction model, pledge an organ, or manage laboratory reports, register now to access your custom panel.
//           </p>
//           <div className="cta-buttons">
//             <button className="btn hero-btn-white" onClick={() => navigate('/register')}>
//               Get Started Now
//             </button>
//             <button className="btn hero-btn-outline" onClick={() => navigate('/login')}>
//               Sign In to Account
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
// export default CallToAction;
