const express = require('express')
const path = require('path') //used to declare the public folder 
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Set the public folder
app.use(express.static(path.join(__dirname, 'public')))

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Enable CORS
app.use(cors()) //allows requests from other domains

const port = 3030

app.listen(port, ()=>{console.log(`Server started on port ${port}`)})
