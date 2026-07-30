import React from 'react';
import { motion } from 'framer-motion';

export const Table = ({
  headers = [],
  rows = [], // Array of arrays or array of objects with values
  className = '',
  loading = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  renderRow = null, // Custom renderer function
  stackedOnMobile = true, // Converts rows into mobile-friendly card layout on small screens
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`table-responsive-wrapper ${stackedOnMobile ? 'stacked-responsive' : ''} ${className}`}
      style={{
        width: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '12px',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
        background: 'var(--card-bg, rgba(255, 255, 255, 0.01))',
        backdropFilter: 'blur(8px)',
      }}
    >
      <table
        className="data-table"
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          minWidth: stackedOnMobile ? '100%' : '600px',
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: '2px solid var(--border-color, rgba(255, 255, 255, 0.1))',
              background: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            {headers.map((header, idx) => (
              <th
                key={idx}
                style={{
                  padding: '16px 20px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  color: 'var(--muted-color, #8a99ad)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
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
              <td
                colSpan={headers.length || 1}
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: 'var(--muted-color, #8a99ad)',
                }}
              >
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{
                    width: '1.8rem',
                    height: '1.8rem',
                    borderWidth: '0.2em',
                    margin: '0 auto 12px auto',
                  }}
                ></div>
                <div style={{ fontSize: '0.92rem' }}>Loading records...</div>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length || 1}
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: 'var(--muted-color, #8a99ad)',
                  fontSize: '0.95rem',
                }}
              >
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
                    style={{
                      borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
                      cursor: onRowClick ? 'pointer' : 'default',
                    }}
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
                  whileHover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    transition: { duration: 0.1 },
                  }}
                  whileTap={onRowClick ? { scale: 0.99 } : {}}
                  style={{
                    borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => onRowClick && onRowClick(row, rowIdx)}
                >
                  {cells.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      data-label={headers[cellIdx] || ''}
                      style={{
                        padding: '14px 20px',
                        fontSize: '0.92rem',
                        color: 'var(--text-color, #fff)',
                        verticalAlign: 'middle',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              );
            })
          )}
        </motion.tbody>
      </table>

      {/* Mobile Stacked Card View Injection */}
      <style>{`
        .table-responsive-wrapper::-webkit-scrollbar {
          height: 6px;
        }
        .table-responsive-wrapper::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .table-responsive-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .table-responsive-wrapper.stacked-responsive {
            border: none !important;
            background: transparent !important;
            backdrop-filter: none !important;
          }

          .table-responsive-wrapper.stacked-responsive .data-table,
          .table-responsive-wrapper.stacked-responsive .data-table thead,
          .table-responsive-wrapper.stacked-responsive .data-table tbody,
          .table-responsive-wrapper.stacked-responsive .data-table th,
          .table-responsive-wrapper.stacked-responsive .data-table td,
          .table-responsive-wrapper.stacked-responsive .data-table tr {
            display: block;
            width: 100%;
          }

          .table-responsive-wrapper.stacked-responsive .data-table thead {
            display: none; /* Hide tabular headers on mobile stacked mode */
          }

          .table-responsive-wrapper.stacked-responsive .data-table tr {
            margin-bottom: 12px;
            background: var(--card-bg, rgba(255, 255, 255, 0.03));
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1)) !important;
            border-radius: 12px;
            padding: 12px 16px;
            box-sizing: border-box;
          }

          .table-responsive-wrapper.stacked-responsive .data-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0 !important;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
            text-align: right;
            font-size: 0.9rem !important;
          }

          .table-responsive-wrapper.stacked-responsive .data-table td:last-child {
            border-bottom: none;
          }

          .table-responsive-wrapper.stacked-responsive .data-table td::before {
            content: attr(data-label);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            color: var(--muted-color, #8a99ad);
            margin-right: 16px;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default Table;