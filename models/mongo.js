const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url ,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result =>{
    console.log('connected')
})
.catch((error) =>{
    console.log('error when connection to MongoDB',error.message)
})

const personSchema = new mongoose.Schema({
    id:Number,
    name:{
        type: String,
        minlength: 2,
        required: [true,'name is required']
    },
    number:{
        type: String,
        minlength: 5,
        required: [true,'number is required']
    }
})

personSchema.set('toJSON',{
    transform:(doc, ret) =>{
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})
module.exports = mongoose.model('Person',personSchema)