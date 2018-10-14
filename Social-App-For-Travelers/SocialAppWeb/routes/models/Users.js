var Sequelize = require('sequelize');
var sequelize = require('./sequelize.js');

module.exports = sequelize.define('users',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
                type: Sequelize.STRING,
                allowNull: false
        },
        lastName: {
                type: Sequelize.STRING,
                allowNull: false
        },
        email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
        },
        password: {
                type: Sequelize.TEXT,
                allowNull: false
        },
        gender: {
                type: Sequelize.STRING
        },
        profile_pic: {
                type: Sequelize.STRING
        },
        cover_pic: {
                type: Sequelize.STRING
        },
        address: {
                type: Sequelize.STRING
        },
        city: {
                type: Sequelize.STRING
        },
        state: {
                type: Sequelize.STRING
        },
        country: {
                type: Sequelize.STRING
        },
        verified: {
                type: Sequelize.INTEGER
        },
        verificationCode: {
                type: Sequelize.TEXT
        },
        birth_date:{
                type: Sequelize.DATEONLY
        }
    },{
        timestamps: true,
        freezeTableName: true,
        tableName: 'users'
    }
);