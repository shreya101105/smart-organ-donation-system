import React from 'react';
import { motion } from 'framer-motion';

// 1. Circular / Doughnut Chart Component
export const RadialChart = ({
  percent = 75,
  size = 120,
  strokeWidth = 10,
  title = '',
  subtitle = '',
  color = 'var(--primary-color)'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '100%',
      padding: '8px'
    }}>
      <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%' }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          height="100%"
          style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`
            }}
          />
        </svg>
        {/* Central percentage overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-heading)',
        }}>
          <span style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', fontWeight: 800, color: 'var(--text-color)' }}>{percent}%</span>
          {subtitle && <span style={{ fontSize: '0.6rem', color: 'var(--muted-color)', textTransform: 'uppercase' }}>{subtitle}</span>}
        </div>
      </div>
      {title && <h5 style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: 600, textAlign: 'center' }}>{title}</h5>}
    </div>
  );
};

// 2. Bar Chart Component
export const BarChart = ({
  data = [], // [{ label: 'Jan', value: 30 }]
  height = 180,
  color = 'var(--primary-color)'
}) => {
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 100;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: height,
        paddingBottom: '10px',
        borderBottom: '1px solid var(--border-color)',
        gap: '6px',
        minWidth: data.length > 7 ? '320px' : '100%'
      }}>
        {data.map((item, idx) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={idx} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
              position: 'relative'
            }}>
              {/* Tooltip value */}
              <div className="bar-tooltip" style={{
                position: 'absolute',
                top: '-22px',
                fontSize: '0.7rem',
                fontWeight: '600',
                color: color,
                opacity: 0.9
              }}>
                {item.value}
              </div>

              {/* Glowing vertical bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${percentage}%` }}
                transition={{ duration: 1.2, delay: idx * 0.05, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: '28px',
                  borderRadius: '6px 6px 0 0',
                  background: `linear-gradient(180deg, ${color} 0%, rgba(37, 99, 235, 0.2) 100%)`,
                  boxShadow: `0 0 10px rgba(0, 229, 255, 0.15)`
                }}
                whileHover={{
                  filter: 'brightness(1.2)',
                  scaleX: 1.05
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        gap: '6px',
        minWidth: data.length > 7 ? '320px' : '100%'
      }}>
        {data.map((item, idx) => (
          <div key={idx} style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
            color: 'var(--muted-color)',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Line Chart Component
export const LineChart = ({
  data = [], // [{ label: 'A', value: 10 }]
  height = 180,
  color = 'var(--primary-color)'
}) => {
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 100;
  const padding = 20;
  const chartHeight = height - padding * 2;
  const chartWidth = 500; // SVG viewBox logical width

  // Calculate SVG Points
  const points = data.map((d, index) => {
    const x = data.length > 1
      ? (index / (data.length - 1)) * (chartWidth - padding * 2) + padding
      : padding;
    const y = chartHeight - (d.value / maxValue) * (chartHeight - padding * 2) + padding;
    return { x, y };
  });

  const pathD = points.length > 0
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  // Area path for gradient fill
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <svg
        viewBox={`0 0 ${chartWidth} ${height}`}
        width="100%"
        height="100%"
        style={{ overflow: 'visible', maxHeight: `${height}px` }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="rgba(255,255,255,0.03)" />
        <line x1={padding} y1={height / 2} x2={chartWidth - padding} y2={height / 2} stroke="rgba(255,255,255,0.03)" />
        <line x1={padding} y1={height - padding} x2={chartWidth - padding} y2={height - padding} stroke="rgba(255,255,255,0.08)" />

        {/* Gradient Area under line */}
        {areaD && (
          <motion.path
            d={areaD}
            fill="url(#lineGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Line Path */}
        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              filter: `drop-shadow(0 4px 6px rgba(0, 229, 255, 0.3))`
            }}
          />
        )}

        {/* Data Points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--bg-color)"
              stroke={color}
              strokeWidth="2.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.5 }}
            />
            {/* Label overlays */}
            <text
              x={p.x}
              y={height - 2}
              fill="var(--muted-color)"
              fontSize="10"
              textAnchor="middle"
              fontWeight="500"
            >
              {data[idx]?.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default RadialChart;