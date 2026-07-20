import React from 'react';
import { motion } from 'framer-motion';

export const Table = ({
  headers = [],
  rows = [], // Array of arrays or arrays of objects with values
  className = '',
  loading = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  renderRow = null, // Custom renderer function
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`table-responsive ${className}`} style={{ width: '100%', overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.01)' }}>
      <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.02)' }}>
            {headers.map((header, idx) => (
              <th key={idx} style={{ padding: '16px 20px', fontWeight: '600', fontSize: '0.88rem', color: 'var(--muted-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            <tr>
              <td colSpan={headers.length} style={{ padding: '40px', textAlign: 'center', color: 'var(--muted-color)' }}>
                <div className="spinner-border text-primary" role="status" style={{ margin: '0 auto 10px auto' }}></div>
                <span>Loading records...</span>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} style={{ padding: '40px', textAlign: 'center', color: 'var(--muted-color)', fontSize: '0.95rem' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => {
              if (renderRow) {
                return (
                  <motion.tr 
                    key={rowIdx} 
                    variants={itemVariants}
                    style={{ borderBottom: '1px solid var(--border-color)', cursor: onRowClick ? 'pointer' : 'default' }}
                    onClick={() => onRowClick && onRowClick(row, rowIdx)}
                  >
                    {renderRow(row, rowIdx)}
                  </motion.tr>
                );
              }
              
              // Standard rendering of data cells
              const cells = Array.isArray(row) ? row : Object.values(row);
              return (
                <motion.tr
                  key={rowIdx}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', transition: { duration: 0.1 } }}
                  style={{ 
                    borderBottom: '1px solid var(--border-color)', 
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'var(--transition-fast)'
                  }}
                  onClick={() => onRowClick && onRowClick(row, rowIdx)}
                >
                  {cells.map((cell, cellIdx) => (
                    <td key={cellIdx} style={{ padding: '14px 20px', fontSize: '0.92rem', color: 'var(--text-color)', verticalAlign: 'middle' }}>
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              );
            })
          )}
        </motion.tbody>
      </table>
    </div>
  );
};

export default Table;
