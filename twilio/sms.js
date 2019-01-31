const express = require('express')
const router = express.Router()
const TWILIO = require('../config')
const accountSid = TWILIO.account_SID
const authToken = TWILIO.auth_Token
//const twilio = require('twilio')
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.post('/sms', (req, res) => {

    const twiml = new MessagingResponse()

    twiml.message('Still discombombulated....')

    res.writeHead(200, {'Content-Type':'text/xml'})
    res.end(twiml.toString())

})

