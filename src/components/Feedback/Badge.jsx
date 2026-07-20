import React from 'react';

export const Badge = ({
  children,
  type = 'info', // success, danger, warning, info, primary
  className = '',
  style = {}
}) => {
  const badgeClasses = {
    success: 'badge-success',
    danger: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-info',
    primary: 'badge-primary'
  };

  const activeClass = badgeClasses[type] || 'badge-info';

  return (
    <span 
      className={`badge ${activeClass} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 10px',
        fontSize: '0.72rem',
        fontWeight: '700',
        borderRadius: '40px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        border: '1px solid currentColor',
        ...style
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
