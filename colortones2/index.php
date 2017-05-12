<script src="js/jquery.js"></script>
<script src="js/jquery.easing.1.3.js"></script>
<script src="js/jquery.easing.compatibility.js"></script>
<script src="js/riffwave.js"></script>
<script src="js/jquery.color-2.1.2.min.js"></script>
<?php
  if(isset($_GET['speed'])) {
    $speed = $_GET['speed'];
  } else {
    $speed = 200;
  }
  if(isset($_GET['size'])) {
    $size = $_GET['size'];
  } else {
    $size = 50;
  }
  if(isset($_GET['range'])) {
    $range = $_GET['range'];
  } else {
    $range = 2000;
  }

?>
<script>
	$(document).ready(function(){
    
    var playCount = 0;
    var playLoop;
    
    function generate(){
      $("#receiver").empty();
      var yCount = Math.floor(window.innerHeight / <?php echo $size; ?>);
      var xCount = Math.floor(window.innerWidth / <?php echo $size; ?>);
      $("#receiver").load("engine.php?xCount="+xCount+"&yCount="+yCount+"&range=<?php echo $range; ?>", function(){
        playLoop = setInterval(function(){play(xCount);}, <?php echo $speed; ?>);
      });
    }
    
    function play(xCount){
      playCount++;
      $(".boxContainer"+playCount).animate({backgroundColor: 'rgba(255,255,255,.15);'}, 100, function(){
        $(this).animate({backgroundColor: 'transparent'});
      });
      $(".boxContainer"+playCount).find(".box.selected").each(function(){
        $(this).click();
      });
      if(playCount >= xCount) { playCount = 0; }
    }
    
    generate();

    window.addEventListener("resize", function(){
      window.clearInterval(playLoop);
      generate();
    });
       
	});

</script>
<style>
  * {
    box-sizing: border-box !important;
  }
	body {
		background:#000;
		height:100%;
		margin:0;
		padding:0;
	}
	#receiver {
  	display: block;
  	margin:0 auto;
	}
	.boxContainer {
		display:inline-block;
		position:relative;
		height:100%;
	}
	.box {
		height:<?php echo $size; ?>px;
		position:relative;
		width:<?php echo $size; ?>px;
		display:block;
		font-size:0;
		border-right:1px solid #999;
		border-bottom:1px solid #999;
	}

</style>

<body>
<div id="receiver"></div>
</body>
