const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = (app) => {
	const params = {
		secretOrKey: authSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	}

	const strategy = new Strategy(params, (payload, done) => {
		app.database.db.models.user
			.findOne({where: {id: payload.id}})
			.then((user) => {
				if (user) {
					done(null, {id: user.id, email: user.email})
				} else {
					done(null, false)
				}
			})
			.catch((err) => done(err, false))
	})
	passport.use(strategy)

	return {
		initialize: () => passport.initialize(),
		authenticate: () => passport.authenticate('jwt', {session: false}),
	}
}
