import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';


const TechnicianReviewPage = () => {
    const navigate = useNavigate();
    const { personalDetails, verificationDetails, certifications, addTechnicianToDirectory } = useContext(RegistrationContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Build the new technician profile
        const newTechnician = {
            id: Date.now().toString(),
            name: personalDetails.fullName || 'Unknown Technician',
            type: personalDetails.technicianType || 'Technician',
            experience: personalDetails.experienceYears ? `${personalDetails.experienceYears}+ Years Exp` : 'New',
            skills: personalDetails.skills ? personalDetails.skills.split(',').map(s => s.trim()) : [],
            location: personalDetails.address ? `${personalDetails.city}, ${personalDetails.state}` : 'Unknown Location',
            rating: 5.0, // initial dummy rating
            avatar: personalDetails.profilePhoto ? URL.createObjectURL(personalDetails.profilePhoto) : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(personalDetails.fullName || 'T')
        };

        addTechnicianToDirectory(newTechnician);
        
        // Save to local storage to allow sign in
        if (personalDetails.email && personalDetails.password) {
            const registeredTechnicians = JSON.parse(localStorage.getItem('registeredTechnicians') || '[]');
            registeredTechnicians.push({
                email: personalDetails.email,
                password: personalDetails.password,
                name: personalDetails.fullName || 'Technician',
                id: newTechnician.id
            });
            localStorage.setItem('registeredTechnicians', JSON.stringify(registeredTechnicians));
        }

        alert("Registration submitted successfully! You are now listed in the directory.");
        const redirectType = personalDetails.technicianType ? encodeURIComponent(personalDetails.technicianType) : '';
        if (redirectType) {
            navigate(`/discovery/${redirectType}`);
        } else {
            navigate('/');
        }
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
                <div className="flex gap-4">
                    <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-primary transition-colors text-[24px]">notifications</span>
                    <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-primary transition-colors text-[24px]">account_circle</span>
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
                    
                    <Link to="/technician-certification" className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-transparent /50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                        Certifications
                    </Link>
                    
                    <div className="flex items-center gap-4 px-5 py-4 bg-primary text-white font-bold rounded-xl text-[14px] shadow-md hover-lift transition-all">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                        </div>
                        Review
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 md:ml-72 overflow-y-auto p-6 md:p-12 pb-24 relative z-10">
                    <div className="max-w-4xl mx-auto w-full animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex flex-col gap-6 mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                <div>
                                    <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2">Step 4 of 4</p>
                                    <h1 className="text-[36px] font-extrabold text-slate-900 mb-2 tracking-tight">Review Your Information</h1>
                                    <p className="text-[16px] font-medium text-slate-600">Please review your registration details before final submission.</p>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                        
                        <div className="space-y-8">
                            {/* Section 1: Personal Details */}
                            <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full -z-10"></div>
                                <div className="flex justify-between items-center mb-6 border-b border-slate-200/60 pb-4">
                                    <h2 className="text-[20px] font-extrabold text-slate-900 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-[20px]">person</span>
                                        </div>
                                        Personal Details
                                    </h2>
                                    <Link to="/technician-registration" className="text-primary font-bold text-[14px] hover:underline flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</span>
                                        <span className="text-[16px] font-extrabold text-slate-800">{personalDetails.fullName || 'N/A'}</span>
                                    </div>
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                                        <span className="text-[16px] font-extrabold text-slate-800">{personalDetails.email || 'N/A'}</span>
                                    </div>
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                                        <span className="text-[16px] font-extrabold text-slate-800">{personalDetails.phoneCode} {personalDetails.phone || 'N/A'}</span>
                                    </div>
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service Location</span>
                                        <span className="text-[16px] font-bold text-slate-700">
                                            {personalDetails.address ? `${personalDetails.address}, ${personalDetails.city}, ${personalDetails.state} ${personalDetails.zip}, ${personalDetails.country}` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Technician Type</span>
                                        <span className="text-[16px] font-extrabold text-primary">{personalDetails.technicianType || 'N/A'}</span>
                                    </div>
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</span>
                                        <span className="text-[16px] font-extrabold text-slate-800">{personalDetails.experienceYears ? `${personalDetails.experienceYears} Years` : 'N/A'}</span>
                                    </div>
                                    <div className="md:col-span-2 bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Skills</span>
                                        <div className="flex flex-wrap gap-2">
                                            {personalDetails.skills ? personalDetails.skills.split(',').map((skill, index) => (
                                                <span key={index} className="px-3 py-1.5 bg-blue-50 text-primary rounded-lg font-bold text-[13px] border border-blue-100 shadow-sm">{skill.trim()}</span>
                                            )) : <span className="text-[16px] font-medium text-slate-500">N/A</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Identity Verification */}
                            <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-bl-full -z-10"></div>
                                <div className="flex justify-between items-center mb-6 border-b border-slate-200/60 pb-4">
                                    <h2 className="text-[20px] font-extrabold text-slate-900 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                                        </div>
                                        Identity Verification
                                    </h2>
                                    <Link to="/technician-verification" className="text-primary font-bold text-[14px] hover:underline flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">Aadhaar Number</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[16px] font-extrabold text-slate-800 tracking-wide">{verificationDetails.aadhaar || 'N/A'}</span>
                                            {verificationDetails.aadhaar && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[12px] uppercase tracking-wider">
                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-transparent /50 p-4 rounded-xl border border-slate-100">
                                        <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">PAN Number</span>
                                        <span className="text-[16px] font-extrabold text-slate-800 tracking-wide">{verificationDetails.pan || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Certifications */}
                            <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/40 rounded-bl-full -z-10"></div>
                                <div className="flex justify-between items-center mb-6 border-b border-slate-200/60 pb-4">
                                    <h2 className="text-[20px] font-extrabold text-slate-900 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                            <span className="material-symbols-outlined text-[20px]">verified</span>
                                        </div>
                                        Certifications
                                    </h2>
                                    <Link to="/technician-certification" className="text-primary font-bold text-[14px] hover:underline flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {certifications.length > 0 ? certifications.map(file => (
                                        <div key={file.id} className="flex items-center justify-between p-4 border border-slate-200/60 rounded-xl bg-white shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                                                    <span className="material-symbols-outlined">{file.icon || 'description'}</span>
                                                </div>
                                                <span className="text-[14px] font-extrabold text-slate-800 truncate max-w-[150px]">{file.name}</span>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[12px] uppercase tracking-wider ${file.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                <span className="material-symbols-outlined text-[14px]">{file.statusIcon || 'pending'}</span> {file.status || 'Pending'}
                                            </span>
                                        </div>
                                    )) : (
                                        <div className="col-span-1 md:col-span-2 text-center p-6 bg-transparent  border border-slate-200 rounded-xl text-slate-500 font-bold text-[14px]">
                                            No certifications uploaded.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <form className="mt-10 pt-8 border-t border-slate-200/60 flex flex-col gap-8" onSubmit={handleSubmit}>
                            <label className="flex items-start gap-4 cursor-pointer group bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 hover:bg-blue-50 transition-colors">
                                <div className="relative flex items-center">
                                    <input className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0 bg-white cursor-pointer transition-all" type="checkbox" required />
                                </div>
                                <span className="text-[14px] font-medium text-slate-600 leading-relaxed">
                                    I confirm that the information provided above is accurate and I agree to the <a className="text-primary font-bold hover:underline mx-1" href="#">Terms and Conditions</a> and <a className="text-primary font-bold hover:underline mx-1" href="#">Privacy Policy</a> of RepairHub.
                                </span>
                            </label>
                            
                            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                                <button onClick={() => navigate('/technician-certification')} className="w-full md:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-300 font-bold text-[15px] rounded-xl hover:bg-transparent  transition-colors shadow-sm focus:outline-none" type="button">
                                    Back to Certifications
                                </button>
                                <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold text-[15px] rounded-xl hover:bg-primary-hover shadow-lg hover-lift transition-all flex items-center justify-center gap-2 focus:outline-none">
                                    Submit Application
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TechnicianReviewPage;

