const {Op} = require('sequelize')
const moment = require('moment')
module.exports = (app) => {
	const getTasks = (req, res) => {
		const date = req.query.date
			? req.query.date
			: moment().endOf('day').toDate()

		app.database.db.models.task
			.findAll({
				where: {
					[Op.and]: [{userId: req.user.id}, {estimateAt: {[Op.lte]: date}}],
				},
			})
			.then((tasks) => {
				res.json(tasks)
			})
			.catch((err) => res.status(400).json(err))
	}
	const save = (req, res) => {
		if (!req.body.desc.trim()) {
			return res.status(400).send('Descrição é um campo obrigatório')
		}

		req.body.userId = req.user.id

		app.database.db.models.task
			.create({
				desc: req.body.desc,
				estimateAt:
					req.body.estimateAt !== undefined ? req.body.estimateAt : null,
				userId: req.user.id,
			})
			.then((task) => {
				res.status(204).send()
			})
			.catch((error) => {
				res.status(500).json(error)
			})
	}

	const remove = (req, res) => {
		app.database.db.models.task
			.destroy({
				where: {id: req.params.id, userId: req.user.id},
			})
			.then((result) => {
				//Verificar em debug o valor de resul
				if (result) res.status(204).send()
				else {
					const msg = `Não foi encontrada a task com id ${req.params.id}.`
					res.status(400).send(msg)
				}
			})
			.catch((err) => res.status(400).json(err))
	}

	const updateTaskDoneAt = (req, res, doneAt) => {
		app.database.db.models.task
			.update(
				{doneAt},
				{
					where: {
						id: req.params.id,
						userId: req.user.id,
					},
				},
			)
			.then((_) => {
				res.status(204).send()
			})
			.catch((err) => {
				res.status(400).json(err)
			})
	}

	const toggleTask = (req, res) => {
		app.database.db.models.task
			.findOne({
				where: {
					id: req.params.id,
					userId: req.user.id,
				},
			})
			.then((task) => {
				if (!task) {
					const msg = `Task com id ${req.params.id} não encontrada.`
					return res.status(400).send(msg)
				}
				const doneAt = task.doneAt ? null : new Date()
				updateTaskDoneAt(req, res, doneAt)
			})
			.catch((err) => res.status(400).json(err))
	}
	return {
		getTasks,
		save,
		remove,
		toggleTask,
	}
}
