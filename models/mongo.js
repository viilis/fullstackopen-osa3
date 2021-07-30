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
    name:{type: String, require: true},
    number:{type: String, require: true}
})

personSchema.set('toJSON',{
    transform:(doc, ret) =>{
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})
module.exports = mongoose.model('Person',personSchema)