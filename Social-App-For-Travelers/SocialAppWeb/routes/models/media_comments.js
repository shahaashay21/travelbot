/**
 * Created by Divya Patel on 10/12/2017.
 */


var Sequelize = require('sequelize');
var sequelize = require('./sequelize.js');

module.exports = sequelize.define('media_comments',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            field:'user_id'
        },
        trip_place_media_id: {
            type: Sequelize.INTEGER,
            field:'trip_place_media_id'
        },
        flag_trip_place_media: {
            type: Sequelize.INTEGER,
            field:'flag_trip_place_media'
        },
        like: {
            type: Sequelize.INTEGER
        },
        comment:{
            type:Sequelize.STRING
        },
        flag_like_comment:{
            type:Sequelize.INTEGER
        }

    },{
        tableName: 'media_comments',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
);