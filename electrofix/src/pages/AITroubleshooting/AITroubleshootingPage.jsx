import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AITroubleshootingPage = () => {
    const userName = localStorage.getItem('userName') || 'Guest';
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: text.trim(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            generateBotResponse(userMsg.text);
        }, 1000 + Math.random() * 800);
    };

    const generateBotResponse = (userInput) => {
        const text = userInput.toLowerCase();
        let botText = '';

        if (/^(hi|hello|hey|greetings|good morning|good evening|hii)/.test(text)) {
            botText = `Hello ${userName}.`;
        } else if (text.includes('help') || text.includes('support')) {
            botText = "I can help you troubleshoot your appliances. Could you tell me which appliance you are having issues with? (e.g., Refrigerator, AC, TV, Washing Machine)";
        } else if (text.includes('fridge') || text.includes('refrigerator')) {
            botText = "I can help with your refrigerator. What specific issue are you experiencing? (e.g., Not Cooling, Water Leaking, Making Noise, Not Turning On)";
        } else if (text.includes('not cooling') && (messages.some(m => m.text.toLowerCase().includes('refrigerator') || m.text.toLowerCase().includes('fridge')))) {
            botText = "If your refrigerator isn't cooling properly, try checking these common culprits:\n\n1. Check if the condenser coils (usually at the back or bottom) are covered in dust.\n2. Ensure the door seals are tight and not letting cold air escape.\n3. Make sure the internal temperature settings haven't been accidentally changed.\n\nDid this resolve the issue?";
        } else if (text.includes('yes') || text.includes('resolved') || text.includes('helped')) {
            botText = "Great! I'm glad I could help.";
        } else if (text.includes('no') || text.includes('still broken')) {
            botText = "I'm sorry to hear that. You might need to book a professional technician. You can do so from the Book Service page.";
        } else if (text.includes('ac') || text.includes('air conditioner')) {
            botText = "Let's troubleshoot your AC. What seems to be the problem? (e.g., Blowing Warm Air, Water Leaking, Not Turning On, Making Noise)";
        } else if (text.includes('tv') || text.includes('television')) {
            botText = "I can assist with your TV. What is going wrong? (e.g., No Picture, No Sound, Lines on Screen, Won't Turn On)";
        } else if (text.includes('washing') || text.includes('washer')) {
            botText = "What problem are you having with your washing machine? (e.g., Won't Spin, Won't Drain, Leaking Water, Making Loud Noises)";
        } else if (text.includes('phone') || text.includes('mobile') || text.includes('computer') || text.includes('laptop')) {
            botText = "Is this related to a battery/charging issue, or something else? (e.g., Not Charging, Screen Broken, Running Slow, Won't Turn On)";
        } else if (text.includes('smoke') || text.includes('spark') || text.includes('fire') || text.includes('shock') || text.includes('burn')) {
            botText = "**⚠️ SAFETY WARNING**\n\nPlease unplug the appliance immediately if it is safe to do so. Do not use it and contact a professional technician right away. Do not attempt to fix this yourself.";
        } else {
            botText = "I'm a simple automated assistant, so I might not fully understand that. Could you tell me which appliance you are using (e.g. Fridge, AC, TV)?";
        }

        const botMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: botText,
        };

        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    };



    return (
        <div className="h-screen flex flex-col font-sans bg-white text-slate-800" style={{ fontFamily: '"Outfit", "Inter", sans-serif' }}>
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-10 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Link to="/" className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-transparent  transition-colors text-slate-600">
                        <span className="material-symbols-outlined font-medium text-xl">menu</span>
                    </Link>
                    <h1 className="text-xl font-medium text-slate-700 flex items-center gap-2">
                        RepairHub AI
                        <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Advanced</span>
                    </h1>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 pb-32">
                <div className="max-w-4xl mx-auto flex flex-col gap-8">
                    
                    {messages.length === 0 && !isTyping && (
                        <div className="py-8 md:py-16 text-center animate-fade-in-up">
                            <h2 className="text-4xl md:text-[52px] font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#fbbc05]">
                                Hello {userName}
                            </h2>
                            <p className="text-[28px] md:text-[38px] font-medium text-[#c4c7c5] mb-12 tracking-tight">How can I help you today?</p>
                        </div>
                    )}

                    {messages.map((msg, index) => {
                        const isBot = msg.sender === 'bot';
                        
                        return (
                            <div key={msg.id} className={`flex gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in-up`}>
                                {/* Avatar */}
                                <div className="flex-shrink-0 mt-1">
                                    {isBot ? (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                                            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-medium">
                                            {userName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                {/* Message Content */}
                                <div className={`flex flex-col ${isBot ? 'items-start max-w-[85%]' : 'items-end max-w-[75%]'}`}>
                                    <div 
                                        className={`px-5 py-3.5 text-[15.5px] leading-relaxed rounded-[24px] ${
                                            isBot 
                                                ? 'bg-transparent text-slate-800' 
                                                : 'bg-slate-100 text-slate-800 rounded-tr-sm'
                                        }`}
                                    >
                                        {msg.text.split('\n').map((line, i) => (
                                            <p key={i} className={line.trim() === '' ? 'h-4' : 'mb-1'}>
                                                {line.includes('**') ? (
                                                    <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                                ) : (
                                                    line
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-4 animate-fade-in-up">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-sm opacity-50">
                                    <span className="material-symbols-outlined text-[18px] animate-pulse">auto_awesome</span>
                                </div>
                            </div>
                            <div className="px-5 py-3.5 bg-transparent rounded-[24px] flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-10" />
                </div>
            </div>

            {/* Gemini-style Input Area */}
            <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 md:px-8 z-20 pointer-events-none">
                <div className="max-w-4xl mx-auto relative pointer-events-auto">
                    <div className="bg-transparent  rounded-[32px] p-2 pr-3 flex items-end gap-2 shadow-sm border border-slate-200/60 focus-within:bg-white focus-within:shadow-md focus-within:border-slate-300 transition-all duration-300">

                        <textarea 
                            className="flex-1 max-h-48 min-h-[48px] bg-transparent border-none outline-none focus:ring-0 py-3.5 px-2 text-[15.5px] text-slate-800 resize-none font-sans placeholder-slate-400"
                            placeholder="Ask about your appliance..."
                            rows="1"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    const val = inputValue;
                                    setInputValue('');
                                    handleSendMessage(val);
                                    e.target.style.height = 'auto';
                                }
                            }}
                        />
                        
                        <button 
                            onClick={() => {
                                if (inputValue.trim()) {
                                    const val = inputValue;
                                    setInputValue('');
                                    handleSendMessage(val);
                                }
                            }}
                            disabled={!inputValue.trim()}
                            className="w-12 h-12 flex-shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md mb-0.5"
                        >
                            <span className="material-symbols-outlined text-[20px] ml-1">send</span>
                        </button>
                    </div>
                    <div className="text-center mt-3 text-[11px] text-slate-400 font-medium tracking-wide">
                        RepairHub AI can make mistakes. Verify important information.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AITroubleshootingPage;

