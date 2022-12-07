require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000;

app.use(express.json());

const isLoggedIn = (req, res, next) => {
    const { headers: {authorization}} = req;
    
    if(!authorization){res.send('get out')}
    const payload = jwt.verify(authorization, process.env.JWT_SECRET)

    req.user = payload.user
    next()
}

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

app.get('/secret', isLoggedIn, (req, res)=> {
    res.json(posts)
});

app.listen(port, ()=>{console.log(`http://localhost:${port}/`)})