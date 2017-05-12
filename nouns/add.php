<?php
	require_once("connection.php");
	require_once('whois/whois.main.php');
	$nouns = file_get_contents("list.txt");
	$nouns = explode("\n", $nouns);
	
	$array = array();

	foreach($nouns as $noun){
		$noun = explode("'", $noun);
		$noun =  strtolower($noun[1]);
		$noun = preg_replace("/[^0-9a-zA-Z ]/", "", $noun);
		array_push($array, $noun);
	}
	
	$array = array_unique($array);
	asort($array);
	echo sizeof($array)."<br>";

	foreach($array as $thing){
		echo $thing."<br>";
		$insert = $DB->query("INSERT INTO nouns2 SET noun = '$thing'");
	}

?>