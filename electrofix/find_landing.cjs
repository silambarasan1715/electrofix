const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\silambarasan\\.gemini\\antigravity-ide\\brain\\5b6988af-f7b5-47c5-9552-1b002aeacd05\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'view_file' && call.args.AbsolutePath && call.args.AbsolutePath.includes('LandingPage.jsx')) {
                    console.log("Viewed LandingPage.jsx at step: " + obj.step_index);
                }
            }
        }
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('LandingPage.jsx')) {
            console.log("Response containing LandingPage.jsx at step: " + obj.step_index);
            if (obj.content.includes('import')) {
                fs.appendFileSync('landing_page_history.txt', "\n--- STEP " + obj.step_index + " ---\n" + obj.content);
            }
        }
    } catch(e) {}
  }
}

processLineByLine();
