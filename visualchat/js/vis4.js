$(window).load(function(){
	setGrid();
});



function startVisualization(user){
	var number = user.number;
	var r = 0 + Math.floor(Math.random() * 255);
	var color = "rgb("+r+","+r+","+r+");"
	$('#user'+number).stop().animate({"background-color": color, "opacity": "1"}, 2000, "easeOutExpo", function(){
		$('#user'+number).animate({"background-color": "white", "opacity": ".1"}, 10000, "easeInExpo");
	});
}

function setGrid(){
	$bots = getBots();
	$visual = $("#vis");
	var count = 1;
	$.each( $bots, function( key, value ) {
		if(count > 9*9) { return ; }
		$tile = userTemplate(key);
		$visual.append($tile);    
	    setImage(key);
	    count++;
	});
}

setInterval(function(){
	var random = Math.round(Math.random()*80);
	$('#user'+random).animate({"opacity": ".15"}, 500, "easeOutSine", function(){
		$(this).animate({"opacity": ".1"}, 500, "easeInSine");
	});
	console.log("random");
}, 100);


function userTemplate(number){
	var template = '<div id="user'+number+'" class="userTile"></div>';
	return template;
}

function setImage(key){
	var animtime = 500 + Math.floor(Math.random() * 3000);
    $('<img>').attr('src',function(){
		$('#user'+key).css('background-color','white');
	    var imgUrl = 'assets/avatars/'+key+'.jpg';
	    return imgUrl;
	}).load(function(){
		$('#user'+key).animate({"opacity": ".1"}, animtime);
	});
}