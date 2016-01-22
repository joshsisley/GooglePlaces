/**
 * Created by joshuasisley on 1/21/16.
 */
angular.module('googleMaps', ['ngRoute','cgBusy','ui-notification']);

var googleMaps = angular.module('googleMaps');

googleMaps.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 3000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'left',
        positionY: 'bottom'
    });
});

googleMaps.controller("mainController", function($scope, MapService, Notification) {

    $scope.displaySearch = true;
    $scope.searchPlace = "";
    $scope.savedPlaces = [];

    $scope.$watch('searchInput', function() {

    });

    $scope.$watch('savedPlaces', function() {
    });
    $scope.$watch('mySavedLocations', function() {

    });

    $scope.backToSearch = function() {
        $scope.displaySearch = true;
    };

    $scope.savePlace = function(place) {
        $scope.storedLocations = localStorage.getItem('savedLocations');
        $scope.savedPlaces = JSON.parse($scope.storedLocations);
        console.log($scope.savedPlaces);
        $scope.savedPlaces.push(place);
        localStorage.setItem('savedLocations', JSON.stringify($scope.savedPlaces));
        Notification.success('Location Saved!');
    };

    $scope.removePlace = function(place) {
        $scope.storedLocations = localStorage.getItem('savedLocations');
        $scope.savedPlaces = JSON.parse($scope.storedLocations);
        var index = $scope.savedPlaces.indexOf(place);
        $scope.savedPlaces.splice(index, 1);
        $scope.mySavedLocations = $scope.savedPlaces;
        localStorage.setItem('savedLocations', JSON.stringify($scope.savedPlaces));
    };

    $scope.getSavedLocations = function() {
        $scope.displaySearch = false;
        $scope.locations = localStorage.getItem('savedLocations');
        $scope.mySavedLocations = JSON.parse($scope.locations);
        console.log($scope.mySavedLocations);
    };

    $scope.places = [];

    $scope.search = function() {
        $scope.apiError = false;
        $scope.promise = MapService.search($scope.searchPlace);
        $scope.promise.then(
                function(res) { // success
                    MapService.addMarkers(res);
                    //$scope.place.name = locations.name;
                    //$scope.place.lat = res.geometry.location.lat();
                    //$scope.place.lng = res.geometry.location.lng();
                    $scope.places = res;
                    console.log($scope.places);
                },
                function(status) { // error
                    $scope.apiError = true;
                    $scope.apiStatus = status;
                }
            );
    };

    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    };

    MapService.init();
});