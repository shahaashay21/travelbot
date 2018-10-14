/**
 * Created by Divya Patel on 10/12/2017.
 */

var Sequelize = require('sequelize');
var sequelize = require('./sequelize.js');

module.exports = sequelize.define('friends',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            field:'user_id'
        },
        friend_id: {
            type: Sequelize.INTEGER,
            field:'friend_id'
        },
        block: {
            type: Sequelize.INTEGER,
            field:'block'
        },
        request: {
            type: Sequelize.INTEGER,
            field:'request'
        }
    },{
        tableName: 'friends',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
);