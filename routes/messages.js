//const express = require('express')
//const router = express.Router()
//const TWILIO_CONFIG = require('../config')
const accountSid = 'ACb11e421fcca270377a9c1f08bec23c40'
const authToken ='48301b22e70eda86ac44c5a3207f87d6'
//const twilio = require('twilio')
const client = require('twilio')(accountSid, authToken)


//router.post('https://api.twilio.com/2010-04-01/Accounts/'+accountSid+'/Messages', (req, res, next)=>{})

//const time = new Date().toLocaleTimeString().split(" ")[0]

//sends a message from my twilio number to a cell phone
client.messages
    .create(
        {
            messagingServiceSid:'MGe32e38f35a896ea2029289bc77878f1a',  
            body: `Greetings! The current time is...`,                     
            to: `+12062711946`
        }
    ).then(message => console.log(message.sid))
    .catch(error => console.log(`Error:`, error))



//get the local time


