const {TWILIO} = require('../config')

const accountSid = TWILIO.account_SID
const authToken = TWILIO.auth_Token

const twilio = require('twilio')
const client = new twilio(accountSid, authToken)