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
	var randBlur = 3 + Math.floor(Math.random() * 10);
	var randOpac = 1 + Math.floor(Math.random() * 4);
	$circle = $('<div class="vis-circle" style="background:url(\'assets/avatars/'+bot.number+'.jpg\');width:'+diameter+'px;height:'+diameter+'px;top:'+top+'px;left:'+left+'px;filter: blur('+randBlur+'px);"></div>');
	$circle.appendTo($("#vis"));
	var bigWidth = diameter*1.5;
	var bigTop = top-(diameter/3);
	var bigLeft = left-(diameter/3);
	$circle.animate({"height": bigWidth+"px", "width": bigWidth+"px", "left": bigLeft+"px", "top": bigTop+"px"},{
    queue       : false,
    duration    : 20000});
	$circle.animate({"opacity": "."+randOpac}, 1000, "easeOutExpo", function(){
		$(this).delay(1000).animate({"opacity": "0"}, 20000, "easeOutSine", function(){
			$(this).detach();
		});
	});
}