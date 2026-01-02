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

    const handleLogout = () => {
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Profile Updated Successfully (Mock)!');
    };

    return (
        <div className="h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Navbar (Reusable Logic could be extracted) */}
            <nav style={{
                padding: '1rem 2rem',
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                    >
                        <div style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '6px',
                            borderRadius: '6px'
                        }}>
                            <Layers size={24} />
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>QP Generator</span>
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

                    <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
                        <LogOut size={16} style={{ marginRight: '6px' }} /> Logout
                    </button>
                </div>
            </nav>

            <main style={{ flex: 1, padding: '3rem 2rem', background: 'var(--background)' }}>
                <div className="container" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>

                    <button
                        onClick={() => navigate('/')}
                        style={{
                            alignSelf: 'flex-start',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'transparent',
                            color: 'var(--text-muted)'
                        }}
                    >
                        <ArrowLeft size={18} /> Back to Home
                    </button>

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

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                                <Save size={18} style={{ marginRight: '8px' }} /> Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
