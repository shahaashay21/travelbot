/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notifications', {
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		comment: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		like: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		follow_request: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		read: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1'
		}
	}, {
		tableName: 'notifications',
		timestamps: true
	});
};
