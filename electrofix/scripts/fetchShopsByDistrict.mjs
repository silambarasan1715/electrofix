import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tnDistricts = [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
    'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur',
    'Kancheepuram', 'Chengalpattu', 'Cuddalore', 'Tiruvannamalai', 'Kanyakumari',
    'Dharmapuri', 'Krishnagiri', 'Namakkal', 'Pudukkottai', 'Ramanathapuram',
    'Sivaganga', 'Theni', 'Nilgiris', 'Villupuram', 'Virudhunagar', 'Tenkasi',
    'Tirupattur', 'Ranipet', 'Kallakurichi', 'Ariyalur', 'Perambalur', 'Karur',
    'Nagapattinam', 'Tiruvarur', 'Mayiladuthurai'
];

const overpassUrl = 'https://overpass-api.de/api/interpreter';

const aiImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OP2ghqU0TLunTuULri9tcvjr-C-mSmyf1xEkwjzioh0RXFiawaMaclvbrd881A9dC5i6lcavIolm3mBbNZ4YHMxfnsNcZUt9UDMimLPUHkYxYzTbKEffWjtyIfgZ1fnM3g71MoH5TwmSXfKtRZjIiLRQ3edB6Wg3Hos49Bc3QSODO8RfNaaM2Uv2gTSJ4JSfgXHZJlf_km7RQ-jGMJVli_1sbm0JopoTx5MaooP-QQQiy9CwOcsXTA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDY2QW3PaEYkEyq5dATMzvKUXJhpZTOgOQY4vaSZFXZF-im3iR8121C3dytprUdAQ9WBVpdjS8tUJ4Uw_Lk-KWPpzzTmQvGJX67wT5CATGUfPPJrdaguf9SNQvE5_eLDXQOlylf-KzGEAdfh7KveZbF5EBxHHkQ0Vn0C_JFu2srjuw0p4xy0m3s6VxOHtfWOfuZWqfsxppUHK0H2CZRlmPTKqJqf1YTYo0wb3rWiFGIGOmTAIKyjhfaCA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6u097eEkAqmkQ9lewhgb7NR-o7nHTdwphqWWMiwS_lB7sdbryG7fKTB_HOW-0iSAdsdJeEJFXY27nhWZZhnIJKmCJhK41Cai5qWyHWVKjfif8m9cnXRQSyE22GsT8spo_l2_lKzGTevy3_TYrqxseHhxHPapPHs1WtA1Ehy-iEIKqb2iGQORKEotWctrZnm6HvVKS54QXrR-aZC6PMnehvv04JPQ5ETsbMQ4SrpT9UIH40AFPmifxag'
];

async function fetchForDistrict(district) {
    const query = `
    [out:json][timeout:25];
    area["name"="${district}"]->.searchArea;
    (
      node["shop"="electronics"](area.searchArea);
      node["shop"="mobile_phone"](area.searchArea);
      node["craft"="electronics_repair"](area.searchArea);
      node["shop"="computer"](area.searchArea);
      node["shop"="appliance"](area.searchArea);
    );
    out center;
    `;

    try {
        const response = await fetch(overpassUrl, {
            method: 'POST',
            body: query
        });
        const data = await response.json();
        return data.elements || [];
    } catch (e) {
        console.error(`Failed to fetch for ${district}`, e.message);
        return [];
    }
}

async function run() {
    console.log('Fetching real shops from OpenStreetMap chunked by district...');
    const allTechs = [];
    let idCounter = 1;

    // Fetch in batches of 3 to avoid hammering the API too hard
    for (let i = 0; i < tnDistricts.length; i += 3) {
        const batch = tnDistricts.slice(i, i + 3);
        console.log(`Fetching batch: ${batch.join(', ')}`);
        
        const promises = batch.map(d => fetchForDistrict(d));
        const results = await Promise.all(promises);
        
        results.forEach((elements, index) => {
            const district = batch[index];
            for (const el of elements) {
                if (!el.tags || !el.tags.name) continue;
                
                const name = el.tags.name;
                const lat = el.lat;
                const lng = el.lon;
                
                if (!lat || !lng) continue;

                let profession = 'Electronics Shop';
                if (el.tags.shop === 'mobile_phone') profession = 'Mobile Repair Shop';
                else if (el.tags.craft === 'electronics_repair') profession = 'Electronics Repair Center';
                else if (el.tags.shop === 'appliance') profession = 'Home Appliance Technician';
                else if (el.tags.shop === 'computer' || name.toLowerCase().includes('computer')) profession = 'Computer Service';
                else if (name.toLowerCase().includes('mobile')) profession = 'Mobile Repair Shop';
                
                const street = el.tags['addr:street'] || '';
                const city = el.tags['addr:city'] || district;
                const location = street ? `${street}, ${city}` : city;
                
                allTechs.push({
                    id: idCounter.toString(),
                    name: name,
                    type: profession,
                    experience: `${Math.floor(Math.random() * 10) + 1}+ YRS EXP`,
                    location: location,
                    lat: lat,
                    lng: lng,
                    avatar: aiImages[Math.floor(Math.random() * aiImages.length)]
                });
                idCounter++;
            }
        });
        
        // Sleep for 2 seconds between batches
        await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log(`Successfully fetched ${allTechs.length} real shops across Tamil Nadu!`);
    
    const fileContent = `
// Real OpenStreetMap Data for Tamil Nadu

export const dummyTechnicians = ${JSON.stringify(allTechs, null, 4)};

export const categories = [
    'Mobile Repair Shop', 
    'Electronics Repair Center', 
    'Home Appliance Technician', 
    'Computer Service',
    'Electronics Shop'
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
    console.log('Saved to src/data/dummyTechnicians.js');
}

run();
