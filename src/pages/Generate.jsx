import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layers, LogOut, Moon, Sun, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

const Generate = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Processing inputs...');
    const [progress, setProgress] = useState(0);

    const location = useLocation();

    useEffect(() => {
        if (progress >= 100) {
            setStatus('Question Paper Generated Successfully!');
            const timer = setTimeout(() => {
                navigate('/preview', { state: location.state });
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [progress, navigate, location.state]);

    useEffect(() => {
        // Mock generation process
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2; // Increment progress
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
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
                            <img src="icon.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
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

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem 2rem', background: 'var(--background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
                        <ArrowLeft size={18} /> Back to Edit
                    </button>

                    <div className="card" style={{ width: '100%', textAlign: 'center', padding: '3rem' }}>
                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                            {progress < 100 ? (
                                <Loader2 size={64} className="animate-spin" color="var(--primary)" />
                            ) : (
                                <CheckCircle size={64} color="var(--accent)" />
                            )}
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                            {progress < 100 ? 'Generating Question Paper...' : 'Generation Complete!'}
                        </h2>

                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            {status}
                        </p>

                        {/* Progress Bar */}
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: 'var(--border)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                background: 'var(--primary)',
                                transition: 'width 0.2s ease'
                            }}></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Add standard spin animation safely
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  .animate-spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);

export default Generate;
