const express = require('express')
const morgan = require('morgan')
const path = require('path') //used to declare the public folder 
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Set the public folder
app.use(express.static(path.join(__dirname, 'public')))

//Middleware for console loggin
app.use(morgan('dev'))
//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// Enable CORS
app.use(cors()) //allows requests from other domains

app.use('/sms', require('./twilio/sms.js'))


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404
    next(error)
  })
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
      error: {
        message: error.message
      }
    })
  })
  

const port = 3030

app.listen(port, ()=>{console.log(`Server started on port ${port}`)})

module.exports = app