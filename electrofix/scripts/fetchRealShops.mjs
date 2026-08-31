import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const overpassUrl = 'https://overpass-api.de/api/interpreter';
const query = `
[out:json];
area["name"="Tamil Nadu"]->.searchArea;
(
  node["shop"="electronics"](area.searchArea);
  node["shop"="mobile_phone"](area.searchArea);
  node["craft"="electronics_repair"](area.searchArea);
  node["shop"="appliance"](area.searchArea);
);
out center 400;
`;

const aiImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OP2ghqU0TLunTuULri9tcvjr-C-mSmyf1xEkwjzioh0RXFiawaMaclvbrd881A9dC5i6lcavIolm3mBbNZ4YHMxfnsNcZUt9UDMimLPUHkYxYzTbKEffWjtyIfgZ1fnM3g71MoH5TwmSXfKtRZjIiLRQ3edB6Wg3Hos49Bc3QSODO8RfNaaM2Uv2gTSJ4JSfgXHZJlf_km7RQ-jGMJVli_1sbm0JopoTx5MaooP-QQQiy9CwOcsXTA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDY2QW3PaEYkEyq5dATMzvKUXJhpZTOgOQY4vaSZFXZF-im3iR8121C3dytprUdAQ9WBVpdjS8tUJ4Uw_Lk-KWPpzzTmQvGJX67wT5CATGUfPPJrdaguf9SNQvE5_eLDXQOlylf-KzGEAdfh7KveZbF5EBxHHkQ0Vn0C_JFu2srjuw0p4xy0m3s6VxOHtfWOfuZWqfsxppUHK0H2CZRlmPTKqJqf1YTYo0wb3rWiFGIGOmTAIKyjhfaCA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6u097eEkAqmkQ9lewhgb7NR-o7nHTdwphqWWMiwS_lB7sdbryG7fKTB_HOW-0iSAdsdJeEJFXY27nhWZZhnIJKmCJhK41Cai5qWyHWVKjfif8m9cnXRQSyE22GsT8spo_l2_lKzGTevy3_TYrqxseHhxHPapPHs1WtA1Ehy-iEIKqb2iGQORKEotWctrZnm6HvVKS54QXrR-aZC6PMnehvv04JPQ5ETsbMQ4SrpT9UIH40AFPmifxag',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtCJ8Debju9_pzqRtj8_S76Gp4aPzvjUms5TmQTwvAXVmin1rPRfRf_cTGSKgtEBWPzcJynM2hR5kJeO56clE9ewx1zkhf2rBfc9nD88B9nM736f8019sNo8fgsJeAKtDQzNLIy4oA5zv4Iobl3_-yoRj_MT__N7dUtpN8rlgwu3twmUvFmuyMLYU5SgHj-w_TRyAmRJ2yyfTovMRcjFtgd-xCPp4zKM4dvpU_kLLwhp7ErlJJgD2lqg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAi3-GwW7zmWZUYcuRBOoCqn7PHp5IiQ7ZEy2ziqP59Tx9VWg-HAOj5EiukR_MPu_hGcB0SM5qesK7Zi5idkqeRR3LF4sUE_PvtRN-6seTXg3yvUl2dbWN8sL_PRTNtqOMPGgpE1HOrC6Tnea-kFtI2sckH5Kw7I7YpQAmL5iLggMDm8CWY4KbMNMmAI8P-WA-1OgTR5Q9UbV4MJZ27-NjLLo6I8suD7eUhAVabXF4rHi0krk-tXfDWRw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCwuvRT6LkbXCa2EpoYhUprLsPXTz7Qh2tzzmIlSHMtd76g72CTFgcV5icqu3bzmfKsyYg7MlRiqln5V-CwC-Fla3-spSS9hvgiljgk9VDs9F17jSxrDFT5j5_dKrrytDJ9cL94KhfrbjfxVLCCc7I2BIe0R0Vi7yfadpdiiKSow_SHwep27tMsIHshDTpWyl5RJjvOtYluanO1zWeFrQCzCOWVzm1ar8L_3svrtbK9VZ84NJERLeeJKQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAdwjH8QqiZixGGdHoMXb2L_OBWyjElF7sn5pOjLtpZEUcGcH9W68FgZxn6WL7mbVG4AVvjEVEYV4bkJqp-xfdfN6-jfPYggoYpz34S5JJICTgRYPK3jXbz9v0l7YoTVSYxpOpTDhbcSGEEfhOBE5pVjmzKQPwdNl5FkEOV48G2QlNlz3xbgzwBT5A-P5_87IYbFYFMJXAAsKUM_HKJz_MA8quw7msDnZ59jOfcStr7GSoIOtaZv8XqCw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBW_pI6q7KXaNxZWcAv9weTpO_Y_7Pyng76K1SOQ6ENS3Sh65i0hA11ioKMYOnd5fDqWjbucUOX1iXf5mzua68mM6wTA6jzyHIR_vhDwsG8sBuAxu1MfoUnQ8ZWKbgyZQIQ6o5CUQKalAr9l5w4sJn_zdaJs5u55IVehZGFL-9g3reTM_drAzZkn-uoia30AVThEnz-2dwuxNgQTzIQRGiHyubA9I_Y1fODevXiCYTSSQjoXhz2wxfj0g',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuChnT3IbTowLt2NLMGyGim4sJeVahnghjFWMIVAQqjoNH78lbXhj-nmijb5a8fVRdnc2_5lERJcai-OMIiw4DR2mLZmGFtHlveTuDiSk1L5IR-P_Zg-xHBeC5W54cw7gPPfSqmNS0RgvJaI7v2g3UoAOKMvaQpyIkef3pEb9X3RmCLv_y-b__ZXThufk7grIOJrFsfwQ7tPqn6L8sqG-pSyc9lDinB8jz41IZqNp33CTMQ24SyC54ujeQ'
];

