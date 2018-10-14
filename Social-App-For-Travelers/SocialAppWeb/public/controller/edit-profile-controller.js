/**
 * Created by Divya Patel on 9/26/2017.
 */

var editProfile = angular.module('editProfile', []);

editProfile.controller('editProfileController',function($scope, $http){
    
    $scope.saveEditProfileBasic = function () {

        init($scope);
        var validated = true;
        
        if($scope.first_name===undefined || $scope.first_name===''){
            $scope.first_name_invalid = true;
            validated=false;
        }
        if($scope.last_name===undefined || $scope.last_name===''){
            $scope.last_name_invalid = true;
            validated=false;
        }
        if(!validateEmail($scope.email)){
            $scope.email_invalid = true;
            validated=false;
        }
        if($scope.city===undefined || $scope.city===''){
            $scope.city_invalid = true;
            validated=false;
        }
        if($scope.country==='country' || $scope.country===undefined){
            $scope.country_invalid = true;
            validated=false;
        }
        
        if(validated){
            console.log("Updated");
            $http({
                method : "POST",
                url : '/edit-profile-basic-save',
                data : {
                    "first_name" : $scope.first_name,
                    "last_name" : $scope.last_name,
                    "email" : $scope.email,
                    "birth_day" : $scope.birth_day,
                    "birth_month" : $scope.birth_month,
                    "birth_year" : $scope.birth_year,
                    "city": $scope.city,
                    "country": $scope.country,
                    "gender":$scope.gender
                }
            }).success(function(data) {
                if (data.success == true) {
                    $scope.save_profile = true;
                }
                else
                {
                    $scope.error_profile = true;
                }

            }).error(function(error) {
                console.log(error);
                $scope.error_profile = true;
            });
        }
    };

    $scope.getEditProfileBasicInfo = function () {
        $http({
            method : "POST",
            url : '/get-edit-profile-basic-info',
            data : {}
        }).success(function(data) {
            if (data.success == true) {
                var user=data.user;
               $scope.first_name = user.firstName;
               $scope.last_name = user.lastName;
               $scope.email = user.email;
               $scope.city = user.city;
               $scope.country =user.country;
               $scope.gender = user.gender;
               $scope.userInfo =user; 
                if($scope.gender==='male'){
                    $scope.malechecked = function(){return true;}
                }
                else{
                    $scope.femalechecked = function(){return true;}
                }
            }
            else
            {
               
            }

        }).error(function(error) {
            console.log(error);
        });
        
    };
    
    
    $scope.updatePassword = function () {

        init($scope);
        var validated = true;

        if($scope.old_password===undefined || $scope.old_password === ''){
            $scope.old_password_invalid = true;
            validated = false;
        }
        if($scope.new_password_1===undefined || $scope.new_password_1 === ''){
            $scope.new_passworrd_1_invalid = true;
            validated = false;
        }
        if($scope.new_password_2===undefined || $scope.new_password_2 === ''){
            $scope.new_passworrd_2_invalid = true;
            validated = false;
        }

        if(validated){
            $http({
                method : "POST",
                url : '/updatePassword',
                data : {
                    "old_password" : $scope.old_password,
                    "new_password_1" : $scope.new_password_1,
                    "new_password_2" : $scope.new_password_2
                }
            }).success(function(data) {
                $scope.userName = data.userName;
                if (data.statusCode == 200) {
                    $scope.save_password = true;
                }
                else if(data.statusCode == 201)
                {
                    $scope.not_match_password = true;
                }
                 else if(data.statusCode == 202){
                    $scope.old_password_wrong = true;
                }   
                else{
                    $scope.error_password = true;
                }

            }).error(function(error) {
                console.log(error);
                $scope.error_profile = true;
            });
        }
    };
    
    $scope.mytimeline = function () {

        $http({
            method : "POST",
            url : '/mytimeline',
            data : {}
        }).success(function(data) {
            console.log(data);
            if (data.statusCode===200) {

                $scope.trips = data.trips;
                $scope.userName = data.userName;
            }
            else if(data.statusCode===201)
            {
                
            }
            else{
                
            }

        }).error(function(error) {
            console.log(error);
        });
        
    };

    $scope.likeTrip = function (like_by_me,trip_id) {

        $http({
            method : "POST",
            url : '/likeTrip',
            data : {
                trip_id:trip_id,
                like_by_me:like_by_me
            }
        }).success(function(data) {
            if (data.success) {
                $scope.mytimeline();
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        });

    };

    $scope.postComment = function (trip_id,comment) {

        console.log(trip_id,comment);
        if(comment!==undefined && comment!==""){
            $http({
                method : "POST",
                url : '/postCommentOnTrip',
                data : {
                    trip_id:trip_id,
                    comment:comment
                }
            }).success(function(data) {
                if (data.success) {
                    $scope.mytimeline();
                }
                else
                {

                }

            }).error(function(error) {
                console.log(error);

            });
        }

    };

    $scope.usertimeline = function () {

        $http({
            method : "POST",
            url : '/getusertimeline',
            data : {
                user_id:window.user_id
            }
        }).success(function(data) {
            if (data.statusCode===200) {

                $scope.trips = data.trips;
                $scope.userName = data.userName;
                $scope.isFollow = data.isFollow;
            }
            else if(data.statusCode===201)
            {

            }
            else{

            }
        }).error(function(error) {
            console.log(error);
            window.location.href='/newsfeedpage';
        });

    };


    $scope.likeTripontimeline = function (like_by_me,trip_id) {

        $http({
            method : "POST",
            url : '/likeTrip',
            data : {
                trip_id:trip_id,
                like_by_me:like_by_me
            }
        }).success(function(data) {
            if (data.success) {
                $scope.usertimeline();
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        });

    };

    $scope.postCommentontimeline = function (trip_id,comment) {

        console.log(trip_id,comment);
        if(comment!==undefined && comment!==""){
            $http({
                method : "POST",
                url : '/postCommentOnTrip',
                data : {
                    trip_id:trip_id,
                    comment:comment
                }
            }).success(function(data) {
                if (data.success) {
                    $scope.usertimeline();
                }
                else
                {

                }

            }).error(function(error) {
                console.log(error);

            });
        }

    };
    
    $scope.UnFollow = function () {
        $http({
            method : "POST",
            url : '/followUnfollow',
            data : {
                user_id:window.user_id,
                isFollow:true
            }
        }).success(function(data) {
            if (data.success) {

              $scope.usertimeline();
            }
            else{

            }
        }).error(function(error) {
            console.log(error);
           
        });

    };

    $scope.Follow = function () {
        $http({
            method : "POST",
            url : '/followUnfollow',
            data : {
                user_id:window.user_id,
                isFollow:false
            }
        }).success(function(data) {
            if (data.success) {
                $scope.usertimeline();
            }
            else{

            }
        }).error(function(error) {
            console.log(error);
        });
    };

});

function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function init(scope){

    scope.first_name_invalid=false;
    scope.last_name_invalid=false;
    scope.email_invalid=false;
    scope.birth_day_invalid=false;
    scope.birth_month_invalid=false;
    scope.birth_year_invalid=false;
    scope.city_invalid=false;
    scope.country_invalid=false;
    scope.save_profile = false;
    scope.error_profile = false;
    scope.old_password_invalid = false;
    scope.new_passworrd_1_invalid = false;
    scope.new_passworrd_2_invalid = false;
    scope.error_password = false;
    scope.not_match_password = false;
    scope.save_password = false;
    scope.old_password_wrong = false;
}