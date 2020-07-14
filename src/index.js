const express = require('express')
const path = require('path')

// const config = require('../../config/keys')
const app = express()

const consign = require('consign')
consign({cwd: path.join(__dirname)})
	.include('config/keys.js')
	.then('database/db.js')
	.then('middlewares')
	.then('api')
	.then('routes')
	.into(app)

app.get('/', (req, res) => {
	res.status(200).send('Hello World')
})

app.listen(3000, () => {
	console.log('Listening on port 3000')
})
