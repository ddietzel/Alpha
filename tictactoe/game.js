var Game;
var winScenarios = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

$(function(){
  Game = new game();
  Game.start();
  setListeners();
});
  
  function game() {
    var obj = this;
    obj.status = {'w': 0, 'l': 0, 'd': 0};
    obj.turn = Math.floor(Math.random() * 2) + 1;
    obj.fields = new Array(9+1).join('0').split('').map(parseFloat);
    obj.openFields = function() {    
      return obj.fields.filter(function(item){
        return item === 0;
      });
    }
    obj.start = function() {
      obj.updateStatus();
      obj.addToDebug('PLAYER '+obj.turn+' START');
      if(obj.turn === 2) { obj.robotsTurn(); }
    }
    obj.updateStatus = function() {
      $("#stats").html('W:' + obj.status.w + ' | L:' + obj.status.l + ' | D:'+obj.status.d);
    }
    obj.nextPlayer = function() {
      if(obj.openFields().length > 0 && obj.turn) {
			  obj.turn = obj.turn === 1? 2 : 1;
        obj.addToDebug('PLAYER '+obj.turn+' TURN');
        if(obj.turn === 2) { obj.robotsTurn(); }
      } else if (obj.openFields().length === 0 && obj.turn) {
        obj.catsGame();
      }
    }
    obj.render = function() {
    	$(".field").removeClass("cross circle").map(function(thisField){
        switch (obj.fields[thisField]) {
        	case 1:
            $(this).addClass('cross');
            break;
        	case 2:
            $(this).addClass('circle');
            break;
        }
      });
    }
    obj.gameOver = function() {
      obj.updateStatus();
      $("#stage").addClass("gameOver");
      $("#startover").fadeIn();
    	obj.turn = false;
    }
    obj.reset = function() {
      obj.addToDebug('---------------------------------');
      obj.addToDebug('NEW GAME');
      obj.addToDebug('');
      $(".field").removeClass("win lose");
      $("#stage").removeClass("gameOver catsGame");
      obj.turn = Math.floor(Math.random() * 2) + 1;
      obj.fields = new Array(9+1).join('0').split('').map(parseFloat);
      obj.render();
      obj.start();
    }
    obj.catsGame = function() {
      obj.status.d++;
      $("#stage").addClass("catsGame");
      $("#startover").fadeIn();
      obj.gameOver();
    }
    obj.checkForWin = function() {
      for (i = 0; i < winScenarios.length; i++) {
        var scenario = winScenarios[i];
        if(obj.fields[scenario[0]] === obj.turn && obj.fields[scenario[1]] === obj.turn && obj.fields[scenario[2]] === obj.turn) {
           var colorClass = obj.turn === 1 ? "win" : "lose";
           if(obj.turn === 1) { obj.status.w++; } else { obj.status.l++; }
           $(".field").map(function(item) {
              if(item === scenario[0] || item === scenario[1] || item === scenario[2]) {
                console.log('ADDING CLASS' + item + 'value + ' + obj.fields[item] + 'whos turn?' + obj.turn);
                $(this).addClass(colorClass);
              }
           });
           obj.gameOver();
        }
      }
    }
  }
  
  game.prototype.addToDebug = function(string) {
    var console = $("#console");
    console.delay(100).append(string+'<br>');
    console.scrollTop(console.prop("scrollHeight"));
  }
  
  function setField(thisID) {
    Game.fields[thisID] = Game.turn;
    Game.render();
    Game.checkForWin();
    Game.nextPlayer();
  }
  
  function setListeners() {
    $(".field").on("click", function() {
        if(!Game.turn) { return false; }
        var thisID = $(this).data('fieldid');
        if(Game.fields[thisID] === 0) {
            setField(thisID);
        }
    });
    
    $("#stage").append("<span id='startover'>New Game</span>");
    $("#startover").on("click", function(){
      $(this).fadeOut();
      Game.reset();
    });
  }