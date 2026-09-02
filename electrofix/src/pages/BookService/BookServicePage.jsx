import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';
import AIChatPopup from '../../components/AIChatPopup';

const BookServicePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { directoryTechnicians, addBooking } = useContext(RegistrationContext);

    const [technician, setTechnician] = useState(null);
    const [issue, setIssue] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [address, setAddress] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [warranty, setWarranty] = useState('standard');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPredicting, setIsPredicting] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);

    // Get today's date in YYYY-MM-DD format for the min attribute
    const today = new Date().toISOString().split('T')[0];

    const tnLocations = [
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", 
        "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukudi", 
        "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", 
        "Ooty", "Hosur", "Nagercoil", "Kanchipuram", "Cuddalore", 
        "Tiruvannamalai", "Kumbakonam", "Rajapalayam", "Pudukkottai",
        "Villupuram", "Vallavanur", "Vaniyambadi", "Virudhachalam",
        "Vandavasi", "Vedaranyam", "Vellakoil", "Vikramasingapuram",
        "Trichy", "Tambaram", "Tindivanam"
    ];

    useEffect(() => {
        const tech = directoryTechnicians.find(t => t.id === id);
        if (tech) {
            setTechnician(tech);
        } else {
            // Optional: Handle if not found
        }
    }, [id, directoryTechnicians]);

    const handleAIPredict = () => {
        setIsAIChatOpen(true);
    };

    const handleIssuePredicted = (predictedIssue) => {
        setIsPredicting(true);
        setIsAIChatOpen(false);
        setTimeout(() => {
            setIssue(predictedIssue);
            setIsPredicting(false);
        }, 800);
    };

    const handleGetLocation = () => {
        setIsLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
                        const data = await res.json();
                        if (data && data.address) {
                            const addr = data.address;
                            // Format a readable address
                            const street = addr.road || addr.suburb || '';
                            const city = addr.city || addr.town || addr.village || '';
                            const state = addr.state || '';
                            const zip = addr.postcode || '';
                            const formatted = [street, city, state, zip].filter(Boolean).join(', ');
                            setAddress(formatted);
                        } else {
                            setAddress(`${lat}, ${lng}`);
                        }
                    } catch (err) {
                        setAddress(`${lat}, ${lng}`);
                    }
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    alert("Could not access your location. Please check browser permissions.");
                    setIsLocating(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setIsLocating(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            
            const baseCharge = 299;
            const warrantyCost = warranty === 'extended' ? 499 : 0;
            const totalCost = baseCharge + warrantyCost;

            addBooking({
                technician,
                issue,
                preferredDate,
                address,
                warranty,
                totalCost
            });

            navigate('/booking-confirmation', { state: { technician, totalCost } });
        }, 1500);
    };

    if (!technician) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-transparent  text-slate-900">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Pricing calculation mock
    const baseCharge = 299;
    const warrantyCost = warranty === 'extended' ? 499 : 0;
    const totalCost = baseCharge + warrantyCost;

    return (
        <div className="bg-transparent  text-slate-900 flex flex-col min-h-screen antialiased font-body-md relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* TopNavBar */}
            <nav className="glass fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-20 border-b border-white/50 animate-fade-in-up">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center justify-center h-12 w-12 rounded-full hover:bg-white/50 -ml-2">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <span className="text-[24px] font-extrabold text-primary tracking-tight">Book Service</span>
                </div>
                <button 
                    onClick={handleGetLocation} 
                    disabled={isLocating}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-bold text-[13px] disabled:opacity-50"
                >
                    <span className={`material-symbols-outlined text-[18px] ${isLocating ? 'animate-spin' : ''}`}>
                        {isLocating ? 'refresh' : 'my_location'}
                    </span>
                    <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'Use Current Location'}</span>
                </button>
            </nav>

            <main className="flex-grow pt-24 pb-10 px-4 md:px-6 w-full max-w-2xl mx-auto flex flex-col relative z-10">
                
                {/* Booking Form */}
                <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 p-5 md:p-6 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-[20px] font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>edit_document</span>
                        </div>
                        Service Details
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        {/* Issue Description */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-0.5">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">Describe your issue</label>
                                <button 
                                    type="button" 
                                    onClick={handleAIPredict} 
                                    className="flex items-center justify-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-[11px] shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        auto_awesome
                                    </span>
                                    Predict Issue with AI
                                </button>
                            </div>
                            <textarea 
                                required
                                value={issue}
                                onChange={(e) => setIssue(e.target.value)}
                                placeholder="E.g., My AC is not cooling properly and makes a loud noise..."
                                className={`w-full min-h-[100px] p-3.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] font-medium text-slate-900 resize-y outline-none shadow-sm placeholder:text-slate-400 ${isPredicting ? 'animate-pulse' : ''}`}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Preferred Date */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">Preferred Service Date</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px] pointer-events-none">calendar_month</span>
                                    <input 
                                        required
                                        type="date"
                                        min={today}
                                        value={preferredDate}
                                        onChange={(e) => setPreferredDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] font-medium text-slate-900 outline-none shadow-sm cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">Service Location (Address)</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px] pointer-events-none">location_on</span>
                                    <input 
                                        required
                                        type="text"
                                        value={address}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setAddress(val);
                                            if (val.length > 0) {
                                                const matches = tnLocations.filter(loc => loc.toLowerCase().startsWith(val.toLowerCase()));
                                                setFilteredLocations(matches);
                                                setShowSuggestions(true);
                                            } else {
                                                setShowSuggestions(false);
                                            }
                                        }}
                                        onFocus={(e) => {
                                            if (e.target.value.length > 0) setShowSuggestions(true);
                                        }}
                                        onBlur={() => {
                                            // Delay hiding so clicks register
                                            setTimeout(() => setShowSuggestions(false), 200);
                                        }}
                                        placeholder="Enter city (e.g. Villupuram)"
                                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] font-medium text-slate-900 outline-none shadow-sm placeholder:text-slate-400"
                                    />
                                    {showSuggestions && filteredLocations.length > 0 && (
                                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden max-h-40 overflow-y-auto">
                                            {filteredLocations.map((loc, index) => (
                                                <div 
                                                    key={index}
                                                    onClick={() => {
                                                        setAddress(loc);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-[13px] text-slate-700 font-medium border-b border-slate-50 last:border-0 transition-colors"
                                                >
                                                    {loc}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Warranty Option */}
                        <div className="flex flex-col gap-2 mt-2 pt-5 border-t border-slate-200/60">
                            <label className="text-[14px] font-extrabold text-slate-900">Warranty Option</label>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Standard Warranty */}
                                <label className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all hover-lift ${warranty === 'standard' ? 'border-primary bg-blue-50/50 shadow-md' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300 shadow-sm'}`}>
                                    <input 
                                        type="radio" 
                                        name="warranty" 
                                        value="standard" 
                                        checked={warranty === 'standard'}
                                        onChange={() => setWarranty('standard')}
                                        className="sr-only"
                                    />
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[14px] font-extrabold text-slate-900 tracking-tight">Standard</span>
                                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">Free</span>
                                    </div>
                                    <span className="text-[12px] font-medium text-slate-500">30-day service guarantee</span>
                                </label>

                                {/* Extended Warranty */}
                                <label className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all hover-lift ${warranty === 'extended' ? 'border-primary bg-blue-50/50 shadow-md' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300 shadow-sm'}`}>
                                    <input 
                                        type="radio" 
                                        name="warranty" 
                                        value="extended" 
                                        checked={warranty === 'extended'}
                                        onChange={() => setWarranty('extended')}
                                        className="sr-only"
                                    />
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[14px] font-extrabold text-slate-900 tracking-tight">Extended</span>
                                        <span className="text-[13px] font-bold text-primary">₹499</span>
                                    </div>
                                    <span className="text-[12px] font-medium text-slate-500">6-month complete protection</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-2 pt-5 border-t border-slate-200/60">
                            <button 
                                type="submit"
                                disabled={isSubmitting || !issue || !preferredDate || !address}
                                className="w-full bg-primary text-white font-bold text-[14px] py-3 rounded-lg shadow-md hover:bg-primary-hover hover-lift transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover-lift-none focus:outline-none"
                            >
                                {isSubmitting ? (
                                    <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>event_available</span>
                                )}
                                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                            </button>
                        </div>

                    </form>
                </div>
            </main>
            
            {isAIChatOpen && (
                <AIChatPopup 
                    onClose={() => setIsAIChatOpen(false)} 
                    onPredictIssue={handleIssuePredicted} 
                />
            )}
        </div>
    );
};

export default BookServicePage;

