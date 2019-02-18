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
        const smsText = req.body.Body.replace(/["']/g, "")
        console.log("entire text ", smsText)
        const word =  smsText.split(' ')[0].toLowerCase()

       // const word = wordx.replace(/["']/g, "")

        console.log("removed quotation marks...", word)

        //console.log("First letter ",word[1])
        // if(preword[1]=="r"){
        //     console.log("it is true...r is first word...", word)
        //     let word = preword+'"'
        //     console.log("This is remove...", wordx)
        // }else{
        //     let word = preword
        //     console.log("Word in the else statement ", word)
        // }
        
        

        switch(word){
            
            case ('add'):
                //get the text after the word 'add'
                const task = smsText.substr(4, smsText.length).trim()

                console.log("I am in the add case")
                //)
                const newTask = new Task({
                    _id: new mongoose.Types.ObjectId(),
                    task
                }) 

                await newTask.save()
                               
                await client.messages.create({
                    from: req.body.To,
                    body: `"${task}" has been added to your to-do list.`,
                    to: req.body.From
                })       
                
            break

            case ('list'):
                       
                //get the array of todos
                const allTasks = await Task.find().select('task')
                
                // allTasks.forEach((task, index)=>{
                //     //console.log("index: ", index, "task: ", task.task)
                //     const number = index+1
                //     client.messages.create({
                //         from: req.body.To,
                //         body: `${number}. ${task.task}`,
                //         to: req.body.From
                //     })  
                // })               

                
                const todoString = allTasks.map((task, index)=>{
                    return `${index+1}. ${task.task}`
                })

                console.log(todoString.join(" "))

                //console.log(todoString)

                await client.messages.create({
                    from: req.body.To,
                    body: '"'+todoString.join(" ")+'"',
                    to: req.body.From
                })                 
                
            break

            case ('remove'):
            console.log("I am in the remove case")
                const taskNumber = smsText.split(' ')[1] //taskNumber is a string

                console.log(taskNumber)
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

