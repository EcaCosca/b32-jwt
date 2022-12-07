require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000;

app.use(express.json());

const posts = [
    {
        username: "Valentina",
        title:"Coding in italian"
    },
    {
        username: "Nizami",
        title:"Azerbaiyán, how to spell it"
    }
]

app.get('/', (req, res)=> {
    res.json(posts)
});


app.post('/login', (req, res)=>{
    const user = {name:"Valentina"};
    const token = jwt.sign(user, process.env.JWT_SECRET)
    res.json({token})
})

app.listen(port, ()=>{console.log(`http://localhost:${port}/`)})