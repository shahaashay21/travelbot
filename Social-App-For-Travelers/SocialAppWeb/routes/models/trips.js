/**
 * Created by Divya Patel on 10/12/2017.
 */

var Sequelize = require('sequelize');
var sequelize = require('./sequelize.js');

module.exports = sequelize.define('trips',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        source: {
            type: Sequelize.STRING
        },
        destination: {
            type: Sequelize.STRING
        },
        budget: {
            type: Sequelize.INTEGER
        },
        trip_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }
    },{
        timestamps: true,
        freezeTableName: true,
        tableName: 'trips',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
);