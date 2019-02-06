const express = require('express')
const router = express.Router()
const TWILIO_CONFIG = require('../config')
const mongoose = require('mongoose')
const Task = require('../models/task')
const accountSid = TWILIO_CONFIG.account_SID
const authToken = TWILIO_CONFIG.auth_Token
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)
//const MessagingResponse = require('twilio').twiml.MessagingResponse

//this route responds to SMS send to our twilio number
//receive a message from a cellphone
router.post('/', async (req, res) => {    

    try{
        const smsText = req.body.Body
        const word =  smsText.split(" ")[0].toLowerCase()
        
        switch(word){
            
            case 'add':
                //get the text after the word 'add'
                const task = smsText.substr(4, smsText.length).trim()

                const newTask = new Task({
                    _id: new mongoose.Types.ObjectId(),
                    task
                }) 

                await newTask.save()
                               
                client.messages.create({
                    from: req.body.To,
                    body: `${task} has been added to your to-do list`,
                    to: req.body.From
                })       
                
            break

            case 'list':


                const today = new Date().toJSON().slice(0,10)

                console.log(today)

                //console.log("This is today's date...", date)
            //send the array of todos
                const allTasks = await Task.find().select('task')
                
                console.log(allTasks.length)

                allTasks.forEach((task, index)=>{
                    console.log("index: ", index, "task: ",task.task)
                    const number = index+1
                    client.messages.create({
                        from: req.body.To,
                        body: `${number}. ${task.task}`,
                        to: req.body.From
                    })  
                })               

               
                
            break

            case 'remove':
                const taskNumber = smsText.split(' ')[1] //taskNumber is a string

                const listNumber = parseInt(taskNumber, 10)//convert it into an integer to perform arithmetic
                const indexNumber = listNumber-1 //add one to index to get list number
                console.log("Here is the task number", taskNumber, "and the index number", indexNumber)
                
                const DBTasks = await Task.find().select('task')       
                
                const removeTask = await Task.findById(DBTasks[indexNumber]._id)

                client.messages.create({
                    from: req.body.To,
                    body: `${removeTask.task} has been removed`,
                    to: req.body.From
                })  
               
                await Task.remove({_id: DBTasks[taskNumber]._id})
               
               // todos.splice(taskNumber, 1)
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

