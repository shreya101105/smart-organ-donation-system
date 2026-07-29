// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaQuoteLeft } from 'react-icons/fa';

// export const Testimonials = () => {
//   const list = [
//     {
//       text: "NovaLife AI's disease warning scoring flagged elevated alt levels early. My doctor caught fatty liver development before it became irreversible.",
//       author: "David K.",
//       role: "Patient"
//     },
//     {
//       text: "Registering as an organ donor was seamless. The pledge card generates instantly, and knowing my details are accessible to trauma centers gives me peace.",
//       author: "Samantha R.",
//       role: "Pledged Donor"
//     },
//     {
//       text: "Managing transplant queues has always been a logistical bottleneck. Having tissue matchmaking automated inside our hospital dashboard saves critical hours.",
//       author: "Dr. Angela Thorne",
//       role: "Chief Transplant Coordinator"
//     }
//   ];

//   return (
//     <section className="home-section" id="testimonials">
//       <div className="container">
//         <div className="section-header">
//           <h2>Testimonials</h2>
//           <p>Real feedback from users utilizing the AI diagnostic evaluations and donor registries.</p>
//         </div>

//         <div className="testimonials-grid">
//           {list.map((t, index) => (
//             <motion.div
//               key={index}
//               className="card testimonial-card"
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.15 }}
//             >
//               <div style={{ color: 'var(--primary-color)', fontSize: '1.8rem', marginBottom: '14px' }}>
//                 <FaQuoteLeft />
//               </div>
//               <p className="testimonial-text">"{t.text}"</p>
//               <div className="testimonial-author">
//                 <div className="testimonial-avatar">
//                   {t.author.charAt(0)}
//                 </div>
//                 <div>
//                   <h5 style={{ margin: 0, fontSize: '0.95rem' }}>{t.author}</h5>
//                   <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>{t.role}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Testimonials;
