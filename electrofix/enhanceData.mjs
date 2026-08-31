import fs from 'fs';
import path from 'path';
import { dummyTechnicians } from './src/data/dummyTechnicians.js';

let technicians = dummyTechnicians;

const hoursOptions = [
    'Mon-Sat 9:00 AM - 8:00 PM',
    'Mon-Sun 10:00 AM - 9:00 PM',
    'Mon-Sat 8:30 AM - 7:30 PM',
    '24/7 Available',
    'Mon-Sat 10:00 AM - 6:00 PM',
    'Mon-Fri 9:00 AM - 5:00 PM'
];

const yearOptions = [2010, 2012, 2015, 2018, 2020, 2021, 2022, 2005, 2008];

const generatePhone = () => {
    const prefixes = ['98', '99', '94', '97', '80', '70', '63'];
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const rest = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+91 ${p}${rest}`;
};

technicians = technicians.map(tech => ({
    ...tech,
    phone: tech.phone || generatePhone(),
    operatingHours: tech.operatingHours || hoursOptions[Math.floor(Math.random() * hoursOptions.length)],
    establishedYear: tech.establishedYear || yearOptions[Math.floor(Math.random() * yearOptions.length)]
}));

const filePath = path.resolve('src/data/dummyTechnicians.js');
const newArrayString = JSON.stringify(technicians, null, 4);
const newFileContent = `// Comprehensive realistic simulated shop data based on Tamil Nadu demographics (All 38 Districts)\n\nexport const dummyTechnicians = ${newArrayString};\n`;

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log(`Successfully enhanced ${technicians.length} technicians with Justdial-like data!`);
