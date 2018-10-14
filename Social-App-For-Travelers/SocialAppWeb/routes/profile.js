/**
 * Created by Divya Patel on 9/21/2017.
 */
var express = require('express');
var ejs = require('ejs');
var _ = require('underscore');
var Users = require('./models/users');
var Friends = require('./models/friends');
var bcrypt = require('bcrypt');
var path = require('path');
var fs = require('fs');
var sequelize = require('./models/sequelize');
var formidable = require('formidable');
var async = require('async');
exports.editProfileBasicPage = function (req,res) {
    res.render('edit-profile-basic');
};

exports.editProfileSettingPage = function (req,res) {

    res.render('edit-profile-settings');

};

exports.editProfilePasswordPage = function (req,res) {

    var data = {
        userName:req.session.name
    };
    
    ejs.renderFile('./SocialAppWeb/views/edit-profile-password.ejs',data, function (err,result) {

        if(err) {
            console.log(err);
            res.send("An error occurred to get edit-profile-password page");
        }
        else
            console.log('getting edit-profile-password page');
        res.end(result);

    });

};

exports.mytimelinepage = function (req,res) {

    console.log("Here");
    ejs.renderFile('./views/mytimeline.ejs', function (err,result) {

        if(err) {
            console.log(err);
            res.send("An error occurred to get mytimeline page");
        }
        else
            console.log('getting mytimeline page');
        res.end(result);

    });

};

exports.uploadProfileImage = function (req,res) {
    var file;
    console.log(req.files);
    if (false) {
        res.send({success:false,message:'No files found'});
    } else {
        var user_id = req.session.userId;
        var pic = req.files.profile_pic;
        var fileName = user_id + '.jpg';
        var publicpath = req.app.get('public');
        var dbpath = "\\images\\profile_pics\\" + fileName;
        var newpath =  publicpath+dbpath;
        pic.mv(newpath,function (err) {
            if(err){
                console.log(err);
                res.send({success:false,message:err.toString()});
            }
            else{

                Users.update({
                    profile_pic:dbpath
                },{where:{id:user_id}}).then(function (updated) {
                    res.redirect('/edit-profile-basic-page');
                }).catch(function (err) {
                    console.log(err);
                    res.send({success:false,message:"Error while saving user info"});
                });
            }
        })
    }

};

exports.editProfileBasicSave = function (req,res) {

    var user_id = req.session.userId;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var city=req.body.city;
    var country =req.body.country;
    var gender = req.body.gender;
    Users.update({
        firstName:first_name,
        lastName:last_name,
        email:email,
        gender:gender,
        city:city,
        country:country
    },{where:{id:user_id}}).then(function (updated) {
        res.send({success:true});
    }).catch(function (err) {
        console.log(err);
        res.send({success:false,message:"Error while saving user info"});
    });
};


exports.getEditProfileBasicInfo = function (req,res) {

    var user_id =  req.session.userId;
    Users.findOne({ where: {id: user_id}, raw:true }).then(function (user) {
        console.log(user);
        res.send({success:true,user:user});
    }).catch(function (err) {
        console.log(err);
        res.send({success:false, message:err.toString()});
    });
};

exports.updatePassword = function (req,res) {

    var user_id = req.session.userId;
    var old_password = req.body.old_password;
    var new_password_1 = req.body.new_password_1;
    var new_password_2 = req.body.new_password_2;
    if(new_password_1!==new_password_2){
        return res.send({statusCode:201});
    }
    Users.findOne({where: {id: user_id}, attributes: ['id', 'password','lastName','firstName']}).then(function(gethash){
        if(gethash){
            var username = gethash.dataValues.firstName +' '+gethash.dataValues.lastName;
            bcrypt.compare(old_password, gethash.dataValues.password, function(err, response){
                console.log(response);
                if(response){
                    Users.count({where: {id: user_id}}).then(function(count){
                        if(count == 1){
                            bcrypt.hash(new_password_1,5,function (err,hash) {
                                Users.update({
                                    password:hash
                                },{where:{id:user_id}}).then(function (updated) {
                                    res.send({statusCode:200, userName:username});
                                }).catch(function (err) {
                                    console.log(err);
                                    res.send({statusCode:400,message:"Error while updating user password",userName:username});
                                });
                            });
                        }else{
                            res.send({statusCode:400,userName:username});
                        }
                    })
                }else{
                    res.json({statusCode:202,userName:username});
                }
            })
        }else{
            res.json({statusCode:400});
        }
    });
};

