/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('identity', {
		tablename: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		lastunkid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1'
		}
	}, {
		tableName: 'identity',
		timestamps: true
	});
};
