//HOw to send an outbond text

const accountSid = ACCOUNTSID; 
const authToken = '[AuthToken]'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Get 1-to-1 testing - 62LX9AMWB2EVKXQ', 
         from: '+12066934343', 
         to: '2065659252' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();