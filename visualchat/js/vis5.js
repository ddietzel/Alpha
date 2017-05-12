$(window).load(function(){
	StartVis();
});

function StartVis(){
	$bots = getBots();
	$.each( $bots, function( key, value ) {
	});
}

function startVisualization(bot){
	var left = -100 + Math.floor(Math.random() * 400);
	var top = -100 + Math.floor(Math.random() * 400);
	var number = bot.number;
	var diameter = 100 + Math.floor(Math.random() * 200);
	var randBlur = 5 + Math.floor(Math.random() * 5);
	var randOpac = 1 + Math.floor(Math.random() * 5);
	console.log(randBlur);
	$circle = $('<div class="vis-circle" style="background:url(\'assets/avatars/'+bot.number+'.jpg\');width:'+diameter+'px;height:'+diameter+'px;top:'+top+'px;left:'+left+'px;filter: blur('+randBlur+'px);"></div>');
	$circle.appendTo($("#vis"));
	$circle.animate({"opacity": "."+randOpac}, 1000, "easeOutExpo", function(){
		$(this).delay(1000).animate({"opacity": "0"}, 20000, "easeInExpo", function(){
			$(this).detach();
		});
	});
}