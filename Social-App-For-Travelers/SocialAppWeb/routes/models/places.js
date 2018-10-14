/**
 * Created by Divya Patel on 10/21/2017.
 */

var Sequelize = require('sequelize');
var sequelize = require('./sequelize.js');

module.exports = sequelize.define('places', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        trip_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
                model: 'trips',
                key: 'id'
            }
        },
        place_name: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        visit_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        budget: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        type: {
            type: Sequelize.ENUM('restaurant','hotel','place','museum'),
            allowNull: false
        },
        persons: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'places',
        timestamps: false
    }
);