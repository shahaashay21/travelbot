/**
 * Created by Divya Patel on 10/10/2017.
 */
var ejs = require('ejs');
var sequelize = require('./models/sequelize');
var Friends = require('./models/friends');
var Trips = require('./models/trips');
var _ = require('underscore');
var async = require('async');
var MediaComments = require('./models/media_comments');
var Places = require('./models/places');
var NodeGeocoder = require('node-geocoder');
var Users = require('./models/users');

exports.getSearchPage = function (req,res) {

    var search_text = req.query.search_text;
    console.log(search_text)
    var data = {
        "searchText":search_text
    };
    ejs.renderFile('./views/search_results1.ejs',data, function (err,result) {

        if(err) {
            console.log(err);
            res.send("An error occurred to get newsfeed page");
        }
        else
            console.log('getting search_results page 1');
        res.end(result);

    });
};

exports.getSearchResults = function (req,res) {
    var search_text = req.body.searchText;

        var getPeople = "select users.* from users where concat(firstName, ' ', lastName) like '%" +search_text+ "%'";
        sequelize.query(getPeople,{ type: sequelize.QueryTypes.SELECT}).then(function (search_query) {
        res.send({success:true,search_query:search_query,name:req.session.name,profile_pic:req.session.profile_pic});        
    });

};

exports.getSearchPlaces = function (req,res) {

    var search_text = req.body.searchText;
    console.log("search text is: "+search_text);
    var getPeople = "select places.*, trips.user_id,trips.trip_name, users.firstName, users.lastName from places inner join trips, users where place_name like '%"+search_text+"%' and places.trip_id = trips.id and trips.user_id = users.id;";
    sequelize.query(getPeople,{ type: sequelize.QueryTypes.SELECT}).then(function (final_search_place) {
        console.log("DB Query");
        console.log(final_search_place);

        res.send({success:true,final_search_place:final_search_place,name:req.session.name,profile_pic:req.session.profile_pic});


    });
};


exports.getSearchTrips = function (req,res) {

    var search_text = req.body.searchText;
    var getTrips = "select trips.*, users.id as user_id, users.firstName, users.lastName, users.profile_pic from trips INNER JOIN users where concat(trip_name,' ',source,' ',destination) like '%"+search_text+"%' and trips.user_id = users.id";
    sequelize.query(getTrips,{ type: sequelize.QueryTypes.SELECT}).then(function (final_search) {
        res.send({success:true,final_search:final_search,name:req.session.name,profile_pic:req.session.profile_pic});

    }).catch(function (err) {
        console.log(err);
        return res.send({success:false,message:'Error while getting friends list'});
    });
};

exports.getnewsfeedpage = function (req,res) {

    ejs.renderFile('./views/newsfeed.ejs', function (err,result) {

        if(err) {
            console.log(err);
            res.send("An error occurred to get newsfeed page");
        }
        else
            console.log('getting newsfeed page');
        res.end(result);

    });
};

exports.getTripDetilsPage = function (req,res) {

    var tripId = req.query.tripId;
    console.log(tripId);
    var data = {
        "trip_id":tripId
    };
    ejs.renderFile('./views/trip_details.ejs',data, function (err,result) {

        if(err) {
            console.log(err);
            res.send("An error occurred to get trip_detils page");
        }
        else
            console.log('getting trip_details page');
        res.end(result);

    });
};

