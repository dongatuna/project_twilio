//const express = require('express')
//const router = express.Router()
const TWILIO = require('../config')
const accountSid = TWILIO.account_SID
const authToken = TWILIO.auth_Token
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)


//router.post('https://api.twilio.com/2010-04-01/Accounts/'+accountSid+'/Messages', (req, res, next)=>{})

const time = new Date().toLocaleTimeString().split(" ")[0]

client.messages
    .create(
        {
            from: '+12066934343',
            body: `Greetings! The current time is: ${time} L6RCYQT46S8BUED`,
            to: `+12092104311`
        }
    ).then(message => console.log(message.sid))
    .catch(error => console.log(error))


//get the local time


