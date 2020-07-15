module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		createdAt: DataTypes.DATE,
	})

	return User
}
