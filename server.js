const { Op } = require('sequelize')
const express = require('express')

const {db,Users} = require('./db')

const app = express()

app.use('/', express.static(__dirname + '/front'))

app.use(express.json())

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

db.sync().then(() => {
    app.listen(port)
})
    .catch((err) => {
        console.error(err)
    })

app.get('/users', async (req,res) => {
    const users = await Users.findAll()
    if (users == null) {
        return res.send('no users')
    }

    res.status(200).send(users)
})

app.post('/users', async(req,res) =>{
    const username = req.body.username
    const password = req.body.password

    const newUsers = await Users.create({
        username: username,
        password: password
    })
    res.status(200).send({ success: 'New task added'})
})

app.post('/users/login', async(req,res) =>{
    const username = req.body.username
    const password = req.body.password

    const user = await Users.findByPk(username)

    if(user == null || user.password != password)
        res.status(400).send('error')
    
    res.status(200).send('success')
})