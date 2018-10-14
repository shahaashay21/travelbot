/**
 * Created by Divya Patel on 11/4/2017.
 */

var login = angular.module('login', []);

login.controller('loginController',function ($scope, $http) {
    
    
    $scope.register = function () {

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
        if($scope.reg_password===undefined || $scope.reg_password===''){
            $scope.password_invalid = true;
            validated=false;
        }
        if($scope.country==='' || $scope.country===undefined){
            $scope.country_invalid = true;
            validated=false;
        }
        if($scope.gender===undefined || $scope.gender===''){
            $scope.gender_invalid = true;
            validated=false;
        }

        if(validated){
            $http({
                method : "POST",
                url : '/users/register',
                data : {
                    "firstName" : $scope.first_name,
                    "lastName" : $scope.last_name,
                    "email" : $scope.email,
                    "city": $scope.city,
                    "country": $scope.country,
                    "gender":$scope.gender,
                    "password":$scope.reg_password
                }
            }).success(function(data) {
                if (data.success == true) {
                    window.location.href='/newsfeedpage';
                }
                else
                {
                    $scope.error_save = true;
                }

            }).error(function(error) {
                console.log(error);
                $scope.error_save = true;
            });
        }


    };
    
    $scope.login = function () {
        init($scope);
        var validated = true;
        if($scope.login_password===undefined || $scope.login_password===''){
            $scope.login_invalid = true;
            validated=false;
        }
        if(!validateEmail($scope.login_email)){
            $scope.login_invalid = true;
            validated=false;
        }

        if(validated){
            $http({
                method : "POST",
                url : '/users/login',
                data : {
                    "email" : $scope.login_email,
                    "password":$scope.login_password
                }
            }).success(function(data) {
                if (data.success == true) {
                    window.location.href='/newsfeedpage';
                }
                else
                {
                    $scope.login_invalid = true;
                    $scope.login_invalid_value=data.message;
                }

            }).error(function(error) {
                console.log(error);
                $scope.login_error = true;
            });
        }
        
    };

    function init(scope){

        scope.first_name_invalid=false;
        scope.last_name_invalid=false;
        scope.email_invalid=false;
        scope.city_invalid=false;
        scope.country_invalid=false;
        scope.error_save=false;
        scope.password=false;
        scope.login_invalid=false;
        scope.login_error=false;
        $scope.login_invalid_value='';
    }



    function validateEmail(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

});