$(window).load(function(){
	setGrid();
});



function startVisualization(user){
	var number = user.number;
	$('#user'+number).animate({"background-color": "rgba(255,255,255,1)", "opacity": "1"}, 2000, "easeOutExpo", function(){
		$('#user'+number).animate({"opacity": ".3"}, 5000, "easeInExpo");
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


function userTemplate(number){
	var template = '<div id="user'+number+'" class="userTile"></div>';
	return template;
}

function setImage(key){
	var animtime = 500 + Math.floor(Math.random() * 3000);
    $('<img>').attr('src',function(){
		$('#user'+key).css('background-image','url(\'assets/avatars/'+key+'.jpg\')');
	    var imgUrl = 'assets/avatars/'+key+'.jpg';
	    return imgUrl;
	}).load(function(){
		$('#user'+key).animate({"opacity": ".3"}, animtime);
	});
}