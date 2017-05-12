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
	var randOpac = 1 + Math.floor(Math.random() * 5);
	var color = makeRandomGray();
	$circle = $('<div class="vis-circle" style="background:'+color+';width:'+diameter+'px;height:'+diameter+'px;top:'+top+'px;left:'+left+'px;filter: blur('+randBlur+'px);"></div>');
	$circle.appendTo($("#vis"));
	var bigWidth = diameter*2;
	var bigTop = top-(diameter/2);
	var bigLeft = left-(diameter/2);
	$circle.animate({"height": bigWidth+"px", "width": bigWidth+"px", "left": bigLeft+"px", "top": bigTop+"px"},{
    queue       : false,
    duration    : 20000});
	$circle.animate({"opacity": "."+randOpac}, 1000, "easeOutExpo", function(){
		$(this).delay(1000).animate({"opacity": "0"}, 20000, "easeOutSine", function(){
			$(this).detach();
		});
	});
}


function makeRandomGray(){
	var value = Math.floor(Math.random() * 255) + 1;
	var rgb = "rgb("+value+","+value+","+value+")";	
	return rgb;
}