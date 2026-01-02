import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Download, Share2, Check, ArrowLeft, FileText, Loader2, Sun, Moon, LogOut } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Preview = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [subjectName, setSubjectName] = useState(location.state?.subjectName || 'Artificial Intelligence');
    const numSets = parseInt(location.state?.numSets || '1');
    const [activeSet, setActiveSet] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState({});

    // User Details State
    const [institutionName, setInstitutionName] = useState('SAVEETHA ENGINEERING COLLEGE');
    const [institutionAddress, setInstitutionAddress] = useState('Affiliated to Anna University');

    const [examTitle, setExamTitle] = useState('UNIVERSITY MODEL EXAMINATION');
    const [timeDuration, setTimeDuration] = useState('3 Hours');
    const [maxMarks, setMaxMarks] = useState('100');

    // Generate mock sets based on numSets
    const sets = Array.from({ length: numSets }, (_, i) => {
        const setLabel = String.fromCharCode(65 + i);
        return {
            id: i,
            label: `Set ${setLabel}`,
            questions: {
                partA: [
                    { id: `s${i}_q1`, text: `Define Artificial Intelligence (Set ${setLabel}).`, marks: 2 },
                    { id: `s${i}_q2`, text: `What is the Turing Test?`, marks: 2 },
                    { id: `s${i}_q3`, text: `Explain BFS traversal.`, marks: 2 },
                ],
                partB: [
                    { id: `s${i}_q4`, text: `Compare DFS and BFS with examples (Set ${setLabel}).`, marks: 16 },
                    { id: `s${i}_q5`, text: `Explain A* Algorithm in detail.`, marks: 16 }
                ]
            }
        };
    });

    const currentSet = sets[activeSet];

    // Initialize selected state for all sets if not present
    // Effect to ensuring we have state for the current questions could be simple:
    // We just rely on the toggle to set it. But to have them checked by default:
    // We can do a lazy init or just default to true in the render if undefined.

    // Simple helper to check if selected (default to true)
    const isSelected = (id) => selectedQuestions[id] !== false;

    // Mock generated questions data
    const questions = {
        partA: [
            { id: 'q1', text: 'Define Artificial Intelligence.', marks: 2 },
            { id: 'q2', text: 'What is the Turing Test?', marks: 2 },
            { id: 'q3', text: 'Explain BFS traversal.', marks: 2 },
        ],
        partB: [
            { id: 'q4', text: 'Compare DFS and BFS with examples.', marks: 16 },
            { id: 'q5', text: 'Explain A* Algorithm in detail.', marks: 16 }
        ]
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const toggleQuestion = (id) => {
        setSelectedQuestions(prev => {
            const currentVal = prev[id] !== false;
            return { ...prev, [id]: !currentVal };
        });
    };

    const handleDownload = async () => {
        console.log('Starting download process...');
        const element = document.getElementById('preview-content');
        if (!element) {
            console.error('Preview content element not found');
            return;
        }

        setIsDownloading(true);
        try {
            console.log('Generating canvas...');
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: true, // Enable internal html2canvas logs
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                onclone: (clonedDoc) => {
                    console.log('Cloning document for PDF...');
                    const questionRows = clonedDoc.querySelectorAll('.question-container');
                    let questionCounter = 1;

                    questionRows.forEach(row => {
                        const cb = row.querySelector('input[type="checkbox"]');
                        if (cb) {
                            if (!cb.checked) {
                                // Hide the entire question row if not checked
                                row.style.display = 'none';
                            } else {
                                // Hide just the checkbox
                                cb.style.display = 'none';

                                // Re-number the question
                                const textSpan = row.querySelector('.question-text');
                                if (textSpan) {
                                    // Replace "Q<number>." with "Q<newNumber>."
                                    textSpan.innerText = textSpan.innerText.replace(/^Q\d+\./, `Q${questionCounter}.`);
                                    questionCounter++;
                                }
                            }
                        }
                    });
                }
            });
            console.log('Canvas generated successfully');

            const imgData = canvas.toDataURL('image/png');
            console.log('Initializing jsPDF...');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${subjectName.replace(/\s+/g, '_')}_${currentSet.label}_QP.pdf`);
            console.log('PDF saved');
        } catch (error) {
            console.error('Error generating PDF:', error);
            console.error('Stack:', error.stack);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Question Paper',
                    text: `Check out this question paper for ${subjectName}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavClick = (section) => {
        alert(`${section} section coming soon!`);
    };

    return (
        <div className="h-screen" style={{ display: 'flex', flexDirection: 'column', background: 'var(--background)', color: 'var(--text-main)', overflowY: 'auto' }}>
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

                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', cursor: 'pointer' }}>Dashboard</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('My Papers'); }} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', cursor: 'pointer' }}>My Papers</a>
                    <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
                        <LogOut size={16} style={{ marginRight: '6px' }} /> Logout
                    </button>
                </div>
            </nav>
            {/* Header */}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginBottom: '0rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        background: 'transparent',
                        color: 'var(--text-muted)'
                    }}
                >
                    <ArrowLeft size={18} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Question Paper Preview</h2>
                </button>
            </div>

            {/* Set Tabs */}
            {numSets > 1 && (
                <div className="container" style={{ padding: '0 2rem', maxWidth: '900px', margin: '0 auto 1rem auto', display: 'flex', gap: '1rem', overflowX: 'auto' }}>
                    {sets.map((set, idx) => (
                        <button
                            key={set.id}
                            onClick={() => setActiveSet(idx)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: activeSet === idx ? 'var(--primary)' : 'var(--surface)',
                                color: activeSet === idx ? 'white' : 'var(--text-muted)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeSet === idx ? 'var(--shadow-md)' : 'none'
                            }}
                        >
                            {set.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="container" style={{ padding: '0rem', maxWidth: '900px', margin: '0 auto', flex: 1 }}>

                {/* Visual Paper representation */}
                <div
                    id="preview-content"
                    style={{
                        background: '#ffffff', // Force white background for paper look
                        padding: '3rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        minHeight: '800px',
                        color: '#000000' // Force black text
                    }}>

                    {/* Header Section with Grid Layout */}
                    <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>

                        {/* Institution Name */}
                        <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                            <input
                                type="text"
                                value={institutionName}
                                onChange={(e) => setInstitutionName(e.target.value)}
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '100%',
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    textAlign: 'left',
                                    color: '#000000'
                                }}
                            />
                            <input
                                type="text"
                                value={institutionAddress}
                                onChange={(e) => setInstitutionAddress(e.target.value)}
                                style={{
                                    fontSize: '0.9rem',
                                    color: '#000000',
                                    width: '100%',
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    textAlign: 'left'
                                }}
                            />
                        </div>

                        {/* Exam Title & Intro Grid */}
                        <div style={{ display: 'grid', gap: '2rem', alignItems: 'start', marginBottom: '1.5rem' }}>
                            {/* Left: Title & Subject */}
                            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <input
                                    type="text"
                                    value={examTitle}
                                    onChange={(e) => setExamTitle(e.target.value)}
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        border: '1px dashed transparent',
                                        background: 'transparent',
                                        width: '100%',
                                        marginBottom: '0.5rem',
                                        padding: '2px',
                                        color: 'black'
                                    }}
                                    className="hover:border-gray-300 focus:border-blue-500 outline-none rounded"
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: '600' }}>Subject:</span>
                                    <input
                                        type="text"
                                        value={subjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        style={{
                                            fontSize: '1rem',
                                            border: 'none',
                                            background: 'transparent',
                                            outline: 'none',
                                            fontWeight: '400',
                                            color: 'black',
                                            width: '300px'
                                        }}
                                    />
                                </div>
                                {numSets > 1 && (
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600', border: '1px solid black', padding: '2px 8px', borderRadius: '4px', marginTop: '8px', display: 'inline-block' }}>
                                        {currentSet.label}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.9rem', fontWeight: '600', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '4px' }}>Time:</span>
                                <input
                                    type="text"
                                    value={timeDuration}
                                    onChange={(e) => setTimeDuration(e.target.value)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        color: '#000000',
                                        width: '80px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '4px' }}>Max Marks:</span>
                                <input
                                    type="text"
                                    value={maxMarks}
                                    onChange={(e) => setMaxMarks(e.target.value)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        color: '#000000',
                                        width: '40px',
                                        textAlign: 'right',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Part A */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Part A (Short Answer)</h3>
                        {currentSet.questions.partA.map((q, idx) => (
                            <div key={q.id} className="question-container" style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1rem',
                                marginBottom: '0.5rem',
                                borderRadius: '8px',
                                background: isSelected(q.id) ? 'transparent' : 'rgba(239, 68, 68, 0.05)',
                                opacity: isSelected(q.id) ? 1 : 0.6
                            }}>
                                <input
                                    type="checkbox"
                                    checked={isSelected(q.id)}
                                    onChange={() => toggleQuestion(q.id)}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '4px' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span className="question-text" style={{ fontWeight: '600' }}>Q{idx + 1}. {q.text}</span>
                                        <span style={{ fontWeight: 'bold' }}>({q.marks})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Part B */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Part B (Essay)</h3>
                        {currentSet.questions.partB.map((q, idx) => (
                            <div key={q.id} className="question-container" style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1rem',
                                marginBottom: '0.5rem',
                                borderRadius: '8px',
                                background: isSelected(q.id) ? 'transparent' : 'rgba(239, 68, 68, 0.05)',
                                opacity: isSelected(q.id) ? 1 : 0.6
                            }}>
                                <input
                                    type="checkbox"
                                    checked={isSelected(q.id)}
                                    onChange={() => toggleQuestion(q.id)}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '4px' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span className="question-text" style={{ fontWeight: '600' }}>Q{idx + 1 + currentSet.questions.partA.length}. {q.text}</span>
                                        <span style={{ fontWeight: 'bold' }}>({q.marks})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            {/* Footer Actions */}
            <div style={{
                padding: '1.5rem 2rem',
                borderTop: '1px solid var(--border)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'sticky',
                bottom: 0,
                zIndex: 10,
                gap: '1rem'
            }}>
                <button onClick={handleShare} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                    <Share2 size={18} /> Share
                </button>
                <button
                    onClick={handleDownload}
                    className="btn btn-primary"
                    disabled={isDownloading}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isDownloading ? 0.7 : 1 }}
                >
                    {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    {isDownloading ? 'Generating...' : 'Download PDF'}
                </button>
            </div>
        </div>
    );
};

export default Preview;