exports.getNewsFeed = function (req,res) {

    var user_id = req.session.userId;
    Friends.findAll({where:{user_id:user_id}}).then(function (friends) {
        var friend_ids = _.pluck(friends, 'friend_id');
        var comma_frirnds_ids = '';
        friend_ids.forEach(function (id) {
            comma_frirnds_ids = comma_frirnds_ids+id+',';
        });
        comma_frirnds_ids = comma_frirnds_ids+user_id+',';
        comma_frirnds_ids = comma_frirnds_ids.substring(0, comma_frirnds_ids.length-1);
        var getTrips = "select trips.*, users.id as user_id, users.firstName, users.lastName, users.profile_pic from trips INNER JOIN users "+
                        "ON trips.user_id=users.id and trips.user_id in ("+comma_frirnds_ids+") order by trips.createdAt desc;";
        sequelize.query(getTrips,{ type: sequelize.QueryTypes.SELECT}).then(function (trips) {
            var trip_ids = _.pluck(trips,'id');
            console.log(trip_ids);
            async.map(trip_ids,getTripLikesAndComments,function (err,result) {
                if(err){
                    console.log(err);
                    return res.send({success:false,message:'Error while getting trips like and comments list'});
                }
                else{
                    var trip_profile_pic_query = "select distinct(trip_id), url from media where trip_id in ("+ trip_ids + ")";
                    sequelize.query(trip_profile_pic_query, {type: sequelize.QueryTypes.SELECT}).then(function (trip_profile_pic){
                        for(var i=0;i<trips.length;i++)
                        {
                            profile_pic_object = _.where(trip_profile_pic, {trip_id: trips[i].id});
                            if(profile_pic_object && profile_pic_object != null && profile_pic_object != ""){
                                trips[i]['trip_profile_pic'] = profile_pic_object[0].url;
                            }else{
                                trips[i]['trip_profile_pic'] = "https://d12dkjq56sjcos.cloudfront.net/pub/media/wysiwyg/route-images/View-Of-New-York-Brooklyn-Bridge-Night-Slider-Big-Bus-Tours-Jan-2017.jpg";
                            }
                            var likes = _.where(result[i], {flag_like_comment:1});
                            var comments = _.where(result[i],{flag_like_comment:2});
                            trips[i]['likes_count'] = _.size(likes);
                            trips[i]['likes'] = likes;
                            trips[i]['comments_count'] = _.size(comments);
                            trips[i]['comments'] = comments;
                            var date = trips[i]['createdAt'];
                            trips[i]['timeDiff'] = timeDifference(date);
                            trips[i]['createdAt'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                            if(_.findWhere(trips[i]['likes'],{user_id:user_id})){
                                trips[i]['like_by_me']=true;
                            }
                            else{
                                trips[i]['like_by_me']=false;
                            }
                        }
                        res.send({success:true,trips:trips, name:req.session.name,profile_pic:req.session.profile_pic});
                    });
                }
            });
        }).catch(function (err) {
            console.log(err);
            return res.send({success:false,message:'Error while getting trips list'});
        });
    }).catch(function (err) {
        console.log(err);
        return res.send({success:false,message:'Error while getting friends list'});
    });
};

exports.postCommentOnTrip = function (req,res) {

    var comment = req.body.comment; 
    var trip_id = req.body.trip_id;
    var user_id = req.session.userId;
    console.log(comment,trip_id);
    var Comment = MediaComments.build({
        user_id: user_id,
        trip_place_media_id:trip_id,
        comment:comment,
        flag_trip_place_media:1,
        flag_like_comment:2
    });
    Comment.save().then(function (data) {
        res.send({success:true});
    }).catch(function (err) {
        console.log(err);
        res.send({success:false,message:"Error while saving comment"});
    });
};

exports.postCommentOnPlace = function (req,res) {
    var comment = req.body.comment;
    var place_id = req.body.place_id;
    var user_id = req.session.userId;
    var Comment = MediaComments.build({
        user_id: user_id,
        trip_place_media_id:place_id,
        comment:comment,
        flag_trip_place_media:2,
        flag_like_comment:2
    });
    Comment.save().then(function (data) {
        res.send({success:true});
    }).catch(function (err) {
        console.log(err);
        res.send({success:false,message:"Error while saving comment"});
    });
};

exports.likeTrip = function (req,res) {

    var like_by_me = req.body.like_by_me;
    var trip_id = req.body.trip_id;
    var user_id = req.session.userId;
    console.log(trip_id,like_by_me,user_id);
    var userLikeAvailable = "select count(*) as count from media_comments where trip_place_media_id="+trip_id+" and flag_trip_place_media=1 and"+
    " flag_like_comment=1 and user_id="+user_id;
    sequelize.query(userLikeAvailable, {type: sequelize.QueryTypes.SELECT}).then(function (userLike){
        // console.log("USER LIKE: " + JSON.stringify(userLike[0].count));
        if(userLike[0].count){
            //unlike
            var deleteLike = "delete from media_comments where trip_place_media_id="+trip_id+" and flag_trip_place_media=1 and"+
                            " flag_like_comment=1 and user_id="+user_id;
            sequelize.query(deleteLike).then(function (deleteLike) {
                return res.send({success:true});
            }).catch(function (err) {
                console.log(err);
                return res.send({success:false,message:'Error while deleting like '+trip_id},null);
            }) 
        }
        else{
            //like
            var MediaLike = MediaComments.build({
                user_id: user_id,
                trip_place_media_id:trip_id,
                like:1,
                flag_trip_place_media:1,
                flag_like_comment:1
            });
            MediaLike.save().then(function (data) {
                res.send({success:true});
            }).catch(function (err) {
                console.log(err);
                res.send({success:false,message:"Error while saving like"});
            });
        }
    });

};

exports.likePlace = function (req,res) {
    var like_by_me = req.body.like_by_me;
    var place_id = req.body.place_id;
    var user_id = req.session.userId;
    var userLikeAvailable = "select count(*) as count from media_comments where trip_place_media_id="+place_id+" and flag_trip_place_media=2 and"+
    " flag_like_comment=1 and user_id="+user_id;
    sequelize.query(userLikeAvailable, {type: sequelize.QueryTypes.SELECT}).then(function (userLike){
        // console.log("USER LIKE: " + JSON.stringify(userLike[0].count));
        if(userLike[0].count){
            //unlike
            var deleteLike = "delete from media_comments where trip_place_media_id="+place_id+" and flag_trip_place_media=2 and"+
                " flag_like_comment=1 and user_id="+user_id;
            sequelize.query(deleteLike).then(function (deleteLike) {
                return res.send({success:true});
            }).catch(function (err) {
                console.log(err);
                return res.send({success:false,message:'Error while deleting like '+place_id},null);
            })
        }
        else{
            //like
            var MediaLike = MediaComments.build({
                user_id: user_id,
                trip_place_media_id:place_id,
                like:1,
                flag_trip_place_media:2,
                flag_like_comment:1
            });
            MediaLike.save().then(function (data) {
                res.send({success:true});
            }).catch(function (err) {
                console.log(err);
                res.send({success:false,message:"Error while saving like"});
            });
        }
    });
};

exports.getTripDetails = function (req,res) {

    var user_id = req.session.userId;
    var trip_id = req.body.trip_id;
    var getTrip = "select trips.*, users.id as user_id, users.firstName, users.lastName from trips INNER JOIN users "+
        "ON trips.user_id=users.id where trips.id="+trip_id;
    sequelize.query(getTrip,{ type: sequelize.QueryTypes.SELECT}).then(function (trip) {
        Places.findAll({where:{trip_id:trip_id},raw:true}).then(function (places) {
            var place_ids = _.pluck(places,'id');
            var place_names = _.pluck(places,'place_name');

            getLatLong(trip[0].source,function (err,triplatLong) {
                
                async.map(place_names,getLatLong,function (err,latLong) {
                    if(err){
                        async.map(place_ids,getPlacesLikesAndComments,function (err,result) {
                            if(err){
                                console.log(err);
                                return res.send({success:false,message:'Error while getting places like and comments list'});
                            }
                            else{
                                for(var i=0;i<places.length;i++)
                                {
                                    places[i]['latLong']='';
                                    var likes = _.where(result[i], {flag_like_comment:1});
                                    var comments = _.where(result[i],{flag_like_comment:2});
                                    places[i]['likes'] = likes;
                                    places[i]['comments'] = comments;
                                    var date = places[i]['visit_date'];
                                    console.log(places[i]['id'],places[i]['visit_date']);
                                    places[i]['visit_date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" at "+date.getHours()+":"+date.getMinutes();
                                    console.log(places[i]['id'],places[i]['visit_date']);
                                    if(_.findWhere(places[i]['likes'],{user_id:user_id})){
                                        places[i]['like_by_me']=true;
                                    }
                                    else{
                                        places[i]['like_by_me']=false;
                                    }
                                }
                                trip[0]['createdAt'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                                trip[0]['start_date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                                res.send({success:true,trip:trip,places:places, name:req.session.name});
                            }
                        });

                    }
                    else{
                        async.map(place_ids,getPlacesLikesAndComments,function (err,result) {
                            if(err){
                                console.log(err);
                                return res.send({success:false,message:'Error while getting places like and comments list'});
                            }
                            else{
                                for(var i=0;i<places.length;i++)
                                {
                                    places[i]['latLong']=latLong[i];
                                    var likes = _.where(result[i], {flag_like_comment:1});
                                    var comments = _.where(result[i],{flag_like_comment:2});
                                    places[i]['likes'] = likes;
                                    places[i]['comments'] = comments;
                                    var date = places[i]['visit_date'];
                                    console.log(places[i]['id'],places[i]['visit_date']);
                                    places[i]['visit_date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" at "+date.getHours()+":"+date.getMinutes();
                                    console.log(places[i]['id'],places[i]['visit_date']);
                                    if(_.findWhere(places[i]['likes'],{user_id:user_id})){
                                        places[i]['like_by_me']=true;
                                    }
                                    else{
                                        places[i]['like_by_me']=false;
                                    }
                                }
                                trip[0]['latLong']=triplatLong;
                                trip[0]['createdAt'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                                trip[0]['start_date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                                res.send({success:true,trip:trip,places:places, name:req.session.name});
                            }
                        });

                    }
                });    
            });
            
            
            
        }).catch(function (err) {
            console.log(err);
            res.send({success:false,message:'Error while getting places for tripid '+trip_id});
        });
    }).catch(function (err) {
        console.log(err);
        res.send({success:false,message:'Error while getting trip for tripid '+trip_id});
    });

};

function getLatLong(place_name,callback) {
    var options = {
        provider: 'google',

        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyDtPt6pkaGugq1ToerK4NCDVyicJ211238', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);
    geocoder.geocode(place_name)
        .then(function(res) {
            var latlong = {
                lat:res[0]['latitude'],
                long:res[0]['longitude']
            };
            callback(null,latlong);
        })
        .catch(function(err) {
            callback(err);
        });
}

function getPlacesLikesAndComments(place,callback){
    var likeandcomment = "select media_comments.* , users.firstName, users.lastName, users.profile_pic from media_comments "+
        "INNER JOIN users ON media_comments.user_id = users.id and media_comments.flag_trip_place_media=2 "+
        "and media_comments.trip_place_media_id = "+place;
    var options = {
        provider: 'google',

        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyDtPt6pkaGugq1ToerK4NCDVyicJ211238', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);


    sequelize.query(likeandcomment,{ type: sequelize.QueryTypes.SELECT}).then(function (likesComms) {

        callback(null,likesComms);

    }).catch(function (err) {
        console.log(err);
        callback({success:false,message:'Error while getting places like and comments list for placeid '+place_id},null);
    });

}

function getTripLikesAndComments(trip_id,callback){
    var likeandcomment = "select media_comments.* , users.firstName, users.lastName, users.profile_pic from media_comments "+
        "INNER JOIN users ON media_comments.user_id = users.id and media_comments.flag_trip_place_media=1 "+
        "and media_comments.trip_place_media_id = " + trip_id + " order by media_comments.createdAt desc";

    sequelize.query(likeandcomment,{ type: sequelize.QueryTypes.SELECT}).then(function (likesComms) {
        callback(null,likesComms);
    }).catch(function (err) {
        console.log(err);
        callback({success:false,message:'Error while getting trips like and comments list for tripid '+trip_id},null);
    });

}

function timeDifference(trip_time) {
    var now = new Date();
    var endDate = new Date(trip_time); // 2017-05-29T00:00:00Z
    var diff = now - endDate; 
    var returnTime;
    var seconds = Math.floor(diff / 1000);
    returnTime = seconds + " second(s) ago";;
    if(seconds > 60){
        var minutes = Math.floor(seconds / 60);
        returnTime = minutes  + " minute(s) ago";;
        if(minutes > 60){
            var hours   = Math.floor(minutes / 60);
            returnTime = hours + " hour(s) ago";;
            if(hours > 24){
                var days   = Math.floor(hours / 24);
                returnTime = days + " day(s) ago";
            }
        }
    }
    return (returnTime);
}