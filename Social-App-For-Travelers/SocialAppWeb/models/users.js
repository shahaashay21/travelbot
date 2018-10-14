/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		gender: {
			type: DataTypes.ENUM('male','female'),
			allowNull: true
		},
		profile_pic: {
			type: DataTypes.STRING
		},
		cover_pic: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		state: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		country: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		verified: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		verificationCode: {
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
		},
		birth_date:{
			type: DataTypes.TIME
		}
	}, {
		tableName: 'users',
		timestamps: true
	});
};
