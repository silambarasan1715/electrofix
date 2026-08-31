import React, { useState, useEffect, useRef } from 'react';

const AIChatPopup = ({ onClose, onPredictIssue }) => {
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
        let isPrediction = false;
        let predictionText = ''; 

        // 1. Mobile/Phone
        if (text.includes('mobile') || text.includes('phone')) {
            if (text.includes('not on') || text.includes('turn on') || text.includes('dead')) {
                predictionText = "The mobile phone is completely unresponsive and will not turn on even after being connected to a charger for a significant amount of time.";
            } else if (text.includes('screen') || text.includes('display') || text.includes('glass')) {
                predictionText = "The mobile phone screen is physically cracked or damaged, causing display issues and preventing the touch functionality from working correctly during normal everyday use.";
            } else if (text.includes('charge') || text.includes('battery')) {
                predictionText = "The mobile phone is not holding a charge, the battery drains unusually fast, and it fails to recognize when the charging cable is plugged in.";
            } else {
                predictionText = "The mobile phone is experiencing performance issues, frequently freezing, crashing during use, and failing to operate standard applications smoothly without unexpected device restarts.";
            }
        // 2. AC / Air Conditioner
        } else if (text.includes('ac') || text.includes('air conditioner')) {
            if (text.includes('cool') || text.includes('warm')) {
                predictionText = "The air conditioning unit is blowing warm air instead of cooling the room, and the compressor does not seem to engage when the temperature drops.";
            } else if (text.includes('leak') || text.includes('water')) {
                predictionText = "The air conditioning indoor unit is leaking water continuously down the wall, indicating a potential blockage in the drainage pipe or a frozen evaporator coil.";
            } else {
                predictionText = "The air conditioning unit is making a loud, unusual rattling noise during operation and occasionally shutting off on its own after a few minutes.";
            }
        // 3. TV / Television
        } else if (text.includes('tv') || text.includes('television')) {
            if (text.includes('picture') || text.includes('display') || text.includes('screen')) {
                predictionText = "The television turns on with sound, but there is no picture visible on the screen, or there are distorted horizontal lines appearing across the display.";
            } else {
                predictionText = "The television completely fails to power on when using either the remote control or the physical buttons on the device, with no standby light visible.";
            }
        // 4. Refrigerator / Fridge
        } else if (text.includes('fridge') || text.includes('refrigerator')) {
            if (text.includes('cool') || text.includes('ice')) {
                predictionText = "The refrigerator's main compartment is not cooling adequately, causing food to spoil quickly, although the freezer section appears to be functioning normally without issues.";
            } else {
                predictionText = "The refrigerator is producing an excessively loud humming noise from the back panel, and water is pooling underneath the appliance on the kitchen floor.";
            }
        // 5. Washing Machine
        } else if (text.includes('wash') || text.includes('machine')) {
            if (text.includes('spin') || text.includes('drain')) {
                predictionText = "The washing machine completes the wash cycle but fails to drain the water or enter the spin cycle, leaving the clothes completely soaked and heavy.";
            } else {
                predictionText = "The washing machine is leaking soapy water from the bottom door seal during the main wash cycle and making a loud banging noise while spinning.";
            }
        // 6. Laptop / Computer
        } else if (text.includes('laptop') || text.includes('computer') || text.includes('pc')) {
            if (text.includes('slow') || text.includes('hang')) {
                predictionText = "The laptop is running exceptionally slow, freezing frequently when opening basic applications, and taking an unusually long time to fully boot up into the operating system.";
            } else {
                predictionText = "The laptop screen remains completely black when powered on, despite the cooling fans spinning loudly and the keyboard backlight turning on as normally expected.";
            }
        // 7. Microwave / Oven
        } else if (text.includes('microwave') || text.includes('oven')) {
            predictionText = "The microwave turns on and the interior plate spins normally, but it completely fails to heat up any food or beverages placed inside the unit.";
        // 8. Water Purifier / RO
        } else if (text.includes('purifier') || text.includes('ro') || text.includes('water')) {
            predictionText = "The RO water purifier is leaking water from the filter housing, and the dispensed water has an unusual, unpleasant metallic taste compared to normal.";
        // 9. Geyser / Water Heater
        } else if (text.includes('geyser') || text.includes('heater')) {
            predictionText = "The electric water heater is not producing any hot water despite being turned on for over an hour, and the indicator light fails to illuminate.";
        // 10. General Electrical / Wiring
        } else if (text.includes('light') || text.includes('switch') || text.includes('wire') || text.includes('power')) {
            predictionText = "There is a significant electrical issue causing the main circuit breaker to trip repeatedly whenever multiple standard household appliances are plugged in and turned on.";
        }

        if (predictionText) {
            botText = `I understand. Here is a detailed issue description I generated for you:\n\n**"${predictionText}"**\n\nWould you like me to add this directly to your booking form?`;
            isPrediction = true;
        } else if (/^(hi|hello|hey|greetings|good morning|good evening|hii)/.test(text)) {
            botText = `Hello ${userName}. Please tell me what appliance you are having issues with (e.g., Mobile, AC, Fridge, TV) and what the problem is.`;
        } else if (text.includes('smoke') || text.includes('spark') || text.includes('fire') || text.includes('shock') || text.includes('burn')) {
            botText = "**⚠️ SAFETY WARNING**\n\nPlease unplug the appliance immediately if it is safe to do so. Do not use it and contact a professional technician right away. Do not attempt to fix this yourself.";
        } else {
            botText = "Could you please specify the appliance (like Mobile, AC, TV, Fridge) and briefly describe the problem you are facing?";
        }

        const botMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: botText,
            isPrediction,
            predictionText
        };

        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    };

    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col font-sans overflow-hidden animate-fade-in">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    </div>
                    <h2 className="text-[15px] font-bold text-slate-700">RepairHub AI</h2>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-8 md:py-12 bg-slate-50/50">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {messages.length === 0 && (
                        <div className="text-center py-6">
                            <h3 className="text-[16px] font-bold text-slate-700 mb-1">Hello, {userName}!</h3>
                            <p className="text-[13px] text-slate-500">Describe your appliance issue, and I can help fill out your booking.</p>
                        </div>
                    )}

                    {messages.map((msg) => {
                        const isBot = msg.sender === 'bot';
                        return (
                            <div key={msg.id} className={`flex gap-3 md:gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
                                <div className="flex-shrink-0 mt-1">
                                    {isBot ? (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[12px] shadow-sm">
                                            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[12px] font-bold">
                                            {userName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className={`flex flex-col ${isBot ? 'items-start max-w-[85%] md:max-w-[75%]' : 'items-end max-w-[85%] md:max-w-[75%]'}`}>
                                    <div 
                                        className={`px-4 py-3 md:px-5 md:py-3.5 text-[15px] leading-relaxed rounded-[20px] md:rounded-[24px] ${
                                            isBot 
                                                ? 'bg-white border border-slate-100 text-slate-800 shadow-sm' 
                                                : 'bg-primary text-white'
                                        }`}
                                    >
                                        {msg.text.split('\n').map((line, i) => (
                                            <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-1'}>
                                                {line.includes('**') ? (
                                                    <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                                ) : (
                                                    line
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                    {msg.isPrediction && (
                                        <button 
                                            onClick={() => onPredictIssue(msg.predictionText)}
                                            className="mt-3 text-[14px] font-bold text-primary bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-sm hover-lift"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">add_task</span>
                                            Use this description for my booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {isTyping && (
                        <div className="flex gap-3 md:gap-4 animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white opacity-50 shadow-sm">
                                <span className="material-symbols-outlined text-[16px] animate-pulse">auto_awesome</span>
                            </div>
                            <div className="px-4 py-3 md:px-5 md:py-3.5 bg-white border border-slate-100 rounded-[24px] flex items-center gap-1.5 shadow-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white border-t border-slate-100">
                <div className="max-w-3xl mx-auto bg-slate-50 rounded-[32px] p-2 pr-3 flex items-end gap-2 shadow-sm border border-slate-200/60 focus-within:bg-white focus-within:shadow-md focus-within:border-slate-300 transition-all duration-300">
                    <textarea 
                        className="flex-1 max-h-48 min-h-[48px] bg-transparent border-none outline-none focus:ring-0 py-3.5 px-3 text-[15.5px] text-slate-800 resize-none font-sans placeholder-slate-400"
                        placeholder="Type your issue..."
                        rows="1"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
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
            </div>
        </div>
    );
};

export default AIChatPopup;
