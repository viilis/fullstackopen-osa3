require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/mongo')
const { Mongoose } = require('mongoose')

const app = express()

app.use(express.static('build'))
app.use(express.json())
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
let x = 0
//error handling middleware
const errorHandler= (error,req,res,next) => {
    console.log(error.message)
    next(error)
}
//ROUTES
app.get('/api/persons', (req,res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req,res) => {
    Person.find({}).then(r => {
        x=r.length
        const response = `<div><p>Phonebook has info ${x}</p><p>${new Date()}</p></div>`
        res.send(response)
    })
})

app.get('/api/persons/:id', (req,res,next) =>{
    const person_id = req.params.id
    Person.findById(person_id).then(result => {
        if(result){
            res.json(result)
        }else{
            res.status(404).end()
        }
    }).catch(error => next(error))

})

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

app.put('/api/persons/:id',(req,res) => {
    const person_id = req.params.id
    Person.findByIdAndUpdate(person_id,req.body,{new :true}).then(result =>{
        res.json(result)
    })
})

app.delete('/api/persons/:id', (req,res) =>{
    const person_id = req.params.id
    Person.findByIdAndRemove(person_id).then(result => {
        res.status(204).json(result)
    })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})