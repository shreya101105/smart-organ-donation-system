import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FAQS } from '../../utils/constants';

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="home-section" id="faq">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 40px auto', maxWidth: '700px' }}>
          <h2 style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <p style={{ textAlign: 'center' }}>Get answers to common clinical and operational questions regarding organ matches and AI evaluations.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="faq-answer"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        #faq .section-header {
          text-align: center !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        #faq .section-header h2 {
          text-align: center !important;
          width: 100%;
        }

        #faq .section-header p {
          text-align: center !important;
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default FAQ;