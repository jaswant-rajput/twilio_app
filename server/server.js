const express = require('express');
const Twilio = require('twilio');
const cors = require('cors'); // Import the CORS middleware

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON request bodies

const accountSid = "";
const authToken = "";
const client = Twilio(accountSid, authToken);

app.get('/', (req, res) => {
  res.send('Server running');
});

app.post('/call', (req, res) => {
  const { to } = req.body; // Get the phone number from the request body

  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml', // URL for Twilio's XML file
      to: to,
      from: '+17203864818', // Your Twilio number
    })
    .then((call) => {
      console.log('Call initiated:', call.sid);
      res.json({ message: 'Call initiated', callSid: call.sid });
    })
    .catch((error) => {
      console.error('Error initiating call:', error);
      res.status(500).json({ error: 'Failed to initiate call' });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
