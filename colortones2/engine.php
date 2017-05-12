<script>
	$(document).ready(function(){
	
		$(".box").on('click', function(e){
			var hue = $(this).data("hue");
		  if($(this).hasClass('selected')){
			  $(this).animate({backgroundColor: "white"}, 100, "easeOutExpo");
			  $(this).animate({backgroundColor: hue, opacity: '1'}, 300, "easeOutSine");
		  } else {
			  $(this).animate({backgroundColor: hue, opacity: '1'}, 300, "easeOutExpo");
		  }
		  if(e.originalEvent !== undefined){
  		  $(this).toggleClass("selected");
  		}
		});
    
		$(".box").mouseover(function(){
		  if(!$(this).hasClass('selected')){
			  var hue = $(this).data("hue");
        $(this).animate({backgroundColor: hue, opacity: '.5'}, 300, "easeOutExpo");  
		  }
		});
		$(".box").mouseout(function(){
		  if(!$(this).hasClass('selected')){
			$(this).animate({backgroundColor: "transparent", opacity: '1'}, 300, "easeOutSine");
			}
		});

<?php
		  $xCount = $_GET['xCount'];
		  $yCount = $_GET['yCount'];
			$range = $_GET['range'];
			$soundSteps = $range / $yCount;
			echo "console.log('{$soundSteps}, {$yCount}');";
			for($x=1; $x < $yCount; $x++){
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
				    data{$x}[i] = 128 + Math.floor(127 * (Math.sin(2 * Math.PI * {$frequency} * time)));
				}

				wave{$x}.Make(data{$x}); // make the wave file
				audio{$x}.src = wave{$x}.dataURI; // set audio source
				$('.box{$x}').on('click', function(e){
				  if(e.originalEvent == undefined){
            audio{$x}.play();
					}
				});
				";
			}
				
echo "});";
echo "</script>";


			for($z=1; $z<$xCount+1; $z++){
        echo '<div class="boxContainer boxContainer'.$z.'">';
    			$steps = 360 / $yCount;
    			for ($x=0; $x < $yCount; $x++){
    				$hue = $x*$steps;
    				$left = $x*16;
    				echo "<div class='box box{$x}' data-audio='{$x}' data-hue=\"hsl({$hue},80%,60%)\"></div>";
    			}
        echo '</div>';
      }
		?>