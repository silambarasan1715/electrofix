import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';
import { Country, State, City } from 'country-state-city';
import { countryCodes } from '../../data/countryCodes';
import { categories, skillPool } from '../../data/dummyTechnicians';

const TechnicianRegistrationPage = () => {
    const navigate = useNavigate();
    const { personalDetails, updatePersonalDetails } = useContext(RegistrationContext);
    
    const [currentStep, setCurrentStep] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const initialCountryCode = personalDetails.phoneCode 
        ? (countryCodes.find(c => c.code === personalDetails.phoneCode) || countryCodes.find(c => c.iso === 'in')) 
        : countryCodes.find(c => c.iso === 'in');
    
    const [selectedCountry, setSelectedCountry] = useState(initialCountryCode || countryCodes[0]);
    const dropdownRef = useRef(null);

    const [addressCountry, setAddressCountry] = useState(personalDetails.country || '');
    const [addressState, setAddressState] = useState(personalDetails.state || '');
    const [addressCity, setAddressCity] = useState(personalDetails.city || '');

    const [profilePhoto, setProfilePhoto] = useState(personalDetails.profilePhoto || null);
    const [logo, setLogo] = useState(personalDetails.logo || null);

    const initialSkills = personalDetails.skills ? personalDetails.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    const [selectedSkills, setSelectedSkills] = useState(initialSkills);
    const [skillInput, setSkillInput] = useState('');
    const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState(skillPool);
    const skillsRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideSkills = (event) => {
            if (skillsRef.current && !skillsRef.current.contains(event.target)) {
                setShowSkillSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsideSkills);
        return () => document.removeEventListener('mousedown', handleClickOutsideSkills);
    }, []);

    const handleSkillInputChange = (e) => {
        const val = e.target.value;
        setSkillInput(val);
        const filtered = skillPool.filter(skill => 
            skill.toLowerCase().includes(val.toLowerCase()) && !selectedSkills.includes(skill)
        );
        if (val.trim() && !filtered.some(s => s.toLowerCase() === val.toLowerCase()) && !selectedSkills.some(s => s.toLowerCase() === val.toLowerCase())) {
            filtered.push(val.trim());
        }
        setFilteredSkills(filtered);
        setShowSkillSuggestions(true);
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (skillInput.trim()) {
                addSkill(skillInput.trim());
            }
        } else if (e.key === 'Backspace' && !skillInput && selectedSkills.length > 0) {
            removeSkill(selectedSkills[selectedSkills.length - 1]);
        }
    };

    const addSkill = (skill) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
        setSkillInput('');
        setShowSkillSuggestions(false);
    };

    const removeSkill = (skillToRemove) => {
        setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
    };

    const availableCountries = Country.getAllCountries();
    const availableStates = addressCountry ? State.getStatesOfCountry(addressCountry) : [];
    const availableCities = addressState ? City.getCitiesOfState(addressCountry, addressState) : [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNext = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        const requiredFields = ['fullName', 'email', 'password', 'phone', 'address', 'country', 'state', 'city', 'zip', 'technicianType', 'experienceYears'];
        for (let field of requiredFields) {
            if (!formData.get(field)) {
                alert(`Please fill out all required fields.`);
                return;
            }
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        updatePersonalDetails({
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: password,
            phoneCode: selectedCountry.code,
            phone: formData.get('phone'),
            address: formData.get('address'),
            country: addressCountry,
            state: addressState,
            city: addressCity,
            zip: formData.get('zip'),
            technicianType: formData.get('technicianType'),
            experienceYears: formData.get('experienceYears'),
            skills: formData.get('skills'),
            profilePhoto: profilePhoto,
            logo: logo
        });

        navigate('/technician-verification');
    };

    const inputClass = "w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm";
    const inputWithIconClass = "w-full bg-white/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm";
    const labelClass = "text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
    const sectionTitleClass = "text-[18px] font-extrabold text-slate-900 mb-4 border-b border-slate-200/60 pb-3";
    const cardClass = "bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md";

    return (
        <div className="bg-background text-slate-900 font-body-md min-h-screen flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* TopNavBar */}
            <header className="glass fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-16 animate-fade-in-up">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-6 w-auto hover:scale-105 transition-transform" />
                        <span className="text-[20px] font-extrabold text-primary tracking-tight">
                            RepairHub
                        </span>
                    </Link>
                </div>
            </header>
            
            <div className="flex flex-1 pt-16">
                {/* SideNavBar as Progress Indicator */}
                <aside className="hidden md:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] p-6 space-y-4 bg-white/50 backdrop-blur-sm border-r border-slate-200/60 w-64 z-40 animate-fade-in">
                    <div className="mb-4 px-3">
                        <h2 className="text-[18px] font-extrabold text-slate-900">Registration</h2>
                        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mt-1">Technician Portal</p>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2">
                        {/* Active Step */}
                        <a className="flex items-center gap-3 px-4 py-3 bg-primary text-white font-bold rounded-lg text-[13px] shadow-sm hover-lift transition-all" href="#">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">person</span>
                            </div>
                            Registration Details
                        </a>
                        {/* Inactive Steps */}
                        <Link to="/technician-verification" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100/50 hover:text-primary transition-all rounded-lg font-bold text-[13px] cursor-pointer">
                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                            </div>
                            Identity Verification
                        </Link>
                        <Link to="/technician-certification" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100/50 hover:text-primary transition-all rounded-lg font-bold text-[13px] cursor-pointer">
                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                            </div>
                            Certifications
                        </Link>
                        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100/50 hover:text-primary transition-all rounded-lg font-bold text-[13px] cursor-pointer" href="#">
                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                            </div>
                            Review
                        </a>
                    </nav>
                </aside>
                
                {/* Main Content Area */}
                <main className="flex-1 md:ml-64 p-6 md:p-8 pb-20 overflow-y-auto relative z-10">
                    <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {/* Mobile Progress Header */}
                        <div className="md:hidden mb-8">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Part {currentStep} of 3</p>
                            <h1 className="text-[24px] font-extrabold text-slate-900 mb-3">Registration Details</h1>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div className={`bg-primary h-full rounded-full transition-all duration-300`} style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                            </div>
                        </div>
                        
                        {/* Desktop Header */}
                        <div className="hidden md:block mb-8">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Part {currentStep} of 3</p>
                            <h1 className="text-[28px] font-extrabold text-slate-900 mb-2 tracking-tight">Registration Details</h1>
                            <p className="text-[14px] text-slate-600 font-medium">Please provide your contact information for industrial certification records.</p>
                            
                            {/* Step indicators */}
                            <div className="flex gap-2 mt-6">
                                <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-slate-200'}`}></div>
                                <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
                                <div className={`h-1.5 flex-1 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-slate-200'}`}></div>
                            </div>
                        </div>
                        
                        {/* Form */}
                        <form className="flex flex-col gap-6" onSubmit={handleNext}>
                            
                            {/* Card 1: Professional Details */}
                            <div className={`${cardClass} ${currentStep === 1 ? 'block' : 'hidden'}`}>
                                <h3 className={sectionTitleClass}>Professional Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Full Name */}
                                    <div className="col-span-1 md:col-span-2">
                                        <label className={labelClass} htmlFor="fullName">Name</label>
                                        <input className={inputClass} id="fullName" name="fullName" type="text" defaultValue={personalDetails.fullName} />
                                        <p className="text-[11px] font-medium text-slate-500 mt-1 ml-1">Must match your government-issued ID exactly.</p>
                                    </div>
                                    
                                    {/* Email */}
                                    <div className="col-span-1 md:col-span-2">
                                        <label className={labelClass} htmlFor="email">Professional Email</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">mail</span>
                                            <input className={inputWithIconClass} id="email" name="email" type="email" defaultValue={personalDetails.email} />
                                        </div>
                                    </div>
                                    
                                    {/* Password */}
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="password">Password</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">lock</span>
                                            <input className={inputWithIconClass} id="password" name="password" type="password" defaultValue={personalDetails.password} minLength={8} />
                                        </div>
                                    </div>
                                    
                                    {/* Confirm Password */}
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="confirmPassword">Confirm Password</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">lock</span>
                                            <input className={inputWithIconClass} id="confirmPassword" name="confirmPassword" type="password" minLength={8} />
                                        </div>
                                    </div>
                                    
                                    {/* Phone */}
                                    <div className="col-span-1 md:col-span-2">
                                        <label className={labelClass} htmlFor="phone">Mobile Phone</label>
                                        <div className="flex gap-2">
                                            <div className="relative w-[110px] shrink-0" ref={dropdownRef}>
                                                <div 
                                                    className={`${inputClass} cursor-pointer flex items-center justify-between`}
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <img 
                                                            src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} 
                                                            alt={selectedCountry.name} 
                                                            className="w-5 h-auto rounded-sm shadow-sm"
                                                        />
                                                        <span>{selectedCountry.code}</span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-slate-400 text-[16px]">keyboard_arrow_down</span>
                                                </div>
                                                
                                                {isDropdownOpen && (
                                                    <div className="absolute top-full left-0 mt-1 w-52 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2">
                                                        {countryCodes.map((country, index) => (
                                                            <div 
                                                                key={index} 
                                                                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                                                                onClick={() => {
                                                                    setSelectedCountry(country);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                            >
                                                                <img 
                                                                    src={`https://flagcdn.com/w20/${country.iso}.png`} 
                                                                    alt={country.name} 
                                                                    className="w-5 h-auto rounded-sm shadow-sm"
                                                                />
                                                                <span className="text-[12px] font-bold">{country.code}</span>
                                                                <span className="text-[12px] text-slate-500 truncate">{country.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative flex-1 group">
                                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">smartphone</span>
                                                <input className={inputWithIconClass} id="phone" name="phone" type="tel" defaultValue={personalDetails.phone} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Primary Operating Location */}
                            <div className={`${cardClass} ${currentStep === 2 ? 'block' : 'hidden'}`}>
                                <h3 className={sectionTitleClass}>Primary Operating Location</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className={labelClass} htmlFor="address">Street Address</label>
                                        <input className={inputClass} id="address" name="address" type="text" defaultValue={personalDetails.address} />
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="country">Country</label>
                                        <select 
                                            className={`${inputClass} appearance-none`}
                                            id="country" 
                                            name="country"
                                            value={addressCountry}
                                            onChange={(e) => {
                                                setAddressCountry(e.target.value);
                                                setAddressState('');
                                                setAddressCity('');
                                            }}
                                        >
                                            <option value="">Select Country...</option>
                                            {availableCountries.map(c => (
                                                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="state">State/Province</label>
                                        {availableStates.length > 0 ? (
                                            <select 
                                                className={`${inputClass} appearance-none`}
                                                id="state" 
                                                name="state"
                                                value={addressState}
                                                onChange={(e) => {
                                                    setAddressState(e.target.value);
                                                    setAddressCity('');
                                                }}
                                            >
                                                <option value="">Select State...</option>
                                                {availableStates.map(s => (
                                                    <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input 
                                                className={`${inputClass} disabled:opacity-50 disabled:bg-slate-100`}
                                                id="state" 
                                                name="state" 
                                                type="text" 
                                                value={addressState}
                                                onChange={(e) => setAddressState(e.target.value)}
                                                placeholder={!addressCountry ? "Select a country first" : "Enter state"}
                                                disabled={!addressCountry}
                                            />
                                        )}
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="city">City/District</label>
                                        {availableCities.length > 0 ? (
                                            <select 
                                                className={`${inputClass} appearance-none`}
                                                id="city" 
                                                name="city"
                                                value={addressCity}
                                                onChange={(e) => setAddressCity(e.target.value)}
                                            >
                                                <option value="">Select City/District...</option>
                                                {availableCities.map(c => (
                                                    <option key={c.name} value={c.name}>{c.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input 
                                                className={`${inputClass} disabled:opacity-50 disabled:bg-slate-100`}
                                                id="city" 
                                                name="city" 
                                                type="text" 
                                                value={addressCity}
                                                onChange={(e) => setAddressCity(e.target.value)}
                                                placeholder={!addressState ? "Select a state first" : "Enter city"}
                                                disabled={!addressState && availableStates.length > 0}
                                            />
                                        )}
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="zip">Postal Code</label>
                                        <input className={inputClass} id="zip" name="zip" type="text" defaultValue={personalDetails.zip} />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Professional Profile */}
                            <div className={`${cardClass} ${currentStep === 3 ? 'block' : 'hidden'}`}>
                                <h3 className={sectionTitleClass}>Professional Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="technicianType">Technician Type</label>
                                        <select 
                                            className={`${inputClass} appearance-none`}
                                            id="technicianType" 
                                            name="technicianType"
                                            defaultValue={personalDetails.technicianType}
                                        >
                                            <option value="">Select Category...</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="col-span-1">
                                        <label className={labelClass} htmlFor="experienceYears">Years of Experience</label>
                                        <input className={inputClass} id="experienceYears" name="experienceYears" type="number" min="0" step="1" defaultValue={personalDetails.experienceYears} />
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-2" ref={skillsRef}>
                                        <label className={labelClass}>Key Skills</label>
                                        <input type="hidden" name="skills" value={selectedSkills.join(', ')} />
                                        <div className="relative">
                                            <div 
                                                className={`w-full bg-white/50 border border-slate-200 rounded-lg px-3 py-2 flex flex-wrap gap-1.5 items-center min-h-[46px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all cursor-text shadow-sm`}
                                                onClick={() => document.getElementById('skillInput').focus()}
                                            >
                                                {selectedSkills.map(skill => (
                                                    <span key={skill} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-primary rounded-md font-bold text-[11px] border border-blue-100 shadow-sm">
                                                        {skill}
                                                        <span 
                                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-500 transition-colors bg-white rounded-full"
                                                            onClick={(e) => { e.stopPropagation(); removeSkill(skill); }}
                                                        >
                                                            close
                                                        </span>
                                                    </span>
                                                ))}
                                                <input 
                                                    id="skillInput"
                                                    type="text" 
                                                    className="flex-1 min-w-[130px] bg-transparent border-none outline-none font-medium text-[13px] text-slate-900 placeholder:text-slate-400 focus:ring-0 px-1 py-0.5"
                                                    value={skillInput}
                                                    onChange={handleSkillInputChange}
                                                    onKeyDown={handleSkillKeyDown}
                                                    onFocus={() => {
                                                        setFilteredSkills(skillPool.filter(skill => !selectedSkills.includes(skill)));
                                                        setShowSkillSuggestions(true);
                                                    }}
                                                    placeholder={selectedSkills.length === 0 ? "Type to add skill..." : ""}
                                                />
                                            </div>
                                            {showSkillSuggestions && filteredSkills.length > 0 && (
                                                <ul className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5">
                                                    {filteredSkills.map(skill => (
                                                        <li 
                                                            key={skill}
                                                            className="px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer font-medium text-[12px] text-slate-700 transition-colors"
                                                            onClick={() => addSkill(skill)}
                                                        >
                                                            {skill}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-2">
                                        <label className={labelClass}>Profile Photo (Verification)</label>
                                        <label className="flex items-center justify-center w-full h-[50px] bg-white/50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-primary transition-all overflow-hidden relative group">
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />
                                            <span className={`material-symbols-outlined mr-2 text-[20px] ${profilePhoto ? 'text-emerald-500' : 'text-slate-400 group-hover:text-primary transition-colors'}`}>
                                                {profilePhoto ? 'check_circle' : 'add_a_photo'}
                                            </span>
                                            <span className={`font-bold text-[13px] truncate px-2 ${profilePhoto ? 'text-slate-800' : 'text-slate-500 group-hover:text-primary transition-colors'}`}>
                                                {profilePhoto ? profilePhoto.name : 'Upload Photo'}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-3 pt-4">
                                {currentStep === 1 && (
                                    <>
                                        <Link to="/" className="w-full md:w-auto px-6 py-2.5 bg-white text-slate-700 border border-slate-300 font-bold text-[13px] rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all text-center shadow-sm">
                                            Cancel
                                        </Link>
                                        <button type="button" onClick={() => setCurrentStep(2)} className="w-full md:w-auto px-6 py-2.5 bg-primary text-white font-bold text-[13px] rounded-lg hover:bg-primary-hover shadow-md hover-lift transition-all flex justify-center items-center gap-2">
                                            Next Step
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </>
                                )}
                                
                                {currentStep === 2 && (
                                    <>
                                        <button type="button" onClick={() => setCurrentStep(1)} className="w-full md:w-auto px-6 py-2.5 bg-white text-slate-700 border border-slate-300 font-bold text-[13px] rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all text-center shadow-sm flex justify-center items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                            Back
                                        </button>
                                        <button type="button" onClick={() => setCurrentStep(3)} className="w-full md:w-auto px-6 py-2.5 bg-primary text-white font-bold text-[13px] rounded-lg hover:bg-primary-hover shadow-md hover-lift transition-all flex justify-center items-center gap-2">
                                            Next Step
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </>
                                )}

                                {currentStep === 3 && (
                                    <>
                                        <button type="button" onClick={() => setCurrentStep(2)} className="w-full md:w-auto px-6 py-2.5 bg-white text-slate-700 border border-slate-300 font-bold text-[13px] rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all text-center shadow-sm flex justify-center items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                            Back
                                        </button>
                                        <button type="submit" className="w-full md:w-auto px-6 py-2.5 bg-primary text-white font-bold text-[13px] rounded-lg hover:bg-primary-hover shadow-md hover-lift transition-all flex justify-center items-center gap-2">
                                            Continue to Verification
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                        
                        {/* Support Contact */}
                        <div className="mt-8 text-center flex items-center justify-center gap-2 text-slate-500 bg-white/40 p-3 rounded-xl backdrop-blur-sm border border-white/50">
                            <span className="material-symbols-outlined text-[16px]">help</span>
                            <span className="text-[13px] font-medium">Need help with registration? <a className="text-primary font-bold hover:underline ml-1" href="#">Contact Support</a></span>
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Footer */}
            <footer className="w-full py-5 px-6 flex flex-col md:flex-row justify-between items-center gap-3 mt-auto bg-white/50 backdrop-blur-sm border-t border-slate-200/60 md:pl-64 z-50 relative">
                <div className="font-extrabold text-[14px] text-primary">
                    RepairHub
                </div>
                <div className="font-medium text-[12px] text-slate-500 text-center md:text-left">
                    © 2024 RepairHub Industrial Services. All rights reserved.
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <a className="font-bold text-[12px] text-slate-500 hover:text-primary transition-colors duration-150" href="#">Privacy Policy</a>
                    <a className="font-bold text-[12px] text-slate-500 hover:text-primary transition-colors duration-150" href="#">Terms of Service</a>
                    <a className="font-bold text-[12px] text-slate-500 hover:text-primary transition-colors duration-150" href="#">Security Standards</a>
                </div>
            </footer>
        </div>
    );
};

export default TechnicianRegistrationPage;
