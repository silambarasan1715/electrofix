import React, { createContext, useState } from 'react';
import { dummyTechnicians } from '../data/dummyTechnicians';

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
    const [personalDetails, setPersonalDetails] = useState({
        fullName: '',
        email: '',
        phoneCode: '+91',
        phone: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        technicianType: '',
        experienceYears: '',
        skills: '',
        profilePhoto: null,
        logo: null
    });

    const [directoryTechnicians, setDirectoryTechnicians] = useState(() => {
        try {
            const registered = JSON.parse(localStorage.getItem('registeredTechnicians') || '[]');
            return [...dummyTechnicians, ...registered];
        } catch (e) {
            return dummyTechnicians;
        }
    });

    const [userBookings, setUserBookings] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('userBookings') || '[]');
        } catch (e) {
            return [];
        }
    });

    const addBooking = (booking) => {
        setUserBookings(prev => {
            const updated = [{ ...booking, id: Date.now().toString(), status: 'Pending', createdAt: new Date().toISOString() }, ...prev];
            localStorage.setItem('userBookings', JSON.stringify(updated));
            return updated;
        });
    };

    const removeBooking = (id) => {
        setUserBookings(prev => {
            const updated = prev.filter(b => b.id !== id);
            localStorage.setItem('userBookings', JSON.stringify(updated));
            return updated;
        });
    };

    const addTechnicianToDirectory = (technician) => {
        setDirectoryTechnicians(prev => [...prev, technician]);
    };

    const updateTechnicianDetails = (id, newDetails) => {
        setDirectoryTechnicians(prev => prev.map(tech => 
            tech.id === id ? { ...tech, ...newDetails } : tech
        ));
    };

    const [verificationDetails, setVerificationDetails] = useState({
        aadhaar: '',
        pan: '',
        panFile: null
    });

    const [certifications, setCertifications] = useState([]);

    const [technicianReviews, setTechnicianReviews] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('technicianReviews') || '{}');
        } catch (e) {
            return {};
        }
    });

    const addReview = (technicianId, review) => {
        setTechnicianReviews(prev => {
            const currentReviews = prev[technicianId] || [];
            const newReviews = [...currentReviews, { ...review, id: Date.now().toString(), date: new Date().toISOString() }];
            const updatedState = { ...prev, [technicianId]: newReviews };
            localStorage.setItem('technicianReviews', JSON.stringify(updatedState));
            return updatedState;
        });
    };

    const deleteReview = (technicianId, reviewId) => {
        setTechnicianReviews(prev => {
            const currentReviews = prev[technicianId] || [];
            const newReviews = currentReviews.filter(rev => rev.id !== reviewId);
            const updatedState = { ...prev, [technicianId]: newReviews };
            localStorage.setItem('technicianReviews', JSON.stringify(updatedState));
            return updatedState;
        });
    };

    const updatePersonalDetails = (details) => {
        setPersonalDetails(prev => ({ ...prev, ...details }));
    };

    const updateVerificationDetails = (details) => {
        setVerificationDetails(prev => ({ ...prev, ...details }));
    };

    const updateCertifications = (files) => {
        setCertifications(files);
    };

    return (
        <RegistrationContext.Provider value={{
            personalDetails,
            updatePersonalDetails,
            verificationDetails,
            updateVerificationDetails,
            certifications,
            updateCertifications,
            directoryTechnicians,
            addTechnicianToDirectory,
            updateTechnicianDetails,
            userBookings,
            addBooking,
            removeBooking,
            technicianReviews,
            addReview,
            deleteReview
        }}>
            {children}
        </RegistrationContext.Provider>
    );
};
