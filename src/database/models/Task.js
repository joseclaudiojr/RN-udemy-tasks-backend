module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define('task', {
		desc: DataTypes.STRING,
		estimateAt: DataTypes.DATE,
		doneAt: DataTypes.DATE,
		userId: DataTypes.INTEGER,
		createdAt: DataTypes.DATE,
	})

	return Answer
}