exports.mytimeline = function (req,res) {
  
    var user_id = req.session.userId;
    var getTrips = "select trips.*, users.firstName, users.lastName from trips INNER JOIN users "+
        "ON trips.user_id=users.id and trips.user_id="+user_id+" order by trips.createdAt desc";
    var user_name='';
    sequelize.query(getTrips,{ type: sequelize.QueryTypes.SELECT}).then(function (trips) {
        if(trips.length>0) {
            var trip_ids = _.pluck(trips, 'id');
            console.log(trip_ids);
            async.map(trip_ids, getTripLikesAndComments, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send({statusCode:400,success: false, message: 'Error while getting trips like and comments list'});
                }
                else {
                    var trip_profile_pic_query = "select distinct(trip_id), url from media where trip_id in ("+ trip_ids + ")";
                    sequelize.query(trip_profile_pic_query, {type: sequelize.QueryTypes.SELECT}).then(function (trip_profile_pic){
                        for (var i = 0; i < trips.length; i++) {
                            profile_pic_object = _.where(trip_profile_pic, {trip_id: trips[i].id});
                            if(profile_pic_object && profile_pic_object != null && profile_pic_object != ""){
                                trips[i]['trip_profile_pic'] = profile_pic_object[0].url;
                            }else{
                                trips[i]['trip_profile_pic'] = "https://d12dkjq56sjcos.cloudfront.net/pub/media/wysiwyg/route-images/View-Of-New-York-Brooklyn-Bridge-Night-Slider-Big-Bus-Tours-Jan-2017.jpg";
                            }
                            user_name=trips[i].firstName + trips[i].lastName;
                            var likes = _.where(result[i], {flag_like_comment: 1});
                            var comments = _.where(result[i], {flag_like_comment: 2});
                            trips[i]['likes_count'] = _.size(likes);
                            trips[i]['likes'] = likes;
                            trips[i]['comments_count'] = _.size(comments);
                            trips[i]['comments'] = comments;
                            var date = trips[i]['createdAt'];
                            trips[i]['timeDiff'] = timeDifference(date);
                            trips[i]['createdAt'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                            if (_.findWhere(trips[i]['likes'], {user_id: user_id})) {
                                trips[i]['like_by_me'] = true;
                            }
                            else {
                                trips[i]['like_by_me'] = false;
                            }
                        }
                        res.send({statusCode:200,success: true, trips: trips,userName:user_name});
                    });
                }
            });
        }
        else{
            res.send({statusCode:201,success: true,message:"You didn't posted any trip yet"});
        }
    }).catch(function (err) {
        console.log(err);
        return res.send({statusCode:400,success:false,message:'Error while getting trips list'});
    });
};

