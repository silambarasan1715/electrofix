const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Safe DB Initialization
let db;
let dbError = null;

try {
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = process.env.VERCEL ? '/tmp/database.sqlite' : path.resolve(__dirname, 'database.sqlite');
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            dbError = err.message;
            console.error('Error opening database', err.message);
        } else {
            console.log('Connected to the SQLite database.');
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    location TEXT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                )
            `);
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
} catch (e) {
    dbError = 'Failed to load sqlite3: ' + e.toString();
    console.error(dbError);
}

// Global DB Check Middleware
const checkDb = (req, res, next) => {
    if (dbError) {
        return res.status(500).json({ error: 'Database Initialization Error on Vercel: ' + dbError });
    }
    next();
};

// Health Route for debugging
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', dbError });
});

// Routes

// 1. Signup Route
app.post('/api/auth/signup', checkDb, async (req, res) => {
    const { name, location, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (name, location, email, password) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, location, email, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed: users.email')) {
                    return res.status(409).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Failed to register user: ' + err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Login Route
app.post('/api/auth/login', checkDb, (req, res) => {
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
app.post('/api/auth/forgot-password', checkDb, (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000;

        db.run(`INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)`, [email, otp, expiresAt], (insertErr) => {
            if (insertErr) return res.status(500).json({ error: 'Failed to generate OTP' });
            res.status(200).json({ message: 'OTP sent successfully', otp });
        });
    });
});

// 4. Reset Password Route
app.post('/api/auth/reset-password', checkDb, (req, res) => {
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

                db.run(`DELETE FROM otps WHERE email = ?`, [email]);
                res.status(200).json({ message: 'Password reset successfully' });
            });
        } catch (hashErr) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
