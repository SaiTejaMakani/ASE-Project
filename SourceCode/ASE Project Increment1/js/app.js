/**
 * Created by saiteja on 07-09-2016.
 */

angular.module('GoogleDirection', ['ngSanitize'])
    .controller('googlemapoutput', function ($scope, $http ,$location) {
        var map;
        var mapOptions;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionsService = new google.maps.DirectionsService();


        $scope.initialize = function () {
            var pos = new google.maps.LatLng(0, 0);
            var mapOptions = {
                zoom: 3,
                center: pos
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

        };

        $scope.calcRoute = function () {

            var originLatLong = [];
            var destLatLong = [];


            var end = document.getElementById('endlocation').value;
            var start = document.getElementById('startlocation').value;

            console.log('Start Loc' +start);
            console.log('End Loc' + end);


            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    console.log(response);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                }

            });

            //Origin

            var geo = new google.maps.Geocoder;
            geocoder = new google.maps.Geocoder();
            var startaddress = start;
            geocoder.geocode({ 'address': startaddress }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    originLatLong[0] = results[0].geometry.location.lat();
                    originLatLong[1] = results[0].geometry.location.lng();


                    //LatLong Code

                    var latlng = new google.maps.LatLng(originLatLong[0], originLatLong[1]);

                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            console.log(results)
                            if (results[1]) {

                                //find country name
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                            //this is the object you are looking for
                                            city = results[0].address_components[i];
                                            break;
                                        }
                                    }
                                }
                                //city data
                                console.log('Origin State' + city.short_name);


                                //Waether report Origin

                                var wthrURL = 'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + city.short_name + '/' + start + '.json';

                                $http.get(wthrURL).success(function (data) {
                                    console.log(data);
                                    temp = data.current_observation.temp_f;
                                    icon = data.current_observation.icon_url;
                                    weather = data.current_observation.weather;
                                    console.log(temp);
                                    console.log(icon);
                                    $scope.currentweather = {
                                        html: "Currently " + temp + " &deg; F and " + weather + ""
                                    }

                                    $scope.currentIcon = {
                                        html: "<img src='" + icon + "'/>"
                                    }

                                    console.log($scope.currentIcon);
                                })



                                $scope.cityName = city.short_name;

                            } else {

                                alert("No results found");
                            }
                        } else {

                            alert("Geocoder failed due to: " + status);
                        }
                    });



                }

                else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });



            //Destination

            var Endaddress = end;
            geocoder.geocode({ 'address': Endaddress }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    destLatLong[0] = results[0].geometry.location.lat();
                    destLatLong[1] = results[0].geometry.location.lng();


                    //LatLong Code

                    var MyDSTlatlng = new google.maps.LatLng(destLatLong[0], destLatLong[1]);

                    geocoder.geocode({ 'latLng': MyDSTlatlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            console.log(results)
                            if (results[1]) {

                                //find country name
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                            //this is the object you are looking for
                                            city = results[0].address_components[i];
                                            break;
                                        }
                                    }
                                }


                                //city data
                                console.log('Destination State' + city.short_name);


                                //Waether report Origin

                                var wthrURL = 'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + city.short_name + '/' + end + '.json';

                                $http.get(wthrURL).success(function (data) {
                                    console.log(data);
                                    temp = data.current_observation.temp_f;
                                    icon = data.current_observation.icon_url;
                                    weather = data.current_observation.weather;
                                    console.log(temp);
                                    console.log(icon);
                                    $scope.Destcurrentweather = {
                                        html: "Currently " + temp + " &deg; F and " + weather + ""
                                    }

                                    $scope.DestcurrentIcon = {
                                        html: "<img src='" + icon + "'/>"
                                    }

                                    console.log($scope.DestcurrentIcon);
                                })





                            } else {

                                alert("No results found");
                            }
                        } else {

                            alert("Geocoder failed due to: " + status);
                        }
                    });



                }

                else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });









        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize);

        //City and State

        $scope.codeLatLng = function () {

            var latlng = new google.maps.LatLng($scope.destLat, $scope.destLong);

            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results)
                    if (results[1]) {

                        $scope.MyCityName = 'London';
                        //find country name
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                    //this is the object you are looking for
                                    city = results[0].address_components[i];
                                    break;
                                }
                            }
                        }
                        //city data
                        console.log('Origin State' + city.short_name);

                        $scope.StateId = city.short_name;

                        console.log($scope.StateId);

                    } else {

                        alert("No results found");
                    }
                } else {

                    alert("Geocoder failed due to: " + status);
                }
            });

        }

        $scope.registerUser = function(username,password,cnf_password,emailid)
        {

            if (password === cnf_password) {
                if (password.length >= 8) {
                    if (validateemail(emailid) == true){
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                        localStorage.setItem('emailid', emailid);
                        alert(localStorage.getItem('emailid') + "   Registered Successfully.");
                        window.location = "/ASE%20Project%20Increment1/Login.html";

                    }
                    else{
                        alert("Not a valid e-mail address");
                    }

                }
                else{
                    alert("Password should be more that 8 letters. Please try again");
                }
            }
            else {
                alert("passwords does not match please try again");
            }

        };

        $scope.validateuser = function(username,password)
        {

            if ( localStorage.getItem('username') === username){

                if ( localStorage.getItem('password') === password) {
                    window.location = "/ASE%20Project%20Increment1/Home.html";
                }
                else{
                    alert("wrong username / password enter again" );
                }
            }
            else {
                alert("wrong username / password enter again" );
            }

        };
    });


function speech() {

    var text = document.getElementById('text');
    console.log(text.value);
    var utterance = new SpeechSynthesisUtterance(text.value);
    window.speechSynthesis.speak(utterance);

}

function Logout() {

    window.location = "/ASE%20Project%20Increment1/Index.html";

}

function validateemail(emailId) {
    var x = emailId;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
    else{
        return true;
    }
}


var app = angular.module('myApp', []);
//noinspection JSDuplicatedDeclaration
app.controller('lab8',['$scope','$http',function($scope,$http){


    $scope.quizquestion=function() {
        //console.log("in quiz question");
       // $scope.question ="Which of the following operator can be used to access value at address stored in a pointer variable?";
       // $scope.answer="*- value operator gives value stored at particular address";
        $http.get("http://localhost:8080/RESTExample/restexample/QuizAnserService")
            .then(function(response) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json( response.data );
                console.log(json);
                $scope.question = json.QuizAnswerService.Question;
                //console.log(response.data);
                $scope.answer=json.QuizAnswerService.Answer;
               // console.log(response.data);
        });

},
    $scope.quizgrade=function() {

        //console.log("in quiz grade");
        //$scope.grade = "Score:: 80   Grade : A";
        $http.get("http://localhost:8080/RESTExample/restexample/QuizMarksService")
            .then(function(response) {
                console.log(response.data);
                var json= response.data;

                console.log(json.Total_Quiz_Marks);
               // console.log("in answers service");
                var mark=json.Total_Quiz_Marks;
                if (mark >=8){
                    $scope.grade = "Score:" + json.Total_Quiz_Marks +"  Grade: A";
                }
                else
                    if( (mark <= 6) && (mark >= 4)){
                        $scope.grade = "Score:" + json.Total_Quiz_Marks +"  Grade: B";
                    }
                else {
                        $scope.grade = "Score:" + json.Total_Quiz_Marks + "  Grade: C";
                    }


            });

    }


}])
;