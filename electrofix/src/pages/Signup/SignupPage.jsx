import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TAMIL_NADU_DISTRICTS = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
    "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", 
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
    "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
    "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", 
    "Vellore", "Villupuram", "Virudhunagar"
];

const SignupPage = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        if (value.trim().length > 0) {
            const filtered = TAMIL_NADU_DISTRICTS.filter(district => 
                district.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredDistricts(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setFilteredDistricts([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setShowSuggestions(false);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data['confirm-password']) {
                setErrorMsg('Passwords do not match');
                setIsSubmitting(false);
                return;
            }

            const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    location: data.location,
                    email: data.email,
                    password: data.password
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                setErrorMsg(result.error || 'Signup failed');
            }
        } catch (error) {
            setErrorMsg('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background text-slate-900 min-h-screen flex flex-col relative overflow-hidden font-body-md">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* TopAppBar */}
            <header className="glass shadow-sm absolute top-0 w-full z-50 animate-fade-in-up">
                <nav className="flex justify-between items-center w-full px-8 max-w-[1400px] mx-auto h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Logo" className="h-12 w-auto hover:scale-105 transition-transform" />
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
                        <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-[14px] hover:bg-primary-hover transition-all hover-lift shadow-md inline-block">Sign In</Link>
                    </div>
                </nav>
            </header>
            
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-full max-w-[480px]">
                    {/* Branding/Identity */}
                    <div className="text-center mb-8">
                        <h1 className="text-[32px] font-extrabold text-slate-900 mb-2 whitespace-nowrap">Create Your Account</h1>
                        <p className="text-[17px] font-medium text-slate-500 max-w-[320px] mx-auto">Join RepairHub to manage your industrial service requests.</p>
                    </div>
                    
                    {/* Card Container */}
                    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border-2 border-primary p-8 relative overflow-hidden">
                        
                        
                        {errorMsg && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-lg text-center animate-pulse-soft">
                                {errorMsg}
                            </div>
                        )}
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block" htmlFor="name">Full Name</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">person</span>
                                    <input className="w-full pl-[52px] pr-4 py-3 bg-white/50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" id="name" name="name" required type="text" />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-2 relative">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block" htmlFor="location">Location</label>
                                <div className="relative group flex items-center">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">location_on</span>
                                    <input 
                                        className="w-full pl-[52px] pr-4 py-3 bg-white/50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" 
                                        id="location" 
                                        name="location" 
                                        required 
                                        type="text"
                                        value={location}
                                        onChange={handleLocationChange}
                                        onFocus={() => {
                                            if (location.trim().length > 0 && filteredDistricts.length > 0) {
                                                setShowSuggestions(true);
                                            }
                                        }}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    />
                                </div>
                                {showSuggestions && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                                        {filteredDistricts.map((district, index) => (
                                            <div 
                                                key={index}
                                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-[14px] font-medium text-slate-700"
                                                onClick={() => handleSuggestionClick(district)}
                                            >
                                                {district}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block" htmlFor="address">Address</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">home</span>
                                    <input className="w-full pl-[52px] pr-4 py-3 bg-white/50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" id="address" name="address" required type="text" />
                                </div>
                            </div>
                            
                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">mail</span>
                                    <input className="w-full pl-[52px] pr-4 py-3 bg-white/50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" id="email" name="email" required type="email" />
                                </div>
                            </div>
                            
                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block" htmlFor="password">Password</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">lock</span>
                                    <input className="w-full pl-[52px] pr-4 py-3 bg-white/50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" id="password" name="password" required type="password" />
                                </div>
                            </div>
                            
                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block" htmlFor="confirm-password">Confirm Password</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">shield</span>
                                    <input className="w-full pl-[52px] pr-4 py-3 bg-white/50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" id="confirm-password" name="confirm-password" required type="password" />
                                </div>
                            </div>
                            
                            {/* Terms Agreement */}
                            <div className="flex items-start gap-3 pt-2">
                                <input className="mt-1 w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" id="terms" name="terms" required type="checkbox" />
                                <label className="text-[13px] font-medium text-slate-600 leading-tight" htmlFor="terms">
                                    By signing up, I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                                </label>
                            </div>
                            
                            {/* Submit Button */}
                            <button 
                                className={`w-full py-3.5 text-white font-bold text-[15px] rounded-lg tracking-widest transition-all duration-200 flex items-center justify-center gap-2 mt-6 shadow-lg hover-lift ${isSuccess ? 'bg-green-600 shadow-green-600/20' : 'bg-primary shadow-blue-600/20 hover:bg-primary-hover active:scale-[0.98]'}`} 
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                style={{ opacity: isSubmitting ? '0.7' : '1' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">progress_activity</span> Processing...
                                    </>
                                ) : isSuccess ? (
                                    <>
                                        <span className="material-symbols-outlined">check_circle</span> Account Created
                                    </>
                                ) : (
                                    <>
                                        Sign Up
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </form>
                        
                        {/* Footer Link */}
                        <div className="mt-8 text-center pt-6 border-t border-slate-200">
                            <p className="text-[14px] font-medium text-slate-600">
                                Already have an account? 
                                <Link to="/login" className="text-primary font-bold hover:underline transition-all ml-1">Sign In</Link>
                            </p>
                        </div>
                    </div>
                    
                    {/* Trust Accents */}
                    <div className="mt-8 flex justify-center gap-8 items-center transition-all duration-500">
                        <div className="flex flex-col items-center text-center">
                            <span className="material-symbols-outlined text-[32px] text-slate-900 mb-1">verified_user</span>
                            <span className="text-[12px] font-bold text-slate-900 uppercase">Enterprise<br/>Secure</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="material-symbols-outlined text-[32px] text-slate-900 mb-1">precision_manufacturing</span>
                            <span className="text-[12px] font-bold text-slate-900 uppercase">Industrial<br/>Grade</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="material-symbols-outlined text-[32px] text-slate-900 mb-1">support_agent</span>
                            <span className="text-[12px] font-bold text-slate-900 uppercase">24/7<br/>Support</span>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="w-full py-6 px-8 bg-white/50 backdrop-blur-sm border-t border-slate-200/60 mt-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-[13px] font-medium text-slate-500">© 2024 RepairHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default SignupPage;
