/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('media_comments', {
		media_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'media',
				key: 'id'
			}
		},
		place_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'places',
				key: 'id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		like: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'media_comments',
		timestamps: true
	});
};
