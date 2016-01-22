/**
 * Created by joshuasisley on 1/21/16.
 */
var googleMaps = angular.module('googleMaps');

googleMaps.service('MapService', function($q) {
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(37.775, -122.419),
            zoom: 13,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    };

    this.search = function(search) {
        var d = $q.defer();
        this.places.textSearch({query: search}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results);
            }
            else d.reject(status);
        });
        return d.promise;
    };

    this.addMarkers = function(locations) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        for (var i in locations) {
            this.marker = new google.maps.Marker({
                map: this.map,
                position: locations[i].geometry.location,
                animation: google.maps.Animation.DROP
            });
            this.map.setCenter(locations[i].geometry.location);
        }
    }
});