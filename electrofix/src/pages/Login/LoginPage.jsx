import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Forgot Password State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp, 3: new password, 4: success
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotOtp, setForgotOtp] = useState('');
    const [forgotNewPassword, setForgotNewPassword] = useState('');
    const [forgotError, setForgotError] = useState('');
    const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotSubmitEmail = async (e) => {
        e.preventDefault();
        setIsForgotSubmitting(true);
        setForgotError('');
        try {
            const API_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:3001');
            const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail }),
            });
            const result = await response.json();
            if (response.ok) {
                setForgotStep(2);
                if (result.otp) {
                    setForgotOtp(result.otp);
                    alert(`[Development Mode]\nAn OTP would normally be emailed to you.\nFor testing, your OTP is: ${result.otp}`);
                }
            } else {
                setForgotError(result.error || 'Failed to send OTP');
            }
        } catch (error) {
            setForgotError('Network error. Please try again.');
        } finally {
            setIsForgotSubmitting(false);
        }
    };

    const handleForgotSubmitReset = async (e) => {
        e.preventDefault();
        setIsForgotSubmitting(true);
        setForgotError('');
        try {
            const API_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:3001');
            const response = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail, otp: forgotOtp, newPassword: forgotNewPassword }),
            });
            const result = await response.json();
            if (response.ok) {
                setForgotStep(4);
            } else {
                setForgotError(result.error || 'Failed to reset password');
            }
        } catch (error) {
            setForgotError('Network error. Please try again.');
        } finally {
            setIsForgotSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        
        try {
            const email = e.target.email.value;
            const password = e.target.password.value;

            // Check local storage for newly registered technicians
            const registeredTechnicians = JSON.parse(localStorage.getItem('registeredTechnicians') || '[]');
            const localUser = registeredTechnicians.find(tech => tech.email === email && tech.password === password);
            
            if (localUser) {
                localStorage.setItem('userName', localUser.name);
                setIsSubmitting(false);
                navigate('/starting');
                return;
            }

            const API_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:3001');
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('userName', result.name);
                navigate('/starting');
            } else {
                setErrorMsg(result.error || 'Login failed');
            }
        } catch (error) {
            setErrorMsg('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-transparent  text-slate-900 min-h-screen flex flex-col relative overflow-hidden login-page-wrapper">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* TopAppBar */}
            <header className="glass shadow-sm absolute top-0 w-full z-50 animate-fade-in-up">
                <nav className="flex justify-between items-center w-full px-8 max-w-[1400px] mx-auto h-16">
                    <div className="flex items-center gap-6 md:gap-8">
                        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center justify-center -ml-2" title="Go Back">
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </button>
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto hover:scale-105 transition-transform" />
                            <span className="text-xl font-bold text-primary tracking-tight hidden sm:block">RepairHub</span>
                        </Link>
                        {/* Desktop Nav */}
                        <div className="hidden md:flex gap-8 h-full items-center">
                            <a className="text-slate-600 font-bold text-[14px] hover:text-primary transition-colors" href="#">Services</a>
                            <a className="text-slate-600 font-bold text-[14px] hover:text-primary transition-colors" href="#">Technicians</a>
                            <a className="text-slate-600 font-bold text-[14px] hover:text-primary transition-colors" href="#">Enterprise</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/signup" className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-[14px] hover:bg-primary-hover transition-all hover-lift shadow-md inline-block">Sign Up</Link>
                    </div>
                </nav>
            </header>
            
            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Login Card */}
                <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border-2 border-primary overflow-hidden relative">
                    
                    
                    <div className="p-8 md:p-10">
                        {/* Header */}
                        <div className="mb-8 text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
                            <p className="text-[17px] text-slate-500 font-medium">Sign in to manage your repair requests.</p>
                        </div>
                        {errorMsg && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-lg text-center animate-pulse-soft">
                                {errorMsg}
                            </div>
                        )}
                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div>
                                <label className="block text-[14px] font-bold text-slate-700 mb-2" htmlFor="email">Email Address</label>
                                <input className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm" id="email" name="email" type="email" placeholder="name@company.com" />
                            </div>
                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[14px] font-bold text-slate-700" htmlFor="password">Password</label>
                                    <button className="text-[13px] font-bold text-primary hover:underline" type="button" onClick={() => { setShowForgotModal(true); setForgotStep(1); setForgotError(''); setForgotEmail(''); setForgotOtp(''); setForgotNewPassword(''); }}>Forgot Password?</button>
                                </div>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        type={showPassword ? 'text' : 'password'} 
                                    />
                                    <button 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors" 
                                        type="button" 
                                        onClick={togglePasswordVisibility}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {/* Remember Me */}
                            <div className="flex items-center mt-4">
                                <input className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary cursor-pointer" id="remember" type="checkbox" />
                                <label className="ml-3 text-[14px] font-medium text-slate-600 cursor-pointer select-none" htmlFor="remember">Remember Me</label>
                            </div>
                            {/* Action Button */}
                            <div className="pt-2">
                                <button 
                                    className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-[15px] shadow-lg hover:bg-primary-hover hover-lift transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2" 
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Signing In...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </div>
                        </form>
                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <span className="px-4 bg-white">OR CONTINUE WITH</span>
                            </div>
                        </div>
                        {/* Secondary Option */}
                        <div className="text-center">
                            <p className="text-[14px] font-medium text-slate-600">
                                Don't have an account? 
                                <Link to="/signup" className="text-primary font-bold hover:underline ml-1">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-sm border-t border-slate-200/60 mt-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <span className="text-[15px] font-black text-primary">RepairHub</span>
                    <span className="text-[13px] font-medium text-slate-500">© 2024 RepairHub. Professional Reliability.</span>
                </div>

            </footer>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-fade-in-up">
                        <button 
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                            onClick={() => setShowForgotModal(false)}
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                        <div className="p-6 md:p-8">
                            <div className="mb-6 text-center">
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Reset Password</h2>
                                {forgotStep === 1 && <p className="text-[14px] text-slate-500 font-medium">Enter your email to receive an OTP.</p>}
                                {forgotStep === 2 && <p className="text-[14px] text-slate-500 font-medium">Enter the 6-digit OTP sent to your email.</p>}
                                {forgotStep === 3 && <p className="text-[14px] text-slate-500 font-medium">Create a new secure password.</p>}
                                {forgotStep === 4 && <p className="text-[14px] text-green-600 font-bold">Password reset successful!</p>}
                            </div>

                            {forgotError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold rounded-lg text-center animate-pulse-soft">
                                    {forgotError}
                                </div>
                            )}

                            {forgotStep === 1 && (
                                <form onSubmit={handleForgotSubmitEmail} className="space-y-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-slate-700 mb-1">Email Address</label>
                                        <input className="w-full px-4 py-2.5 bg-transparent  border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[14px] text-slate-900" type="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="name@company.com" />
                                    </div>
                                    <button className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-[14px] shadow hover:bg-primary-hover transition-all disabled:opacity-70" type="submit" disabled={isForgotSubmitting}>
                                        {isForgotSubmitting ? 'Sending...' : 'Send OTP'}
                                    </button>
                                </form>
                            )}

                            {forgotStep === 2 && (
                                <form onSubmit={(e) => { e.preventDefault(); setForgotStep(3); setForgotError(''); }} className="space-y-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-slate-700 mb-1">6-Digit OTP</label>
                                        <input className="w-full px-4 py-2.5 bg-transparent  border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[14px] text-slate-900 text-center tracking-widest font-mono" type="text" required maxLength="6" value={forgotOtp} onChange={(e) => setForgotOtp(e.target.value)} placeholder="000000" />
                                    </div>
                                    <button className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-[14px] shadow hover:bg-primary-hover transition-all" type="submit">
                                        Verify OTP
                                    </button>
                                </form>
                            )}

                            {forgotStep === 3 && (
                                <form onSubmit={handleForgotSubmitReset} className="space-y-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-slate-700 mb-1">New Password</label>
                                        <input className="w-full px-4 py-2.5 bg-transparent  border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[14px] text-slate-900" type="password" required minLength="6" value={forgotNewPassword} onChange={(e) => setForgotNewPassword(e.target.value)} placeholder="••••••••" />
                                    </div>
                                    <button className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-[14px] shadow hover:bg-primary-hover transition-all disabled:opacity-70" type="submit" disabled={isForgotSubmitting}>
                                        {isForgotSubmitting ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </form>
                            )}

                            {forgotStep === 4 && (
                                <div className="space-y-4">
                                    <button className="w-full bg-transparent  text-slate-700 py-2.5 rounded-lg font-bold text-[14px] shadow-sm hover:bg-slate-200 transition-all" onClick={() => setShowForgotModal(false)}>
                                        Return to Sign In
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;

