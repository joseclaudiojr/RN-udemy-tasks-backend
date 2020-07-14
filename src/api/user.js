const bcrypt = require('bcrypt-nodejs')

module.exports = (app) => {
	const generateHash = (password, callback) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
		})
	}

	const save = (req, res) => {
		generateHash(req.body.password, (hash) => {
			const password = hash
			app.database.db.models.user
				.create({
					name: req.body.name,
					email: req.body.email,
					password: password,
				})
				.then((user) => {
					res.status(204).send()
				})
				.catch((error) => {
					res.status(400).json(error)
				})
		})
	}
	return {save}
}
