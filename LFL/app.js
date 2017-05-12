var App;
var scope = [];
var geocoder;


  

$(document).ready(function(){
  init();
  App.setDefaultAddresses();
  App.setupLocations();
  App.setListeners();
});

function init() {
  geocoder = new google.maps.Geocoder();
  App = new AppConstructor();
}

/* APP CONSTRUCTOR */

function AppConstructor() {
  var obj = this;
  obj.purge = function() {
    $(".locationItem").detach();
  };
  obj.reset = function() {
    obj.purge();
    scope = [];
    obj.setupLocations();
  };
}

AppConstructor.prototype.setDefaultAddresses = function() {
  App.primaryTarget = {};
  App.defaultAddresses = 
    ["Times Square, Manhattan, NY 10036",
    "13000 S Dakota 244, Keystone, SD 57751",
    "1600 Pennsylvania Ave NW, Washington, DC 20500",
    "Golden Gate Bridge, San Francisco, CA 94129",
    "Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
    "Great Wall of China",
    "Hollywood Sign, Los Angeles, CA"];
}

AppConstructor.prototype.addAddress = function(address) {
  // THIS SHOULD REALLY BE A PROMISE, BUT TO KEEP IT IN
  // VANILLA JAVASCRIPT RIGHT NOW IT'S JUST USING A CALLBACK
  App.getCoordinates(address, function(results){
    var thisResult = results[0];
    
    // USE GOOGLE MAPS GEOMETRY TO GET SPHERICAL DISTANCE
    var distance = google.maps.geometry.spherical.computeDistanceBetween(thisResult.geometry.location, App.primaryTarget.location);
    
    // SET UP THE ITEM TO PUSH TO THE 'SCOPE'
    var item = {
      address: thisResult.formatted_address,
      location: thisResult.geometry.location,
      distance: Math.floor(distance)
    }
    scope.push(item);

    // BECAUSE THE CALLS TO GEOCODE ARE ASYNC WE HAVE TO
    // FIRE THE RENDER ONLY AFTER ALL ADDRESSES HAVE COME IN
    // TODO: MAKE THIS INTO AN OVERLY CONVOLUTED PROMISE CHAIN
    if(scope.length >= App.defaultAddresses.length) {
      App.renderStage();
    }
  });
};

// THIS IS THE AJAX CALL THAT DOES IT ALL
AppConstructor.prototype.getCoordinates = function(address, callback) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      callback(results);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
      return false;
    }
  }); 
};

// FIRST RUN THROUGH
AppConstructor.prototype.setupLocations = function() {
  // First let's set up our locations
  App.getCoordinates('510 Victoria, Venice, CA', function(res) {    
    App.primaryTarget.location = res[0].geometry.location;
    
    // This has to be in here because we need the async to finish
    // to compare coordinates with the office
    App.setupDefault();
  });
};

AppConstructor.prototype.setupDefault = function() {
  App.defaultAddresses.forEach(function(address){
    App.addAddress(address);
  });
};


/*
 *
 * UTILITIES
 * Little helpers
 *
 */

// CREDIT TO http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
function compare(a,b) {
  if (a.distance < b.distance)
    return -1;
  if (a.distance > b.distance)
    return 1;
  return 0;
}
  
// NEED SOMETHING TO MAKE THE LARGER NUMBERS PRESENTABLE
Number.prototype.gimmeCommas = function() {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}