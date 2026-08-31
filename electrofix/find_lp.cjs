const fs = require('fs');

try {
    const content = fs.readFileSync('C:\\Users\\silambarasan\\.gemini\\antigravity-ide\\brain\\5b6988af-f7b5-47c5-9552-1b002aeacd05\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
    const lines = content.split('\n');
    let restored = false;

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i]) continue;
        try {
            const obj = JSON.parse(lines[i]);
            if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('import ') && obj.content.includes('export default LandingPage')) {
                fs.writeFileSync('c:\\Users\\silambarasan\\project\\electrofix\\src\\pages\\Landing\\LandingPage.jsx', obj.content);
                console.log("Restored LandingPage.jsx!");
                restored = true;
                break;
            }
        } catch(e) {}
    }
    
    if (!restored) console.log("Could not find LandingPage.jsx in logs.");
} catch(e) {
    console.error(e);
}
