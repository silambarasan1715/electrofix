import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { RegistrationContext } from '../../context/RegistrationContext';

const TechnicianProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { directoryTechnicians, technicianReviews, addReview, deleteReview, updateTechnicianDetails } = useContext(RegistrationContext);
    
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    
    const fromDiscovery = location.state?.fromDiscovery || false;
    const isOwner = localStorage.getItem('technicianId') === id && !fromDiscovery;
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    
    useEffect(() => {
        setUserName(localStorage.getItem('userName') || '');
    }, []);

    const technician = directoryTechnicians.find(tech => tech.id === id);
    const reviews = technicianReviews[id] || [];
    
    const averageRating = reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + Number(curr.rating), 0) / reviews.length).toFixed(1) : 'New';

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        addReview(id, { rating: Number(rating), comment, author: userName || 'Anonymous User' });
        setComment('');
        setRating(5);
    };

    const handleEditToggle = () => {
        if (!isEditing) {
            setEditData({
                name: technician.name,
                type: technician.type,
                experience: technician.experience,
                location: technician.location,
                operatingHours: technician.operatingHours || 'Mon-Sat 9:00 AM - 8:00 PM',
                avatar: technician.avatar,
                works: technician.works || [],
                skills: technician.skills || []
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = () => {
        updateTechnicianDetails(id, editData);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEditData({ ...editData, avatar: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const handleAddWorkImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const newWork = {
                id: `work_${Date.now()}`,
                title: "Recent Work",
                description: "Work completed by technician",
                image: URL.createObjectURL(e.target.files[0])
            };
            setEditData({ ...editData, works: [...(editData.works || []), newWork] });
        }
    };

    const handleRemoveWorkImage = (workId) => {
        setEditData({ ...editData, works: editData.works.filter(w => w.id !== workId) });
    };

    if (!technician) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-transparent  text-slate-800">
                <h2 className="text-2xl font-bold">Technician Not Found</h2>
                <button onClick={() => navigate(-1)} className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-bold hover-lift">Go Back</button>
            </div>
        );
    }

    return (
        <div className="bg-transparent  text-slate-800 flex flex-col min-h-screen relative overflow-hidden font-body-md">
            {/* Background elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* TopNavBar */}
            <nav className="glass absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-16 animate-fade-in-up">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center justify-center">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <span className="text-[24px] font-extrabold text-primary tracking-tight">RepairHub</span>
                </div>
                <div className="flex items-center gap-6">
                    {isOwner && (
                        <button onClick={isEditing ? handleSaveProfile : handleEditToggle} className="bg-primary text-white px-4 py-1.5 rounded-lg font-bold text-[13px] hover:bg-primary-hover shadow-md transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">{isEditing ? 'save' : 'edit'}</span>
                            {isEditing ? 'Save Profile' : 'Edit Profile'}
                        </button>
                    )}
                    <button className="text-primary font-bold border-b-2 border-primary hover:text-primary-hover transition-colors cursor-pointer pb-1">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-20 md:pt-24 pb-6 px-4 md:px-8 w-full max-w-[1200px] mx-auto z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Profile Header Section */}
                <div className="bg-white/70 backdrop-blur-md rounded-3xl border-2 border-slate-200 p-5 mb-5 flex flex-col md:flex-row gap-5 items-start md:items-center relative shadow-xl">
                    <div className="relative shrink-0">
                        <img alt={`${technician.name} Profile`} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" src={isEditing ? editData.avatar : technician.avatar} />
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-[3px] border-white flex items-center justify-center shadow-md" title="Available"></div>
                        {isEditing && (
                            <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                <span className="material-symbols-outlined">edit</span>
                            </label>
                        )}
                    </div>
                    <div className="flex-grow w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <div>
                                {isEditing ? (
                                    <input 
                                        name="name" 
                                        value={editData.name} 
                                        onChange={handleChange} 
                                        className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight bg-white/50 border border-slate-300 rounded-lg px-3 py-1 outline-none w-full"
                                    />
                                ) : (
                                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{technician.name}</h1>
                                )}
                                
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="text-lg text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">engineering</span> 
                                        {isEditing ? (
                                            <input 
                                                name="type" 
                                                value={editData.type} 
                                                onChange={handleChange} 
                                                className="bg-white/50 border border-slate-300 rounded-lg px-2 py-1 outline-none text-sm w-48"
                                            />
                                        ) : (
                                            technician.type
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
                                {!isOwner && (
                                    <button onClick={() => navigate(`/book/${technician.id}`)} className="bg-primary text-white font-bold px-6 py-3.5 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-lg hover-lift w-full sm:flex-1 md:w-auto md:flex-none">
                                        <span className="material-symbols-outlined text-[20px]">calendar_month</span> Book Service
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/60">
                            <div className="flex items-start gap-2 sm:gap-4">
                                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                                    <span className="material-symbols-outlined text-[16px] sm:text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Rating</p>
                                    <p className="text-[12px] sm:text-[15px] font-bold text-slate-800 flex items-baseline gap-1">
                                        {averageRating}
                                        {reviews.length > 0 && <span className="text-[10px] sm:text-[12px] font-medium text-slate-500">({reviews.length})</span>}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-4">
                                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-transparent  flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[16px] sm:text-[20px]">work_history</span>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Experience</p>
                                    {isEditing ? (
                                        <input 
                                            name="experience" 
                                            value={editData.experience} 
                                            onChange={handleChange} 
                                            className="text-[12px] sm:text-[14px] font-bold text-slate-800 bg-white/50 border border-slate-300 rounded-lg px-2 py-1 outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-[12px] sm:text-[15px] font-bold text-slate-800">{technician.experience}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-4">
                                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-transparent  flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[16px] sm:text-[20px]">location_on</span>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Base Location</p>
                                    {isEditing ? (
                                        <input 
                                            name="location" 
                                            value={editData.location} 
                                            onChange={handleChange} 
                                            className="text-[12px] sm:text-[14px] font-bold text-slate-800 bg-white/50 border border-slate-300 rounded-lg px-2 py-1 outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-[12px] sm:text-[15px] font-bold text-slate-800">{technician.location}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-4">
                                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-transparent  flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[16px] sm:text-[20px]">schedule</span>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Availability</p>
                                    {isEditing ? (
                                        <input 
                                            name="operatingHours" 
                                            value={editData.operatingHours} 
                                            onChange={handleChange} 
                                            className="text-[12px] sm:text-[14px] font-bold text-slate-800 bg-white/50 border border-slate-300 rounded-lg px-2 py-1 outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-[12px] sm:text-[15px] font-bold text-slate-800">{technician.operatingHours || 'Mon-Sat 9:00 AM - 8:00 PM'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    {/* Main Content Area */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200/60">
                            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[24px]">collections</span> Services Done
                            </h2>
                            {isEditing && (
                                <label className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold text-sm cursor-pointer hover:bg-primary/20 transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span> Add Image
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAddWorkImage} />
                                </label>
                            )}
                        </div>
                        
                        {/* Dynamic Works Gallery */}
                        {((isEditing ? editData.works : technician.works) && (isEditing ? editData.works : technician.works).length > 0) ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {(isEditing ? editData.works : technician.works).map(work => (
                                    <div key={work.id} className="rounded-2xl overflow-hidden border border-white shadow-md relative group h-48 md:h-64 bg-transparent  hover-lift">
                                        <img alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={work.image} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                            <p className="text-white font-extrabold text-lg leading-tight mb-2">{work.title}</p>
                                            <p className="text-slate-200 text-sm line-clamp-2 font-medium">{work.description}</p>
                                        </div>
                                        {isEditing && (
                                            <button onClick={() => handleRemoveWorkImage(work.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-100 shadow-md hover:bg-red-600">
                                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {/* Bento Grid Gallery Fallback */}
                                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-white shadow-md relative group h-64 md:h-96 bg-transparent  hover-lift">
                                    <img alt="Complex industrial circuit board repair" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkq-728vMcc4OrsHjhKQL_5_hFcrRJK04lzVZmB3wT8X7M98LUvPQLiZZkOFWEIVsf9S60dAu00-szBBmWJ7BkJN5220Ko9_DuPIUn0T5NWYQZJPoY1WR4zdSPB0Z2Q3llxUeExCYtD0-uMBS5OEe29Crz2wogjGZXYp6bSZDlyWRr6SZtYjoaFrGff0gT9Dl2HSMcYqmHjAM5etG7V-C1rS6UOUTpIuXGL5pgkliF_W_zS6hwURaZPg" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                        <p className="text-white font-extrabold text-lg">Circuit Board Micro-Soldering</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden border border-white shadow-md relative group h-32 md:h-48 bg-transparent  hover-lift">
                                    <img alt="HVAC unit inspection" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI-jABni-SOopOSEsa3buL5xPwdWVsnQHwN-_ZlVmhbCvpoT7aK369Da_r4pTOMviMHBu6oEY2F_6EzF_4RF6WWumW6jyjyggRSBmmVL5HXaj2OMsMzGPbNv4t2muuwMkTjTJcyhZuu4WRLcI9iJoAZYUMR7aKvRocDyy0rPmxvv1wJVg0AR0h_qsXtqRGIfzLtFCGK66zsJbcCFSlV4ViAEWGjiEeW6lXd9yuLhcUZ4b6fQj8mCnRfA" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white font-extrabold text-[15px]">HVAC System Overhaul</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden border border-white shadow-md relative group h-32 md:h-48 bg-transparent  hover-lift">
                                    <img alt="Industrial electrical panel wiring" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFrmUavxbGGWrTmgflQ2D7FiW5Di2sbOorgf071kfay6v0f3lsstjtUuoRIuWwgLFgRM5k8qcLeztdtR136UI0I-dWAWyCLt9hcmm6nqxkjKVDsEDRVre35TBExI7m50PslyaHDs7IMuACQXXzr51KbGct0GV5r3OQDzCWvA3GAbfSRU0novP7AtRhiBwu3Qr4WhvOB2pacGk46lmcsoz5zGT_96DTy1zBJYpe5bd0iEDbKe8oNjxqZg" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white font-extrabold text-[15px]">Industrial Panel Wiring</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Dynamic Offers List */}
                        {technician.offers && technician.offers.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-slate-200/60">
                                <h3 className="text-lg md:text-xl font-extrabold text-emerald-700 flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[24px]">local_offer</span> Active Offers
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {technician.offers.map((offer) => (
                                        <div key={offer.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6 shadow-md relative overflow-hidden hover-lift">
                                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-500 to-teal-600 text-white text-[11px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">Active</div>
                                            <h4 className="font-extrabold text-emerald-900 text-[18px] mb-2">{offer.title}</h4>
                                            <p className="text-sm text-emerald-700/90 mb-4 font-medium">{offer.description}</p>
                                            {offer.code && (
                                                <div className="inline-block bg-white/80 backdrop-blur-sm border border-emerald-300 px-4 py-2 rounded-lg text-sm font-mono font-bold text-emerald-800 shadow-sm">
                                                    Code: {offer.code}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dynamic Skills List */}
                        <div className="mt-6 pt-6 border-t border-slate-200/60">
                            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">verified</span> Expertise
                            </h3>
                            {isEditing ? (
                                <input 
                                    name="skills" 
                                    value={editData.skills?.join(', ')} 
                                    onChange={(e) => setEditData({...editData, skills: e.target.value.split(',').map(s => s.trim())})} 
                                    className="w-full bg-white/50 border border-slate-300 rounded-lg px-3 py-2 outline-none text-[14px] font-medium"
                                    placeholder="Enter skills separated by commas"
                                />
                            ) : (
                                (technician.skills && technician.skills.length > 0) ? (
                                    <div className="flex overflow-x-auto flex-nowrap gap-3 pb-2 -mx-2 px-2 custom-scrollbar">
                                        {technician.skills.map((skill, index) => (
                                            <span key={index} className="shrink-0 px-4 py-2 bg-transparent  border border-slate-200 rounded-lg text-[14px] text-slate-700 font-bold shadow-sm whitespace-nowrap">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm">No skills added yet.</p>
                                )
                            )}
                        </div>

                        {/* Reviews & Ratings Section */}
                        <div className="mt-6 pt-6 border-t border-slate-200/60">
                            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-yellow-500 text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span> 
                                Reviews & Ratings
                            </h3>
                            
                            {/* Submit Review Form - Hidden for Owner */}
                            {!isOwner && (
                                <form onSubmit={handleReviewSubmit} className="bg-transparent  p-4 rounded-xl border border-slate-200 mb-6 shadow-sm">
                                    <h4 className="text-[14px] font-bold text-slate-800 mb-3">Write a Review</h4>
                                    <textarea 
                                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[14px] text-slate-800 resize-none mb-3" 
                                        rows="2" 
                                        placeholder="Share your experience with this technician..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    key={star} 
                                                    type="button" 
                                                    onClick={() => setRating(star)}
                                                    className={`material-symbols-outlined text-[28px] transition-colors ${rating >= star ? 'text-yellow-500' : 'text-slate-300'}`}
                                                    style={{fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0"}}
                                                >
                                                    star
                                                </button>
                                            ))}
                                        </div>
                                        <button type="submit" disabled={!comment.trim()} className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-primary-hover transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-[18px]">send</span> Submit Review
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Reviews List */}
                            <div className="flex flex-col gap-5">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-10 bg-white/50 rounded-2xl border border-slate-100">
                                        <p className="text-slate-500 font-medium">No reviews yet. Be the first to share your experience!</p>
                                    </div>
                                ) : (
                                    reviews.map((rev) => (
                                        <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 animate-fade-in">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-[16px]">
                                                        {rev.author.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h5 className="font-extrabold text-slate-900 text-[15px] leading-tight">{rev.author}</h5>
                                                        <span className="text-[12px] text-slate-500 font-medium">{new Date(rev.date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                {rev.author === userName && userName !== '' && (
                                                    <button onClick={() => deleteReview(id, rev.id)} className="text-red-400 hover:text-red-600 transition-colors p-1 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-lg shadow-sm border border-red-100" title="Delete Review">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-slate-600 text-[14px] leading-relaxed mt-1 font-medium">{rev.comment}</p>
                                            <div className="flex items-center text-yellow-500 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`material-symbols-outlined text-[16px] ${i < rev.rating ? '' : 'text-slate-300'}`} style={{fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0"}}>star</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default TechnicianProfilePage;

