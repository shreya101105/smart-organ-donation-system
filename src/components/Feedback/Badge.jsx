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
        gap: '0.35em',
        padding: '0.3em 0.7em',
        fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
        fontWeight: '700',
        borderRadius: '40px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        border: '1px solid currentColor',
        whiteSpace: 'nowrap',
        lineHeight: '1',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexShrink: 0,
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        ...style
      }}
    >
      {children}
    </span>
  );
};

export default Badge;