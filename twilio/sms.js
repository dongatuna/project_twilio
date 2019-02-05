const express = require('express')
const router = express.Router()
const TWILIO = require('../config')
const accountSid = TWILIO.account_SID
const authToken = TWILIO.auth_Token
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)
//const MessagingResponse = require('twilio').twiml.MessagingResponse

//this route responds to SMS send to our twilio number
//receive a message from a cellphone
router.post('/', async (req, res) => {    

    try{
        const smsText = req.body.Body
        const word =  smsText.split(" ")[0].toLowerCase()
        
        //user's todos
        //const todos = []
        switch(word){
            
            case 'add':
                //get the text after the word 'add'
                const task = smsText.substr(4, smsText.length).trim()
                // todos.push(task)
                
                // console.log(todos)
                const response = await client.messages.create({
                    from: req.body.To,
                    body: `${task} has been added to your to-do list`,
                    to: req.body.From
                })

                const counter = 0
                console.log(counter)
               if(response.body){
                   console.log("I am in here....")
                   counter = counter + 1
               }
              console.log("The 1st counter is here...", counter)
            break

            case 'list':
            //send the array of todos

                client.messages.each({
                    dateSent: "2019-02-04",//don't use documentation -- date format for this field is YYYY-MM-DD
                    from: req.body.To,
                    to: req.body.From
                },

                messages => {
                   // console.log("The 2nd counter is here...", counter)

                    let smsTwilioTexts = []
                    smsTwilioTexts.push(messages)

                    console.log("Please work....", smsTwilioTexts.length)
                    
                    // smsTexts.forEach(smsText =>{
                    //     if(smsText.body!=""){      
                    //         const listItem =  smsTexts.indexOf(smsText)+". "+smsText.body
                    //         client.messages.create({
                    //             from: req.body.To,
                    //             body: listItem,
                    //             to: req.body.From
                    //         })                       
                    //     }
                    // })
                    

                  //  console.log('count ', count, "and ", sum)
                },
                
                ) 
                
               
                
            break

            case 'remove':
                const taskNumber = smsText.split(' ')[1]
                todos.splice(taskNumber, 1)
            break


        }
    }catch(error){

    }
    

//     const twiml = new MessagingResponse()

//    // console.log("Is this it?", FromCountry)

//     twiml.message(`Hi! It looks like your phone number was born in ${req.body.FromCountry}`)

//     res.writeHead(200, {'Content-Type':'text/xml'})
//     res.end(twiml.toString())

})



module.exports = router

