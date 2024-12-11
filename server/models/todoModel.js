const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
}
    ,
    {
        timestamps: true
    })

const todo = mongoose.model("todo", todoSchema)
module.exports = todo