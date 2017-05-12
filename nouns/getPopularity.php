<?

require_once("connection.php");
require_once('whois/whois.main.php');
error_reporting(0);

$noun = $_GET['noun'];
$params = array('q' => $noun);
$content = file_get_contents('http://www.google.com/search?' . http_build_query($params));
preg_match('/About (.*) results/i', $content, $matches);

$results = !empty($matches[1]) ? $matches[1] : 0;
$result = intval(str_replace(',', '', $results));
if($result < 1 ){
	die("couldn't find any results bro");
}
echo "<div style='color:green;font:18px helvetica;margin:10px;'>{$noun}.com - $result</div>";
$UpdateTaken = $DB->query("UPDATE nouns SET results = '{$result}' WHERE noun = '$noun'");

?>