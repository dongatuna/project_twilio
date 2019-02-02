const express = require('express')
const router = express.Router()
const TWILIO = require('../config')
const accountSid = TWILIO.account_SID
const authToken = TWILIO.auth_Token
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

//this route responds to SMS send to our twilio number
//receive a message from a cellphone
router.post('/', async (req, res) => {    

    try{
        const smsText = req.body.Body
        const word =  smsText.split(" ")[0]
        
        //user's todos
        const todos = []
        switch(word){
            case 'add':
                //get the text after the word 'add'
                const task = smsText.substr(4, smsText.length).trim()
                todos.push(task)

                await client.messages.create({
                    from: req.body.To,
                    body: `${task} has been added to your to-do list`,
                    to: req.body.From
                })
            break

            case 'list':
            //send the array of todos


                const allTasks = await create.messages.each(
                    
                    {
                        from: req.body.To, 
                        //for(let i = 1; i<=todos.length+1; i++){ }
                        body: `${task} has been added to your to-do list`,                        
                        to: req.body.From
                    }
                )
                
            break

            case 'remove':
                const taskNumber = smsText.split(' ')[1]
                todos.splice(taskNumber, 1)


        }
    }catch(error){

    }
    

    const twiml = new MessagingResponse()

   // console.log("Is this it?", FromCountry)

    twiml.message(`Hi! It looks like your phone number was born in ${req.body.FromCountry}`)

    res.writeHead(200, {'Content-Type':'text/xml'})
    res.end(twiml.toString())

})

module.exports = router

