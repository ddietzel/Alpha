$(window).load(function(){
	setGrid();
});



function startVisualization(user){
	var number = user.number;
	var color = makeRandomRGBA();
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

function makeRandomRGBA(){
	var red = Math.floor(Math.random() * 255) + 1;
	var green = Math.floor(Math.random() * 56) + 200;
	var blue = Math.floor(Math.random() * 56) + 200;
	var alpha = Math.floor(Math.random() * 5) + 6;
	alpha = alpha / 10;
	
	console.log("red: " + red
			  + " green: " + green
			  + " blue: " + blue
			  + " alpha: " + alpha);
	
	var rgba = "rgba("+red+","+green+","+blue+","+alpha+")";
	/* We need the output to be rgba(x,y,z,a) */
	
	return rgba;
}

setInterval(function(){
	var random = Math.round(Math.random()*80);
	if( !$('#user'+random).is(':animated') ) {
		$('#user'+random).animate({"opacity": ".15"}, 500, "easeOutSine", function(){
			$(this).animate({"opacity": ".1"}, 500, "easeInSine");
		});	
	}
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