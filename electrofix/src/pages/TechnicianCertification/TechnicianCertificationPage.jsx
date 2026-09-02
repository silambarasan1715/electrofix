import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';


const TechnicianCertificationPage = () => {
    const navigate = useNavigate();
    const { certifications, updateCertifications } = useContext(RegistrationContext);
    const [files, setFiles] = useState(certifications);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const newFile = {
                id: Date.now(),
                name: e.target.files[0].name,
                size: (e.target.files[0].size / 1024 / 1024).toFixed(1) + ' MB',
                status: 'Pending',
                icon: 'description',
                colorClass: 'bg-blue-100 text-blue-600',
                statusClass: 'bg-amber-100 text-amber-700',
                statusIcon: 'schedule'
            };
            setFiles([...files, newFile]);
        }
    };

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Please upload at least one required document (Trade License or OSHA Certification).");
            return;
        }
        updateCertifications(files);
        navigate('/technician-review');
    };

    return (
        <div className="bg-transparent  text-slate-900 font-body-md min-h-screen flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* TopNavBar */}
            <header className="glass fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-20 animate-fade-in-up">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-6 w-auto hover:scale-105 transition-transform" />
                        <span className="text-[24px] font-extrabold text-primary tracking-tight">
                            RepairHub
                        </span>
                    </Link>
                </div>
            </header>

            <div className="flex flex-1 pt-20">
                {/* SideNavBar */}
                <nav className="hidden md:flex flex-col fixed left-0 top-20 h-[calc(100vh-80px)] p-6 space-y-4 bg-white/50 backdrop-blur-sm border-r border-slate-200/60 w-72 z-40 overflow-y-auto animate-fade-in">
                    <div className="mb-6 px-4">
                        <h2 className="text-[20px] font-extrabold text-slate-900">Registration</h2>
                        <p className="text-[14px] font-bold text-slate-500 uppercase tracking-wider mt-1">Technician Portal</p>
                    </div>
                    
                    <Link to="/technician-registration" className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-transparent /50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                        Personal Details
                    </Link>
                    
                    <Link to="/technician-verification" className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-transparent /50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                        Identity Verification
                    </Link>
                    
                    <div className="flex items-center gap-4 px-5 py-4 bg-primary text-white font-bold rounded-xl text-[14px] shadow-md hover-lift transition-all">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                        </div>
                        Certifications
                    </div>
                    
                    <a className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-transparent /50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer" href="#">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                        </div>
                        Review
                    </a>
                </nav>

                {/* Main Content Canvas */}
                <main className="flex-1 md:ml-72 overflow-y-auto p-6 md:p-12 flex flex-col items-center relative z-10">
                    <form className="w-full max-w-4xl flex flex-col gap-10 pb-24 animate-fade-in-up" style={{ animationDelay: '0.1s' }} onSubmit={handleNext}>
                        {/* Header & Progress */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                <div>
                                    <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2">Step 3 of 4</p>
                                    <h1 className="text-[36px] font-extrabold text-slate-900 mb-2 tracking-tight">Certifications & Training</h1>
                                    <p className="text-[16px] font-medium text-slate-600 max-w-2xl">Upload your professional licenses, safety certifications, and specialized training documentation.</p>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>

                        {/* Content Bento */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Upload Area */}
                            <div className="md:col-span-2 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl flex flex-col gap-6 relative overflow-hidden group">
                                <div className="flex justify-between items-center border-b border-slate-200/60 pb-6">
                                    <h3 className="text-[22px] font-extrabold text-slate-900">Upload Documents</h3>
                                    <span className="text-[12px] font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-lg uppercase tracking-wider">Required</span>
                                </div>
                                
                                <label htmlFor="file-upload" className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-transparent  hover:border-primary transition-all cursor-pointer group-hover:border-primary/60 relative hover-lift">
                                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary shadow-sm">
                                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
                                    </div>
                                    <p className="text-[16px] text-slate-800 mb-2 font-extrabold">Click to upload or drag and drop</p>
                                    <p className="text-[14px] font-medium text-slate-500">PDF, JPG, PNG up to 10MB each</p>
                                </label>

                                {/* Uploaded Files List */}
                                <div className="flex flex-col gap-4 mt-4">
                                    {files.map(file => (
                                        <div key={file.id} className="flex items-center justify-between p-4 border border-slate-200/60 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${file.colorClass} shadow-sm`}>
                                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{file.icon}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[15px] text-slate-900 font-extrabold truncate max-w-[150px] sm:max-w-[250px]">{file.name}</span>
                                                    <span className="text-[13px] font-medium text-slate-500">{file.size} • Uploaded</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`${file.statusClass} text-[12px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold uppercase tracking-wider`}>
                                                    <span className="material-symbols-outlined text-[14px]">{file.statusIcon}</span> {file.status}
                                                </span>
                                                <button type="button" onClick={() => removeFile(file.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {files.length === 0 && (
                                        <div className="text-center p-6 bg-red-50/80 border border-red-200 text-red-700 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm">
                                            <span className="material-symbols-outlined">error</span>
                                            No files uploaded. At least one document is required.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Guidelines Sidebar */}
                            <div className="md:col-span-1 bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 flex flex-col gap-6 shadow-lg">
                                <div className="flex items-center gap-3 text-primary pb-4 border-b border-slate-200/60">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                                    </div>
                                    <h3 className="text-[20px] font-extrabold text-slate-900">Guidelines</h3>
                                </div>
                                <div className="flex flex-col gap-5 text-[15px] font-medium text-slate-600">
                                    <p>Ensure all documents are clearly legible and unexpired.</p>

                                    <div className="bg-transparent  p-4 rounded-xl border border-slate-200/60">
                                        <strong className="text-slate-900 block mb-3 font-extrabold">Accepted Formats:</strong>
                                        <ul className="list-none space-y-3">
                                            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[20px] text-red-500">picture_as_pdf</span> PDF</li>
                                            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[20px] text-blue-500">image</span> JPG, PNG</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-auto p-4 bg-amber-50/80 text-amber-800 rounded-xl border border-amber-200 flex items-start gap-3 shadow-sm">
                                    <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5 text-amber-600">warning</span>
                                    <p className="text-[13px] font-bold leading-tight">Incomplete submissions will delay account activation by up to 5 business days.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-8 border-t border-slate-200/60">
                            <button type="button" onClick={() => navigate('/technician-verification')} className="px-8 py-3.5 bg-white text-slate-700 border border-slate-300 font-bold text-[15px] rounded-xl hover:bg-transparent  transition-colors shadow-sm focus:outline-none">
                                Back
                            </button>
                            <button type="submit" className="px-8 py-3.5 bg-primary text-white font-bold text-[15px] rounded-xl hover:bg-primary-hover shadow-lg hover-lift transition-all flex items-center gap-2 focus:outline-none">
                                Submit for Review
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>
            
        </div>
    );
};

export default TechnicianCertificationPage;

