const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const greetings = []; // In-memory array to store greetings

app.post('/api/greeting', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required." });
    }
    const greeting = `Hello, ${name}! Welcome to ClarityAI.`;
    greetings.push(greeting);
    res.json({ message: greeting });
});

// New endpoint to fetch all greetings
app.get('/api/greetings', (req, res) => {
    res.json({ greetings });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});