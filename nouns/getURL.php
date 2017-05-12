<?php

	require_once("connection.php");
	require_once('whois/whois.main.php');
	error_reporting(0);

	$noun = $_GET['noun'];

	$domain = $noun.".com";
	 if (isItTaken($domain) == true) {
	  $output = "<div class='domain'>{$noun}</div>";
	  $UpdateTaken = $DB->query("UPDATE nouns2 SET taken = '1' WHERE noun = '$noun'");
	 } elseif(isItTaken($domain) == false) {
	  $output =  "<div class='domain available'>{$noun}</div>";
	  $UpdateAvailable = $DB->query("UPDATE nouns2 SET taken = '0' WHERE noun = '$noun'");
	  /*
$output .= "
	  <script>
	  	document.getElementById('success').play();
	  </script>
	  ";
*/
	 } else {
		 die("ERROR GETTING URLS BRO");
	 }
	 
	 echo $output;

	function isItTaken($domain){

		$whois = new Whois();
		$result = $whois->Lookup($domain);
		$theresult = $result['regrinfo']['registered'];
		
		if($theresult == "yes") {
			return true;
		} elseif ($theresult == "no") {
			return false;
		} else {
			return "ERROR";
		}
	}
	