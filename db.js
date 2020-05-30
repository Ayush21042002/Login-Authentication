const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/test.db',
})

const Users = db.define('Users', {
    username:{
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false,
    }
})

module.exports = {
    db, Users
}