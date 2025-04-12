const express = require('express');
const fs = require('fs').promises;
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
const PORT = 3000;
const XML_FILE = 'messages.xml';

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// Get messages
app.get('/messages', async (req, res) => {
    try {
        const data = await fs.readFile(XML_FILE, 'utf8');
        const parser = new xml2js.Parser();
        const xml = await parser.parseStringPromise(data);
        res.json(xml);
    } catch (err) {
        console.error('Error reading XML:', err);
        res.status(500).send('Server error');
    }
});

// Save message
app.post('/messages', async (req, res) => {
    const { text, timestamp } = req.body;
    if (!text || !timestamp) {
        return res.status(400).send('Missing text or timestamp');
    }

    try {
        // Read current XML
        let data = await fs.readFile(XML_FILE, 'utf8');
        const parser = new xml2js.Parser();
        const xml = await parser.parseStringPromise(data);

        // Add new message
        const newMessage = { text, timestamp };
        if (!xml.messages.message) {
            xml.messages.message = [];
        }
        xml.messages.message.push(newMessage);

        // Write back to XML
        const builder = new xml2js.Builder();
        const updatedXml = builder.buildObject(xml);
        await fs.writeFile(XML_FILE, updatedXml);

        res.status(200).send('Message saved');
    } catch (err) {
        console.error('Error writing XML:', err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});