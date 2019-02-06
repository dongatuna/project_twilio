const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {type:String, required:true}, 
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', taskSchema)