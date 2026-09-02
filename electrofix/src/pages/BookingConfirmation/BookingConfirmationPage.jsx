import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const BookingConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { technician, totalCost } = location.state || {};

    if (!technician) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="bg-transparent  min-h-screen flex items-center justify-center font-body-md p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-2xl p-6 md:p-8 max-w-md w-full flex flex-col items-center text-center animate-fade-in-up border border-slate-100 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                
                <div className="relative w-20 h-20 mb-4 mt-2 flex items-center justify-center">
                    <svg className="w-full h-full animate-paytm-scale drop-shadow-xl" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" fill="#00baf2" />
                        <path 
                            className="animate-paytm-draw" 
                            d="M28 53 L42 66 L72 35" 
                            stroke="white" 
                            strokeWidth="8" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                </div>
                
                <h2 className="text-[28px] font-black text-slate-900 mt-2 tracking-tight">Booking Confirmed!</h2>
                <p className="text-[15px] text-slate-500 font-medium mt-1.5">₹{totalCost} to be paid after service</p>
                
                <div className="mt-5 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl w-full text-left">
                    <p className="text-[14px] text-primary font-bold flex items-center gap-2">
                        <img src={technician.avatar} alt={technician.name} className="w-8 h-8 rounded-full object-cover shadow-sm border-2 border-white" />
                        <span>{technician.name} will be assigned shortly.</span>
                    </p>
                </div>
                
                <button 
                    onClick={() => navigate('/my-bookings')} 
                    className="mt-6 w-full bg-primary text-white font-bold px-5 py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-lg hover-lift flex items-center justify-center gap-2 text-[14px]"
                >
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span> View My Bookings
                </button>
                <button 
                    onClick={() => navigate('/discovery')} 
                    className="mt-3 w-full bg-blue-50 text-primary font-bold px-5 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm flex items-center justify-center gap-2 text-[14px]"
                >
                    <span className="material-symbols-outlined text-[18px]">search</span> Back to Technician Discovery
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;

