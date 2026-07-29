// import React from 'react';
// import { motion } from 'framer-motion';
// import { NEWS } from '../../utils/constants';

// export const LatestNews = () => {
//   return (
//     <section className="home-section" id="news">
//       <div className="container">
//         <div className="section-header">
//           <h2>Latest News & Articles</h2>
//           <p>Read about recent breakthroughs in artificial intelligence matching and national donation drives.</p>
//         </div>

//         <div className="news-grid">
//           {NEWS.map((n, index) => (
//             <motion.div
//               key={index}
//               className="card news-card"
//               initial={{ opacity: 0, y: 25 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.15 }}
//             >
//               <div>
//                 <div className="news-meta">
//                   <span>{n.date}</span> &bull; <span>{n.source}</span>
//                 </div>
//                 <h4 className="news-title">{n.title}</h4>
//                 <p className="news-desc">{n.desc}</p>
//               </div>
//               <span className="news-source">Read Article &rarr;</span>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default LatestNews;
