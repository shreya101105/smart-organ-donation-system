// import React from 'react';
// import { motion } from 'framer-motion';
// import { STATS } from '../../utils/constants';

// export const Statistics = () => {
//   return (
//     <section className="stats-section">
//       <div className="container">
//         <div className="stats-grid">
//           {STATS.map((s, index) => (
//             <motion.div
//               key={index}
//               className="stat-item"
//               initial={{ opacity: 0, y: 15 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <motion.h3
//                 initial={{ scale: 0.8 }}
//                 whileInView={{ scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: 'spring', stiffness: 100 }}
//               >
//                 {s.value}
//               </motion.h3>
//               <p>{s.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Statistics;
