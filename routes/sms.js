const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../models/task')
const MessagingResponse = require('twilio').twiml.MessagingResponse

//this route responds to SMS send to our twilio number
//receive a message from a cellphone
router.post('/', async (req, res) => {    

    try{
        const twiml = new MessagingResponse()
        const smsText = req.body.Body.replace(/["']/g, "")
        const word =  smsText.split(' ')[0].toLowerCase().trim()        

        switch(word){
            
            case ('add'):
                //get the text after the word 'add'
                const task = smsText.substr(4, smsText.length).trim()

                const newTask = new Task({
                    _id: new mongoose.Types.ObjectId(),
                    task
                }) 

                await newTask.save()

                twiml.message(`"${newTask.task}" has been added to your to-do list.`)

                res.writeHead(200, {'Content-Type': 'text/xml'})
                res.end(twiml.toString())
                
            break

            case ('list'):
                       
                //get the array of todos
                const allTasks = await Task.find().select('task')
                
                const todoString = allTasks.map((task, index)=>{
                    return `${index+1}. ${task.task}`
                })

                twiml.message({
                    action: '/sms/status',
                    method: 'POST'
                },'"'+todoString.join(" ")+'"')

                res.writeHead(200, {'Content-Type': 'text/xml'})
                console.log("Are we getting here?")
                console.log(twiml.toString())
                res.end(twiml.toString())
                
            break

            case ('remove'):
            console.log("I am in the remove case")
                const taskNumber = smsText.split(' ')[1] //taskNumber is a string

                const listNumber = parseInt(taskNumber, 10)//convert it into an integer to perform arithmetic
                const indexNumber = listNumber-1 //add one to index to get list number               
                
                const DBTasks = await Task.find().select('task')       
                
                const removeTask = await Task.findById(DBTasks[indexNumber]._id)

                await Task.remove({_id: DBTasks[indexNumber]._id})

                twiml.message(`"${removeTask.task}" has been removed.`)                

                res.writeHead(200, {'Content-Type': 'text/xml'})
                res.end(twiml.toString())
               
           break


        }
    }catch(error){

    }
})

router.post('/status', async(req, res, next) =>{
    try{
        console.log(req.body)
        console.log(req.headers)

    }catch(error){
        
    }
})
module.exports = router