async function fetchShops() {
    console.log('Fetching real shop data from Overpass API...');
    try {
        const response = await fetch(overpassUrl, {
            method: 'POST',
            body: query
        });
        const data = await response.json();
        
        let idCounter = 1;
        const techs = [];

        for (const element of data.elements) {
            // Require a name
            if (!element.tags || !element.tags.name) continue;
            
            const name = element.tags.name;
            const lat = element.lat || element.center?.lat;
            const lng = element.lon || element.center?.lon;
            
            if (!lat || !lng) continue;

            let profession = 'Electronics Shop';
            if (element.tags.shop === 'mobile_phone') profession = 'Mobile Repair Shop';
            else if (element.tags.craft === 'electronics_repair') profession = 'Electronics Repair Center';
            else if (element.tags.shop === 'appliance') profession = 'Home Appliance Technician';
            else if (name.toLowerCase().includes('computer') || name.toLowerCase().includes('laptop')) profession = 'Computer Service';
            else if (name.toLowerCase().includes('mobile')) profession = 'Mobile Repair Shop';
            
            const city = element.tags['addr:city'] || element.tags['addr:district'] || 'Tamil Nadu';
            const street = element.tags['addr:street'] || '';
            const location = street ? `${street}, ${city}` : city;
            
            const price = Math.floor(Math.random() * 14) * 100 + 200; // 200 to 1500 INR
            const aiImage = aiImages[Math.floor(Math.random() * aiImages.length)];
            
            techs.push({
                id: idCounter.toString(),
                name: name,
                type: profession,
                experience: `${Math.floor(Math.random() * 10) + 1}+ YRS EXP`,
                location: location,
                lat: lat,
                lng: lng,
                price: price,
                avatar: aiImage
            });
            idCounter++;
        }
        
        console.log(`Found ${techs.length} real shops.`);
        
        const fileContent = `
// Automatically generated from OpenStreetMap Overpass API

export const dummyTechnicians = ${JSON.stringify(techs, null, 4)};

export const categories = [
    'Mobile Repair Shop', 
    'Electronics Repair Center', 
    'Home Appliance Technician', 
    'Computer Service', 
    'Electronics Shop'
];
`;
        
        const outputPath = path.join(__dirname, '../src/data/dummyTechnicians.js');
        fs.writeFileSync(outputPath, fileContent.trim());
        console.log('Successfully saved to src/data/dummyTechnicians.js');

    } catch (e) {
        console.error('Failed to fetch data:', e);
    }
}

fetchShops();
