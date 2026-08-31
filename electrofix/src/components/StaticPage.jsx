import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StaticPage = ({ title, content }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('userName');
        if (storedUser) {
            setUserName(storedUser);
        }
    }, []);

    const handleHomeClick = (e) => {
        e.preventDefault();
        if (userName) {
            navigate('/starting');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="bg-background min-h-screen flex flex-col text-slate-800 font-body-md relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="fixed top-[15%] right-[-10%] w-[45%] h-[45%] bg-purple-400/15 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-emerald-400/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

            {/* TopNavBar */}
            <header className="glass shadow-sm fixed top-0 w-full z-50 animate-fade-in-up">
                <nav className="flex justify-between items-center w-full px-8 py-4 max-w-[1400px] mx-auto">
                    <button onClick={handleHomeClick} className="flex items-center h-8 md:h-10 cursor-pointer">
                        <img alt="RepairHub Logo" className="h-7 w-auto object-contain hover:scale-105 transition-transform" src="/logo.png" />
                        <span className="text-2xl font-bold text-primary ml-2 hidden sm:block tracking-tight">RepairHub</span>
                    </button>
                    
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={handleHomeClick} className="text-slate-500 hover:text-primary transition-colors font-bold text-[15px]">Home</button>
                        {userName && <Link className="text-slate-500 hover:text-primary transition-colors font-bold text-[15px]" to="/my-bookings">My Bookings</Link>}
                        <Link className="text-slate-500 hover:text-primary transition-colors font-bold text-[15px]" to="/help-center">Help</Link>
                    </div>
                    
                    {/* User Profile or Auth Buttons */}
                    {userName ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-[13px] font-bold text-slate-800 leading-tight">{userName}</span>
                                <span className="text-[11px] text-slate-500 font-medium">Logged In</span>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-primary font-bold shadow-md cursor-pointer hover:bg-blue-100 transition-colors">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-[14px] font-bold text-primary hover:underline">Log In</Link>
                            <Link to="/signup" className="text-[14px] font-bold bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-md hover-lift">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-32 pb-16 px-4 md:px-8 w-full animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-14 shadow-sm border border-slate-200/60 text-center w-full">
                        <span className="inline-block bg-blue-50 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">Information</span>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">{title}</h1>
                        <div className="text-left text-[15px] text-slate-600 w-full leading-relaxed bg-white/50 p-4 md:p-10 rounded-2xl border border-white/50">
                            {content}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white/50 backdrop-blur-md border-t border-slate-200 mt-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center max-w-[1400px] mx-auto gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="text-2xl font-black text-primary">RepairHub</div>
                        <p className="text-slate-500 text-sm">Industrial-grade maintenance you can trust.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-bold" to="/privacy">Privacy Policy</Link>
                        <Link className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-bold" to="/terms">Terms of Service</Link>
                        <Link className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-bold" to="/safety">Safety Protocols</Link>
                        <Link className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-bold" to="/help-center">Contact Support</Link>
                    </div>
                    <div className="text-slate-400 text-sm text-center md:text-right">
                        © 2024 RepairHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StaticPage;

