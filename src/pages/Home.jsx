import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Layers, LogOut, FileText, Plus, Sun, Moon, ArrowRight } from 'lucide-react';

const Home = ({ theme, toggleTheme }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [coDragging, setCoDragging] = useState(false);
    const [syllabusDragging, setSyllabusDragging] = useState(false);
    const [numSets, setNumSets] = useState('1');

    // Form State
    const [mainFiles, setMainFiles] = useState([]);
    const [syllabusFiles, setSyllabusFiles] = useState([]);
    const [coFiles, setCoFiles] = useState([]);
    const [patternFile, setPatternFile] = useState(null);
    const [patternText, setPatternText] = useState('');

    const fileInputRef = useRef(null);
    const coInputRef = useRef(null);
    const patternInputRef = useRef(null);
    const syllabusInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSyllabusBrowseClick = () => {
        syllabusInputRef.current?.click();
    };

    const handleSyllabusFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSyllabusFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const isFormValid = mainFiles.length > 0 && syllabusFiles.length > 0 && coFiles.length > 0 && (patternFile || patternText.trim());

    const handleNextClick = () => {
        if (isFormValid) {
            // Derive subject name from first file or default
            const subjectName = mainFiles.length > 0 ? mainFiles[0].name.replace(/\.[^/.]+$/, "") : 'General Subject';
            navigate('/generate', { state: { subjectName, numSets } });
        }
    };

    const removeFile = (fileDetails, setFunction, isMultiple = true) => {
        if (isMultiple) {
            setFunction(prev => prev.filter(f => f !== fileDetails));
        } else {
            setFunction(null);
        }
    };

    const renderFileList = (files, setFunction, isMultiple = true) => {
        const fileList = isMultiple ? files : (files ? [files] : []);
        if (fileList.length === 0) return null;

        return (
            <div style={{ width: '100%', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {fileList.map((file, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        padding: '8px 12px',
                        borderRadius: '6px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            <FileText size={16} color="var(--primary)" />
                            <span style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                                {file.name}
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file, setFunction, isMultiple);
                            }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }}
                        >
                            <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>&times;</span>
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setMainFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const handleCODragOver = (e) => {
        e.preventDefault();
        setCoDragging(true);
    };

    const handleCODragLeave = () => {
        setCoDragging(false);
    };

    const handleCODrop = (e) => {
        e.preventDefault();
        setCoDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setCoFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const handleSyllabusDragOver = (e) => {
        e.preventDefault();
        setSyllabusDragging(true);
    };

    const handleSyllabusDragLeave = () => {
        setSyllabusDragging(false);
    };

    const handleSyllabusDrop = (e) => {
        e.preventDefault();
        setSyllabusDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSyllabusFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleCOBrowseClick = () => {
        coInputRef.current?.click();
    };

    const handlePatternBrowseClick = () => {
        patternInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setMainFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const handleCOFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCoFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const handlePatternFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setPatternFile(e.target.files[0]);
        }
    };

    const handleLogout = () => {
        // Basic mock logout
        navigate('/login');
    };

    const handleNavClick = (section) => {
        alert(`${section} section coming soon!`);
    };

    return (
        <div className="h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
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
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '6px',
                            borderRadius: '6px'
                        }}>
                            <Layers size={20} />
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

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem 2rem', background: 'var(--background)' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Hero Section */}
                    <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.2' }}>
                            Transform Content into <span style={{ color: 'var(--primary)' }}>Question Papers</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                            Upload your documents and let our AI generate professional question papers in seconds.
                        </p>
                    </div>

                    {/* Upload Area & Syllabus Section */}
                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        width: '100%',
                        maxWidth: '100%',
                        marginBottom: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        {/* Main Upload Area */}
                        <div
                            className="card"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{
                                flex: 1,
                                minWidth: '300px',
                                minHeight: '300px',
                                border: isDragging ? '2px dashed var(--primary)' : '2px dashed var(--border)',
                                background: isDragging ? 'rgba(37, 99, 235, 0.02)' : 'var(--surface)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                padding: '2rem'
                            }}
                        >
                            <div style={{
                                background: 'rgba(37, 99, 235, 0.1)',
                                padding: '20px',
                                borderRadius: '50%',
                                marginBottom: '1.5rem'
                            }}>
                                <Upload size={48} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Drag & Drop your files here
                            </h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                Supports PDF, DOCX, TXT (Max 20MB)
                            </p>

                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple // Allow multiple selection
                            />
                            <button onClick={handleBrowseClick} className="btn btn-primary">
                                Add Book or Notes Files Here
                            </button>

                            {/* File List for Main Upload */}
                            {renderFileList(mainFiles, setMainFiles)}
                        </div>

                        {/* Syllabus Upload (Moved from Secondary) */}
                        <div
                            className="card"
                            onDragOver={handleSyllabusDragOver}
                            onDragLeave={handleSyllabusDragLeave}
                            onDrop={handleSyllabusDrop}
                            style={{
                                flex: 1,
                                minWidth: '300px',
                                minHeight: '300px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                border: syllabusDragging ? '2px dashed var(--primary)' : '1px solid var(--border)',
                                background: syllabusDragging ? 'rgba(37, 99, 235, 0.02)' : 'var(--surface)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                <FileText size={20} color="var(--primary)" />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Syllabus</h3>
                            </div>

                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                                <div style={{
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    padding: '12px',
                                    borderRadius: '50%',
                                    marginBottom: '1rem'
                                }}>
                                    <Upload size={24} color="#6366f1" />
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
                                    Drag & Drop Syllabus
                                </p>
                                <button onClick={handleSyllabusBrowseClick} className="btn" style={{ background: 'var(--border)', color: 'var(--text-main)', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                                    Browse Syllabus
                                </button>
                                <input
                                    type="file"
                                    ref={syllabusInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleSyllabusFileChange}
                                    multiple
                                />
                                {renderFileList(syllabusFiles, setSyllabusFiles)}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Inputs Section */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        width: '100%',
                        maxWidth: '100%'
                    }}>
                        {/* 1. Question Sets Dropdown */}
                        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '280px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                <Layers size={20} color="var(--primary)" />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>No. of Sets</h3>
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    Select number of question paper sets to generate.
                                </p>
                                <select
                                    className="input-field"
                                    value={numSets}
                                    onChange={(e) => setNumSets(e.target.value)}
                                    style={{
                                        padding: '1rem',
                                        fontSize: '1rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num} Set{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {Array.from({ length: parseInt(numSets) }).map((_, i) => (
                                        <span key={i} style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            Set {String.fromCharCode(65 + i)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Course Outcome Upload */}
                        <div
                            className="card"
                            onDragOver={handleCODragOver}
                            onDragLeave={handleCODragLeave}
                            onDrop={handleCODrop}
                            style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '280px',
                                border: coDragging ? '2px dashed var(--primary)' : '1px solid var(--border)',
                                background: coDragging ? 'rgba(37, 99, 235, 0.02)' : 'var(--surface)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                <Upload size={20} color="var(--primary)" />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Course Outcome</h3>
                            </div>

                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                                <div style={{
                                    background: 'rgba(37, 99, 235, 0.1)',
                                    padding: '12px',
                                    borderRadius: '50%',
                                    marginBottom: '1rem'
                                }}>
                                    <Upload size={24} color="var(--primary)" />
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
                                    Drag & Drop CO file
                                </p>
                                <button onClick={handleCOBrowseClick} className="btn" style={{ background: 'var(--border)', color: 'var(--text-main)', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                                    Browse CO File
                                </button>
                                <input
                                    type="file"
                                    ref={coInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleCOFileChange}
                                    multiple
                                />
                                {renderFileList(coFiles, setCoFiles)}
                            </div>
                        </div>

                        {/* 4. QP Pattern Form */}
                        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '280px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FileText size={20} color="var(--primary)" />
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>QP Pattern</h3>
                                </div>
                                <button
                                    onClick={handlePatternBrowseClick}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                    title="Upload Pattern File"
                                >
                                    <Plus size={16} />
                                </button>
                                <input
                                    type="file"
                                    ref={patternInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handlePatternFileChange}
                                />
                            </div>

                            <textarea
                                className="input-field"
                                placeholder="Enter pattern details (e.g., Part A: 10×2, Part B: 5×16)..."
                                value={patternText}
                                onChange={(e) => setPatternText(e.target.value)}
                                style={{
                                    flex: 1,
                                    resize: 'none',
                                    fontFamily: 'inherit',
                                    marginBottom: '1rem'
                                }}
                            ></textarea>

                            {/* Pattern File List */}
                            {renderFileList(patternFile, setPatternFile, false)}
                        </div>
                    </div>

                    {/* Next / Generate Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '2rem' }}>
                        <button
                            onClick={handleNextClick}
                            disabled={!isFormValid}
                            className="btn btn-primary"
                            style={{
                                padding: '1rem 3rem',
                                fontSize: '1.1rem',
                                opacity: isFormValid ? 1 : 0.5,
                                cursor: isFormValid ? 'pointer' : 'not-allowed',
                                background: isFormValid ? 'var(--primary)' : 'var(--text-muted)'
                            }}
                        >
                            Next <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>




                </div>
            </main>
        </div>
    );
};



export default Home;
