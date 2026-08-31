import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shopPrefixes = ['Sri', 'Balaji', 'Murugan', 'Amman', 'Siva', 'Maha', 'New', 'Star', 'A1', 'Royal', 'City', 'Global', 'Tamil', 'Kannan', 'Vetri', 'Jothi', 'Selvam', 'Kumaran'];
const generalSuffixes = ['Electronics', 'Electricals', 'Service Center', 'Tech', 'Radio Service'];
const mobileSuffixes = ['Mobiles', 'Telecom', 'Cell Care', 'Mobile Service', 'Communication', 'Mobile World'];
const tvSuffixes = ['TV Center', 'Video Service', 'Display Care', 'Television Works'];
const acSuffixes = ['AC & Refrigeration', 'Cooling Care', 'Aircon Service', 'Cooling Solutions'];
const washingMachineSuffixes = ['Appliance Care', 'Home Needs Service', 'Washing Machine Works'];
const fridgeSuffixes = ['Refrigeration', 'Fridge Works', 'Cool Care Service'];
const computerSuffixes = ['Computers', 'Systems', 'Infotech', 'Laptop Service', 'IT Solutions', 'Networks'];

const tnDistricts = [
    { name: 'Ariyalur', lat: 11.139, lng: 79.073 },
    { name: 'Chengalpattu', lat: 12.695, lng: 79.976 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
    { name: 'Cuddalore', lat: 11.7480, lng: 79.7714 },
    { name: 'Dharmapuri', lat: 12.1211, lng: 78.1582 },
    { name: 'Dindigul', lat: 10.3673, lng: 77.9803 },
    { name: 'Erode', lat: 11.3410, lng: 77.7172 },
    { name: 'Kallakurichi', lat: 11.7383, lng: 78.9639 },
    { name: 'Kancheepuram', lat: 12.8342, lng: 79.7036 },
    { name: 'Kanyakumari', lat: 8.0883, lng: 77.5385 },
    { name: 'Karur', lat: 10.9504, lng: 78.0833 },
    { name: 'Krishnagiri', lat: 12.5186, lng: 78.2137 },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
    { name: 'Mayiladuthurai', lat: 11.1085, lng: 79.6534 },
    { name: 'Nagapattinam', lat: 10.7672, lng: 79.8449 },
    { name: 'Namakkal', lat: 11.2189, lng: 78.1674 },
    { name: 'Nilgiris', lat: 11.4916, lng: 76.7337 },
    { name: 'Perambalur', lat: 11.2342, lng: 78.8821 },
    { name: 'Pudukkottai', lat: 10.3797, lng: 78.8205 },
    { name: 'Ramanathapuram', lat: 9.3639, lng: 78.8306 },
    { name: 'Ranipet', lat: 12.9275, lng: 79.3323 },
    { name: 'Salem', lat: 11.6643, lng: 78.1460 },
    { name: 'Sivaganga', lat: 9.8433, lng: 78.4809 },
    { name: 'Tenkasi', lat: 8.9594, lng: 77.3161 },
    { name: 'Thanjavur', lat: 10.7870, lng: 79.1378 },
    { name: 'Theni', lat: 10.0104, lng: 77.4768 },
    { name: 'Thoothukudi', lat: 8.7642, lng: 78.1348 },
    { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
    { name: 'Tirunelveli', lat: 8.7139, lng: 77.7567 },
    { name: 'Tirupattur', lat: 12.4939, lng: 78.5663 },
    { name: 'Tiruppur', lat: 11.1085, lng: 77.3411 },
    { name: 'Tiruvallur', lat: 13.1436, lng: 79.9071 },
    { name: 'Tiruvannamalai', lat: 12.2253, lng: 79.0747 },
    { name: 'Tiruvarur', lat: 10.7715, lng: 79.6360 },
    { name: 'Vellore', lat: 12.9165, lng: 79.1325 },
    { name: 'Villupuram', lat: 11.9401, lng: 79.4861 },
    { name: 'Virudhunagar', lat: 9.5872, lng: 77.9624 }
];

const categoriesMap = {
    'Mobile Repair Shop': mobileSuffixes,
    'TV Repair Center': tvSuffixes,
    'AC Mechanic': acSuffixes,
    'Washing Machine Service': washingMachineSuffixes,
    'Refrigerator Repair': fridgeSuffixes,
    'Computer Service': computerSuffixes,
    'General Electronics Repair': generalSuffixes
};

const allCategories = Object.keys(categoriesMap);

const aiImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OP2ghqU0TLunTuULri9tcvjr-C-mSmyf1xEkwjzioh0RXFiawaMaclvbrd881A9dC5i6lcavIolm3mBbNZ4YHMxfnsNcZUt9UDMimLPUHkYxYzTbKEffWjtyIfgZ1fnM3g71MoH5TwmSXfKtRZjIiLRQ3edB6Wg3Hos49Bc3QSODO8RfNaaM2Uv2gTSJ4JSfgXHZJlf_km7RQ-jGMJVli_1sbm0JopoTx5MaooP-QQQiy9CwOcsXTA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDY2QW3PaEYkEyq5dATMzvKUXJhpZTOgOQY4vaSZFXZF-im3iR8121C3dytprUdAQ9WBVpdjS8tUJ4Uw_Lk-KWPpzzTmQvGJX67wT5CATGUfPPJrdaguf9SNQvE5_eLDXQOlylf-KzGEAdfh7KveZbF5EBxHHkQ0Vn0C_JFu2srjuw0p4xy0m3s6VxOHtfWOfuZWqfsxppUHK0H2CZRlmPTKqJqf1YTYo0wb3rWiFGIGOmTAIKyjhfaCA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6u097eEkAqmkQ9lewhgb7NR-o7nHTdwphqWWMiwS_lB7sdbryG7fKTB_HOW-0iSAdsdJeEJFXY27nhWZZhnIJKmCJhK41Cai5qWyHWVKjfif8m9cnXRQSyE22GsT8spo_l2_lKzGTevy3_TYrqxseHhxHPapPHs1WtA1Ehy-iEIKqb2iGQORKEotWctrZnm6HvVKS54QXrR-aZC6PMnehvv04JPQ5ETsbMQ4SrpT9UIH40AFPmifxag'
];

function generateName(type) {
    const pre = shopPrefixes[Math.floor(Math.random() * shopPrefixes.length)];
    const suffixes = categoriesMap[type];
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${pre} ${suf}`;
}

const techs = [];
let idCounter = 1;

// Generate massive realistic data for ALL 38 districts
tnDistricts.forEach(district => {
    // Generate ~15-20 shops per district to cover all appliances
    const numShops = Math.floor(Math.random() * 5) + 15;
    
    // Ensure at least one of every category exists in the district, or fallback to general electronics
    let districtCategories = [...allCategories];
    
    for (let i = 0; i < numShops; i++) {
        let type;
        if (districtCategories.length > 0) {
            type = districtCategories.pop(); // guarantee coverage
        } else {
            type = allCategories[Math.floor(Math.random() * allCategories.length)];
        }
        
        const name = generateName(type);
        // Randomly spread shops around the district center (approx 10-30km radius)
        const lat = district.lat + (Math.random() - 0.5) * 0.2;
        const lng = district.lng + (Math.random() - 0.5) * 0.2;
        
        techs.push({
            id: idCounter.toString(),
            name: name,
            type: type, // Profession / Appliance
            experience: `${Math.floor(Math.random() * 10) + 1}+ YRS EXP`,
            location: `${district.name}, Tamil Nadu`,
            lat: lat,
            lng: lng,
            avatar: aiImages[Math.floor(Math.random() * aiImages.length)]
        });
        idCounter++;
    }
});

console.log(`Generated ${techs.length} highly realistic local shops covering all 38 TN districts.`);

const fileContent = `
// Comprehensive realistic simulated shop data based on Tamil Nadu demographics (All 38 Districts)

export const dummyTechnicians = ${JSON.stringify(techs, null, 4)};

export const categories = [
    'Mobile Repair Shop', 
    'TV Repair Center',
    'AC Mechanic',
    'Washing Machine Service',
    'Refrigerator Repair',
    'Computer Service',
    'General Electronics Repair'
];

export const skillPool = [
    'Smartphone Repair', 'Laptop Repair', 'TV Repair', 'Washing Machine Repair', 
    'Refrigerator Repair', 'AC Repair', 'Microwave Repair', 'Water Purifier Repair', 
    'Tablet Repair', 'Smartwatch Repair', 'PC Build & Repair', 'Inverter Repair', 
    'Geyser Repair', 'CCTV Installation', 'Console Repair'
];
`;

const outputPath = path.join(__dirname, '../src/data/dummyTechnicians.js');
fs.writeFileSync(outputPath, fileContent.trim());
console.log('Successfully saved generated realistic data to src/data/dummyTechnicians.js');
