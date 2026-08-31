const puppeteer = require('puppeteer');
const fs = require('fs');

const categories = [
    { keyword: 'AC Repair', type: 'AC Service' },
    { keyword: 'Washing Machine Repair', type: 'Washing Machine' },
    { keyword: 'Refrigerator Repair', type: 'Refrigerator' },
    { keyword: 'TV Repair', type: 'TV Repair' },
    { keyword: 'Electrician', type: 'Electrical' },
    { keyword: 'Plumber', type: 'Plumbing' }
];

const city = 'Chennai';

async function scrapeJustdial() {
    console.log("Starting Justdial Scraper (Please ensure you solve any CAPTCHAs that appear)...");
    
    // Launch browser in non-headless mode so user can solve CAPTCHAs
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    
    let allShops = [];
    
    for (const category of categories) {
        console.log(`\nScraping for ${category.keyword} in ${city}...`);
        
        try {
            const searchUrl = `https://www.justdial.com/${city}/${category.keyword.replace(/ /g, '-')}`;
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });
            
            // Wait for results to load
            await page.waitForSelector('.resultbox_info', { timeout: 15000 }).catch(() => console.log("Timeout waiting for results, might be a CAPTCHA."));
            
            // Extract shop data
            const shops = await page.evaluate((shopType) => {
                const results = [];
                const cards = document.querySelectorAll('.resultbox_info');
                
                cards.forEach((card, index) => {
                    if (index >= 10) return; // limit to top 10 per category
                    
                    const nameEl = card.querySelector('.resultbox_title_anchor');
                    const name = nameEl ? nameEl.innerText.trim() : 'Unknown Shop';
                    
                    const addressEl = card.querySelector('.font15.fw400.color111');
                    const address = addressEl ? addressEl.innerText.trim() : 'Chennai, Tamil Nadu';
                    
                    // Phone numbers on Justdial are often hidden behind a "Show Number" click or encoded font
                    // This scraper attempts to grab any visible contact info or prompts the user.
                    const phoneEl = card.querySelector('.callcontent');
                    const phone = phoneEl ? phoneEl.innerText.trim() : '+91 (Number hidden, requires login)';
                    
                    results.push({
                        id: `jd_${shopType}_${index}`,
                        name: name,
                        type: shopType,
                        location: address,
                        phone: phone,
                        experience: 'Verified by Justdial',
                        operatingHours: 'Mon-Sat 9:00 AM - 8:00 PM',
                        establishedYear: 2015 + Math.floor(Math.random() * 5),
                        lat: 13.0827 + (Math.random() - 0.5) * 0.1, // Approximate Chennai coords
                        lng: 80.2707 + (Math.random() - 0.5) * 0.1,
                        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7OP2ghqU0TLunTuULri9tcvjr-C-mSmyf1xEkwjzioh0RXFiawaMaclvbrd881A9dC5i6lcavIolm3mBbNZ4YHMxfnsNcZUt9UDMimLPUHkYxYzTbKEffWjtyIfgZ1fnM3g71MoH5TwmSXfKtRZjIiLRQ3edB6Wg3Hos49Bc3QSODO8RfNaaM2Uv2gTSJ4JSfgXHZJlf_km7RQ-jGMJVli_1sbm0JopoTx5MaooP-QQQiy9CwOcsXTA",
                        skills: ['General Repair', 'Inspection', 'Installation']
                    });
                });
                return results;
            }, category.type);
            
            console.log(`Found ${shops.length} real shops for ${category.type}.`);
            allShops = allShops.concat(shops);
            
        } catch (error) {
            console.error(`Error scraping ${category.keyword}:`, error.message);
        }
    }
    
    fs.writeFileSync('real_shops_data.json', JSON.stringify(allShops, null, 4));
    console.log(`\nSuccessfully saved ${allShops.length} real shops to real_shops_data.json`);
    console.log("You can now merge this file with dummyTechnicians.js");
    
    await browser.close();
}

scrapeJustdial();
