const express = require('express')
const config = require('./config/keys')
const bodyParser = require('body-parser')
const {Sequelize} = require('sequelize')

let sequelize = new Sequelize(config.mysqlURI)
async function testDB() {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}
// testDB()

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.status(200).send('Hello World')
})

app.listen(3000, () => {
	console.log('Listening')
})
