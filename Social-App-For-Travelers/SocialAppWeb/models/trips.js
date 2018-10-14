/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('trips', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		source: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		destination: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		budget: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		trip_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.TIME,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.TIME,
			allowNull: true
		}
	}, {
		tableName: 'trips',
		timestamps: true
	});
};
