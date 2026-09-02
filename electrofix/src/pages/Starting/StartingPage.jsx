import React, { useState, useEffect, useRef } from 'react';
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
    const searchInputRef = useRef(null);

    const handleServiceClick = (serviceName) => {
        navigate(`/discovery/${encodeURIComponent(serviceName)}`);
    };

    const handleBookNowClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
            searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#f0f9ff] text-slate-800 min-h-screen pb-12 font-sans relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/15 rounded-full blur-[120px] pointer-events-none"></div>

            {/* TopAppBar - Glassmorphism */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm sticky top-0 z-50 transition-all duration-300">
                <div className="flex justify-between items-center px-[20px] py-3 md:py-4 w-full max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img alt="RepairHub Logo" className="h-10 md:h-12 w-auto object-contain group-hover:rotate-3 group-hover:scale-110 transition-all duration-300" src="/logo.png" />
                        <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 hidden sm:block tracking-tight drop-shadow-sm">RepairHub</span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        <a className="font-bold text-[14px] text-blue-700 border-b-2 border-blue-700 pb-1 hover:text-blue-800 transition-colors" href="#">Services</a>
                        <Link className="font-bold text-[14px] text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-200" to="/my-bookings">My Bookings</Link>
                    </nav>

                    {/* User Profile */}
                    <Link to="/login" className="flex items-center group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 border-2 border-blue-500/30 flex items-center justify-center text-blue-700 font-bold overflow-hidden cursor-pointer group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:border-blue-500 transition-all duration-300 shadow-sm">
                            {userName !== 'Guest' ? userName.charAt(0).toUpperCase() : (
                                <span className="material-symbols-outlined text-[20px] md:text-[26px]">person</span>
                            )}
                        </div>
                    </Link>
                </div>
                
                {/* Mobile Navigation */}
                <div className="flex md:hidden px-[20px] pt-2 pb-0 border-b border-slate-200/50">
                    <a className="flex-1 text-center font-bold text-[13px] text-blue-700 border-b-2 border-blue-700 pb-2" href="#">Services</a>
                    <Link className="flex-1 text-center font-bold text-[13px] text-slate-500 pb-2 hover:text-blue-600 transition-colors" to="/my-bookings">My Bookings</Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-[20px] pt-4 md:pt-6 relative z-10">
                {/* Search Bar Section */}
                <div className="mb-6 relative z-40 transform transition-all hover:scale-[1.01] duration-300">
                    <div className="relative w-full max-w-2xl mx-auto group">
                        <div className="relative bg-white/90 backdrop-blur-md rounded-full border border-slate-200 shadow-sm flex items-center overflow-hidden transition-all">
                            <span className="material-symbols-outlined pl-6 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">search</span>
                            <input 
                                ref={searchInputRef}
                                className="w-full pl-3 pr-6 py-4 md:py-5 bg-transparent border-none outline-none ring-0 shadow-none appearance-none focus:ring-0 focus:outline-none focus:border-none text-[15px] text-slate-800 placeholder-slate-400 font-medium" 
                                placeholder="What service do you need today?" 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchTerm.trim()) {
                                        handleServiceClick(searchTerm.trim());
                                    }
                                }}
                            />
                        </div>
                        
                        {/* Dropdown Results - Glassmorphic */}
                        {searchTerm && (
                            <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white overflow-hidden z-50 animate-fade-in origin-top transition-all">
                                {filteredServices.length > 0 ? (
                                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                        {filteredServices.map((service, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => handleServiceClick(service.name)}
                                                className="px-6 py-4 flex items-center gap-5 hover:bg-blue-50/80 cursor-pointer transition-all duration-200 border-b border-slate-100/50 last:border-0 group/item"
                                            >
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-transparent  flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-105 transition-all">
                                                    <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-[15px] font-bold text-slate-700 group-hover/item:text-blue-700 transition-colors">{service.name}</span>
                                                <span className="material-symbols-outlined ml-auto text-slate-300 opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 group-hover/item:text-blue-500">arrow_forward</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-6 py-8 text-[14px] text-slate-500 text-center font-medium flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-[32px] text-slate-300">search_off</span>
                                        No services found for "{searchTerm}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Glass Card */}
                <div className="bg-white/60 backdrop-blur-2xl rounded-[1.5rem] p-4 md:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/80 mb-6 relative z-20">
                    
                    {/* Header Info */}
                    <div className="mb-4 text-center md:text-left">
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-bold text-[11px] px-4 py-1.5 rounded-full mb-4 shadow-sm border border-blue-200/50">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            PROFESSIONAL MAINTENANCE
                        </span>
                        <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight drop-shadow-sm">Electrical Appliance Services</h1>
                        <p className="text-[15px] md:text-[16px] text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">Expert diagnostics and precision repairs for industrial and residential electrical systems. Keep your facility running at peak efficiency with our certified technicians.</p>
                    </div>

                    {/* Image Slider */}
                    <div className="relative rounded-[1rem] overflow-hidden mb-6 shadow-sm group border border-white/50 bg-transparent /50">
                        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {slideImages.map((src, index) => (
                                <div key={index} className="w-full flex-shrink-0 relative flex items-center justify-center p-2">
                                    <img 
                                        alt={`Slide ${index + 1}`} 
                                        className="w-full h-40 md:h-[280px] object-contain hover:scale-105 transition-transform duration-700" 
                                        src={src}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&q=80';
                                        }}
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-[1.5rem]"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Elegant Slider Controls */}
                        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg text-blue-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-white hover:scale-110 transition-all duration-300">
                            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                        </button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg text-blue-600 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-white hover:scale-110 transition-all duration-300">
                            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                        </button>
                        
                        {/* Modern Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full">
                            {slideImages.map((_, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => setCurrentSlide(index)} 
                                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-6 bg-blue-600' : 'w-2 bg-white/80 hover:bg-white'}`}
                                ></div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Services Included Section (Separated) */}
                <div className="mb-12 relative z-20">
                    <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center justify-center md:justify-start gap-2">
                        <span className="material-symbols-outlined text-blue-500 text-[28px]">list_alt</span>
                        Services Included
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Card 1 */}
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-blue-200/50">
                                <span className="material-symbols-outlined text-[24px]">home</span>
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-800 mb-2">Residential Diagnostics</h3>
                            <p className="text-[13px] text-slate-500 leading-relaxed">Comprehensive home electrical system checks and advanced safety audits.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-indigo-200/50">
                                <span className="material-symbols-outlined text-[24px]">factory</span>
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-800 mb-2">Industrial Maintenance</h3>
                            <p className="text-[13px] text-slate-500 leading-relaxed">Routine upkeep and precision fault finding for heavy machinery systems.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-rose-200/50">
                                <span className="material-symbols-outlined text-[24px]">warning</span>
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-800 mb-2">Emergency Repairs</h3>
                            <p className="text-[13px] text-slate-500 leading-relaxed">24/7 rapid priority response for critical electrical failures and hazards.</p>
                        </div>
                    </div>
                    
                    {/* CTA Button Moved to Bottom */}
                    <div className="mt-10 flex justify-center w-full">
                        <button 
                            onClick={handleBookNowClick} 
                            className="w-full md:w-auto relative group overflow-hidden bg-slate-900 text-white font-bold text-[16px] py-4 px-12 rounded-2xl shadow-[0_10px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_30px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <span className="relative flex items-center gap-2 justify-center z-10">
                                Book Service Now
                                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </button>
                    </div>
                </div>

            </main>

            <AIFloatingWidget />
        </div>
    );
};

export default StartingPage;

