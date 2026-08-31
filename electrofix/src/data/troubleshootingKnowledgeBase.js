export const appliances = [
    { id: 'mobile', name: 'Mobile Phone', icon: '📱' },
    { id: 'refrigerator', name: 'Refrigerator', icon: '🧊' },
    { id: 'ac', name: 'Air Conditioner', icon: '❄️' },
    { id: 'tv', name: 'Television', icon: '📺' },
    { id: 'computer', name: 'Computer / Laptop', icon: '💻' },
    { id: 'general', name: 'General Appliances', icon: '🔌' },
];

export const problems = {
    mobile: [
        { id: 'm_power', label: 'Not turning on or restarting', initialNode: 'm_q1' },
        { id: 'm_battery', label: 'Charging or battery issues', initialNode: 'm_q3' },
        { id: 'm_screen', label: 'Screen or display problem', initialNode: 'm_q7' },
        { id: 'm_audio', label: 'Audio or microphone issues', initialNode: 'm_q10' },
        { id: 'm_network', label: 'Network or connectivity issues', initialNode: 'm_q12' },
        { id: 'm_perf', label: 'Performance or overheating', initialNode: 'm_q5' },
    ],
    refrigerator: [
        { id: 'r_power', label: 'Not turning on', initialNode: 'r_q16' },
        { id: 'r_cooling', label: 'Not cooling properly', initialNode: 'r_q17' },
        { id: 'r_freezer', label: 'Freezer issues or excessive ice', initialNode: 'r_q18' },
        { id: 'r_leak', label: 'Water leakage', initialNode: 'r_q21' },
        { id: 'r_noise', label: 'Unusual noise or vibration', initialNode: 'r_res23' },
        { id: 'r_other', label: 'Bad smell, door issues, lights', initialNode: 'r_q26' },
    ],
    ac: [
        { id: 'a_power', label: 'Not turning on or off', initialNode: 'a_q31' },
        { id: 'a_cooling', label: 'Not cooling or weak airflow', initialNode: 'a_q32' },
        { id: 'a_leak', label: 'Water leaking or ice formation', initialNode: 'a_q34' },
        { id: 'a_noise', label: 'Unusual noise or smell', initialNode: 'a_q36' },
        { id: 'a_remote', label: 'Remote or display error', initialNode: 'a_res39' },
    ],
    tv: [
        { id: 't_power', label: 'Not turning on or restarting', initialNode: 't_q46' },
        { id: 't_display', label: 'Display or picture issues', initialNode: 't_q47' },
        { id: 't_sound', label: 'No sound or buzzing', initialNode: 't_q54' },
        { id: 't_network', label: 'Network, apps, or remote', initialNode: 't_q56' },
    ],
    computer: [
        { id: 'c_power', label: 'Not turning on, shutting down', initialNode: 'c_q61' },
        { id: 'c_battery', label: 'Not charging', initialNode: 'c_q62' },
        { id: 'c_perf', label: 'Slow, freezing, blue screen', initialNode: 'c_q63' },
        { id: 'c_display', label: 'Display issues', initialNode: 'c_res68' },
        { id: 'c_io', label: 'Keyboard, mouse, USB, sound', initialNode: 'c_q70' },
        { id: 'c_network', label: 'Network or Bluetooth', initialNode: 'c_q73' },
    ],
    general: [
        { id: 'g_power', label: 'Not turning on, trips breaker', initialNode: 'g_q81' },
        { id: 'g_function', label: 'Not functioning correctly', initialNode: 'g_res89' },
        { id: 'g_noise', label: 'Unusual noise or vibration', initialNode: 'g_q85' },
        { id: 'g_safety', label: 'Sparks, smell, shock', initialNode: 'g_q83' },
    ]
};

