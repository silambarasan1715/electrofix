const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite DB
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create users table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                location TEXT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
        // Create otps table
        db.run(`
            CREATE TABLE IF NOT EXISTS otps (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                otp TEXT NOT NULL,
                expires_at INTEGER NOT NULL
            )
        `);
    }
});

// Routes

// 1. Signup Route
app.post('/api/auth/signup', async (req, res) => {
    const { name, location, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (name, location, email, password) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, location, email, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed: users.email')) {
                    return res.status(409).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Login Route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        try {
            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            res.status(200).json({ message: 'Login successful', userId: user.id, name: user.name });
        } catch (compareErr) {
            res.status(500).json({ error: 'Error comparing passwords' });
        }
    });
});

// 3. Forgot Password Route
app.post('/api/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        db.run(`INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)`, [email, otp, expiresAt], (insertErr) => {
            if (insertErr) return res.status(500).json({ error: 'Failed to generate OTP' });
            
            console.log(`\n=== OTP GENERATED ===\nEmail: ${email}\nOTP: ${otp}\n=====================\n`);
            // Returning otp for dev/testing ease
            res.status(200).json({ message: 'OTP sent successfully', otp });
        });
    });
});

// 4. Reset Password Route
app.post('/api/auth/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ error: 'Missing required fields' });

    db.get(`SELECT * FROM otps WHERE email = ? AND otp = ? ORDER BY expires_at DESC LIMIT 1`, [email, otp], async (err, record) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!record) return res.status(400).json({ error: 'Invalid OTP' });
        if (Date.now() > record.expires_at) return res.status(400).json({ error: 'OTP has expired' });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            db.run(`UPDATE users SET password = ? WHERE email = ?`, [hashedPassword, email], (updateErr) => {
                if (updateErr) return res.status(500).json({ error: 'Failed to reset password' });

                // Delete the used OTP
                db.run(`DELETE FROM otps WHERE email = ?`, [email]);
                res.status(200).json({ message: 'Password reset successfully' });
            });
        } catch (hashErr) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiPrompt = require('./aiPrompt.cjs');

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(200).json({ response: "Hello! The AI service is currently unavailable because the GEMINI_API_KEY is not set in the server environment. Please add it to your server configuration to enable the AI." });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: aiPrompt,
        });

        // Convert messages to Gemini format
        const history = messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const result = await model.generateContent({
            contents: history,
        });

        const responseText = result.response.text();
        res.status(200).json({ response: responseText });
    } catch (err) {
        console.error("Chat API Error:", err);
        res.status(500).json({ error: 'Internal server error', details: err.message, stack: err.stack });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
