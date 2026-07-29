import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaLandmark,
    FaShieldAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaSearch,
    FaFileContract,
    FaHospital,
    FaExclamationTriangle,
    FaDownload,
    FaBalanceScale
} from 'react-icons/fa';

import './Dashboard.css';

export const GovernmentDashboard = () => {
    const [activeTab, setActiveTab] = useState('clearances');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Sample Government Clearance Approvals Data
    const [clearanceRequests, setClearanceRequests] = useState([
        {
            id: 'GOV-CLR-901',
            donorId: 'DNR-402',
            recipientId: 'RCP-108',
            hospital: 'AIIMS New Delhi',
            organType: 'Kidney',
            relationship: 'Non-Relative (Live)',
            submittedDate: '2026-03-24',
            status: 'Pending Verification',
            legalDocsVerified: true,
            hlaMatchScore: '94%'
        },
        {
            id: 'GOV-CLR-902',
            donorId: 'DNR-389',
            recipientId: 'RCP-204',
            hospital: 'Apollo Hospital Mumbai',
            organType: 'Liver',
            relationship: 'First-Degree Relative',
            submittedDate: '2026-03-22',
            status: 'Approved',
            legalDocsVerified: true,
            hlaMatchScore: '98%'
        },
        {
            id: 'GOV-CLR-903',
            donorId: 'DNR-511',
            recipientId: 'RCP-305',
            hospital: 'Fortis Healthcare Bengaluru',
            organType: 'Heart',
            relationship: 'Cadaveric Allocation',
            submittedDate: '2026-03-25',
            status: 'Approved',
            legalDocsVerified: true,
            hlaMatchScore: '91%'
        },
        {
            id: 'GOV-CLR-904',
            donorId: 'DNR-209',
            recipientId: 'RCP-119',
            hospital: 'Global Health City Chennai',
            organType: 'Pancreas',
            relationship: 'Unrelated (Swap)',
            submittedDate: '2026-03-20',
            status: 'Under Legal Review',
            legalDocsVerified: false,
            hlaMatchScore: '88%'
        }
    ]);

    // Handle status update for clearance requests
    const handleUpdateStatus = (id, newStatus) => {
        setClearanceRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
    };

    const filteredRequests = clearanceRequests.filter(req => {
        const matchesSearch = req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.organType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="dashboard-container" style={{ padding: '30px', maxWidth: '1350px', margin: '0 auto' }}>

            {/* Top Header Banner */}
            <motion.div
                className="dashboard-header glass-card"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: '24px 30px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '30px',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px'
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <FaLandmark style={{ fontSize: '2rem', color: '#17a2b8' }} />
                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>National Organ Transplant Oversight Board</h2>
                    </div>
                    <p style={{ margin: 0, opacity: 0.75, fontSize: '0.95rem' }}>
                        NOTTO / SOTTO Compliance & Legal Transplantation Clearance Portal
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className={`btn ${activeTab === 'clearances' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('clearances')}
                    >
                        Clearance Approvals
                    </button>
                    <button
                        className={`btn ${activeTab === 'hospitals' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('hospitals')}
                    >
                        Hospital Licenses
                    </button>
                    <button
                        className={`btn ${activeTab === 'audit' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('audit')}
                    >
                        Audit & Compliance
                    </button>
                </div>
            </motion.div>

            {/* High Level Stats Overview */}
            <motion.div
                className="analytics-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}
            >
                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Pending Clearances</span>
                            <h3 style={statValueStyle}>
                                {clearanceRequests.filter(r => r.status.includes('Pending') || r.status.includes('Review')).length}
                            </h3>
                        </div>
                        <FaHourglassHalf style={{ fontSize: '2.4rem', color: '#ffc107', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>Requires Authorization Committee Review</span>
                </motion.div>

                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Cleared Transplants</span>
                            <h3 style={statValueStyle}>
                                {clearanceRequests.filter(r => r.status === 'Approved').length}
                            </h3>
                        </div>
                        <FaShieldAlt style={{ fontSize: '2.4rem', color: '#28a745', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>Legally Sanctioned This Month</span>
                </motion.div>

                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Registered Centers</span>
                            <h3 style={statValueStyle}>142</h3>
                        </div>
                        <FaHospital style={{ fontSize: '2.4rem', color: '#0072ff', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>Verified Medical Institutes</span>
                </motion.div>

                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Flagged Anomalies</span>
                            <h3 style={statValueStyle}>2</h3>
                        </div>
                        <FaExclamationTriangle style={{ fontSize: '2.4rem', color: '#dc3545', opacity: 0.8 }} />
                    </div>
                    <span style={{ ...statSubStyle, color: '#dc3545' }}>Requires Immediate Audit</span>
                </motion.div>
            </motion.div>

            {/* MAIN TAB CONTENT */}
            <AnimatePresence mode="wait">
                {activeTab === 'clearances' && (
                    <motion.div
                        key="clearances"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-card"
                        style={sectionCardStyle}
                    >
                        {/* Filter & Search Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
                            <h3 style={{ ...sectionTitleStyle, margin: 0 }}>
                                <FaBalanceScale /> Transplant Authorization Clearance Requests
                            </h3>

                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{ width: '180px' }}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending Verification">Pending Verification</option>
                                    <option value="Under Legal Review">Under Legal Review</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>

                                <div style={{ position: 'relative', minWidth: '240px' }}>
                                    <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Search clearance ID, hospital..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ paddingLeft: '36px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Clearances Table */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr style={tableHeaderStyle}>
                                        <th>Clearance ID</th>
                                        <th>Hospital Name</th>
                                        <th>Organ</th>
                                        <th>Relationship Type</th>
                                        <th>AI Crossmatch Score</th>
                                        <th>Legal Affidavit</th>
                                        <th>Status</th>
                                        <th>Committee Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((req) => (
                                        <tr key={req.id} style={tableRowStyle}>
                                            <td><strong>{req.id}</strong></td>
                                            <td>{req.hospital}</td>
                                            <td><span className="badge badge-info">{req.organType}</span></td>
                                            <td>{req.relationship}</td>
                                            <td>
                                                <strong style={{ color: '#00c6ff' }}>{req.hlaMatchScore}</strong>
                                            </td>
                                            <td>
                                                {req.legalDocsVerified ? (
                                                    <span style={{ color: '#28a745', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FaCheckCircle /> Verified
                                                    </span>
                                                ) : (
                                                    <span style={{ color: '#dc3545', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FaTimesCircle /> Pending Docs
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <span style={
                                                    req.status === 'Approved' ? badgeSuccessStyle :
                                                        req.status === 'Rejected' ? badgeDangerStyle : badgeWarningStyle
                                                }>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    {req.status !== 'Approved' && (
                                                        <button
                                                            className="btn"
                                                            onClick={() => handleUpdateStatus(req.id, 'Approved')}
                                                            style={approveBtnStyle}
                                                            title="Approve Legal Authorization Certificate"
                                                        >
                                                            <FaCheckCircle /> Approve
                                                        </button>
                                                    )}
                                                    {req.status !== 'Rejected' && (
                                                        <button
                                                            className="btn"
                                                            onClick={() => handleUpdateStatus(req.id, 'Rejected')}
                                                            style={rejectBtnStyle}
                                                            title="Reject Application"
                                                        >
                                                            <FaTimesCircle /> Reject
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'hospitals' && (
                    <motion.div
                        key="hospitals"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-card"
                        style={sectionCardStyle}
                    >
                        <h3 style={sectionTitleStyle}><FaHospital /> Licensed Transplant Centers Directory</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                            {[
                                { name: 'AIIMS New Delhi', license: 'NOTTO-LIC-2024-001', validTill: '2028-12-31', status: 'Active & Verified' },
                                { name: 'Apollo Hospital Mumbai', license: 'SOTTO-MH-2023-089', validTill: '2027-08-15', status: 'Active & Verified' },
                                { name: 'Fortis Healthcare Bengaluru', license: 'ROTTO-KA-2025-042', validTill: '2029-01-10', status: 'Active & Verified' }
                            ].map((h, i) => (
                                <div key={i} style={innerCardStyle}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--primary-color)' }}>{h.name}</h4>
                                    <p style={{ margin: '4px 0', fontSize: '0.85rem', opacity: 0.8 }}>License No: <strong>{h.license}</strong></p>
                                    <p style={{ margin: '4px 0', fontSize: '0.85rem', opacity: 0.8 }}>Expiration: {h.validTill}</p>
                                    <span style={{ ...badgeSuccessStyle, display: 'inline-block', marginTop: '10px' }}>{h.status}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'audit' && (
                    <motion.div
                        key="audit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-card"
                        style={sectionCardStyle}
                    >
                        <h3 style={sectionTitleStyle}><FaFileContract /> Compliance & Audit Logs</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                            {[
                                { date: '2026-03-27 10:14:02', log: 'Clearance GOV-CLR-902 approved by Committee Lead Vijay Sharma.' },
                                { date: '2026-03-26 15:42:19', log: 'AI HLA Crossmatch verification executed for Case DNR-511 -> RCP-305.' },
                                { date: '2026-03-25 09:12:00', log: 'Hospital License Renewal verified for Fortis Healthcare Bengaluru.' }
                            ].map((log, idx) => (
                                <div key={idx} style={{ ...innerCardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>{log.log}</span>
                                    <small style={{ opacity: 0.6, fontSize: '0.8rem' }}>{log.date}</small>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* --- STYLES --- */
const cardStyle = {
    padding: '20px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)'
};

const sectionCardStyle = {
    padding: '26px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)'
};

const innerCardStyle = {
    padding: '16px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)'
};

const statLabelStyle = { fontSize: '0.85rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' };
const statValueStyle = { margin: '8px 0 0 0', fontSize: '1.8rem', fontWeight: 800 };
const statSubStyle = { fontSize: '0.75rem', color: '#17a2b8', marginTop: '6px', display: 'block' };

const sectionTitleStyle = { margin: '0 0 20px 0', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)' };

const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' };
const tableHeaderStyle = { borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 10px', opacity: 0.8 };
const tableRowStyle = { borderBottom: '1px solid rgba(255, 255, 255, 0.05)' };

const badgeSuccessStyle = { background: 'rgba(40, 167, 69, 0.2)', color: '#28a745', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };
const badgeWarningStyle = { background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };
const badgeDangerStyle = { background: 'rgba(220, 53, 69, 0.2)', color: '#dc3545', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };

const approveBtnStyle = { background: 'rgba(40, 167, 69, 0.2)', color: '#28a745', border: '1px solid #28a745', padding: '4px 10px', fontSize: '0.78rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' };
const rejectBtnStyle = { background: 'rgba(220, 53, 69, 0.2)', color: '#dc3545', border: '1px solid #dc3545', padding: '4px 10px', fontSize: '0.78rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' };

export default GovernmentDashboard;