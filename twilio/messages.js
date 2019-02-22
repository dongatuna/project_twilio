//const express = require('express')
//const router = express.Router()
const TWILIO_CONFIG = require('../config')
const accountSid = TWILIO_CONFIG.account_SID
const authToken = TWILIO_CONFIG.auth_Token
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)


//router.post('https://api.twilio.com/2010-04-01/Accounts/'+accountSid+'/Messages', (req, res, next)=>{})

const time = new Date().toLocaleTimeString().split(" ")[0]

//sends a message from my twilio number to a cell phone
client.messages
    .create(
        {
            body: `Greetings! The current time is: ${time} L6RCYQT46S8BUED`,
            messagingServicecSid:'MGe32e38f35a896ea2029289bc77878f1a',            
            to: `+12062711946`
        }
    ).then(message => console.log(message.sid))
    .catch(error => console.log(error))


//get the local time