exports.myowntrip = function (req,res) {
    
      var user_id = req.session.userId;
      var own_trip_id = req.body.own_trip_id;
      var getTrips = "select trips.*, users.firstName, users.lastName from trips INNER JOIN users "+
          "ON trips.user_id=users.id where trips.id="+own_trip_id+" order by trips.createdAt desc";
      var user_name='';
      sequelize.query(getTrips,{ type: sequelize.QueryTypes.SELECT}).then(function (trips) {
          if(trips.length>0) {
              var trip_ids = _.pluck(trips, 'id');
              console.log(trip_ids);
              async.map(trip_ids, getTripLikesAndComments, function (err, result) {
                  if (err) {
                      console.log(err);
                      return res.send({statusCode:400,success: false, message: 'Error while getting trips like and comments list'});
                  }
                  else {
                      var trip_profile_pic_query = "select distinct(trip_id), url from media where trip_id in ("+ trip_ids + ")";
                      sequelize.query(trip_profile_pic_query, {type: sequelize.QueryTypes.SELECT}).then(function (trip_profile_pic){
                          for (var i = 0; i < trips.length; i++) {
                              profile_pic_object = _.where(trip_profile_pic, {trip_id: trips[i].id});
                              if(profile_pic_object && profile_pic_object != null && profile_pic_object != ""){
                                  trips[i]['trip_profile_pic'] = profile_pic_object[0].url;
                              }else{
                                  trips[i]['trip_profile_pic'] = "https://d12dkjq56sjcos.cloudfront.net/pub/media/wysiwyg/route-images/View-Of-New-York-Brooklyn-Bridge-Night-Slider-Big-Bus-Tours-Jan-2017.jpg";
                              }
                              user_name=trips[i].firstName + trips[i].lastName;
                              var likes = _.where(result[i], {flag_like_comment: 1});
                              var comments = _.where(result[i], {flag_like_comment: 2});
                              trips[i]['likes_count'] = _.size(likes);
                              trips[i]['likes'] = likes;
                              trips[i]['comments_count'] = _.size(comments);
                              trips[i]['comments'] = comments;
                              var date = trips[i]['createdAt'];
                              trips[i]['timeDiff'] = timeDifference(date);
                              trips[i]['createdAt'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                              var date = trips[i]['start_date'];
                              trips[i]['trip_start_date'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                              if (_.findWhere(trips[i]['likes'], {user_id: user_id})) {
                                  trips[i]['like_by_me'] = true;
                              }
                              else {
                                  trips[i]['like_by_me'] = false;
                              }
                          }
                          res.send({statusCode:200,success: true, trips: trips,userName:user_name});
                      });
                  }
              });
          }
          else{
              res.send({statusCode:201,success: true,message:"You didn't posted any trip yet"});
          }
      }).catch(function (err) {
          console.log(err);
          return res.send({statusCode:400,success:false,message:'Error while getting trips list'});
      });
  };

exports.getUserAboutPage = function (req,res) {
    
    var user_id = req.query.user_id;
    console.log(user_id);
    var data = {
        "user_id":user_id
    };
    ejs.renderFile('./views/user_timeline.ejs',data, function (err,result) {

        if(err) {
            console.log(err);
            res.send("An error occurred to get user_timeline page");
        }
        else
            console.log('getting user_timeline page');
        res.end(result);

    });
    
};

exports.getusertimeline = function (req,res) {

    var user_id = req.body.user_id;
    var getTrips = "select trips.*, users.firstName, users.lastName from trips INNER JOIN users "+
        "ON trips.user_id=users.id and trips.user_id="+user_id+" order by trips.createdAt desc";
    var user_name='';
    sequelize.query(getTrips,{ type: sequelize.QueryTypes.SELECT}).then(function (trips) {

        followOrNot(req.session.userId,user_id,function (err,isFollow) {
           if(err){
               console.log(err);
               res.send({statusCode:400});
           }
            else{
               if(trips.length>0) {
                   var trip_ids = _.pluck(trips, 'id');
                   console.log(trip_ids);
                   async.map(trip_ids, getTripLikesAndComments, function (err, result) {
                       if (err) {
                           console.log(err);
                           return res.send({statusCode:400,success: false, message: 'Error while getting trips like and comments list'});
                       }
                       else {
                           for (var i = 0; i < trips.length; i++) {
                               user_name=trips[i].firstName +' '+ trips[i].lastName;
                               var likes = _.where(result[i], {flag_like_comment: 1});
                               var comments = _.where(result[i], {flag_like_comment: 2});
                               trips[i]['likes'] = likes;
                               trips[i]['comments'] = comments;
                               var date = trips[i]['createdAt'];
                               trips[i]['createdAt'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                               if (_.findWhere(trips[i]['likes'], {user_id: req.session.userId})) {
                                   trips[i]['like_by_me'] = true;
                               }
                               else {
                                   trips[i]['like_by_me'] = false;
                               }
                           }
                           res.send({statusCode:200,success: true, trips: trips,userName:user_name,isFollow:isFollow});
                       }
                   });
               }
               else{
                   res.send({statusCode:201,success: true,message:"You didn't posted any trip yet",isFollow:isFollow});
               }
           }
        });


    }).catch(function (err) {
        console.log(err);
        return res.send({statusCode:400,success:false,message:'Error while getting trips list'});
    });
};


function getTripLikesAndComments(trip_id,callback){
    var likeandcomment = "select media_comments.* , users.firstName, users.lastName from media_comments "+
        "INNER JOIN users ON media_comments.user_id = users.id and media_comments.flag_trip_place_media=1 "+
        "and media_comments.trip_place_media_id = "+trip_id;

    sequelize.query(likeandcomment,{ type: sequelize.QueryTypes.SELECT}).then(function (likesComms) {
        callback(null,likesComms);
    }).catch(function (err) {
        console.log(err);
        callback({success:false,message:'Error while getting trips like and comments list for tripid '+trip_id},null);
    });

}

exports.followUnfollow = function (req,res) {

    var isFollow = req.body.isFollow;
    var user_id = req.body.user_id;
    var my_id = req.session.userId;
    if(isFollow){
        var deletefollow = "delete from friends where user_id="+my_id+" and friend_id="+user_id;
        sequelize.query(deletefollow).then(function (done) {
            res.send({success:true});
        }).catch(function (err) {
            console.log(err);
            res.send({success:false});
        })
    }
        //follow user
    else{
        var friend = Friends.build({
            user_id: my_id,
            friend_id:user_id,
            block:0
        });
        friend.save().then(function (saved) {
           res.send({success:true});
        }).catch(function (err) {
            res.send({success:false});
        });
    }

};

function followOrNot(user_id,follow_id,callback){

    Friends.findOne({where:{user_id:user_id,friend_id:follow_id},raw:true}).then(function (friend) {
        if(friend){
            callback(null,true);
        }
        else{
            callback(null,false);
        }
    }).catch(function (err) {
        callback(err,null);
    });
};

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