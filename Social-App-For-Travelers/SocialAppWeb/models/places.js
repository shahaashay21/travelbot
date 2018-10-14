/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('places', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		trip_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'trips',
				key: 'id'
			}
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		visit_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		budget: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		type: {
			type: DataTypes.ENUM('restaurant','hotel','place','museum'),
			allowNull: false
		},
		persons: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'places',
		timestamps: true
	});
};
