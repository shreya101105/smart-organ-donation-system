import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaHandsHelping,
    FaBullhorn,
    FaHandHoldingHeart,
    FaUsers,
    FaSearch,
    FaPlusCircle,
    FaCheckCircle,
    FaClock,
    FaFileAlt,
    FaChartLine
} from 'react-icons/fa';

import './Dashboard.css';

export const NGODashboard = () => {
    // Active Tab State
    const [activeTab, setActiveTab] = useState('overview');

    // Search filter
    const [searchTerm, setSearchTerm] = useState('');

    // Sample NGO Data State
    const [campaigns, setCampaigns] = useState([
        { id: 'CMP-101', title: 'National Kidney Donation Awareness Drive', location: 'Mumbai Region', target: 500, pledged: 342, status: 'Active' },
        { id: 'CMP-102', title: 'Liver Transplant Financial Assistance Program', location: 'Pune / Rural Maharashtra', target: 200, pledged: 185, status: 'Active' },
        { id: 'CMP-103', title: 'Youth Organ Pledge Campus Drive', location: 'Nagpur University', target: 1000, pledged: 1020, status: 'Completed' }
    ]);

    const [supportRequests, setSupportRequests] = useState([
        { id: 'REQ-801', patientName: 'Aarav Sharma', organ: 'Kidney', hospital: 'City Care Hospital', assistanceType: 'Transplant Grant', status: 'Pending Review' },
        { id: 'REQ-802', patientName: 'Meera Patel', organ: 'Liver', hospital: 'Global Health Institute', assistanceType: 'Counseling & Donor Match', status: 'Approved' },
        { id: 'REQ-803', patientName: 'Rajesh Verma', organ: 'Cornea', hospital: 'Apex Eye Clinic', assistanceType: 'Travel & Med Support', status: 'In Process' }
    ]);

    const [newCampaign, setNewCampaign] = useState({ title: '', location: '', target: '' });

    const handleCreateCampaign = (e) => {
        e.preventDefault();
        if (!newCampaign.title || !newCampaign.location || !newCampaign.target) return;

        const campaignObj = {
            id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
            title: newCampaign.title,
            location: newCampaign.location,
            target: Number(newCampaign.target),
            pledged: 0,
            status: 'Active'
        };

        setCampaigns([campaignObj, ...campaigns]);
        setNewCampaign({ title: '', location: '', target: '' });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="dashboard-container" style={{ padding: '30px', maxWidth: '1300px', margin: '0 auto' }}>

            {/* Dashboard Top Header */}
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
                        <FaHandsHelping style={{ fontSize: '2rem', color: '#0072ff' }} />
                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>NGO Coordination Portal</h2>
                    </div>
                    <p style={{ margin: 0, opacity: 0.75, fontSize: '0.95rem' }}>
                        LifeGift Foundation • Organ Donation Advocacy & Recipient Support Network
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview & Stats
                    </button>
                    <button
                        className={`btn ${activeTab === 'campaigns' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('campaigns')}
                    >
                        Awareness Campaigns
                    </button>
                    <button
                        className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        Recipient Assistance
                    </button>
                </div>
            </motion.div>

            {/* Overview Analytics Cards */}
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
                            <span style={statLabelStyle}>Total Pledges Mobilized</span>
                            <h3 style={statValueStyle}>1,547</h3>
                        </div>
                        <FaHandHoldingHeart style={{ fontSize: '2.5rem', color: '#28a745', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>+12% this month</span>
                </motion.div>

                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Active Campaigns</span>
                            <h3 style={statValueStyle}>2</h3>
                        </div>
                        <FaBullhorn style={{ fontSize: '2.5rem', color: '#0072ff', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>3 Regions Covered</span>
                </motion.div>

                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Recipients Assisted</span>
                            <h3 style={statValueStyle}>128</h3>
                        </div>
                        <FaUsers style={{ fontSize: '2.5rem', color: '#ffc107', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>Financial & Legal Guidance</span>
                </motion.div>

                <motion.div className="glass-card stat-card" variants={itemVariants} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={statLabelStyle}>Pending Grants</span>
                            <h3 style={statValueStyle}>$42,000</h3>
                        </div>
                        <FaChartLine style={{ fontSize: '2.5rem', color: '#17a2b8', opacity: 0.8 }} />
                    </div>
                    <span style={statSubStyle}>Allocated for Transplants</span>
                </motion.div>
            </motion.div>

            {/* MAIN CONTENT AREA */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}
                    >
                        {/* Quick Actions & Recent Drives */}
                        <div className="glass-card" style={sectionCardStyle}>
                            <h3 style={sectionTitleStyle}><FaBullhorn /> Active Organ Pledge Drives</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr style={tableHeaderStyle}>
                                            <th>Campaign Code</th>
                                            <th>Title</th>
                                            <th>Target Region</th>
                                            <th>Progress</th>
                                            <th>Pledges</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {campaigns.map((c) => (
                                            <tr key={c.id} style={tableRowStyle}>
                                                <td><strong>{c.id}</strong></td>
                                                <td>{c.title}</td>
                                                <td>{c.location}</td>
                                                <td style={{ minWidth: '160px' }}>
                                                    <div style={progressBgStyle}>
                                                        <div style={{ ...progressFillStyle, width: `${Math.min((c.pledged / c.target) * 100, 100)}%` }} />
                                                    </div>
                                                    <small style={{ opacity: 0.7 }}>{Math.round((c.pledged / c.target) * 100)}% completed</small>
                                                </td>
                                                <td>{c.pledged} / {c.target}</td>
                                                <td>
                                                    <span style={c.status === 'Active' ? badgeSuccessStyle : badgeSecondaryStyle}>
                                                        {c.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'campaigns' && (
                    <motion.div
                        key="campaigns"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
                    >
                        {/* Create New Campaign Form */}
                        <div className="glass-card" style={sectionCardStyle}>
                            <h3 style={sectionTitleStyle}><FaPlusCircle /> Launch Awareness Campaign</h3>
                            <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="form-group">
                                    <label className="form-label">Campaign Title *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. City-wide Heart Donor Drive"
                                        value={newCampaign.title}
                                        onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Target Region / Campus *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. North Zone Hospitals & Colleges"
                                        value={newCampaign.location}
                                        onChange={(e) => setNewCampaign({ ...newCampaign, location: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Target Donor Pledge Goal *</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="e.g. 500"
                                        value={newCampaign.target}
                                        onChange={(e) => setNewCampaign({ ...newCampaign, target: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                                    <FaBullhorn /> Publish Campaign
                                </button>
                            </form>
                        </div>

                        {/* Campaign Summary List */}
                        <div className="glass-card" style={sectionCardStyle}>
                            <h3 style={sectionTitleStyle}><FaFileAlt /> Campaign Roster</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {campaigns.map((c) => (
                                    <div key={c.id} style={innerCardStyle}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{c.title}</h4>
                                            <span style={c.status === 'Active' ? badgeSuccessStyle : badgeSecondaryStyle}>{c.status}</span>
                                        </div>
                                        <p style={{ margin: '6px 0', fontSize: '0.85rem', opacity: 0.8 }}>Region: {c.location}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.8 }}>
                                            <span>Pledges Raised: <strong>{c.pledged}</strong></span>
                                            <span>Target Goal: <strong>{c.target}</strong></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'requests' && (
                    <motion.div
                        key="requests"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-card"
                        style={sectionCardStyle}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ ...sectionTitleStyle, margin: 0 }}><FaHandHoldingHeart /> Recipient Financial & Legal Assistance</h3>
                            <div style={{ position: 'relative', minWidth: '250px' }}>
                                <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Search patient or hospital..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: '36px' }}
                                />
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr style={tableHeaderStyle}>
                                        <th>Request ID</th>
                                        <th>Patient Name</th>
                                        <th>Required Organ</th>
                                        <th>Hospital</th>
                                        <th>Assistance Type</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {supportRequests
                                        .filter(r => r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || r.hospital.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((r) => (
                                            <tr key={r.id} style={tableRowStyle}>
                                                <td><strong>{r.id}</strong></td>
                                                <td>{r.patientName}</td>
                                                <td><span className="badge badge-info">{r.organ}</span></td>
                                                <td>{r.hospital}</td>
                                                <td>{r.assistanceType}</td>
                                                <td>
                                                    <span style={
                                                        r.status === 'Approved' ? badgeSuccessStyle :
                                                            r.status === 'Pending Review' ? badgeWarningStyle : badgeInfoStyle
                                                    }>
                                                        {r.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                                                        Manage Case
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
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

const statLabelStyle = { fontSize: '0.85rem', opacity: 0.7, textTransform: 'uppercase', tracking: '1px' };
const statValueStyle = { margin: '8px 0 0 0', fontSize: '1.8rem', fontWeight: 800 };
const statSubStyle = { fontSize: '0.75rem', color: '#28a745', marginTop: '6px', display: 'block' };

const sectionTitleStyle = { margin: '0 0 20px 0', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)' };

const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' };
const tableHeaderStyle = { borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 10px', opacity: 0.8 };
const tableRowStyle = { borderBottom: '1px solid rgba(255, 255, 255, 0.05)' };

const badgeSuccessStyle = { background: 'rgba(40, 167, 69, 0.2)', color: '#28a745', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };
const badgeWarningStyle = { background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };
const badgeInfoStyle = { background: 'rgba(23, 162, 184, 0.2)', color: '#17a2b8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };
const badgeSecondaryStyle = { background: 'rgba(108, 117, 125, 0.2)', color: '#6c757d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 };

const progressBgStyle = { width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '4px' };
const progressFillStyle = { height: '100%', background: 'linear-gradient(90deg, #0072ff, #00c6ff)', borderRadius: '4px', transition: 'width 0.4s ease' };

export default NGODashboard;