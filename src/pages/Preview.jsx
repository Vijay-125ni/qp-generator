import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Download, Share2, Check, ArrowLeft, FileText, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Preview = ({ theme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const subjectName = location.state?.subjectName || 'Artificial Intelligence';
    const numSets = parseInt(location.state?.numSets || '1');
    const [activeSet, setActiveSet] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState({});

    // Mock User Details
    const userDetails = {
        institutionName: 'SAVEETHA ENGINEERING COLLEGE',
        address: 'Affiliated to Anna University'
    };

    const [examTitle, setExamTitle] = useState('UNIVERSITY MODEL EXAMINATION');

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
        setSelectedQuestions(prev => ({
            ...prev,
            [id]: prev[id] === undefined ? false : !prev[id] // logic: if undefined (true implied), become false. If false, become true.
            // Wait, simpler: if it's NOT false, it's true. So to toggle: if !false (true) -> make false.
        }));
        // actually let's make it explicit to match the render logic
        setSelectedQuestions(prev => {
            const currentVal = prev[id] !== false;
            return { ...prev, [id]: !currentVal };
        });
    };

    const handleDownload = async () => {
        const element = document.getElementById('preview-content');
        if (!element) return;

        setIsDownloading(true);
        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${subjectName.replace(/\s+/g, '_')}_${currentSet.label}_QP.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
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

    return (
        <div className="h-screen" style={{ display: 'flex', flexDirection: 'column', background: 'var(--background)', color: 'var(--text-main)', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid var(--border)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <ArrowLeft size={24} />
                    </button>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Question Paper Preview</h2>
                </div>

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

            <div className="container" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', flex: 1 }}>

                {/* Visual Paper representation */}
                <div
                    id="preview-content"
                    style={{
                        background: 'var(--surface)',
                        padding: '3rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        minHeight: '800px',
                        color: 'black' // Ensure text is black for PDF
                    }}>

                    {/* Header Section with Grid Layout */}
                    <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>

                        {/* Institution Name */}
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {userDetails.institutionName}
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{userDetails.address}</p>
                        </div>

                        {/* Exam Title & Intro Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '2rem', alignItems: 'start', marginBottom: '1.5rem' }}>
                            {/* Left: Title & Subject */}
                            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <input
                                    type="text"
                                    value={examTitle}
                                    onChange={(e) => setExamTitle(e.target.value)}
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        border: '1px dashed transparent',
                                        background: 'transparent',
                                        width: '100%',
                                        marginBottom: '0.5rem',
                                        padding: '4px',
                                        color: 'black'
                                    }}
                                    className="hover:border-gray-300 focus:border-blue-500 outline-none rounded"
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: '600' }}>Subject:</span>
                                    <span style={{ fontSize: '1rem' }}>{subjectName}</span>
                                </div>
                                {numSets > 1 && (
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600', border: '1px solid black', padding: '2px 8px', borderRadius: '4px', marginTop: '8px', display: 'inline-block' }}>
                                        {currentSet.label}
                                    </span>
                                )}
                            </div>

                            {/* Right: Student Details Box */}
                            <div style={{
                                border: '1px solid black',
                                padding: '1rem',
                                fontSize: '0.9rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600', minWidth: '70px' }}>Name:</span>
                                    <div style={{ borderBottom: '1px dotted black', flex: 1, height: '1.2em' }}></div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600', minWidth: '70px' }}>Reg No:</span>
                                    <div style={{ borderBottom: '1px dotted black', flex: 1, height: '1.2em' }}></div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600', minWidth: '70px' }}>Year/Sem:</span>
                                    <div style={{ borderBottom: '1px dotted black', flex: 1, height: '1.2em' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.9rem', fontWeight: '600', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                            <span>Time: 3 Hours</span>
                            <span>Max Marks: 100</span>
                        </div>
                    </div>

                    {/* Part A */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Part A (Short Answer)</h3>
                        {currentSet.questions.partA.map((q, idx) => (
                            <div key={q.id} style={{
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
                                        <span style={{ fontWeight: '600' }}>Q{idx + 1}. {q.text}</span>
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
                            <div key={q.id} style={{
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
                                        <span style={{ fontWeight: '600' }}>Q{idx + 1 + currentSet.questions.partA.length}. {q.text}</span>
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