import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AIFloatingWidget from '../../components/AIFloatingWidget';





const services = [
    { name: 'Mobile Repair', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OP2ghqU0TLunTuULri9tcvjr-C-mSmyf1xEkwjzioh0RXFiawaMaclvbrd881A9dC5i6lcavIolm3mBbNZ4YHMxfnsNcZUt9UDMimLPUHkYxYzTbKEffWjtyIfgZ1fnM3g71MoH5TwmSXfKtRZjIiLRQ3edB6Wg3Hos49Bc3QSODO8RfNaaM2Uv2gTSJ4JSfgXHZJlf_km7RQ-jGMJVli_1sbm0JopoTx5MaooP-QQQiy9CwOcsXTA' },
    { name: 'AC Service', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW_pI6q7KXaNxZWcAv9weTpO_Y_7Pyng76K1SOQ6ENS3Sh65i0hA11ioKMYOnd5fDqWjbucUOX1iXf5mzua68mM6wTA6jzyHIR_vhDwsG8sBuAxu1MfoUnQ8ZWKbgyZQIQ6o5CUQKalAr9l5w4sJn_zdaJs5u55IVehZGFL-9g3reTM_drAzZkn-uoia30AVThEnz-2dwuxNgQTzIQRGiHyubA9I_Y1fODevXiCYTSSQjoXhz2wxfj0g' },
    { name: 'TV Repair', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi3-GwW7zmWZUYcuRBOoCqn7PHp5IiQ7ZEy2ziqP59Tx9VWg-HAOj5EiukR_MPu_hGcB0SM5qesK7Zi5idkqeRR3LF4sUE_PvtRN-6seTXg3yvUl2dbWN8sL_PRTNtqOMPGgpE1HOrC6Tnea-kFtI2sckH5Kw7I7YpQAmL5iLggMDm8CWY4KbMNMmAI8P-WA-1OgTR5Q9UbV4MJZ27-NjLLo6I8suD7eUhAVabXF4rHi0krk-tXfDWRw' },
    { name: 'Washing Machine', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdwjH8QqiZixGGdHoMXb2L_OBWyjElF7sn5pOjLtpZEUcGcH9W68FgZxn6WL7mbVG4AVvjEVEYV4bkJqp-xfdfN6-jfPYggoYpz34S5JJICTgRYPK3jXbz9v0l7YoTVSYxpOpTDhbcSGEEfhOBE5pVjmzKQPwdNl5FkEOV48G2QlNlz3xbgzwBT5A-P5_87IYbFYFMJXAAsKUM_HKJz_MA8quw7msDnZ59jOfcStr7GSoIOtaZv8XqCw' },
    { name: 'Refrigerator', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwuvRT6LkbXCa2EpoYhUprLsPXTz7Qh2tzzmIlSHMtd76g72CTFgcV5icqu3bzmfKsyYg7MlRiqln5V-CwC-Fla3-spSS9hvgiljgk9VDs9F17jSxrDFT5j5_dKrrytDJ9cL94KhfrbjfxVLCCc7I2BIe0R0Vi7yfadpdiiKSow_SHwep27tMsIHshDTpWyl5RJjvOtYluanO1zWeFrQCzCOWVzm1ar8L_3svrtbK9VZ84NJERLeeJKQ' },
    { name: 'Computer Service', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtCJ8Debju9_pzqRtj8_S76Gp4aPzvjUms5TmQTwvAXVmin1rPRfRf_cTGSKgtEBWPzcJynM2hR5kJeO56clE9ewx1zkhf2rBfc9nD88B9nM736f8019sNo8fgsJeAKtDQzNLIy4oA5zv4Iobl3_-yoRj_MT__N7dUtpN8rlgwu3twmUvFmuyMLYU5SgHj-w_TRyAmRJ2yyfTovMRcjFtgd-xCPp4zKM4dvpU_kLLwhp7ErlJJgD2lqg' },
    { name: 'Electrical', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPxxbK0Fn_OBCncKjdvK5bL_Uu7SSuR0MyhB6idfLe7sXiBicKiZac-FDAdhO1xsjpbSYeb1iqZX40qYoQQB3IA4joORAV2hr2fZPit8j9RV8SjGSqD4pOT1IIs6gOLhXwlGw4ZWU9t103Bkfn1H8pbZggMDpY-i9gIRyw0PEjAzNVMxyiJIE4JZxSbVeUIpiUnTGkRh4YmiGxaQ-2AcTTU-S-iZZiIPsEy3tPTy7zFneCYc5vdL-D8A' },
    { name: 'Laptop Service', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80' }
];

const StartingPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const userName = localStorage.getItem('userName') || 'Guest';
    const navigate = useNavigate();

    const handleServiceClick = (serviceName) => {
        navigate(`/discovery/${encodeURIComponent(serviceName)}`);
    };

    const filteredServices = services.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const slideImages = [
        "/slider/new_slide_1.jpg",
        "/slider/new_slide_2.jpg",
        "/slider/new_slide_3.jpg",
        "/slider/new_slide_4.png"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-background text-slate-800 font-body-md min-h-screen relative">
            {/* Background decorative elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="fixed top-[15%] right-[-10%] w-[45%] h-[45%] bg-purple-400/15 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-emerald-400/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

            {/* TopNavBar */}
            <header className="glass shadow-sm relative w-full z-50 animate-fade-in-up">
                <nav className="flex justify-between items-center w-full px-8 py-4 max-w-[1400px] mx-auto relative">
                    {/* Left: Logo */}
                    <Link className="flex items-center h-8 md:h-10 z-10" to="/">
                        <img alt="RepairHub Logo" className="h-7 w-auto object-contain hover:scale-105 transition-transform" src="/logo.png" />
                        <span className="text-2xl font-bold text-primary ml-2 hidden sm:block tracking-tight">RepairHub</span>
                    </Link>
                    
                    {/* Center: Services and My Booking */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-8">
                        <a className="text-primary border-b-2 border-primary font-bold pb-1 text-[13px] md:text-[15px] whitespace-nowrap" href="#">Services</a>
                        <Link className="text-slate-500 hover:text-primary transition-colors font-bold text-[13px] md:text-[15px] whitespace-nowrap" to="/my-bookings">My Bookings</Link>
                    </div>
                    
                    {/* Right: My Account */}
                    <Link to="/login" className="flex items-center gap-3 z-10 group cursor-pointer">
                        <div className="hidden sm:flex flex-col text-right">
                            <span className="text-[13px] font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">My Account</span>
                            <span className="text-[11px] text-slate-500 font-medium">{userName}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-blue-50 border-2 border-primary flex items-center justify-center text-primary font-bold shadow-md group-hover:bg-blue-100 group-hover:scale-105 transition-all">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </Link>
                </nav>
            </header>
            
            <main className="pb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Dedicated Search Section */}
                <section className="pt-2 px-4 w-full">
                    <div className="max-w-xl mx-auto w-full relative group z-20">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[22px] z-10">search</span>
                        <input 
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-slate-900 shadow-md text-[15px] font-medium placeholder:text-slate-400 relative z-10" 
                            placeholder="What service do you need today?" 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchTerm.trim()) {
                                    navigate(`/discovery/${encodeURIComponent(searchTerm.trim())}`);
                                }
                            }}
                        />
                        {searchTerm && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
                                {filteredServices.length > 0 ? (
                                    filteredServices.map((service, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => handleServiceClick(service.name)}
                                            className="px-5 py-3.5 flex items-center gap-4 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                                        >
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                                <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[15px] font-bold text-slate-700">{service.name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-5 py-4 text-[14px] text-slate-500 text-center font-medium">
                                        No services found for "{searchTerm}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
                

                {/* Hero Section */}
                <section className="pt-8 pb-8 md:pt-12 md:pb-12 px-4 md:px-8">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-10 bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
                        <div className="flex-1 space-y-4">
                            <span className="inline-block bg-blue-50 text-primary px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">Professional Maintenance</span>
                            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Electrical Appliance Services</h1>
                            <p className="text-[15px] text-slate-500 max-w-xl leading-relaxed">Expert diagnostics and precision repairs for industrial and residential electrical systems. Keep your facility running at peak efficiency.</p>
                        </div>
                        <div className="flex-1 w-full max-w-lg">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-100 group">
                                {slideImages.map((src, index) => (
                                    <img 
                                        key={index}
                                        alt={`Slide ${index + 1}`} 
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`} 
                                        src={src} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            {/* Footer */}
            <footer className="bg-white/50 backdrop-blur-md border-t border-slate-200 mt-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-full px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center max-w-[1400px] mx-auto gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="text-2xl font-black text-primary">RepairHub</div>
                        <p className="text-slate-500 text-sm">Industrial-grade maintenance you can trust.</p>
                    </div>

                    <div className="text-slate-400 text-sm text-center md:text-right">
                        © 2024 RepairHub. All rights reserved.
                    </div>
                </div>
            </footer>
            <AIFloatingWidget />
        </div>
    );
};

export default StartingPage;
