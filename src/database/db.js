const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

let db = null

module.exports = (app) => {
	if (!db) {
		// const config = app.config.keys
		let sequelize = new Sequelize(app.config.keys.mysqlURI)
		// const sequelize = new Sequelize(
		// 	config.database,
		// 	config.username,
		// 	config.password,
		// 	config.params,
		// )
		db = {
			sequelize,
			Sequelize,
			models: {},
		}
		const modelsDir = path.join(__dirname, 'models')
		fs.readdirSync(modelsDir).forEach((file) => {
			const modelDir = path.join(modelsDir, file)
			// const model = sequelize.import(modelDir)
			var model = require(modelDir)(sequelize, Sequelize)
			db.models[model.name] = model
		})
		Object.keys(db).forEach((modelName) => {
			if (db[modelName].associate) {
				db[modelName].associate(db)
			}
		})
	}
	return db
}
