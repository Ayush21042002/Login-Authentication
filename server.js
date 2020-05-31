const { Op } = require('sequelize')
const express = require('express')
const bcrypt = require('bcrypt')

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

    const hashedpassword = await bcrypt.hash(password,10)

    const newUsers = await Users.create({
        username: username,
        password: hashedpassword
    })
    res.status(200).send({ success: 'New task added'})
})

app.post('/users/login', async(req,res) =>{
    const username = req.body.username
    const password = req.body.password

    const user = await Users.findByPk(username)

    let token = {
        success: true,
        username: username
    }

    if(user == null || !(await bcrypt.compare(password,user.password)))
        token.success = false
    
    res.send(JSON.stringify(token))
})