require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/mongo')
const { Mongoose } = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan( (tokens, req , res) =>{
    morgan.token('body', (req) => {return JSON.stringify(req.body)})
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res,'content-length'), '-',
        tokens['response-time'](req,res),'ms',
        tokens.body(req,res)
    ].join(' ')
}))

/*const DateAndLength = () => {
    return(`<div>
        <p>Person has info for ${Person.persons.length}</p>
        <p>${new Date()}</p>
    </div>`)
}*/

//ROUTES
app.get('/api/persons', (req,res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req,res) => {
    res.send(DateAndLength())
})

app.get('/api/persons/:id', (req,res) =>{
    const person_id = req.params.id
    Person.findById(person_id).then(result => {
        if(result){
            res.json(result)
        }else{
            res.status(404).end()
        }
    }).catch(error =>{
        res.status(500).end()
    })

})
//TODO: Check if database already has name,number or id on it and do proper response for that
app.post('/api/persons', (req,res) => {
    if(req.body === undefined){
        return res.status(400).json({ error: 'content missing' })
    }

    const addable = new Person({
        name:req.body.name,
        number:req.body.number
    })
    addable.save().then(saved =>{
        res.json(saved)
    })
})

app.delete('/api/persons/:id', (req,res) =>{
    const person_id = req.params.id

    Person.findByIdAndRemove(person_id).then(result => {
        res.status(204).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})