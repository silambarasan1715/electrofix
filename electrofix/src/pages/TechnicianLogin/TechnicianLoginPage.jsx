import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TechnicianLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        
        // Check local storage for newly registered technicians
        const registeredTechnicians = JSON.parse(localStorage.getItem('registeredTechnicians') || '[]');
        const localUser = registeredTechnicians.find(tech => tech.email === email && tech.password === password);
        
        if (localUser) {
            localStorage.setItem('userName', localUser.name);
            localStorage.setItem('technicianId', localUser.id || '');
            setIsSubmitting(false);
            if (localUser.id) {
                navigate(`/profile/${localUser.id}`);
            } else {
                navigate('/');
            }
        } else {
            setErrorMsg('Invalid credentials. Please check your email and password.');
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
                    <div className="flex items-center gap-8">
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
                        <Link to="/technician-registration" className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-[14px] hover:bg-primary-hover transition-all hover-lift shadow-md inline-block">Sign Up</Link>
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
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Technician Login</h1>
                            <p className="text-[17px] text-slate-500 font-medium">Sign in to your professional dashboard.</p>
                        </div>
                        {errorMsg && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-lg text-center animate-pulse-soft">
                                {errorMsg}
                            </div>
                        )}
                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {/* Email */}
                            <div>
                                <label className="block text-[14px] font-bold text-slate-700 mb-2" htmlFor="email">Email Address</label>
                                <input 
                                    className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm" 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[14px] font-bold text-slate-700" htmlFor="password">Password</label>
                                    <button className="text-[13px] font-bold text-primary hover:underline" type="button">Forgot Password?</button>
                                </div>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
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
                                <Link to="/technician-registration" className="text-primary font-bold hover:underline ml-1">Sign Up</Link>
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
        </div>
    );
};

export default TechnicianLoginPage;

