const express = require('express');
const Twilio = require('twilio');

const app = express();
const AccessToken = Twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/token', (req, res) => {
  const identity = 'user' + Math.floor(Math.random() * 1000);
  const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);

  token.identity = identity;

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid,
    incomingAllow: true,
  });

  token.addGrant(voiceGrant);

  res.send({
    token: token.toJwt(),
    identity: identity,
  });
});

app.listen(3000, () => console.log('Token server running on port 3000'));
