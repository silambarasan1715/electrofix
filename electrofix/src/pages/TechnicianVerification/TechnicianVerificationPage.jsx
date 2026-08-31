import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';


const TechnicianVerificationPage = () => {
    const navigate = useNavigate();
    const { verificationDetails, updateVerificationDetails } = useContext(RegistrationContext);
    
    const [aadhaarNumber, setAadhaarNumber] = useState(verificationDetails.aadhaar || '');
    const [otpSent, setOtpSent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [otpVerified, setOtpVerified] = useState(false);
    
    const [timeLeft, setTimeLeft] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(false);


    const [panFile, setPanFile] = useState(verificationDetails.panFile || null);

    useEffect(() => {
        let interval;
        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleSendOtp = () => {
        if (aadhaarNumber.length === 12) {
            setOtpSent(true);
            setIsTimerActive(true);
            setTimeLeft(120);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
            alert("System Note (Testing): An OTP '123456' has been sent to the registered mobile number.");
        } else {
            alert("Please enter a valid 12-digit Aadhaar number.");
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (!otpVerified) {
            alert("Please verify your Aadhaar number with the OTP before continuing.");
            return;
        }

        const formData = new FormData(e.target);
        updateVerificationDetails({
            aadhaar: aadhaarNumber,
            pan: formData.get('pan'),
            panFile: panFile
        });

        navigate('/technician-certification');
    };

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);
        
        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };
    
    const verifyOtp = () => {
        if (otpValues.join('') === '123456') {
            setOtpVerified(true);
            setIsTimerActive(false);
        } else {
            alert('Invalid OTP. Please enter 123456 (testing code).');
        }
    };

    const isOtpComplete = otpValues.every(val => val !== '');

    return (
        <div className="bg-background text-slate-900 font-body-md min-h-screen flex flex-col relative overflow-hidden">
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
                {/* SideNavBar as Progress Indicator */}
                <aside className="hidden md:flex flex-col fixed left-0 top-20 h-[calc(100vh-80px)] p-6 space-y-4 bg-white/50 backdrop-blur-sm border-r border-slate-200/60 w-72 z-40 animate-fade-in">
                    <div className="mb-6 px-4">
                        <h2 className="text-[20px] font-extrabold text-slate-900">Registration</h2>
                        <p className="text-[14px] font-bold text-slate-500 uppercase tracking-wider mt-1">Technician Portal</p>
                    </div>
                    <nav className="flex-1 flex flex-col gap-3">
                        {/* Personal Details - Completed */}
                        <Link to="/technician-registration" className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-slate-100/50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-[18px]">check</span>
                            </div>
                            Personal Details
                        </Link>
                        {/* Identity Verification - Active */}
                        <div className="flex items-center gap-4 px-5 py-4 bg-primary text-white font-bold rounded-xl text-[14px] shadow-md hover-lift transition-all">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                            </div>
                            Identity Verification
                        </div>
                        {/* Certifications - Upcoming */}
                        <Link to="/technician-certification" className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-slate-100/50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                            </div>
                            Certifications
                        </Link>
                        {/* Review - Upcoming */}
                        <div className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:bg-slate-100/50 hover:text-primary transition-all rounded-xl font-bold text-[14px] cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                            </div>
                            Review
                        </div>
                    </nav>
                </aside>
                
                {/* Main Content Area */}
                <main className="flex-1 md:ml-72 p-6 md:p-12 pb-24 overflow-y-auto relative z-10">
                    <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {/* Mobile Progress Header */}
                        <div className="md:hidden mb-10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Step 2 of 4</span>
                                <span className="text-[12px] font-bold text-primary">Identity Verification</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '50%' }}></div>
                            </div>
                        </div>
                        
                        {/* Desktop Header */}
                        <div className="mb-10">
                            <h1 className="text-[36px] font-extrabold text-slate-900 mb-3 tracking-tight">Identity Verification</h1>
                            <p className="text-[16px] text-slate-600 font-medium">Please provide your government-issued identification details to verify your account. This information is encrypted and stored securely.</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden mb-8">
                            {/* Security Watermark */}
                            <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-[180px]">shield_lock</span>
                            </div>
                            
                            <form id="verification-form" className="space-y-10 relative z-10" onSubmit={handleNext}>
                                {/* Aadhaar Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-200/60">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">badge</span>
                                        </div>
                                        <h3 className="text-[20px] font-extrabold text-slate-900">Aadhaar Verification</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block">12-Digit Aadhaar Number</label>
                                            <input 
                                                className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" 
                                                type="text" 
                                                maxLength="12"
                                                value={aadhaarNumber}
                                                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 flex flex-col justify-end">
                                            {(!otpSent || !isTimerActive) ? (
                                                <button 
                                                    className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold text-[14px] rounded-xl hover:bg-slate-800 transition-all shadow-md hover-lift" 
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                >
                                                    {otpSent ? "Resend OTP" : "Send OTP"}
                                                </button>
                                            ) : (
                                                <button 
                                                    className="w-full md:w-auto px-8 py-3.5 bg-slate-200 text-slate-500 font-bold text-[14px] rounded-xl cursor-not-allowed opacity-80" 
                                                    type="button"
                                                    disabled
                                                >
                                                    Resend in {formatTime(timeLeft)}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {showSuccess && (
                                        <div className="mt-4 flex items-center gap-3 text-emerald-700 bg-emerald-50/80 backdrop-blur-sm p-4 rounded-xl border border-emerald-200 shadow-sm animate-fade-in-up">
                                            <span className="material-symbols-outlined">check_circle</span>
                                            <span className="text-[14px] font-bold">OTP sent to verified mobile number</span>
                                        </div>
                                    )}
                                    
                                    {/* OTP Field */}
                                    {otpSent && !otpVerified && (
                                        <div className="mt-6 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl animate-fade-in-up">
                                            <label className="text-[14px] font-bold text-slate-700 block mb-4">Enter OTP sent to registered mobile</label>
                                            <div className="flex gap-3 mb-4">
                                                {otpValues.map((val, index) => (
                                                    <input 
                                                        key={index}
                                                        id={`otp-${index}`}
                                                        className="w-14 h-14 text-center text-xl font-extrabold bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none shadow-sm" 
                                                        maxLength="1" 
                                                        type="text" 
                                                        required 
                                                        value={val}
                                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-[13px] font-bold text-slate-500 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">timer</span> {formatTime(timeLeft)} remaining
                                                </p>
                                                {isOtpComplete && (
                                                    <button 
                                                        type="button" 
                                                        onClick={verifyOtp}
                                                        className="px-6 py-2.5 bg-primary text-white font-bold text-[14px] rounded-xl hover:bg-primary-hover shadow-md hover-lift transition-all flex items-center gap-2"
                                                    >
                                                        Verify <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {otpVerified && (
                                        <div className="mt-6 p-5 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700 shadow-sm animate-fade-in-up">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                <span className="material-symbols-outlined">verified_user</span>
                                            </div>
                                            <span className="text-[15px] font-bold">OTP Verified Successfully</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* PAN Section */}
                                <div className="space-y-6 pt-2">
                                    <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-200/60">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">credit_card</span>
                                        </div>
                                        <h3 className="text-[20px] font-extrabold text-slate-900">PAN Card Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block">10-Digit PAN Number</label>
                                            <input className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 font-medium text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" name="pan" type="text" maxLength="10" defaultValue={verificationDetails.pan} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block">Upload PAN Copy (Optional)</label>
                                            <label className="flex items-center justify-center w-full h-[52px] border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-primary transition-all overflow-hidden relative group">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,.pdf" onChange={(e) => setPanFile(e.target.files[0])} />
                                                <span className={`material-symbols-outlined mr-3 text-[20px] ${panFile ? 'text-emerald-500' : 'text-slate-400 group-hover:text-primary transition-colors'}`}>
                                                    {panFile ? 'check_circle' : 'upload_file'}
                                                </span>
                                                <span className={`font-bold text-[14px] truncate px-2 ${panFile ? 'text-slate-800' : 'text-slate-500 group-hover:text-primary transition-colors'}`}>
                                                    {panFile ? panFile.name : 'Browse File'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Trust Badges */}
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-200/60 shadow-inner">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">verified_user</span>
                                        <span className="font-bold text-[13px]">256-bit Encryption</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">gpp_good</span>
                                        <span className="font-bold text-[13px]">Regulatory Compliant</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">lock</span>
                                        <span className="font-bold text-[13px]">Secure Data Handling</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 mt-8 mb-12">
                            <button onClick={() => navigate('/technician-registration')} className="w-full md:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-300 font-bold text-[15px] rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all text-center shadow-sm" type="button">
                                Back to Personal Details
                            </button>
                            <button type="submit" form="verification-form" className="w-full md:w-auto px-8 py-3.5 bg-primary text-white font-bold text-[15px] rounded-xl hover:bg-primary-hover shadow-lg hover-lift transition-all flex justify-center items-center gap-2">
                                Verify & Continue
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Footer */}
            <footer className="w-full py-6 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto bg-white/50 backdrop-blur-sm border-t border-slate-200/60 md:pl-80 z-50 relative">
                <div className="font-extrabold text-[15px] text-primary">
                    RepairHub
                </div>
                <div className="font-medium text-[13px] text-slate-500 text-center md:text-left">
                    © 2024 RepairHub Industrial Services. All rights reserved.
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    <a className="font-bold text-[13px] text-slate-500 hover:text-primary transition-colors duration-150" href="#">Privacy Policy</a>
                    <a className="font-bold text-[13px] text-slate-500 hover:text-primary transition-colors duration-150" href="#">Terms of Service</a>
                    <a className="font-bold text-[13px] text-slate-500 hover:text-primary transition-colors duration-150" href="#">Security Standards</a>
                </div>
            </footer>
        </div>
    );
};

export default TechnicianVerificationPage;
