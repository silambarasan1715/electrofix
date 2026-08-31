const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\silambarasan\\.gemini\\antigravity-ide\\brain\\5b6988af-f7b5-47c5-9552-1b002aeacd05\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let landingPageContent = null;
  let landingPageCssContent = null;
  let indexHtmlContent = null;

  for await (const line of rl) {
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') {
                    // This won't have the full file
                }
            }
        }
        
        // Let's just output any large block of text containing "LandingPage" that might be a view_file result
        if (obj.type === "TOOL_RESPONSE" && obj.content.includes("LandingPage =")) {
            console.log("FOUND LandingPage.jsx in TOOL_RESPONSE step: " + obj.step_index);
            fs.writeFileSync('c:\\Users\\silambarasan\\project\\electrofix\\src\\pages\\Landing\\LandingPage.jsx.bak', obj.content);
        }
    } catch(e) {}
  }
}

processLineByLine();
