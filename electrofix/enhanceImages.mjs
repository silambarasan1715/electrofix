import fs from 'fs';
import path from 'path';
import { dummyTechnicians } from './src/data/dummyTechnicians.js';

let technicians = dummyTechnicians;

const categoryImages = {
    'Mobile Repair': [
        '/avatars/mobile_tech.png'
    ],
    'AC Service': [
        '/avatars/ac_tech.png'
    ],
    'Washing Machine': [
        '/avatars/washer_tech.png'
    ],
    'Refrigerator': [
        '/avatars/fridge_tech.png'
    ],
    'TV Repair': [
        '/avatars/tv_tech.png'
    ],
    'Computer Service': [
        '/avatars/computer_tech.png'
    ],
    'Electrical': [
        '/avatars/electrician_tech.png'
    ],
    'Plumbing': [
        '/avatars/plumber_tech.png'
    ]
};

technicians = technicians.map(tech => {
    const images = categoryImages[tech.type] || categoryImages['Electrical'];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    return {
        ...tech,
        avatar: randomImage
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
console.log(`Successfully updated avatar images for ${technicians.length} technicians!`);
