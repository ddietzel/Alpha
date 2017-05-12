<script src="jquery.js"></script>
<div id="pipe" class="pipe">
<div id="target"></div>
</div>
<?php
	require_once("connection.php");
	$get_nouns = $DB->query("SELECT * FROM nouns2 WHERE taken = '0'");
	$number = $get_nouns->rowCount();
	echo $number . " URLs with ratings found bro.";
	while ($entry = $get_nouns->fetch(PDO::FETCH_ASSOC)) {
		$thisEntry =  $entry['noun'];
		$popularity = $entry['results'];
		if(strlen($thisEntry) < 100){
			echo "<div class='result'>$popularity - $thisEntry.com</div>";
		}
	}

?>