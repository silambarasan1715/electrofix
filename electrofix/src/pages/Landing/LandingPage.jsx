import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-transparent  text-slate-900 font-body-md flex flex-col relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[120px] -z-10"></div>

            {/* TopNavBar */}
            <header className="w-full bg-transparent z-50 pt-4 animate-fade-in-up">
                <nav className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center glass rounded-2xl mx-4 lg:mx-auto relative">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                        <span className="text-2xl font-bold text-primary">RepairHub</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-10 text-[15px] font-bold text-slate-600">
                        <a href="#" className="text-primary">Home</a>
                        <Link to="/login" className="hover:text-primary transition-colors">Services</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/login" className="text-[15px] font-bold text-primary hover:underline">Login</Link>
                        <Link to="/signup" className="text-[15px] font-bold bg-primary text-white px-7 py-2.5 rounded-lg hover:bg-primary-hover hover-lift shadow-md">Sign Up</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden flex items-center justify-center p-2 text-slate-600 hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    {/* Mobile Menu Dropdown (Compact Right Side) */}
                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex flex-col md:hidden animate-fade-in z-50">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-slate-600 text-[14px] font-bold hover:text-primary hover:bg-blue-50 px-4 py-3 rounded-lg transition-all">Home</Link>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-slate-600 text-[14px] font-bold hover:text-primary hover:bg-blue-50 px-4 py-3 rounded-lg transition-all">Services</Link>
                            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-slate-600 text-[14px] font-bold hover:text-primary hover:bg-blue-50 px-4 py-3 rounded-lg transition-all">About</Link>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-slate-600 text-[14px] font-bold hover:text-primary hover:bg-blue-50 px-4 py-3 rounded-lg transition-all">Contact</Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* Hero Section */}
            <main className="flex-grow flex items-center relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full h-full">
                    
                    {/* Text Content */}
                    <div className="flex-1 space-y-7 max-w-xl">
                        <h1 className="text-4xl md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-slate-900">
                            Connecting you with <br className="hidden md:block" />
                            <span className="text-gradient">trusted repair experts</span> in <br className="hidden md:block" />
                            minutes.
                        </h1>
                        <p className="text-base md:text-[19px] text-slate-500 font-medium">
                            Professional home services simplified.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-5 pt-4">
                            <Link to="/login" className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto rounded-lg font-bold text-sm md:text-[15px] hover:bg-primary-hover hover-lift shadow-lg">
                                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                Book a Service
                            </Link>
                            <Link to="/technician-login" className="flex items-center justify-center gap-2 bg-white/50 border-[2.5px] border-slate-200 text-primary px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto rounded-lg font-bold text-sm md:text-[15px] hover:border-primary hover:bg-blue-50/50 hover-lift transition-all">
                                <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                                Register as Technician
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 flex justify-end w-full relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-[80px] -z-10 animate-pulse-soft"></div>
                        <img src="/hero.png" alt="Repair Connect Dashboard" className="w-full max-w-[700px] h-auto drop-shadow-2xl hover-lift" />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white/50 border-t border-slate-200/60 pt-12 pb-8 mt-auto backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 space-y-4 max-w-xs">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Logo" className="h-5 w-auto" />
                            <span className="text-[17px] font-bold text-primary">RepairHub</span>
                        </div>
                        <p className="text-[13.5px] text-slate-500 leading-relaxed font-medium">
                            Reliable home maintenance and professional repair services at your fingertips.
                        </p>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-primary mb-5 text-[14px]">Quick Links</h4>
                        <ul className="space-y-4 text-[13px] text-slate-500 font-semibold">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1 justify-self-end md:justify-self-start text-right md:text-left">
                        <h4 className="font-bold text-primary mb-5 text-[14px]">Support</h4>
                        <ul className="space-y-4 text-[13px] text-slate-500 font-semibold">
                            <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
                        <h4 className="font-bold text-primary mb-5 text-[14px]">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent  text-primary hover:bg-blue-100 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">share</span>
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent  text-primary hover:bg-blue-100 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">public</span>
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent  text-primary hover:bg-blue-100 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="max-w-[1400px] mx-auto px-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[11.5px] text-slate-400 font-medium">
                    <p>© 2024 RepairHub. Professional Home Services.</p>
                    <div className="flex gap-6">
                        <span>English (US)</span>
                        <span>USD ($)</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

