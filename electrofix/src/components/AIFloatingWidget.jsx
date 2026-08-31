import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AIFloatingWidget = ({ onClick }) => {
    return (
        <div className="fixed bottom-6 right-6 z-50 font-body-md">
            {onClick ? (
                <button 
                    onClick={onClick}
                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary-hover hover:scale-110 transition-all duration-300 relative group animate-bounce-slow cursor-pointer border-none outline-none"
                >
                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-md group-hover:blur-lg transition-all -z-10"></div>
                    <img src="/ai-logo.png" alt="AI Logo" className="w-full h-full object-cover rounded-full" />
                </button>
            ) : (
                <Link 
                    to="/ai-troubleshooting"
                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary-hover hover:scale-110 transition-all duration-300 relative group animate-bounce-slow cursor-pointer"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-md group-hover:blur-lg transition-all -z-10"></div>
                    <img src="/ai-logo.png" alt="AI Logo" className="w-full h-full object-cover rounded-full" />
                </Link>
            )}
        </div>
    );
};

export default AIFloatingWidget;
