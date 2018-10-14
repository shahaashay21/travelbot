/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('media', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		place_id: {
			type: DataTypes.INTEGER(11),
            allowNull: true,
		},
		trip_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		type: {
			type: DataTypes.ENUM('image','video'),
			allowNull: false
		},
        flag_media_place: {
            type: DataTypes.ENUM('media','place'),
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
		tableName: 'media',
		timestamps: true
	});
};
