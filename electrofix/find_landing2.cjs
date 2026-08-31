const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\silambarasan\\.gemini\\antigravity-ide\\brain\\5b6988af-f7b5-47c5-9552-1b002aeacd05\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let foundViewCall = false;

  for await (const line of rl) {
    try {
        const obj = JSON.parse(line);
        if (obj.step_index === 16) {
            foundViewCall = true;
        }
        if (foundViewCall && obj.type === 'TOOL_RESPONSE') {
            fs.writeFileSync('c:\\Users\\silambarasan\\project\\electrofix\\original_landing.jsx', obj.content);
            console.log("Recovered LandingPage.jsx to original_landing.jsx");
            return;
        }
    } catch(e) {}
  }
}

processLineByLine();
