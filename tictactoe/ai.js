// THIS IS AN ENHANCEMENT FOR THE COMPUTER PLAYER
// TO NOT JUST PLAY RANDOM NUMBERS BUT WORK TOWARDS A WIN

var game = game || {};

game.prototype.robotsTurn = function() {
  var app = this;  
  // STEP 0: CHECK FOR CATS GAME
  if(app.openFields().length === 0) {
    app.catsGame();
  } else {
    app.nextMove();
  }
}

  
game.prototype.nextMove = function() {
  var app = this;
  
  // STEP 1: CHECK IF ANY WIN SCENARIOS CLOSE:
  var threats = [];
  var opponentId = 1; // HARDCODED FOR NOW
  var myId = 2;
  var move = false;
  var corners = [0,2,6,8];

  for (i = 0; i < winScenarios.length; i++) {
    var scenario = winScenarios[i];
    var x = 0;
    if(app.fields[scenario[0]] === opponentId) {
      x++;
    }
    if(app.fields[scenario[1]] === opponentId) {
      x++;
    }
    if(app.fields[scenario[2]] === opponentId) {
      x++;
    }
    
    var y = 0;
    if(app.fields[scenario[0]] === myId) {
      y++;
    }
    if(app.fields[scenario[1]] === myId) {
      y++;
    }
    if(app.fields[scenario[2]] === myId) {
      y++;
    }
    
    if(y === 2 && x === 0) {
      app.winScenario(scenario);
      break;
    } else {
      move = true;
    }
    
    var thisScenario = {
      threatLevel: x,
      scenario: scenario
    }
    
    // NOW WE HAVE TO MAKE SURE ANY OF THESE ARE EVEN AVAILABLE
    if(app.fields[scenario[0]] === 0 || app.fields[scenario[1]] === 0 || app.fields[scenario[2]] === 0) {
      app.addToDebug('THREAT ANALYZED - LEVEL ' + x + ' - Scenario:' + JSON.stringify(scenario));
      threats.push(thisScenario);
    } else {
      app.addToDebug('NOT A THREAT ANYMORE - Scenario:' + JSON.stringify(scenario));
    } 
  }
  
  if(move) {
    threats = sortByKey(threats, 'threatLevel');
    var biggestThreat = threats[0];
    
    if (threats[0].threatLevel === 2 && threats[1].threatLevel === 2) {
      app.addToDebug('DOUBLE THREAT DETECTED --- I AM FUCKED');
    }

    switch(biggestThreat.threatLevel) {
      // PRIORITY 2: COUNTER LEVEL 2 THREAT
      case 2:
        app.addToDebug('// PRIORITY 2: COUNTER LEVEL 2 THREAT');
        app.addToDebug('BIGGEST THREAT: LEVEL ' + biggestThreat.threatLevel + ' - ' + JSON.stringify(biggestThreat.scenario));    
        // NOW WE HAVE THE BIGGEST THREAT, WE MUST COUNTER
        for(var i = 0; i < biggestThreat.scenario.length; i++) {
          if(app.fields[biggestThreat.scenario[i]] === 0) {
            app.addToDebug('SETTING FIELD: ' + biggestThreat.scenario[i]);
            setField(biggestThreat.scenario[i]);
            break;
          }
        }
        break;
      // PRIORITY 3: MOVE TOWARDS WINNING STRATEGY
      case 1:
        app.addToDebug('// PRIORITY 3: MOVE TOWARDS WINNING STRATEGY');
        
        // IF MIDDLE IS OPEN THEN TAKE MIDDLE
        if(app.fields[4] === 0) {
          app.addToDebug('GOING FOR CENTER PIECE');
          setField(4);
          break;
        }
        
        // FILTER FOR POSSIBLE WINNING SCENARIOS FOR THE PLAYER
        var possibleWins = threats.filter(function(threat){
          return ((app.fields[threat.scenario[0]] === 0 || app.fields[threat.scenario[0]] === myId) &&
                  (app.fields[threat.scenario[1]] === 0 || app.fields[threat.scenario[1]] === myId) &&
                  (app.fields[threat.scenario[2]] === 0 || app.fields[threat.scenario[2]] === myId));
        });
        
        // FIND ONE WHERE I AM ALREADY IN
        var bestScenarios = possibleWins.filter(function(win){
          return app.fields[win.scenario[0]] === myId || 
                 app.fields[win.scenario[1]] === myId || 
                 app.fields[win.scenario[2]] === myId;
        });
        
        if(bestScenarios.length === 0 && possibleWins.length > 0) {
          // IM NOT IN ONE, BEGIN RANDOM SCENARIO
          app.addToDebug('BEGINNING SCENARIO: ' + JSON.stringify(thisScenario));
          var availableCorners = [];
          app.fields.map(function(item, index){
            if(corners.indexOf(index) !== -1 && item === 0) {
              availableCorners.push(index);
            }
          });
          
          app.addToDebug('CHECKING FOR CORNERS AVAILABLE IN SCENARIO: ' + JSON.stringify(availableCorners));
          // CHECK IF ONE OF THE SCENARIOS HAS A CORNER
          if(availableCorners) {
            setField(availableCorners[Math.floor(Math.random() * availableCorners.length)]);
          } else {
          // OTHERWISE USE THE NEXT BEST OPTION
            for(var i = 0; i < app.fields.length; i++) {
              if(app.fields[i] === 0) {
                setField(i);
                break;
              }
            }
          }
        } else if (bestScenarios.length > 0 && possibleWins.length > 0) {
          var thisScenario = bestScenarios[Math.floor(Math.random() * bestScenarios.length)].scenario;
          app.addToDebug('CONTINUING SCENARIO: ' + JSON.stringify(thisScenario));
          
          var isThereACorner = thisScenario.filter(function(item) {
            return corners.indexOf(item) !== -1 && app.fields[item] === 0;
          });
                              
          // CHECK IF ONE OF THE SCENARIOS HAS A CORNER
          if(isThereACorner.length > 0) {
            setField(isThereACorner[Math.floor(Math.random() * isThereACorner.length)]);
          } else {
            // OTHERWISE USE THE NEXT BEST OPTION
            app.addToDebug('USING THE NEXT BEST OPTION');
            for(var i = 0; i < thisScenario.length; i++) {
              // CHECK THAT ITS A CORNER AND ITS AVAILABLE
              if(app.fields[thisScenario[i]] === 0) {
                app.addToDebug('SETTING FIELD: ' + thisScenario[i]);
                setField(thisScenario[i]); 
                break;  
              }
            }
          }
        } else {
          // THERES NO WAY TO WIN, MOST LIKELY CATS GAME, FILL IN REMAINING SQUARE
          for(var i = 0; i < app.fields.length; i++) {
            if(app.fields[i] === 0) {
              app.addToDebug('NO POSSIBLE WIN SCENARIOS CATS GAME - SETTING FIELD ' + i);
              setField(i);
              break;
            }
          }
        }
        
        break;
      // PRIORITY 3: MAKE A MOVE (NO THREATS = NO FIELDS)  
      case 0:
        app.addToDebug('// PRIORITY 3: MAKE A MOVE (NO THREATS OR NO FIELDS)');
        var randomField = corners[Math.floor(Math.random() * corners.length)];
        app.addToDebug('NO FIELDS FOUND - SETTING FIELD: ' + randomField);
        setField(randomField);
        break;
    }  
  }
};

game.prototype.winScenario = function(scenario) {
  var app = this;
  app.addToDebug('// PRIORITY 1: EXECUTE WIN SCENARIO: ' + JSON.stringify(scenario));
  for(var i = 0; i < scenario.length; i++) {
    if(app.fields[scenario[i]] === 0) {
      app.addToDebug('SETTING FIELD: ' + scenario[i]);
      setField(scenario[i]);   
    }
  }
};


function sortByKey(array, key) {
    var returning = array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    return returning.reverse();
}