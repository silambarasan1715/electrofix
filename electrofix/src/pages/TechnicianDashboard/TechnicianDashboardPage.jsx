import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';

const TechnicianDashboardPage = () => {
    const navigate = useNavigate();
    const { userBookings, directoryTechnicians, updateTechnicianDetails } = useContext(RegistrationContext);
    
    const [activeTab, setActiveTab] = useState('bookings');
    const [technicianId, setTechnicianId] = useState(localStorage.getItem('technicianId'));
    const [currentTech, setCurrentTech] = useState(null);

    // Form states for Portfolio/Works
    const [workTitle, setWorkTitle] = useState('');
    const [workDesc, setWorkDesc] = useState('');
    const [workImg, setWorkImg] = useState('');

    // Form states for Offers
    const [offerTitle, setOfferTitle] = useState('');
    const [offerDesc, setOfferDesc] = useState('');
    const [offerCode, setOfferCode] = useState('');

    useEffect(() => {
        if (!technicianId) {
            navigate('/technician-login');
            return;
        }
        
        const tech = directoryTechnicians.find(t => t.id === technicianId);
        if (tech) {
            setCurrentTech(tech);
        }
    }, [technicianId, directoryTechnicians, navigate]);

    if (!currentTech) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const myBookings = userBookings.filter(b => b.technician && b.technician.id === technicianId);
    
    // Make sure arrays exist
    const currentWorks = currentTech.works || [];
    const currentOffers = currentTech.offers || [];

    const handleAddWork = (e) => {
        e.preventDefault();
        const newWork = {
            id: Date.now().toString(),
            title: workTitle,
            description: workDesc,
            image: workImg || 'https://lh3.googleusercontent.com/aida-public/AB6AXuArfykUWdFRZ1VuQoCueI0ESPVGXhNcodmqtN3K9TiTNNxXlgDdppD7FT3AZ9HEivUR-clUVKxohD3aP_7_MGMxwlkm2d7oAhaTKdJ2K41HaGJDHnqe5qocRv7BrrrGAARGJC6R6l0y_RHFu7Xgd4W7UR9nNHkULkGbCH25rvEjSGAv8EDVD7A4W-C_ADZ7ukUnCoa4Dhh7WwKysyWe9XFtoFw2h6VuAu4zAU-rRg-nGqBFgqSm2PUrIg' // fallback image
        };
        updateTechnicianDetails(technicianId, { works: [...currentWorks, newWork] });
        setWorkTitle('');
        setWorkDesc('');
        setWorkImg('');
        alert('Work added to your portfolio!');
    };

    const handleAddOffer = (e) => {
        e.preventDefault();
        const newOffer = {
            id: Date.now().toString(),
            title: offerTitle,
            description: offerDesc,
            code: offerCode
        };
        updateTechnicianDetails(technicianId, { offers: [...currentOffers, newOffer] });
        setOfferTitle('');
        setOfferDesc('');
        setOfferCode('');
        alert('Offer published successfully!');
    };

    const handleLogout = () => {
        localStorage.removeItem('technicianId');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <div className="bg-background min-h-screen text-slate-800 font-body-md pb-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* Header */}
            <header className="glass sticky top-0 z-50 animate-fade-in-up">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between border-b border-slate-200/50">
                    <div className="flex items-center gap-4">
                        <img src={currentTech.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-sm" />
                        <div>
                            <h1 className="font-extrabold text-[18px] text-slate-900 leading-tight">{currentTech.name}</h1>
                            <p className="text-[13px] text-slate-500 font-bold uppercase tracking-wider">Professional Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate(`/profile/${technicianId}`)} className="text-sm font-bold text-primary hover:underline transition-colors">
                            View Public Profile
                        </button>
                        <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-red-100 transition-colors flex items-center gap-2 hover-lift">
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex gap-8 overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('bookings')} 
                        className={`py-4 px-2 font-bold text-[15px] border-b-[3px] whitespace-nowrap transition-all ${activeTab === 'bookings' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                        Incoming Bookings
                    </button>
                    <button 
                        onClick={() => setActiveTab('portfolio')} 
                        className={`py-4 px-2 font-bold text-[15px] border-b-[3px] whitespace-nowrap transition-all ${activeTab === 'portfolio' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                        Manage Portfolio
                    </button>
                    <button 
                        onClick={() => setActiveTab('offers')} 
                        className={`py-4 px-2 font-bold text-[15px] border-b-[3px] whitespace-nowrap transition-all ${activeTab === 'offers' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                        Manage Offers
                    </button>
                </div>
            </header>

            <main className="max-w-[1200px] mx-auto px-6 md:px-8 pt-8 relative z-10">
                
                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">Service Requests</h2>
                        
                        {myBookings.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {myBookings.map(booking => (
                                    <div key={booking.id} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 p-6 shadow-lg hover-lift transition-all">
                                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
                                            <div>
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ID: {booking.id.slice(-6)}</span>
                                                <h3 className="font-extrabold text-xl text-slate-800 mt-1">{new Date(booking.preferredDate).toLocaleDateString()}</h3>
                                            </div>
                                            <div className="bg-amber-100/50 text-amber-700 px-3 py-1 rounded-full text-[12px] font-bold border border-amber-200">
                                                {booking.status}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-5">
                                            <p className="text-[13px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Customer Issue:</p>
                                            <p className="text-[15px] text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">{booking.issue}</p>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-200/50">
                                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                                <span className="font-medium text-[14px]">{booking.address}</span>
                                            </div>
                                            <div className="font-black text-primary text-2xl">
                                                ₹{booking.totalCost}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white p-12 text-center flex flex-col items-center justify-center shadow-lg">
                                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 animate-pulse-soft">inbox</span>
                                <h3 className="text-2xl font-extrabold text-slate-700">No bookings yet</h3>
                                <p className="text-slate-500 mt-2 font-medium">When customers book your service, they will appear here.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                    <div className="animate-fade-in-up flex flex-col lg:flex-row gap-10" style={{ animationDelay: '0.1s' }}>
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">Add New Work</h2>
                            <form onSubmit={handleAddWork} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 p-8 shadow-lg flex flex-col gap-6">
                                <div>
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Project Title</label>
                                    <input required type="text" value={workTitle} onChange={e => setWorkTitle(e.target.value)} className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" placeholder="e.g. Industrial AC Overhaul" />
                                </div>
                                <div>
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Description</label>
                                    <textarea required value={workDesc} onChange={e => setWorkDesc(e.target.value)} className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 min-h-[120px]" placeholder="Describe the work done..."></textarea>
                                </div>
                                <div>
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Image URL (Optional)</label>
                                    <input type="text" value={workImg} onChange={e => setWorkImg(e.target.value)} className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" placeholder="https://..." />
                                </div>
                                <button type="submit" className="bg-primary text-white font-bold text-[15px] py-4 rounded-xl hover:bg-primary-hover hover-lift shadow-lg transition-all mt-2">
                                    Publish to Profile
                                </button>
                            </form>
                        </div>
                        
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">Your Portfolio</h2>
                            <div className="flex flex-col gap-5">
                                {currentWorks.map(work => (
                                    <div key={work.id} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 p-5 shadow-sm hover:shadow-md transition-all flex gap-5 items-center">
                                        <img src={work.image} alt={work.title} className="w-24 h-24 rounded-xl object-cover bg-slate-100 shadow-sm" />
                                        <div>
                                            <h4 className="font-extrabold text-slate-900 text-lg leading-tight mb-1">{work.title}</h4>
                                            <p className="text-[14px] font-medium text-slate-500 line-clamp-2">{work.description}</p>
                                        </div>
                                    </div>
                                ))}
                                {currentWorks.length === 0 && (
                                    <div className="bg-white/40 border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                                        <p className="text-slate-500 font-medium">No works added yet. Build your portfolio to attract more customers.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Offers Tab */}
                {activeTab === 'offers' && (
                    <div className="animate-fade-in-up flex flex-col lg:flex-row gap-10" style={{ animationDelay: '0.1s' }}>
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">Create Offer</h2>
                            <form onSubmit={handleAddOffer} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 p-8 shadow-lg flex flex-col gap-6">
                                <div>
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Offer Title</label>
                                    <input required type="text" value={offerTitle} onChange={e => setOfferTitle(e.target.value)} className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" placeholder="e.g. 20% Off AC Servicing" />
                                </div>
                                <div>
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Details</label>
                                    <textarea required value={offerDesc} onChange={e => setOfferDesc(e.target.value)} className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 min-h-[120px]" placeholder="Valid until..."></textarea>
                                </div>
                                <div>
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Promo Code (Optional)</label>
                                    <input type="text" value={offerCode} onChange={e => setOfferCode(e.target.value)} className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 uppercase" placeholder="SUMMER20" />
                                </div>
                                <button type="submit" className="bg-emerald-600 text-white font-bold text-[15px] py-4 rounded-xl hover:bg-emerald-700 hover-lift shadow-lg transition-all mt-2">
                                    Publish Offer
                                </button>
                            </form>
                        </div>
                        
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">Active Offers</h2>
                            <div className="flex flex-col gap-5">
                                {currentOffers.map(offer => (
                                    <div key={offer.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6 shadow-lg hover-lift transition-all relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-500 to-teal-600 text-white text-[11px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">Active</div>
                                        <h4 className="font-extrabold text-emerald-900 text-xl mb-2">{offer.title}</h4>
                                        <p className="text-[15px] font-medium text-emerald-700/90 mb-4">{offer.description}</p>
                                        {offer.code && (
                                            <div className="inline-block bg-white/80 backdrop-blur-sm border border-emerald-300 px-4 py-2 rounded-lg text-sm font-mono font-bold text-emerald-800 shadow-sm">
                                                Code: {offer.code}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {currentOffers.length === 0 && (
                                    <div className="bg-white/40 border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                                        <p className="text-slate-500 font-medium">No active offers. Create one to entice customers!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TechnicianDashboardPage;