export const nodes = {
    // --- Mobile Nodes ---
    'm_q1': { type: 'question', text: 'Is the phone completely dead and not turning on?', options: [
        { label: 'Yes', nextId: 'm_res1' },
        { label: 'No, it turns off suddenly', nextId: 'm_res2' }
    ]},
    'm_res1': { type: 'result', causes: ['Battery completely discharged', 'Charging problem', 'Power-button failure', 'Internal hardware fault'], confidence: 85, severity: 'Technician Recommended', action: 'Try another charger and leave it plugged in for 30 minutes. If no response, professional inspection is recommended.' },
    'm_res2': { type: 'result', causes: ['Weak battery', 'Overheating', 'Software crash', 'Motherboard issue'], confidence: 70, severity: 'Technician Recommended', action: 'Check if device is overheating. Try updating the software. If problem persists, the battery may need replacement.' },
    
    'm_q3': { type: 'question', text: 'Is the phone charging slowly or not charging at all?', options: [
        { label: 'Charging very slowly', nextId: 'm_res3' },
        { label: 'Not charging at all', nextId: 'm_res4' },
        { label: 'Battery draining quickly', nextId: 'm_res6' }
    ]},
    'm_res3': { type: 'result', causes: ['Damaged cable/adapter', 'Dirty charging port', 'Battery degradation'], confidence: 90, severity: 'Safe to Check', action: 'Clean the charging port gently with a non-metallic object. Try a different cable and adapter.' },
    'm_res4': { type: 'result', causes: ['Faulty charger/cable', 'Blocked port', 'Damaged port or battery', 'Charging IC fault'], confidence: 80, severity: 'Technician Recommended', action: 'Test with another charger. If port looks damaged, contact a technician.' },
    'm_res6': { type: 'result', causes: ['Battery degradation', 'High screen brightness', 'Background apps'], confidence: 75, severity: 'Safe to Check', action: 'Check battery usage settings to identify power-hungry apps. Lower screen brightness.' },

    'm_q7': { type: 'question', text: 'What is wrong with the screen?', options: [
        { label: 'Completely black', nextId: 'm_res7' },
        { label: 'Touchscreen not responding', nextId: 'm_res8' }
    ]},
    'm_res7': { type: 'result', causes: ['Display failure', 'Loose display connection', 'Battery issue', 'Motherboard problem'], confidence: 80, severity: 'Technician Recommended', action: 'Try force restarting the device. If sound works but no display, screen replacement may be needed.' },
    'm_res8': { type: 'result', causes: ['Screen digitizer problem', 'Software freeze', 'Moisture', 'Display damage'], confidence: 75, severity: 'Technician Recommended', action: 'Clean the screen and ensure hands are dry. Force restart the device.' },

    'm_q5': { type: 'question', text: 'What performance issue are you facing?', options: [
        { label: 'Phone gets very hot', nextId: 'm_res5' },
        { label: 'Phone is unusually slow', nextId: 'm_res15' },
        { label: 'Restarting repeatedly', nextId: 'm_res9' }
    ]},
    'm_res5': { type: 'result', causes: ['Heavy application usage', 'Background processes', 'Battery problem', 'Hardware fault'], confidence: 78, severity: 'Safe to Check', action: 'Remove case if any. Close all background apps and let device cool down.' },
    'm_res15': { type: 'result', causes: ['Low storage', 'Too many background apps', 'Outdated software', 'Aging hardware'], confidence: 88, severity: 'Safe to Check', action: 'Free up storage space and install any pending software updates.' },
    'm_res9': { type: 'result', causes: ['Software crash', 'Faulty update', 'Battery problem', 'Motherboard issue'], confidence: 82, severity: 'Technician Recommended', action: 'Try booting in safe mode or perform a factory reset after backing up data.' },

    'm_q10': { type: 'question', text: 'What audio issue are you facing?', options: [
        { label: 'Speaker has no sound', nextId: 'm_res10' },
        { label: 'Microphone not working', nextId: 'm_res11' }
    ]},
    'm_res10': { type: 'result', causes: ['Speaker blockage/damage', 'Software setting', 'Audio circuit problem'], confidence: 85, severity: 'Safe to Check', action: 'Check volume settings and ensure Do Not Disturb is off. Clean speaker grill gently.' },
    'm_res11': { type: 'result', causes: ['Microphone blockage/damage', 'Permission issue', 'Hardware fault'], confidence: 85, severity: 'Safe to Check', action: 'Check app permissions. Clean the microphone hole gently.' },

    'm_q12': { type: 'question', text: 'What connectivity issue are you facing?', options: [
        { label: 'Wi-Fi not connecting', nextId: 'm_res12' },
        { label: 'Mobile data not working', nextId: 'm_res13' }
    ]},
    'm_res12': { type: 'result', causes: ['Router/network issue', 'Incorrect settings', 'Software problem', 'Wi-Fi hardware fault'], confidence: 82, severity: 'Safe to Check', action: 'Toggle Wi-Fi and restart router. Forget the network and reconnect.' },
    'm_res13': { type: 'result', causes: ['SIM/network issue', 'Incorrect APN', 'Disabled data', 'Network hardware problem'], confidence: 80, severity: 'Safe to Check', action: 'Check if SIM is inserted properly. Restart the phone and verify data plan.' },

    // --- Refrigerator Nodes ---
    'r_q16': { type: 'question', text: 'Is the refrigerator receiving power (are the lights on)?', options: [
        { label: 'No, completely dead', nextId: 'r_res16' },
        { label: 'Yes, lights are on but not running', nextId: 'r_q17a' }
    ]},
    'r_res16': { type: 'result', causes: ['Power supply', 'Plug or fuse', 'Thermostat', 'Control board'], confidence: 85, severity: 'Safe to Check', action: 'Check the wall outlet by plugging in another device. Ensure the breaker has not tripped.' },
    
    'r_q17a': { type: 'question', text: 'Is the compressor running (can you hear a hum)?', options: [
        { label: 'Yes, running continuously', nextId: 'r_res24' },
        { label: 'Running intermittently but not cooling', nextId: 'r_res17' },
        { label: 'Not running at all', nextId: 'r_res17b' }
    ]},
    'r_res24': { type: 'result', causes: ['Dirty condenser', 'Poor door sealing', 'Low refrigerant', 'Compressor problem'], confidence: 88, severity: 'Safe to Check', action: 'Check door seals and clean condenser coils. Ensure the fridge is not overpacked.' },
    'r_res17': { type: 'result', causes: ['Low refrigerant', 'Dirty condenser', 'Airflow problem'], confidence: 78, severity: 'Technician Recommended', action: 'Check airflow vents inside. If vents are clear, refrigerant may be low.' },
    'r_res17b': { type: 'result', causes: ['Start relay', 'Compressor', 'Control board', 'Electrical issue'], confidence: 85, severity: 'Technician Recommended', action: 'If you hear a clicking sound repeatedly, the start relay may be faulty.' },

    'r_q17': { type: 'question', text: 'Is it cooling at all?', options: [
        { label: 'Not cooling at all', nextId: 'r_res17' },
        { label: 'Too cold / freezing food', nextId: 'r_res25' }
    ]},
    'r_res25': { type: 'result', causes: ['Incorrect temperature setting', 'Faulty thermostat/sensor', 'Control-board problem'], confidence: 80, severity: 'Safe to Check', action: 'Check temperature setting and adjust it. If it doesn\'t change, sensor might be faulty.' },

    'r_q18': { type: 'question', text: 'What is the freezer issue?', options: [
        { label: 'Not freezing at all', nextId: 'r_res18' },
        { label: 'Excessive ice buildup', nextId: 'r_res20' }
    ]},
    'r_res18': { type: 'result', causes: ['Temperature setting', 'Airflow blockage', 'Frost buildup', 'Fan problem'], confidence: 80, severity: 'Technician Recommended', action: 'Check temperature settings. Ensure no items are blocking the back air vents.' },
    'r_res20': { type: 'result', causes: ['Defrost-system failure', 'Blocked airflow', 'Faulty door seal'], confidence: 90, severity: 'Technician Recommended', action: 'Check if door seal is tight. If defrost system failed, manual defrosting may be needed temporarily.' },

    'r_q21': { type: 'question', text: 'Where is the water leaking from?', options: [
        { label: 'Inside the refrigerator', nextId: 'r_res21' },
        { label: 'Outside on the floor', nextId: 'r_res22' }
    ]},
    'r_res21': { type: 'result', causes: ['Blocked drain', 'Defrost drain problem'], confidence: 85, severity: 'Safe to Check', action: 'Locate the defrost drain at the back/bottom and ensure it is not clogged with food particles.' },
    'r_res22': { type: 'result', causes: ['Drain problem', 'Damaged water line', 'Drain pan issue'], confidence: 82, severity: 'Safe to Check', action: 'Check the drain pan underneath the fridge. Inspect the water line if it has an ice maker.' },

    'r_res23': { type: 'result', causes: ['Fan', 'Compressor', 'Loose component', 'Uneven floor'], confidence: 75, severity: 'Safe to Check', action: 'Ensure fridge is level. If noise comes from inside, it may be the fan hitting ice.' },
    
    'r_q26': { type: 'question', text: 'What other issue?', options: [
        { label: 'Bad smell', nextId: 'r_res26' },
        { label: 'Door not closing properly', nextId: 'r_res27' },
        { label: 'Interior light not working', nextId: 'r_res29' }
    ]},
    'r_res26': { type: 'result', causes: ['Spoiled food', 'Dirty drain', 'Mold', 'Contaminated interior'], confidence: 95, severity: 'Safe to Check', action: 'Clean the interior with baking soda and water. Clean the drain hole.' },
    'r_res27': { type: 'result', causes: ['Misalignment', 'Damaged gasket', 'Overloaded shelves', 'Hinge problem'], confidence: 90, severity: 'Safe to Check', action: 'Rearrange shelves to ensure nothing blocks the door. Clean the gasket.' },
    'r_res29': { type: 'result', causes: ['Burned-out LED/bulb', 'Door switch', 'Wiring'], confidence: 85, severity: 'Safe to Check', action: 'Try replacing the bulb if it is accessible. Otherwise, door switch may be faulty.' },

    // --- AC Nodes ---
    'a_q31': { type: 'question', text: 'Is the AC totally unresponsive or switching on/off repeatedly?', options: [
        { label: 'Totally unresponsive', nextId: 'a_res31' },
        { label: 'Switching on and off repeatedly', nextId: 'a_res40' },
        { label: 'Outdoor unit not running', nextId: 'a_res35' }
    ]},
    'a_res31': { type: 'result', causes: ['Power supply', 'Remote', 'Circuit breaker', 'Control board or wiring'], confidence: 85, severity: 'Safe to Check', action: 'Check the remote batteries and the main circuit breaker for the AC.' },
    'a_res40': { type: 'result', causes: ['Thermostat/sensor issue', 'Overheating', 'Electrical problem', 'Incorrect sizing'], confidence: 75, severity: 'Technician Recommended', action: 'Ensure room is properly sealed. If it persists, the thermostat sensor may need replacement.' },
    'a_res35': { type: 'result', causes: ['Power problem', 'Capacitor', 'Control board', 'Compressor', 'Outdoor fan issue'], confidence: 80, severity: 'Technician Recommended', action: 'Do not attempt to open the outdoor unit. This requires a professional.' },

    'a_q32': { type: 'question', text: 'Is the airflow weak or is it producing warm air?', options: [
        { label: 'Airflow is weak', nextId: 'a_res43' },
        { label: 'Producing warm air', nextId: 'a_res45' },
        { label: 'Running but not cooling effectively', nextId: 'a_res32' }
    ]},
    'a_res43': { type: 'result', causes: ['Dirty filter', 'Blocked duct', 'Blower problem', 'Frozen coil'], confidence: 90, severity: 'Safe to Check', action: 'Remove and clean the indoor air filters. If coils are frozen, turn off the AC to let ice melt.' },
    'a_res45': { type: 'result', causes: ['Incorrect mode', 'Low refrigerant', 'Compressor issue', 'Dirty condenser'], confidence: 82, severity: 'Technician Recommended', action: 'Ensure mode is set to "Cool". If it is, the system might be low on refrigerant.' },
    'a_res32': { type: 'result', causes: ['Dirty filter', 'Low refrigerant', 'Dirty condenser', 'Compressor problem'], confidence: 75, severity: 'Technician Recommended', action: 'Clean the filters. Professional maintenance may be required for coils and refrigerant.' },

    'a_q34': { type: 'question', text: 'Are you seeing water or ice?', options: [
        { label: 'Water leaking from indoor unit', nextId: 'a_res34' },
        { label: 'Ice on the indoor unit', nextId: 'a_res38' }
    ]},
    'a_res34': { type: 'result', causes: ['Blocked drain pipe', 'Dirty filter', 'Frozen coil', 'Drain problem'], confidence: 85, severity: 'Safe to Check', action: 'Check if the drain pipe is kinked or blocked. Clean the filters.' },
    'a_res38': { type: 'result', causes: ['Low airflow', 'Dirty filter', 'Low refrigerant', 'Evaporator problem'], confidence: 80, severity: 'Technician Recommended', action: 'Turn off the AC to allow ice to melt. Clean filters. If ice returns, it could be low refrigerant.' },

    'a_q36': { type: 'question', text: 'What kind of issue are you noticing?', options: [
        { label: 'Unusual noises', nextId: 'a_res36' },
        { label: 'Bad smell', nextId: 'a_res37' }
    ]},
    'a_res36': { type: 'result', causes: ['Fan problem', 'Loose component', 'Compressor issue', 'Debris'], confidence: 78, severity: 'Technician Recommended', action: 'Turn off the AC if noise is very loud. A technician should inspect moving parts.' },
    'a_res37': { type: 'result', causes: ['Dirty filter', 'Mold', 'Drain contamination', 'Evaporator coil contamination'], confidence: 90, severity: 'Safe to Check', action: 'Clean or replace filters. Consider a professional deep clean if the smell persists.' },

    'a_res39': { type: 'result', causes: ['Weak batteries', 'Remote fault', 'Sensor issue', 'Communication problem'], confidence: 85, severity: 'Safe to Check', action: 'Replace remote batteries. Ensure there is a clear line of sight to the AC sensor.' },

    // --- TV Nodes ---
    't_q46': { type: 'question', text: 'Is the TV totally unresponsive?', options: [
        { label: 'Totally dead', nextId: 't_res46' },
        { label: 'Restarts repeatedly', nextId: 't_res49' }
    ]},
    't_res46': { type: 'result', causes: ['Power supply', 'Remote', 'Standby circuit', 'Power board', 'Main board'], confidence: 85, severity: 'Safe to Check', action: 'Check power outlet and cable. Try using the physical button on the TV instead of the remote.' },
    't_res49': { type: 'result', causes: ['Software problem', 'Overheating', 'Power board', 'Main-board issue'], confidence: 75, severity: 'Technician Recommended', action: 'Unplug TV for 10 minutes, then plug back in. Check for software updates if possible.' },

    't_q47': { type: 'question', text: 'What display issue are you facing?', options: [
        { label: 'Black screen but has sound', nextId: 't_res47' },
        { label: 'Picture flickering or lines', nextId: 't_res51' },
        { label: 'No picture and no sound', nextId: 't_res48' }
    ]},
    't_res47': { type: 'result', causes: ['Backlight failure', 'LED strip problem', 'T-Con/display issue', 'Panel problem'], confidence: 92, severity: 'Technician Recommended', action: 'Shine a flashlight on the screen. If you see a faint image, the backlights have failed.' },
    't_res51': { type: 'result', causes: ['Loose connection', 'Backlight problem', 'Cable issue', 'Panel/T-Con board'], confidence: 80, severity: 'Technician Recommended', action: 'Check HDMI or input cables. If issue persists on all menus/inputs, the panel or board is faulty.' },
    't_res48': { type: 'result', causes: ['Power board', 'Main board', 'Software', 'Internal hardware fault'], confidence: 85, severity: 'Technician Recommended', action: 'Verify the TV is turned on. Disconnect all HDMI devices and try again.' },

    't_q54': { type: 'question', text: 'What audio issue are you facing?', options: [
        { label: 'No sound at all', nextId: 't_res54' },
        { label: 'Buzzing sound', nextId: 't_res59' }
    ]},
    't_res54': { type: 'result', causes: ['Muted setting', 'Audio output setting', 'Speaker failure', 'Main-board problem'], confidence: 85, severity: 'Safe to Check', action: 'Check TV audio settings and make sure output is set to TV speakers.' },
    't_res59': { type: 'result', causes: ['Power supply', 'Speaker', 'Transformer/coil', 'Electrical component issue'], confidence: 70, severity: 'Technician Recommended', action: 'Lower the volume. If buzzing persists, it may be a power supply or transformer issue.' },

    't_q56': { type: 'question', text: 'What network or app issue are you facing?', options: [
        { label: 'Wi-Fi not connecting', nextId: 't_res56' },
        { label: 'Apps not opening', nextId: 't_res57' },
        { label: 'Remote working only sometimes', nextId: 't_res60' }
    ]},
    't_res56': { type: 'result', causes: ['Router issue', 'Incorrect password', 'Network settings', 'Software problem', 'Wi-Fi module failure'], confidence: 82, severity: 'Safe to Check', action: 'Restart your router and the TV. Try connecting to a mobile hotspot to test.' },
    't_res57': { type: 'result', causes: ['Internet problem', 'Outdated app', 'Insufficient storage', 'TV software issue'], confidence: 85, severity: 'Safe to Check', action: 'Check internet connection. Clear app cache or reinstall the problematic app.' },
    't_res60': { type: 'result', causes: ['Weak batteries', 'Damaged buttons', 'IR interference', 'Remote/sensor issue'], confidence: 90, severity: 'Safe to Check', action: 'Replace remote batteries. Remove obstacles between the remote and the TV sensor.' },

    // --- Computer Nodes ---
    'c_q61': { type: 'question', text: 'What power issue is the computer having?', options: [
        { label: 'Not turning on at all', nextId: 'c_res61' },
        { label: 'Shutting down suddenly', nextId: 'c_res66' },
        { label: 'OS not booting (stuck at logo)', nextId: 'c_res67' }
    ]},
    'c_res61': { type: 'result', causes: ['Power supply', 'Battery', 'Charger', 'Motherboard', 'RAM', 'Power circuit'], confidence: 82, severity: 'Safe to Check', action: 'Try a different power outlet. If it\'s a laptop, try removing the battery (if possible) and using just the charger.' },
    'c_res66': { type: 'result', causes: ['Overheating', 'Power problem', 'Battery issue', 'Hardware failure'], confidence: 85, severity: 'Technician Recommended', action: 'Check if the computer is very hot. Ensure fans are not blocked.' },
    'c_res67': { type: 'result', causes: ['Corrupted operating system', 'Bootloader issue', 'Storage failure', 'Hardware problem'], confidence: 78, severity: 'Technician Recommended', action: 'Try booting in Safe Mode. You may need to run system repair tools or reinstall the OS.' },

    'c_q62': { type: 'question', text: 'Is the laptop not charging?', options: [
        { label: 'Not charging', nextId: 'c_res62' }
    ]},
    'c_res62': { type: 'result', causes: ['Charger', 'Charging port', 'Battery', 'Adapter', 'Charging circuit problem'], confidence: 85, severity: 'Technician Recommended', action: 'Try a different charger. If the port feels loose, it may need to be soldered or replaced.' },

    'c_q63': { type: 'question', text: 'What performance issue are you experiencing?', options: [
        { label: 'Very slow or freezing', nextId: 'c_res63' },
        { label: 'Overheating or fan noise', nextId: 'c_res64' },
        { label: 'Blue screen of death', nextId: 'c_res76' }
    ]},
    'c_res63': { type: 'result', causes: ['Low RAM', 'High CPU usage', 'Insufficient storage', 'Malware', 'Too many startup programs'], confidence: 88, severity: 'Safe to Check', action: 'Check Task Manager for high usage. Run a virus scan and disable unnecessary startup programs.' },
    'c_res64': { type: 'result', causes: ['Dust buildup', 'Blocked ventilation', 'Faulty fan', 'Thermal-paste issue', 'Heavy workload'], confidence: 92, severity: 'Safe to Check', action: 'Ensure vents are not blocked. Clean dust from vents. If laptop, use a cooling pad.' },
    'c_res76': { type: 'result', causes: ['Driver problem', 'RAM', 'Storage', 'Corrupted system files', 'Overheating', 'Hardware fault'], confidence: 75, severity: 'Technician Recommended', action: 'Note down the error code on the blue screen. Update drivers or perform a system restore.' },

    'c_res68': { type: 'result', causes: ['Display', 'RAM', 'Graphics', 'Cable', 'Motherboard', 'Monitor problem'], confidence: 80, severity: 'Technician Recommended', action: 'Try connecting an external monitor to isolate if it is a screen issue or a graphics/motherboard issue.' },
    
    'c_q70': { type: 'question', text: 'Which peripheral is not working?', options: [
        { label: 'Keyboard', nextId: 'c_res70' },
        { label: 'Touchpad/Mouse', nextId: 'c_res71' },
        { label: 'USB ports', nextId: 'c_res79' }
    ]},
    'c_res70': { type: 'result', causes: ['Driver', 'Connection', 'Keyboard hardware', 'USB/Bluetooth problem'], confidence: 85, severity: 'Safe to Check', action: 'Try an external USB keyboard. Update drivers in Device Manager.' },
    'c_res71': { type: 'result', causes: ['Driver', 'Disabled setting', 'Hardware issue', 'Connection problem'], confidence: 80, severity: 'Safe to Check', action: 'Check if there is a function key (Fn) that disables the touchpad. Update drivers.' },
    'c_res79': { type: 'result', causes: ['Damaged USB port', 'Driver problem', 'Power issue', 'USB device failure'], confidence: 85, severity: 'Safe to Check', action: 'Try another USB device in the same port. Restart the computer.' },

    'c_q73': { type: 'question', text: 'Which network issue?', options: [
        { label: 'Wi-Fi not working', nextId: 'c_res73' },
        { label: 'Bluetooth not working', nextId: 'c_res74' }
    ]},
    'c_res73': { type: 'result', causes: ['Router', 'Driver', 'Network settings', 'Wi-Fi adapter', 'Hardware issue'], confidence: 85, severity: 'Safe to Check', action: 'Use the built-in network troubleshooter. Reinstall the Wi-Fi driver.' },
    'c_res74': { type: 'result', causes: ['Driver', 'Disabled Bluetooth', 'Pairing problem', 'Bluetooth hardware issue'], confidence: 85, severity: 'Safe to Check', action: 'Ensure Bluetooth is turned on. Unpair and pair the device again.' },

    // --- General Appliances Nodes ---
    'g_q81': { type: 'question', text: 'What is happening with the power?', options: [
        { label: 'Not turning on', nextId: 'g_res81' },
        { label: 'Turns off suddenly', nextId: 'g_res82' },
        { label: 'Trips the circuit breaker', nextId: 'g_res90' }
    ]},
    'g_res81': { type: 'result', causes: ['Power supply', 'Plug', 'Switch', 'Fuse', 'Wiring', 'Internal electrical fault'], confidence: 85, severity: 'Safe to Check', action: 'Check the outlet with another appliance. Inspect the power cord for damage.' },
    'g_res82': { type: 'result', causes: ['Overheating', 'Overload protection', 'Loose connection', 'Internal fault'], confidence: 80, severity: 'Safe to Check', action: 'Allow the appliance to cool down. Do not overload it beyond its capacity.' },
    'g_res90': { type: 'result', causes: ['Short circuit', 'Leakage current', 'Overloaded circuit', 'Damaged wiring', 'Faulty appliance'], confidence: 95, severity: 'Safety Warning', action: '⚠️ Potential Electrical Hazard. Stop using the appliance and disconnect power. Do not attempt internal repairs. Contact a qualified technician.' },

    'g_res89': { type: 'result', causes: ['Internal fuse', 'Motor', 'Control board', 'Sensor', 'Heating element', 'Mechanical problem'], confidence: 75, severity: 'Technician Recommended', action: 'If it has power but does not function, an internal component has failed. Professional repair is needed.' },

    'g_q83': { type: 'question', text: 'Have you noticed any of these dangerous symptoms?', options: [
        { label: 'Burning smell', nextId: 'g_res83' },
        { label: 'Sparks', nextId: 'g_res84' },
        { label: 'Electric shock', nextId: 'g_res91' },
        { label: 'None of the above', nextId: 'g_q81' }
    ]},
    'g_res83': { type: 'result', causes: ['Overheating', 'Damaged wiring', 'Motor problem', 'Electrical component failure'], confidence: 95, severity: 'Safety Warning', action: '⚠️ Potential Electrical Hazard. Stop using the appliance and disconnect power immediately. Contact a qualified technician.' },
    'g_res84': { type: 'result', causes: ['Damaged wiring', 'Motor/brush problem', 'Loose connection', 'Component failure'], confidence: 95, severity: 'Safety Warning', action: '⚠️ Potential Electrical Hazard. Stop using the appliance and disconnect power immediately. Contact a qualified technician.' },
    'g_res91': { type: 'result', causes: ['Grounding problem', 'Insulation failure', 'Damaged wiring', 'Leakage current'], confidence: 98, severity: 'Safety Warning', action: '⚠️ Potential Electrical Hazard. Stop using the appliance and disconnect power using a non-conductive item if necessary. Do not touch bare metal. Contact a qualified technician.' },

    'g_q85': { type: 'question', text: 'What kind of physical issue?', options: [
        { label: 'Unusual noise', nextId: 'g_res85' },
        { label: 'Excessive vibration', nextId: 'g_res86' }
    ]},
    'g_res85': { type: 'result', causes: ['Loose component', 'Motor', 'Bearing', 'Fan', 'Mechanical obstruction'], confidence: 75, severity: 'Technician Recommended', action: 'Turn off the appliance and check for obvious obstructions. Internal parts may need lubrication or replacement.' },
    'g_res86': { type: 'result', causes: ['Uneven placement', 'Loose parts', 'Unbalanced load', 'Motor', 'Bearing problem'], confidence: 85, severity: 'Safe to Check', action: 'Ensure the appliance is on a flat, even surface. Check if the load (e.g. in a washing machine) is balanced.' },

    'fallback': { type: 'result', causes: ['Internal component failure', 'Wear and tear'], confidence: 50, severity: 'Technician Recommended', action: 'We couldn\'t identify the problem with enough confidence. Professional inspection recommended.' }
};
