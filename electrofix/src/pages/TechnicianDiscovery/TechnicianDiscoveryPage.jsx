import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';

const quickCategories = [
    { name: 'Mobile Repair', icon: 'smartphone' },
    { name: 'AC Service', icon: 'ac_unit' },
    { name: 'TV Repair', icon: 'tv' },
    { name: 'Washing Machine', icon: 'local_laundry_service' },
    { name: 'Refrigerator', icon: 'kitchen' },
    { name: 'Computer Service', icon: 'computer' },
    { name: 'Electrical', icon: 'electric_bolt' },
    { name: 'Laptop Service', icon: 'laptop' }
];

const bannerImages = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80", 
    "https://images.unsplash.com/photo-1581092921461-7031e4bf0e5d?w=800&q=80", 
    "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80", 
];

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

const TechnicianDiscoveryPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { directoryTechnicians } = useContext(RegistrationContext);
    
    // States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(category ? decodeURIComponent(category) : 'All');
    const [userLocation, setUserLocation] = useState(null);
    const [locationDisplayText, setLocationDisplayText] = useState('Detecting location...');
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [manualLocationInput, setManualLocationInput] = useState('');
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);
    const [sortBy, setSortBy] = useState('distance');
    const [minRatingFilter, setMinRatingFilter] = useState(0);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [previewWorksTech, setPreviewWorksTech] = useState(null);

    const handleManualLocationSearch = async () => {
        if (!manualLocationInput.trim()) return;
        setIsSearchingLocation(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualLocationInput)}&limit=1`);
            const data = await res.json();
            if (data && data.length > 0) {
                const result = data[0];
                setUserLocation({ lat: parseFloat(result.lat), lng: parseFloat(result.lon) });
                
                const parts = result.display_name.split(',');
                if (parts.length > 1) {
                    setLocationDisplayText(`${parts[0].trim()}, ${parts[1].trim()}`);
                } else {
                    setLocationDisplayText(parts[0].trim());
                }
                setShowLocationModal(false);
                setManualLocationInput('');
            } else {
                alert("Location not found. Please try a different search term.");
            }
        } catch (err) {
            console.error(err);
            alert("Error searching location. Please try again.");
        } finally {
            setIsSearchingLocation(false);
        }
    };

    const fetchLocation = () => {
        setLocationDisplayText('Detecting location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
                        const data = await res.json();
                        if (data && data.address) {
                            const addr = data.address;
                            const local = addr.village || addr.town || addr.city || addr.suburb || addr.county || 'Current Location';
                            const district = addr.state_district || addr.city_district || '';
                            setLocationDisplayText([local, district].filter(Boolean).join(', '));
                        } else {
                            setLocationDisplayText('Current Location');
                        }
                    } catch (err) {
                        setLocationDisplayText('Current Location');
                    }
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setLocationDisplayText('Location Access Denied');
                }
            );
        } else {
            setLocationDisplayText('Geolocation unsupported');
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    // Filter Logic
    const filteredTechnicians = useMemo(() => {
        let filtered = directoryTechnicians.filter(tech => {
            let matchesSearch = true;
            let matchesCategory = true;
            
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const nameMatch = tech.name ? tech.name.toLowerCase().includes(q) : false;
                const typeMatch = tech.type ? tech.type.toLowerCase().includes(q) : false;
                const skillMatch = tech.skills ? tech.skills.some(s => s.toLowerCase().includes(q)) : false;
                matchesSearch = nameMatch || typeMatch || skillMatch;
            }
            
            if (selectedCategory !== 'All') {
                const catLower = selectedCategory.toLowerCase();
                const typeMatch = tech.type ? tech.type.toLowerCase().includes(catLower) : false;
                const skillMatch = tech.skills ? tech.skills.some(s => s.toLowerCase().includes(catLower)) : false;
                matchesCategory = typeMatch || skillMatch;
            }
            return matchesSearch && matchesCategory;
        });

        // Calculate distances and ratings
        filtered = filtered.map(tech => {
            const base = 3.5;
            const bonus = (parseInt(tech.experience) || 0) * 0.1;
            const idBonus = (parseInt(tech.id) % 5) * 0.1;
            const mockRating = Math.min(5.0, base + bonus + idBonus);

            if (userLocation && tech.lat && tech.lng) {
                const dist = getDistance(userLocation.lat, userLocation.lng, tech.lat, tech.lng);
                return { ...tech, distanceKm: dist, mockRating };
            }
            return { ...tech, distanceKm: null, mockRating };
        });

        // Filter by minimum rating
        if (minRatingFilter > 0) {
            filtered = filtered.filter(tech => tech.mockRating >= minRatingFilter);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (sortBy === 'distance') {
                if (a.distanceKm === null) return 0; // Don't sort by distance if unknown
                return a.distanceKm - b.distanceKm;
            } else if (sortBy === 'experience') {
                // Extract number from "8+ YRS EXP"
                const expA = parseInt(a.experience) || 0;
                const expB = parseInt(b.experience) || 0;
                return expB - expA; // High to Low
            }
            return 0;
        });
        
        return filtered;
    }, [directoryTechnicians, searchQuery, selectedCategory, userLocation, sortBy]);

    // Categories
    const topRated = filteredTechnicians.slice(0, 6); 
    const inDemand = filteredTechnicians.slice(6, 14);

    return (
        <div className="bg-transparent  text-slate-900 antialiased font-sans min-h-screen pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0 flex flex-col relative w-full md:max-w-md md:mx-auto md:shadow-2xl md:bg-white overflow-x-hidden">
            
            {/* Location Selection Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in">
                    <div className="bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl animate-fade-in-up">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[18px] font-extrabold text-slate-900">Select Location</h3>
                            <button onClick={() => setShowLocationModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => {
                                setShowLocationModal(false);
                                fetchLocation();
                            }} 
                            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors mb-4"
                        >
                            <span className="material-symbols-outlined">my_location</span>
                            Use Current GPS Location
                        </button>
                        
                        <div className="relative flex items-center mb-3">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input 
                                type="text"
                                value={manualLocationInput}
                                onChange={(e) => setManualLocationInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleManualLocationSearch()}
                                placeholder="Enter area, city, pincode..."
                                className="bg-transparent  border border-gray-200 text-slate-900 text-[14px] font-medium rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 outline-none"
                            />
                        </div>
                        <button 
                            onClick={handleManualLocationSearch}
                            disabled={!manualLocationInput.trim() || isSearchingLocation}
                            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {isSearchingLocation ? <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span> : null}
                            {isSearchingLocation ? 'Searching...' : 'Search Location'}
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Selection Modal (Right Drawer) */}
            {showFilterModal && (
                <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-[85%] sm:w-[350px] h-full shadow-2xl animate-slide-in-right p-5 flex flex-col overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[18px] font-extrabold text-slate-900">Sort & Filter</h3>
                            <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600 bg-transparent  p-2 rounded-full transition-colors">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-6 flex-grow">
                            {/* Sort Section */}
                            <div>
                                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Sort By</h4>
                                <div className="flex flex-col gap-3">
                                    <label className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-colors ${sortBy === 'distance' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined ${sortBy === 'distance' ? 'text-blue-600' : 'text-gray-500'}`}>near_me</span>
                                            <span className="font-bold text-[14px]">Nearest to Me</span>
                                        </div>
                                        <input type="radio" name="sort" checked={sortBy === 'distance'} onChange={() => setSortBy('distance')} className="w-4 h-4 text-blue-600" />
                                    </label>

                                    <label className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-colors ${sortBy === 'experience' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined ${sortBy === 'experience' ? 'text-blue-600' : 'text-gray-500'}`}>workspace_premium</span>
                                            <span className="font-bold text-[14px]">Highest Experience</span>
                                        </div>
                                        <input type="radio" name="sort" checked={sortBy === 'experience'} onChange={() => setSortBy('experience')} className="w-4 h-4 text-blue-600" />
                                    </label>
                                </div>
                            </div>

                            {/* Filter Section */}
                            <div>
                                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Filter By Rating</h4>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { val: 0, label: 'All Ratings' },
                                        { val: 4, label: '4+ Stars' },
                                        { val: 3, label: '3+ Stars' },
                                        { val: 2, label: '2+ Stars' }
                                    ].map(opt => (
                                        <label key={opt.val} className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-colors ${minRatingFilter === opt.val ? 'border-amber-500 bg-amber-50' : 'border-gray-100 hover:border-amber-200'}`}>
                                            <div className="flex items-center gap-3">
                                                <span className={`material-symbols-outlined ${minRatingFilter === opt.val ? 'text-amber-500' : 'text-gray-400'}`} style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                <span className="font-bold text-[14px]">{opt.label}</span>
                                            </div>
                                            <input type="radio" name="ratingFilter" checked={minRatingFilter === opt.val} onChange={() => setMinRatingFilter(opt.val)} className="w-4 h-4 text-amber-500 accent-amber-500" />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setShowFilterModal(false)}
                            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors mt-6 shadow-lg shadow-blue-200"
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            )}

            {/* Top Bar (Flipkart Style) */}
            <header className="bg-white px-4 pt-3 pb-2 flex items-center justify-between z-20 sticky top-0">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/starting')} className="flex items-center justify-center p-1 -ml-1 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <button onClick={() => navigate('/starting')} className="flex items-center cursor-pointer">
                        <img alt="RepairHub Logo" className="h-7 w-auto object-contain hover:scale-105 transition-transform" src="/logo.png" />
                        <span className="text-[16px] font-extrabold text-primary ml-1.5 tracking-tight">RepairHub</span>
                    </button>
                </div>
                
                <div onClick={() => setShowLocationModal(true)} className="flex items-center gap-1 max-w-[50%] cursor-pointer hover:bg-transparent  rounded px-1 transition-colors">
                    <span className="material-symbols-outlined text-[16px] text-slate-800" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <span className="text-[11px] text-slate-700 truncate font-medium">{locationDisplayText}</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-500">expand_more</span>
                </div>
            </header>

            {/* Search Bar */}
            <div className="bg-white px-3 py-2 z-20 border-b border-gray-100 sticky top-[50px] flex gap-2 items-center">
                <div className="relative flex items-center w-full bg-blue-50/50 rounded-lg border border-blue-200 focus-within:border-blue-500 overflow-hidden shadow-sm flex-grow">
                    <span className="material-symbols-outlined text-gray-500 pl-3 text-[20px]">search</span>
                    <input 
                        type="text"
                        placeholder="Search for Services, Brands and More"
                        className="w-full py-2.5 px-3 bg-transparent text-[13px] outline-none text-slate-800 placeholder:text-gray-500 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={() => setShowFilterModal(true)} className="flex-shrink-0 flex items-center justify-center bg-blue-50 border border-blue-200 text-blue-600 rounded-lg w-[42px] h-[42px] hover:bg-blue-100 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
            </div>

            {/* Categories Strip */}
            <div className="bg-white border-b border-gray-200 sticky top-[105px] z-10 shadow-sm">
                <div className="flex overflow-x-auto no-scrollbar gap-2 px-1">
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className={`px-3 py-3 text-[12px] font-bold whitespace-nowrap border-b-[3px] transition-colors ${selectedCategory === 'All' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'}`}
                    >
                        For You
                    </button>
                    {quickCategories.map(cat => (
                        <button 
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-3 py-3 text-[12px] font-bold whitespace-nowrap border-b-[3px] transition-colors ${selectedCategory === cat.name ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <main className="flex-grow overflow-y-auto no-scrollbar bg-transparent  flex flex-col gap-2">
                
                {/* Hero Banners */}
                {!searchQuery && selectedCategory === 'All' && (
                    <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex bg-white pb-2 pt-2">
                        {bannerImages.map((img, idx) => (
                            <div key={idx} className="w-[92vw] md:w-[400px] flex-shrink-0 snap-center px-2">
                                <img src={img} alt="Banner" className="w-full h-[160px] object-cover rounded-xl shadow-sm" />
                            </div>
                        ))}
                    </div>
                )}



                {/* All Results / Directory Listing */}
                <div className="bg-white py-4 px-3 flex-grow">
                    <h3 className="text-[16px] font-extrabold text-slate-800 mb-3 px-1">All Technicians</h3>
                    <div className="flex flex-col gap-5">
                        {filteredTechnicians.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-[14px] text-gray-500 font-medium">No services found for your search.</p>
                            </div>
                        ) : (
                            filteredTechnicians.map((tech, idx) => (
                                <div 
                                    key={tech.id} 
                                    className="bg-white border border-gray-200 rounded-xl p-3 flex flex-row gap-3 shadow-sm hover:shadow-md transition-all group animate-fade-in-up"
                                    style={{ animationDelay: `${0.1 + (idx * 0.05)}s` }}
                                >
                                    
                                    {/* Left Thumbnail */}
                                    <div 
                                        className="w-[80px] h-[80px] rounded-xl overflow-hidden flex-shrink-0 bg-transparent  relative border border-slate-100 cursor-pointer"
                                        onClick={() => tech.works && tech.works.length > 0 ? setPreviewWorksTech(tech) : navigate(`/profile/${tech.id}`, { state: { fromDiscovery: true } })}
                                        title={tech.works && tech.works.length > 0 ? "Click to see recent works" : "View Profile"}
                                    >
                                        <img alt={`Profile of ${tech.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={tech.avatar} />
                                    </div>

                                    {/* Info & Actions */}
                                    <div className="flex flex-col flex-grow min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="flex flex-col min-w-0">
                                                <h3 className="text-[14px] font-extrabold text-slate-900 truncate flex items-center gap-1.5">
                                                    {tech.name}
                                                    <span className="material-symbols-outlined text-[12px] text-emerald-500" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest truncate">{tech.type}</p>
                                                    <span className="text-[10px] text-gray-300">•</span>
                                                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                                                        <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                        {tech.mockRating ? tech.mockRating.toFixed(1) : '4.5'}
                                                    </span>
                                                    <span className="text-[10px] text-gray-300">•</span>
                                                    <span className="text-[11px] font-bold text-gray-600">{tech.experience}</span>
                                                </div>
                                            </div>
                                            {tech.establishedYear && (
                                                <span className="text-[9px] font-bold text-slate-500 bg-transparent  px-1.5 py-0.5 rounded flex-shrink-0 whitespace-nowrap">Est. {tech.establishedYear}</span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-1 mt-1 text-slate-500 truncate flex-wrap">
                                            <span className="material-symbols-outlined text-[13px]">location_on</span>
                                            <span className="text-[11px] truncate">{tech.location || 'Location Unknown'}</span>
                                            {tech.distanceKm !== null && tech.distanceKm !== undefined && tech.distanceKm !== Infinity && (
                                                <span className="text-[11px] font-extrabold text-emerald-600 ml-1 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-[12px]">directions_car</span>
                                                    {tech.distanceKm.toFixed(1)} km
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2 mt-auto pt-2">
                                            <button 
                                                onClick={() => navigate(`/profile/${tech.id}`, { state: { fromDiscovery: true } })} 
                                                className="flex items-center justify-center gap-1 w-full h-8 bg-blue-600 text-white rounded-lg text-[11px] font-bold"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                {/* Spacer for bottom nav */}
                <div className="h-4"></div>
            </main>

            {/* Bottom Nav (Mobile App Style) */}
            <nav className="fixed bottom-0 w-full md:max-w-md z-50 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                <button className="flex flex-col items-center justify-center text-blue-600 transition-all">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    <span className="font-bold text-[10px] mt-0.5">Home</span>
                </button>
                <button className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-all">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
                    <span className="font-bold text-[10px] mt-0.5">Alerts</span>
                </button>
            </nav>

            {/* Works Preview Modal */}
            {previewWorksTech && (
                <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0">
                            <h3 className="font-extrabold text-slate-900">Recent Works by {previewWorksTech.name}</h3>
                            <button onClick={() => setPreviewWorksTech(null)} className="text-gray-500 hover:text-slate-800 bg-transparent  rounded-full p-1 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 flex flex-col gap-4">
                            {previewWorksTech.works.map(work => (
                                <div key={work.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img src={work.image} alt={work.title} className="w-full h-48 sm:h-64 object-cover" />
                                    <div className="p-3 bg-transparent ">
                                        <p className="font-bold text-slate-900 text-[15px]">{work.title}</p>
                                        <p className="text-[13px] text-slate-600 mt-1">{work.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <button 
                                onClick={() => navigate(`/profile/${previewWorksTech.id}`, { state: { fromDiscovery: true } })}
                                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-md flex justify-center items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                                View Full Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnicianDiscoveryPage;

