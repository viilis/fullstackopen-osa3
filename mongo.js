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

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(res => {
    console.log('saved')
    mongoose.connection.close()
})