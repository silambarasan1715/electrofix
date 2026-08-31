import fs from 'fs';
import path from 'path';
import { dummyTechnicians } from './src/data/dummyTechnicians.js';

let technicians = dummyTechnicians;

const skillMaps = {
    'Mobile Repair': ['Screen Replacement', 'Battery Replacement', 'Water Damage Repair', 'Software Update'],
    'AC Service': ['AC Installation', 'AC Gas Refilling', 'AC Deep Cleaning', 'Compressor Repair', 'Filter Cleaning'],
    'Washing Machine': ['Motor Repair', 'Drum Cleaning', 'Water Leakage Fix', 'Panel Replacement'],
    'Refrigerator': ['Gas Refill', 'Compressor Fix', 'Thermostat Replacement', 'Door Seal Repair'],
    'TV Repair': ['Panel Replacement', 'Motherboard Repair', 'Display Issue Fix', 'Sound Problem'],
    'Computer Service': ['OS Installation', 'Hardware Upgrade', 'Virus Removal', 'Motherboard Repair'],
    'Electrical': ['Wiring Fix', 'Switchboard Repair', 'Fan Installation', 'Inverter Setup'],
    'Plumbing': ['Pipe Leakage', 'Tap Repair', 'Motor Installation', 'Drain Cleaning']
};

const typeMapping = {
    'Mobile Repair Shop': 'Mobile Repair',
    'AC Mechanic': 'AC Service',
    'Washing Machine Service': 'Washing Machine',
    'Refrigerator Repair': 'Refrigerator',
    'TV Repair Center': 'TV Repair',
    'Computer Service': 'Computer Service',
    'General Electronics Repair': 'Electrical'
};

technicians = technicians.map(tech => {
    const newType = typeMapping[tech.type] || tech.type;
    // ensure newType exists in skillMaps, else give default
    const availableSkills = skillMaps[newType] || ['General Service', 'Inspection'];
    
    // Pick 3 random skills
    const shuffled = availableSkills.sort(() => 0.5 - Math.random());
    const selectedSkills = shuffled.slice(0, 3);

    return {
        ...tech,
        type: newType,
        skills: tech.skills && tech.skills.length > 0 ? tech.skills : selectedSkills
    };
});

const filePath = path.resolve('src/data/dummyTechnicians.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Find the start of the array
const arrayStartIndex = fileContent.indexOf('export const dummyTechnicians = [');
if(arrayStartIndex === -1) {
    console.error("Could not find dummyTechnicians array export");
    process.exit(1);
}

// Keep the top part (the other exports)
const topPart = fileContent.substring(0, arrayStartIndex);

const newArrayString = JSON.stringify(technicians, null, 4);
const newFileContent = `${topPart}export const dummyTechnicians = ${newArrayString};\n`;

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log(`Successfully mapped types and added skills for ${technicians.length} technicians!`);
