const express = require('express');
const path = require("path");
const router = express.Router();

const db = require('../models/db');

router.get('/', function(req, res){
    res.render('trip-new');
});

router.post('/new', function (req, res) {
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const source = req.body.source;
    const destination = req.body.destination;
    const budget = req.body.budget;
    const trip_name = req.body.trip_name;
    const description = req.body.description;

    trip = db.Trip.build({});
    
    if(start_date){
        trip.start_date = start_date;
        if(source){
            trip.source = source;
            if(destination){
                trip.destination = destination;
                if(req.session.userId){
                    trip.user_id = req.session.userId;
                    if(end_date){
                        trip.end_date = end_date;
                    }
                    if(budget){
                        trip.budget = budget;
                    }
                    if(trip_name){
                        trip.trip_name = trip_name;
                    }
                    if(description){
                        trip.description = description;
                    }
                    db.sequelize.query("select get_nextid('trip') as id;").spread(function (nextid, metadata) {
                        console.log(nextid);
                        trip.id = nextid[0].id;
                        trip.save().then(() => {
                            res.json({success: true, trip_id: trip.id});
                        });
                    });
                }else {
                    res.json("logout");
                }
            }else{
                res.json("Destination is required");
            }
        }else{
            res.json("Source is required");
        }
    }else{
        res.json("Start date is required");
    }
});

router.post('/remove', function (req, res) {
    const tripId = req.body.trip_id;
    db.Trip.findOne({where: {id: tripId}, attributes: ['user_id']}).then(function(userId){
        if(userId){
            if(userId.dataValues.user_id == req.session.userId){
                db.Trip.destroy({where: {id: tripId}}).then(function(){
                    res.json("done");
                });
            } else {
                res.json("different user");
            }
        } else {
            res.json("no trip available");
        }
    });
});

router.post('/saveposition', function(req, res){
    // console.log(req.body.email);
    // console.log(req.body.latitude.toString());
    // console.log(req.body.longitude.toString());
    latitude = req.body.latitude.toString();
    longitude =req.body.longitude.toString();

    if(req.session.userId){
        userId = req.session.userId;
        db.Location.findOne({where: {user_id: userId}, order: 'createdAt DESC'}).then(function(locationDetail){
            if(locationDetail && locationDetail.dataValues){
                lastLat = locationDetail.dataValues.latitude ? locationDetail.dataValues.latitude : '0';
                lastLong = locationDetail.dataValues.longitude ? locationDetail.dataValues.longitude : '0';
                if(lastLat.split('.')[0] == latitude.split('.')[0] && lastLong.split('.')[0] == longitude.split('.')[0] && lastLat.split('.')[1].substring(0, 2) == latitude.split('.')[1].substring(0, 2) && lastLong.split('.')[1].substring(0, 2) == longitude.split('.')[1].substring(0, 2)){
                    res.json({success: false});
                }else{
                    locationDate = new Date(locationDetail.dataValues.createdAt);
                    console.log(locationDate);
                    currentDate = new Date();
                    console.log(currentDate); 
                    console.log("Difference" + currentDate - locationDate);
                    // if((currentDate - locationDate) > 120000){
                        location = db.Location.build({});
                        location.latitude = latitude;
                        location.longitude = longitude;
                        location.user_id = userId;

                        db.sequelize.query("select get_nextid('location') as id;").spread(function (nextid, metadata) {
                            location.id = nextid[0].id;
                            location.save().then(() => {
                                res.json({success: true});
                            });
                        });
                    // }
                }
            } else {
                location = db.Location.build({});
                location.latitude = latitude;
                location.longitude = longitude;
                location.user_id = userId;

                db.sequelize.query("select get_nextid('location') as id;").spread(function (nextid, metadata) {
                    location.id = nextid[0].id;
                    location.save().then(() => {
                        res.json({success: true});
                    });
                });
            }
        })
    }
});

router.post('/add_media',function(req,res){
    const tripId = req.body.trip_id;
    console.log(tripId);
    var filename = "";
    if(!(isEmpty(req.files))){
        var myFile = req.files.myFile;
        var filePath = path.join(__dirname, '../public/tripImages/');
        filename = req.files.myFile.name;
        myFile.mv(filePath + req.files.myFile.name, function(err){
            if (err)
            return res.status(500).send(err);
            
        });
    }

    if(filename !== ""){
        console.log("Yes filename");
        media = db.Media.build({});
        
        if(req.session.userId){
            media.user_id = req.session.userId;
            media.trip_id = tripId;
            media.url = "/images/tripImages/"+filename;
            media.type = "image";
            media.flag_media_place = "media";

            db.sequelize.query("select get_nextid('media') as id;").spread(function (nextid, metadata) {
                media.id = nextid[0].id;
                console.log(media);
                media.save().then(() => {
                    res.json({success: true});
                });
            });
        } else {
            res.json("logout");
        }
    }
});

//CHECK OBJECT IS EMPTY OR NOT
function isEmpty(object) {
    for(var key in object) {
        if(object.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

module.exports = router;
