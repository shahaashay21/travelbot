var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var sequelize = require('./models/sequelize.js');
var Users = require('./models/users');
var validator = require('validator');

const db = require('../models/db');

//Register a new user
router.post('/register', function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var city = req.body.city;
    var country = req.body.country;
    var gender = req.body.gender;

    console.log(req.body);

//  ENCRYPT PASSWORD USING BCRYPT
    bcrypt.hash(password, 5, function(err, hash) {
        var validate = 1;
        //Validation
        if(!firstName){
            res.send({success:false, message:'First Name is not available'});
            validate = 0;
        }else if(!lastName){
            res.send({success:false, message:'Last Name is not available'});
            validate = 0;
        }else if(!email || !validator.isEmail(email)){
            res.send({success:false, message:'email is not available'});
            validate = 0;
        }else if(!password){
            res.send({success:false, message:'Password is not available'});
            validate = 0;
        }
        
        if(validate){
            db.sequelize.query("select get_nextid('users') as id;").spread(function(nextid,metadata){
                data = {};
                data['id'] = nextid[0].id;
                data['email'] = email;
                data['password'] = hash;
                data['firstName'] = firstName;
                data['lastName'] = lastName;
                if(city){
                    data['city']=city;
                }
                if(country){
                    data['country']=country;
                }
                if(gender){
                    data['gender']=gender;
                }
    //          CHECK USER IS ALREADY AVAILABLE OR NOT. IF NOT THEN CREATE USER
                db.User.findOrCreate({where: {email: email}, defaults: data})
                    .spread(function(user,created){
                        if(created){
                            console.log(user.dataValues.id);
                            req.session.userId = user.dataValues.id;
                            req.session.email = user.dataValues.email;
                            req.session.name = user.dataValues.firstName +' '+ user.dataValues.lastName ;
                            res.send({success:true, message:'User created'});
                        }else{
                            res.send({success:false, message:'User already available'});
                        }
                }).catch(function(error) {
                    console.error(error);
                    res.send({success:false, message:'error'});
                });
            }).catch(function(error) {
                console.error(error);
                res.send({success:false, message:'error'});
            });
        }
    });
});

router.post('/login', function(req, res, next){
   var email = req.body.email;
   var password = req.body.password;

   var validate = 1;
   if(!email || !validator.isEmail(email)){
       res.send({success:false, message:'Email is not Valid'});
        validate = 0;
    }else if(!password){
       res.send({success:false, message:'Password is Empty'});
        validate = 0;
    }
    
    if(validate){
        Users.findOne({where: {'email': email}, attributes: ['id', 'password']}).then(function(gethash){
            if(gethash){
              var user_id =   gethash.dataValues.id;
              bcrypt.compare(password, gethash.dataValues.password, function(err, response){
                  if(response){
                      Users.find({where: {'email': email},raw:true}).then(function(user){
                          if(user){
                              console.log(user);
                              req.session.userId =user_id;
                              req.session.email = email;
                              req.session.name = user.firstName+' '+user.lastName;
                              req.session.profile_pic = user.profile_pic;
                              req.session.cover_pic = user.cover_pic;
                              res.send({success:true});
                          }else{
                              res.send({success:false, message:'User not found'});
                          }
                      })
                  }else{
                      res.send({success:false, message:'Password invalid'});
                  }
              })
          }else{
                res.send({success:false, message:'User not available'});
          }
        });
    }
});

// let loginUser = (req, email, password, callback) => {
//     db.User.findOne({where: {'email': email}, attributes: ['id', 'password']}).then(function(gethash){
//         if(gethash){
//           bcrypt.compare(password, gethash.dataValues.password, function(err, response){
//               if(response){
//                   Users.count({where: {'email': email}}).then(function(count){
//                       if(count == 1){
//                           req.session.id = gethash.dataValues.id;
//                           req.session.email = email;
//                           callback(0, 'done');
//                       }else{
//                           callback(0, 'not available');
//                       }
//                   })
//               }else{
//                   callback(0, 'invalid');
//               }
//           })
//       }else{
//           res.json('not available');
//       }
//     });
// }

module.exports = router;