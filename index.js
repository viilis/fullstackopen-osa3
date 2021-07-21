const express = require('express')
const app = express()

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