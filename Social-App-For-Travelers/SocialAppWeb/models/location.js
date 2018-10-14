/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('location', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		latitude: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		longitude: {
			type: DataTypes.TEXT,
			allowNull: false
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
		tableName: 'location',
		timestamps: true
	});
};
