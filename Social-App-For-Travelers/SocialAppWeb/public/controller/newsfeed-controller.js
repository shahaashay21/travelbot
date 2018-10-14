/**
 * Created by Divya Patel on 10/10/2017.
 */

var newsfeed = angular.module('newsfeed', []);

newsfeed.controller('newsfeedController',function ($scope, $http, $location) {

    $scope.showPeople = false;
    $scope.showPlaces = false;
    $scope.showTrips = false;
    

    $scope.getNewsFeed = function () {

        $http({
            method : "POST",
            url : '/getNewsFeed',
            data : {}
        }).success(function(data) {
            if (data.success) {
                
                $scope.trips = data.trips;
                $scope.name = data.name;
                $scope.profile_pic = data.profile_pic;
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
                    $scope.getNewsFeed();
               }
               else
               {

               }

           }).error(function(error) {
               console.log(error);

           });
       }

    };
    
    $scope.postPlaceComment = function (place_id,comment) {
        if(comment!==undefined && comment!==""){
            $http({
                method : "POST",
                url : '/postCommentOnPlace',
                data : {
                    place_id:place_id,
                    comment:comment
                }
            }).success(function(data) {
                if (data.success) {
                    $scope.getTripDetails();
                }
                else

                {

                }

            }).error(function(error) {
                console.log(error);

            });
        }
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
                $scope.getNewsFeed();
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        });

    };

    $scope.likePlace = function (like_by_me,place_id) {
        $http({
            method : "POST",
            url : '/likePlace',
            data : {
                place_id:place_id,
                like_by_me:like_by_me
            }
        }).success(function(data) {
            if (data.success) {
                $scope.getTripDetails();
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        });
    };

     $scope.searchResults = function () {

        var validated = true;
        
        
        var searchText = window.searchText; 
        if(searchText === undefined || searchText === ''){
            validated=false;
        }
        console.log("in controller: "+searchText);
        if(validated){
         $http({
            method : "POST",
            url : '/getSearchResults',
            data : {
                searchText:searchText
            }
        }).success(function(data) {
            if (data.success) {
                $scope.name = data.name;
                $scope.profile_pic = data.profile_pic;
                $scope.search_query = data.search_query;
                $scope.checkedPeople = function(){return true;}
                $scope.showPeople = true;
                $scope.showPlaces = false;
                $scope.showTrips = false;
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        }); 
    }
    };
    

    $scope.searchPlaces = function () {

        var validated = true;
        var searchText = window.searchText; 
        if(searchText === undefined || searchText === ''){
            validated=false;
        }
        console.log("in people: "+searchText);
        if(validated){
         $http({
            method : "POST",
            url : '/getSearchPlaces',
            data : {
                searchText:searchText
            }
        }).success(function(data) {
            if (data.success) {
                $scope.name = data.name;
                $scope.profile_pic = data.profile_pic;
                $scope.final_search_place = data.final_search_place;
                $scope.showPeople = false;
                $scope.showPlaces = true;
                $scope.showTrips = false;
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        }); 
    }
    };


    $scope.searchTrips = function () {

        var validated = true;
        
        
        var searchText = window.searchText; 
        if(searchText === undefined || searchText === ''){
            validated=false;
        }
        console.log("in trips: "+searchText);
        if(validated){
         $http({
            method : "POST",
            url : '/getSearchTrips',
            data : {
                searchText:searchText
            }
        }).success(function(data) {
            if (data.success) {
                $scope.name = data.name;
                $scope.profile_pic = data.profile_pic;
                $scope.final_search = data.final_search;
                $scope.showPeople = false;
                $scope.showPlaces = false;
                $scope.showTrips = true;
            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        }); 
    }
    };


    $scope.getTripDetails = function () {
      
        var trip_id = window.trip_id;
        $http({
            method : "POST",
            url : '/getTripDetails',
            data : {
                trip_id:trip_id
            }
        }).success(function(data) {
            if (data.success) {
                $scope.trip = data.trip[0];
                $scope.places  = data.places;
                $scope.name = data.name;

                var places_markers=[];
                places_markers.push({
                    start_address:$scope.trip.source,
                    end_address:$scope.places[0].place_name
                });

                for(var i=0;i<$scope.places.length-1;i++){
                    var place = $scope.places[i].place_name;
                    var next_place = $scope.places[i+1].place_name;
                    places_markers.push( {
                        start_address:place,
                        end_address:next_place
                    });
                }
                console.log(JSON.stringify(places_markers,null,1));


                var geocoder;
                var map;
                var directionsDisplay;
                var directionsService = new google.maps.DirectionsService();
                var locations=[];
                locations[0]={place_name:$scope.trip.source, latLong:$scope.trip.latLong};
                for(var i=1;i<=data.places.length;i++){
                    locations[i]= data.places[i-1];
                }

                //     [
                //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
                //     ['Bondi Beach', -33.890542, 151.274856, 4],
                //     ['Coogee Beach', -33.923036, 151.259052, 5],
                //     ['Maroubra Beach', -33.950198, 151.259302, 1],
                //     ['Cronulla Beach', -34.028249, 151.157507, 3]
                // ];

                function initialize() {
                    directionsDisplay = new google.maps.DirectionsRenderer();


                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 7,
                        center: new google.maps.LatLng(locations[1]['latLong']['lat'], locations[1]['latLong']['long']),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    directionsDisplay.setMap(map);
                    var infowindow = new google.maps.InfoWindow();

                    var marker, i;
                    var request = {
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    for (i = 0; i < locations.length; i++) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(locations[i]['latLong']['lat'], locations[i]['latLong']['long']),
                            title:'hello',
                            name:'Hello'
                        });

                        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        //     return function() {
                        //         infowindow.setContent(locations[i]['place_name']);
                        //         infowindow.open(map, marker);
                        //     }
                        // })(marker, i));

                        if (i == 0) request.origin = marker.getPosition();
                        else if (i == locations.length - 1) request.destination = locations[i]['place_name'];
                            //marker.getPosition();
                        else {
                            if (!request.waypoints) request.waypoints = [];
                            request.waypoints.push({
                                location: locations[i]['place_name'],
                                stopover: true
                            });
                        }

                    }
                    directionsService.route(request, function(result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            result.routes[0].legs[0].start_address="FREMONT";
                            for(var i=0;i<places_markers.length;i++){
                                result.routes[0].legs[i].start_address = places_markers[i].start_address;
                                result.routes[0].legs[i].end_address = places_markers[i].end_address;
                            }
                            directionsDisplay.setDirections(result);
                           // console.log(JSON.stringify(result.routes[0],null,1));
                        }
                        else{
                            console.log("NO route found");
                        }
                    });
                }
                initialize();

                
                // google.maps.event.addDomListener(window, "load", initialize);




            }
            else
            {

            }

        }).error(function(error) {
            console.log(error);

        });
    };

    //SUBMIT TWEET
    $scope.uploadImages = function(){
         console.log(window.file);

            var formData = new FormData();
            var file = window.file;
            var tripId = window.tripId;
            console.log(tripId);
            filename = document.getElementById('twimage').value;
           // filename1 = document.getElementById('twimage1').value;
            console.log(file);
            console.log(filename);
            if(file){
                if(filename){
                    formData.append('url', filename);
                }
                // if(filename1){
                //     formData.append('url', filename);
                // }
                // console.log('IN FILE');
                formData.append('myFile', file);
                formData.append('trip_id', tripId);
            }
          //  formData.append('tweet', $scope.tweet);
            // console.log(filename);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                 if (xhr.readyState == 4 && xhr.status == 200) {
                //     angular.element("#tweetbox").modal('hide');
                //     alertline("alert-notify-success","<b>Tweet has been successfully posted</b>");
                //     angular.element(".stylish-input-group2").hide();
                //     angular.element(".stylish-input-group1").show();
                //     angular.element(".center-home .top").css('height', '55px');
                //     $scope.tweet = "";
                //     $scope.recenttweet();
                    $scope.totalTweet += 1;
                    $('#previewing').css("display", "none");
                    if(file){
                        window.file = "";
                        document.getElementById('twimage').value = "";
                       // document.getElementById('twimage1').value = "";
                    }
                }
            }

            xhr.open('post', '/trip/add_media', true);

            xhr.send(formData);


    };
});