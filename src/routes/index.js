module.exports = (app) => {
	//User operations
	app.post('/signup', app.api.user.save)
	app.post('/signin', app.api.auth.signin)

	app
		.route('/tasks')
		.all(app.middlewares.passport.authenticate())
		.get(app.api.task.getTasks)
		.post(app.api.task.save)

	app
		.route('/tasks/:id')
		.all(app.middlewares.passport.authenticate())
		.delete(app.api.task.remove)

	app
		.route('/tasks/:id/toggle')
		.all(app.middlewares.passport.authenticate())
		.put(app.api.task.toggleTask)
}
