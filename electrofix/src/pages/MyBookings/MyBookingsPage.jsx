import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';

const MyBookingsPage = () => {
    const navigate = useNavigate();
    const { userBookings, removeBooking } = useContext(RegistrationContext);

    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            removeBooking(id);
        }
    };

    const handleComplete = (id) => {
        if (window.confirm("Mark this service as completed? This will remove it from your active bookings.")) {
            removeBooking(id);
        }
    };

    return (
        <div className="bg-background text-slate-900 flex flex-col min-h-screen relative overflow-hidden font-body-md">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            
            {/* TopNavBar */}
            <nav className="glass sticky top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-20 animate-fade-in-up">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/starting')} className="text-slate-500 hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center justify-center h-12 w-12 rounded-full hover:bg-slate-100/50 -ml-2">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <span className="text-[24px] font-extrabold text-primary tracking-tight">My Bookings</span>
                </div>
            </nav>

            <main className="flex-grow pt-6 md:pt-8 pb-24 px-4 md:px-8 w-full max-w-[900px] mx-auto flex flex-col gap-6 md:gap-8 z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                
                {userBookings && userBookings.length > 0 ? (
                    userBookings.map((booking) => (
                        <div key={booking.id} className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 p-5 md:p-8 shadow-lg hover-lift transition-all">
                            {/* Header: Date & Status */}
                            <div className="flex justify-between items-start mb-6 border-b border-slate-200/60 pb-6">
                                <div>
                                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Booking ID: {booking.id.slice(-6)}</span>
                                    <p className="text-[15px] font-bold text-slate-700 mt-1">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-amber-100/50 text-amber-700 px-4 py-2 rounded-xl border border-amber-200 shadow-sm">
                                    <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                                    <span className="text-[12px] font-black uppercase tracking-wider">{booking.status}</span>
                                </div>
                            </div>

                            {/* Technician & Issue Info */}
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Tech Avatar */}
                                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-slate-50">
                                    <img src={booking.technician.avatar} alt={booking.technician.name} className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="flex-grow flex flex-col gap-3 w-full">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">{booking.technician.name}</h3>
                                        <p className="text-[14px] font-bold text-primary uppercase tracking-wider mt-1">{booking.technician.type}</p>
                                    </div>
                                    <div className="bg-slate-50/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
                                        <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Issue Description</span>
                                        <p className="text-[15px] font-medium text-slate-800 mt-2">{booking.issue}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment & Cost Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-200/60">
                                <div className="flex items-center gap-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                                    <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </div>
                                    <div>
                                        <span className="text-[12px] font-bold text-slate-500 block uppercase tracking-wider mb-1">Service Date</span>
                                        <span className="text-[16px] font-extrabold text-slate-800">{new Date(booking.preferredDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                                    <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <div>
                                        <span className="text-[12px] font-bold text-slate-500 block uppercase tracking-wider mb-1">Estimated Total</span>
                                        <span className="text-[18px] font-black text-slate-900">₹{booking.totalCost}</span>
                                        <span className="text-[11px] font-bold text-slate-400 ml-2">({booking.warranty === 'extended' ? '+ Ext. Warranty' : 'Standard'})</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Tracking Timeline Mock */}
                            <div className="mt-8 pt-6 border-t border-slate-200/60">
                                <h4 className="text-[13px] font-bold text-slate-800 mb-6 uppercase tracking-wider">Live Tracking</h4>
                                <div className="flex items-center justify-between relative">
                                    {/* Line behind steps */}
                                    <div className="absolute top-4 left-8 right-8 h-1 bg-slate-200 rounded-full z-0"></div>
                                    <div className="absolute top-4 left-8 right-1/2 h-1 bg-primary rounded-full z-0 w-[15%]"></div>
                                    
                                    {/* Steps */}
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md ring-4 ring-white">
                                            <span className="material-symbols-outlined text-[16px]">check</span>
                                        </div>
                                        <span className="text-[11px] font-extrabold text-primary uppercase tracking-wider">Requested</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold shadow-sm ring-4 ring-white">
                                            2
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Assigned</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold shadow-sm ring-4 ring-white">
                                            3
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">On the way</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold shadow-sm ring-4 ring-white">
                                            4
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200/60">
                                <button 
                                    onClick={() => handleCancel(booking.id)}
                                    className="flex-1 py-3 px-4 rounded-xl border-2 border-rose-100 text-rose-600 font-bold hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                                    Cancel Booking
                                </button>
                                <button 
                                    onClick={() => handleComplete(booking.id)}
                                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Mark as Completed
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
                <button onClick={() => navigate('/starting')} className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90 duration-200">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
                    <span className="font-bold text-[11px] mt-1 uppercase tracking-wider">Explore</span>
                </button>
                <button className="flex flex-col items-center justify-center text-primary transition-all active:scale-90 duration-200">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_note</span>
                    <span className="font-bold text-[11px] mt-1 uppercase tracking-wider">Bookings</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90 duration-200">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>chat_bubble</span>
                    <span className="font-bold text-[11px] mt-1 uppercase tracking-wider">Messages</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90 duration-200">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                    <span className="font-bold text-[11px] mt-1 uppercase tracking-wider">Profile</span>
                </button>
            </nav>
        </div>
    );
};

export default MyBookingsPage;
