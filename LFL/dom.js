// THIS IS REALLY GROSS DOM STUFF
// SO ITS BEING SEPARATED OUT
// LOTS OF GNARLY PERCENTAGE BASED ANIMATIONS
// AND CALCULATED RENDERING

AppConstructor.prototype.addToStage = function(item, index) {
  var largestDistance = scope[scope.length-1].distance;
  
  var appender = $("<div class='locationItem'></div>");
  $("#stage").append(appender);
  appender.append("<span class='address'>"+item.address+"</span>");
  appender.append("<span class='distance'>"+ Math.floor(item.distance * 0.00062137).gimmeCommas() + " Mi</span>");
  appender.append("<span class='distance kilometers'>" + Math.floor((item.distance / 1000)).gimmeCommas() + " Km</span>");
  
  var howWide = Math.floor(100 / scope.length);
  // Maximum will be 75% height, get proportion of that
  var howHigh = Math.floor(75 * item.distance / largestDistance);
  if(howHigh < 1) {howHigh = 1;}
  var left = 100 / scope.length * index;
  
  // Get a value between 50 and 200 depending on the index
  var crazyRGBCalculation = 200 - Math.floor(150*(index / scope.length));
  
  var CSSObject = {
    'backgroundColor': 'rgb(255,'+crazyRGBCalculation+',0)',
    'width': howWide+'%',
    'left': left+'%'
  }
  
  appender.css(CSSObject);
  
  if(howHigh < 25) {
    appender.addClass('textOnTop');
  }
  
  appender.delay(500 * index).css({'height': howHigh+'%'});
}


// RENDER STAGE SORTS THE SCOPE, PURGES THE STAGE,
// AND RENDERS IT FROM SCRATCH
AppConstructor.prototype.renderStage = function() {
  scope.sort(compare);
  console.log('here is the scope we\'re adding', scope);
  
  App.purge();

  scope.map(function(item, index){
    App.addToStage(item, index);
  });
}
 
 
// A NICE PLACE TO PUT THE LISTENERS NEEDED 
AppConstructor.prototype.setListeners = function() {
  $("#submit").on('click', function(){
    //Get input
    var newAddress = $('#newAddress').val();
    if(newAddress === '') {
      alert('Please put something in here first');
    } else {
      // Reset input
      $('#txt_name').val('');
      // Let the CSS animation finish, then detach
      $(".locationItem").hide();
      App.addAddress(newAddress);      
    }
  });
  
  // TODO: FIGURE OUT HOW TO RESET WITHOUT RUNNING INTO QUERY_LIMIT
  $("#reset").on('click', function() {
    App.reset();
  })
}