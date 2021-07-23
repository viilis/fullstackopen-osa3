const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let phonebook = {
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }

const DateAndLength = () => {
    return(`<div>
        <p>Phonebook has info for ${phonebook.persons.length}</p>
        <p>${new Date()}</p>
    </div>`)
}

const randomNumber = (min,max) =>{
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

//ROUTES
app.get('/api/persons', (req,res) => {
    res.json(phonebook.persons)
})

app.get('/info', (req,res) => {
    res.send(DateAndLength())
})

app.get('/api/persons/:id',  (req,res) =>{
    const id = req.params.id
    const person = phonebook.persons.find(p=> p.id == id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req,res) => {
    console.log(req.body.name)
    if(phonebook.persons.find( p => p.name.toLowerCase() === req.body.name.toLowerCase())){
        return res.status(400).json({ error: 'name must be unique' })
    }else if(req.body.name == "" || req.body.number == ""){
        return res.status(400).json({ error: 'name or number must be included' })
    }
    
    const min = phonebook.persons.length
    const max = 99999 // iso numero :)
    const randomID = randomNumber(min,max)
    let body = req.body
    body = {...body, "id":randomID}
    phonebook.persons.push(body)
    res.json(phonebook.persons)

})

app.delete('/api/persons/:id', (req,res) =>{
    const id = req.params.id
    if(phonebook.persons.find(p => p.id == id)){
        phonebook = phonebook.persons.filter(p => p.id !== id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }

})

const PORT = 3001
app.listen(PORT,() =>{
    console.log(`running on port ${PORT}`)
})