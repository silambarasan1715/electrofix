const fetch = require('node-fetch');

async function test() {
    try {
        const chatMessages = [
            { role: "system", content: "You are a helpful AI." },
            { role: "user", content: "Hello" }
        ];

        const response = await fetch("https://text.pollinations.ai/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: chatMessages,
                model: "openai"
            }),
        });
        
        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response:', text);
    } catch (e) {
        console.error(e);
    }
}

test();
