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
        <div className="bg-background min-h-screen flex items-center justify-center font-body-md p-6">
            <div className="bg-white/95 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 md:p-16 max-w-lg w-full flex flex-col items-center text-center animate-fade-in-up border border-slate-100 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                
                <div className="relative w-32 h-32 mb-8 mt-6 flex items-center justify-center">
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
                
                <h2 className="text-[36px] font-black text-slate-900 mt-2 tracking-tight">Booking Confirmed!</h2>
                <p className="text-[18px] text-slate-500 font-medium mt-3">₹{totalCost} to be paid after service</p>
                
                <div className="mt-8 px-6 py-4 bg-blue-50 border border-blue-100 rounded-2xl w-full text-left">
                    <p className="text-[16px] text-primary font-bold flex items-center gap-3">
                        <img src={technician.avatar} alt={technician.name} className="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-white" />
                        <span>{technician.name} will be assigned shortly.</span>
                    </p>
                </div>
                
                <button 
                    onClick={() => navigate('/my-bookings')} 
                    className="mt-10 w-full bg-primary text-white font-bold px-6 py-4 rounded-xl hover:bg-primary-hover transition-colors shadow-lg hover-lift flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span> View My Bookings
                </button>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-4 w-full bg-transparent text-slate-500 font-bold px-6 py-3 hover:text-primary transition-colors flex items-center justify-center"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;
