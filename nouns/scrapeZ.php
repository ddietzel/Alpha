<script src="jquery.js"></script>
<div id="pipe" class="pipe">
<div id="target"></div>
</div><!--

<audio id="success">
  <source src="success.mp3" type="audio/mpeg">
</audio>
<audio id="receiving">
  <source src="receiving.mp3" type="audio/mpeg">
</audio>
<audio id="channelopen">
  <source src="channelopen.mp3" type="audio/mpeg">
</audio>
<audio id="cloak">
  <source src="cloak.mp3" type="audio/mpeg">
</audio>
<iframe class="thisthing" width="560" height="315" src="http://www.youtube.com/embed/yyvH9Gm76Os?autoplay=0&loop=1" frameborder="0"></iframe>​
-->

<?php
	require_once("connection.php");
	require_once('whois/whois.main.php');
	error_reporting(-1);
	$nouns = getNouns($DB, 100);

?>

<script>
	$(window).load(function(){
		setInterval(function(){
			var elem = document.getElementById('target');
			elem.scrollTop = elem.scrollHeight;
		}, 1000);
		setInterval(function(){
			location.reload();
		}, 30000);
		<?php
		foreach($nouns as $noun){
			echo 
			"$.ajax({
			  url: 'getURL.php?noun=$noun',
			  success: function( resp ) {
			    $( '#target').append(resp);
			  }
			});
			";	
		}
		?>
	});
</script>
<style>
	* {
		margin:0;
	}
	body {
		height:100%;
		background:url("http://cdn.desktopwallpapers4.me/wallpapers/games/1920x1200/1/7944-hyperion-starcraft-ii-1920x1200-game-wallpaper.jpg") no-repeat center center fixed; 
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;
	  overflow:hidden;
	}
	.pipe {
		width:90%;
		height:86%;
		overflow:auto;
		margin:5% auto 0;
		padding:10px;
		box-sizing:border-box;
		background:rgba(255,255,255,.2);
		box-shadow:1px 1px 10px #fff;
		display:block;
	}
	#target {
		overflow:auto;
		display:block;
		height:98%;
		margin-top:5px;
	}
	.domain {
		width:100px;
		overflow:hidden;
		padding:45px 0px;
		vertical-align:middle;
		float:left;
		background:rgba(255,255,255,.5);
		color:white;
		text-shadow:1px 1px 3px #444;
		text-align:center;
		font:bold 10px Helvetica;
		text-transform:uppercase;
		margin:2px;
		box-sizing: border-box;
	}
	.available {
		background:rgba(50,255, 80,.75);
	}
	.thisthing {
		display:none;
	}
</style>


<?php

	function getNouns($DB, $number) {
		$get_nouns = $DB->query("SELECT * FROM nouns2 WHERE taken IS NULL ORDER BY noun DESC LIMIT $number");
		$nouns = array();
		while ($entry = $get_nouns->fetch(PDO::FETCH_ASSOC)) {
			$thisEntry =  $entry['noun'];
			$id = $entry['id'];
			$noun = preg_replace("/[^0-9a-zA-Z ]/", "", $thisEntry);
			$noun = strtolower($noun);
			array_push($nouns, $noun);
		}
		return $nouns;		
	}
?>
