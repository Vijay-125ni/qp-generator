import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, LogOut, Moon, Sun, User, Save, ArrowLeft } from 'lucide-react';

const Dashboard = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Professor of Computer Science'
    });

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleLogout = () => {
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Profile Updated Successfully (Mock)!');
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        alert('Password Changed Successfully (Mock)!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleNavClick = (section) => {
        alert(`${section} section coming soon!`);
    };

    return (
        <div className="h-screen" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {/* Navigation */}
                        <nav style={{
                            padding: '1rem 2rem',
                            background: 'var(--surface)',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        color: 'white',
                                        padding: '6px',
                                        borderRadius: '6px'
                                    }}>
                                        <img src="icon.png" alt="icon" style={{ width: '30px', height: '30px', backgroundColor: 'none' }} />
                                    </div>
                                    <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>QP Generator</span>
                                </div>
            
                                {/* User Profile */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingLeft: '2rem',
                                    borderLeft: '1px solid var(--border)'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: '600'
                                    }}>
                                        JD
                                    </div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>John Doe</span>
                                </div>
                            </div>
            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <button
                                    onClick={toggleTheme}
                                    style={{ background: 'transparent', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
                                    title="Toggle Theme"
                                >
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </button>
            
                                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/Home'); }} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', cursor: 'pointer' }}>Home Page</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('My Papers'); }} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', cursor: 'pointer' }}>My Papers</a>
                                <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
                                    <LogOut size={16} style={{ marginRight: '6px' }} /> Logout
                                </button>
                            </div>
                        </nav>

            <main style={{ flex: 1, padding: '1.5rem', background: 'var(--background)' }}>
                <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto' }}>

                    {/* Profile Settings */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: '600'
                            }}>
                                JD
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Edit Profile</h2>
                                <p style={{ color: 'var(--text-muted)' }}>Update your personal details.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="text"
                                            name="username"
                                            className="input-field"
                                            value={formData.username}
                                            onChange={handleChange}
                                            style={{ paddingLeft: '2.5rem' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Bio / Role</label>
                                <textarea
                                    name="bio"
                                    className="input-field"
                                    rows="3"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    style={{ resize: 'vertical' }}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                                <Save size={18} style={{ marginRight: '8px' }} /> Save Profile
                            </button>
                        </form>
                    </div>

                    {/* Change Password Section */}
                    <div className="card">
                        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Security</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Change your password.</p>
                        </div>

                        <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    className="input-field"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="input-field"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="input-field"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn" style={{ alignSelf: 'flex-start', marginTop: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                                Update Password
                            </button>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
