<script src="jquery.js"></script>
<div id="pipe" class="pipe">
<div id="target"></div>
</div>
<?php
	require_once("connection.php");

	$get_nouns = $DB->query("SELECT * FROM nouns2 WHERE taken = '0' AND results IS NULL LIMIT 1000");
	$nouns = array();
	while ($entry = $get_nouns->fetch(PDO::FETCH_ASSOC)) {
		$thisEntry =  $entry['noun'];
		$popularity = "";
		array_push($nouns, $thisEntry);
	}
?>
<script>
	<?	
	foreach($nouns as $noun){
			echo "$.ajax({
			  url: 'getPopularity.php?noun=$noun',
			  success: function( resp ) {
			    $( '#target').append(resp);
			  }
			});
			";	
	}
	?>
</script>