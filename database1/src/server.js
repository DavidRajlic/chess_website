const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: "618b594c4aaf674a1eb8f8a17a6bbc53b710fe10afd314605fac8634d0aea503",
        resave: false,
        saveUninitialized: true,
    })
);

mongoose.connect(
    "mongodb+srv://davidbujic:david4520326@cluster0.23b0l6h.mongodb.net/Website"
);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    wins: Number,
    losses: Number,
    draws: Number,
    ranks: [
        {
            rank: Number,
            date: String,
        },
    ],
});

const User = mongoose.model("Users", userSchema);

app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            wins: 0,
            losses: 0,
            draws: 0,
            ranks: [
                {
                    rank: 0,
                    date: new Date().toISOString().slice(0, 10),
                },
            ],
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = user;
            res.status(200).json({
                message: "Login successful",
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/profile", async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json({ message: "Profile found", user });
        } else {
            res.status(404).json({ message: "Profile not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/change_username", async (req, res) => {
    try {
        const { username, newUsername } = req.body;
        const anotherUser = await User.findOne({ username: newUsername });
        if (anotherUser) {
            res.status(400).json({ message: "Username already taken" });
        }
        await User.updateOne({ username }, { $set: { username: newUsername } });
        res.status(200).json({ message: "Username changed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/change_password", async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOne({ username });
        if (user) {
            await User.updateOne({ username }, { password: hashedPassword });
            res.status(200).json({ message: "Password changed successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: "Failed to logout" });
        } else {
            res.status(200).json({ message: "Logout successful" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
