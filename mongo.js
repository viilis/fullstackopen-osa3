const mongoose = require('mongoose')

mongoose.connect(
    `mongodb+srv://dogedox:${process.argv[2]}@fso-cluster.imy7u.mongodb.net/fso-phonebook?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}
)

const Person = mongoose.model(
    'Person', new mongoose.Schema({
        name: String,
        number: String,
    })
)
if(process.argv.length<=3){
    Person.find({}).then(res =>{
        res.forEach(p =>{
            console.log(p)
        })
        mongoose.connection.close()
    })
}else{
    const personname = process.argv[3]
const personnumber = process.argv[4]

const person = new Person({
    name: personname,
    number: personnumber,
})

person.save().then(res => {
    console.log(`added ${personname} number ${personnumber} to phonebook`)
    mongoose.connection.close()
})
}