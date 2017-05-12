<script src="js/jquery.js"></script>
<script src="js/jquery.easing.1.3.js"></script>
<script src="js/jquery.easing.compatibility.js"></script>
<script src="js/riffwave.js"></script>
<script src="js/jquery.color-2.1.2.min.js"></script>
<?php $units = 100; ?>
<script>
	$(document).ready(function(){

		$(".box").mouseover(function(){
			var hue = $(this).data("hue");
			$(this).animate({height: "75%", backgroundColor: hue}, 300, "easeOutSine");
		});
		$(".box").mouseout(function(){
			$(this).animate({height: "33%", backgroundColor: "#333"}, 600, "easeOutBounce");
		});

		<?php
			$range = 5000;
			$soundSteps = $range / $units;
			for($x=1; $x < $units+1; $x++){
				$freq = $soundSteps*$x;
				makeWave($x, $freq);
			}

			function makeWave($x, $frequency){
				echo "
				var audio{$x} = new Audio(); // create the HTML5 audio element
				var wave{$x} = new RIFFWAVE(); // create an empty wave file
				var data{$x} = []; // yes, it's an array

				wave{$x}.header.sampleRate = 44100; // set sample rate to 44KHz
				wave{$x}.header.numChannels = 1; // two channels (stereo)

				for(var i = 0; i < 10000; i++) {
				    var time = i / wave{$x}.header.sampleRate;       
				    data{$x}[i] = 128 + Math.round(127 * (Math.sin(2 * Math.PI * {$frequency} * time)));
				}

				wave{$x}.Make(data{$x}); // make the wave file
				audio{$x}.src = wave{$x}.dataURI; // set audio source
				$('#box{$x}').mouseover(function(){
					audio{$x}.play();
				});
				";
			}
		?>
				
	});

</script>
<style>
	body {
		background:#000;
		height:100%;
	}
	.boxContainer {
		display:block;
		position:absolute;
		width:100%;
		bottom:0;
	}
	.box {
		height:33%;
		position:fixed;
		width:15px;
		display:inline-block;
		font-size:0;
		border:1px solid #aaa;
		margin-left:1px;
		background:#333;
		bottom:0;
	}

</style>

<body>
	<div class="boxContainer">
		<?php

			$steps = 360 / $units;

			for ($x=0; $x < $units; $x++){
				$hue = $x*$steps;
				$left = $x*16;
				echo "<div class='box' id='box{$x}'' style='left:{$left}px;' data-hue=\"hsl({$hue},80%,60%)\"></div>";
			}
		?>
	</div>
</body>
