import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';

const MyBookingsPage = () => {
    const navigate = useNavigate();
    const { userBookings, removeBooking } = useContext(RegistrationContext);

    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            removeBooking(id);
            if (userBookings && userBookings.length <= 1) {
                navigate('/starting');
            }
        }
    };

    const handleComplete = (id) => {
        if (window.confirm("Mark this service as completed? This will remove it from your active bookings.")) {
            removeBooking(id);
        }
    };

    return (
        <div className="bg-transparent  text-slate-900 flex flex-col min-h-screen relative overflow-hidden font-body-md">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            
            {/* TopNavBar */}
            <nav className="glass sticky top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-20 animate-fade-in-up">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center justify-center h-12 w-12 rounded-full hover:bg-transparent /50 -ml-2">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <span className="text-[24px] font-extrabold text-primary tracking-tight">My Bookings</span>
                </div>
            </nav>

            <main className="flex-grow pt-6 md:pt-8 pb-24 px-4 md:px-8 w-full max-w-[900px] mx-auto flex flex-col gap-6 md:gap-8 z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                
                {userBookings && userBookings.length > 0 ? (
                    userBookings.map((booking) => (
                        <div key={booking.id} className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 p-4 shadow-md hover-lift transition-all">
                            {/* Header: ID & Status */}
                            <div className="flex justify-between items-start mb-3 border-b border-slate-200/60 pb-3">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Booking ID: {booking.id.slice(-6)}</span>
                                <div className="flex items-center gap-1.5 bg-amber-100/50 text-amber-700 px-3 py-1 rounded-lg border border-amber-200 shadow-sm">
                                    <span className="text-[10px] font-black uppercase tracking-wider">{booking.status}</span>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-transparent ">
                                    <img src={booking.technician.avatar} alt={booking.technician.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">{booking.technician.name}</h3>
                                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider mt-0.5">{booking.technician.type}</p>
                                </div>
                            </div>

                            {/* Details (Total & Date) */}
                            <div className="flex justify-between items-center mb-4 bg-transparent  rounded-lg p-3 border border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Total</span>
                                    <span className="text-[15px] font-black text-slate-900">₹{booking.totalCost}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Service Date</span>
                                    <span className="text-[13px] font-extrabold text-slate-800">{new Date(booking.preferredDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            {/* Live Tracking Mock */}
                            <div className="mt-4 pt-4 border-t border-slate-200/60">
                                <h4 className="text-[11px] font-bold text-slate-800 mb-4 uppercase tracking-wider">Live Tracking</h4>
                                <div className="flex items-center justify-between relative">
                                    {/* Line behind steps */}
                                    <div className="absolute top-3 left-6 right-6 h-1 bg-slate-200 rounded-full z-0"></div>
                                    <div className="absolute top-3 left-6 right-1/2 h-1 bg-primary rounded-full z-0 w-[15%]"></div>
                                    
                                    {/* Steps */}
                                    <div className="relative z-10 flex flex-col items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm ring-2 ring-white">
                                            <span className="material-symbols-outlined text-[14px]">check</span>
                                        </div>
                                        <span className="text-[9px] font-extrabold text-primary uppercase tracking-wider">Requested</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-white border border-primary text-primary flex items-center justify-center font-bold shadow-sm ring-2 ring-white text-[10px]">
                                            2
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">Assigned</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-transparent  border border-slate-200 text-slate-400 flex items-center justify-center font-bold shadow-sm ring-2 ring-white text-[10px]">
                                            3
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">On the way</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-transparent  border border-slate-200 text-slate-400 flex items-center justify-center font-bold shadow-sm ring-2 ring-white text-[10px]">
                                            4
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Actions (Blue Cancel Button) */}
                            <div className="mt-4 pt-4 border-t border-slate-200/60">
                                <button 
                                    onClick={() => handleCancel(booking.id)}
                                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-bold text-[13px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center bg-white/60 backdrop-blur-sm border border-white rounded-3xl py-24 flex flex-col items-center shadow-lg hover-lift">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <span className="material-symbols-outlined text-6xl text-slate-300 animate-pulse-soft">calendar_month</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-3">No active bookings</h3>
                        <p className="text-slate-500 text-[16px] max-w-sm mb-8 font-medium">You haven't requested any services yet. Discover professionals and book your first service!</p>
                        <button onClick={() => navigate('/starting')} className="bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary-hover hover-lift shadow-lg transition-all">
                            Find a Service
                        </button>
                    </div>
                )}
                
            </main>

            {/* BottomNavBar (Mobile) */}
            <nav className="fixed bottom-0 w-full z-[1000] border-t border-slate-200/60 glass shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex justify-around items-center h-20 pb-[env(safe-area-inset-bottom)] md:hidden">
                <button className="flex flex-col items-center justify-center text-primary transition-all active:scale-90 duration-200">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_note</span>
                    <span className="font-bold text-[11px] mt-1 uppercase tracking-wider">Bookings</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90 duration-200">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>chat_bubble</span>
                    <span className="font-bold text-[11px] mt-1 uppercase tracking-wider">Messages</span>
                </button>
            </nav>
        </div>
    );
};

export default MyBookingsPage;

