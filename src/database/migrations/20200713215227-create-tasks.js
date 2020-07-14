module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			desc: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			estimateAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			doneAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('tasks')
	},
}
