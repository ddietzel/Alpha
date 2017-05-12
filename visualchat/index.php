<?
	if(isset($_GET['v'])){
		$visID = $_GET['v'];
	} else {
		$visID = 1;
	}
	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

<head>

	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/jquery-ui-1.10.4.min.js"></script>
	<script src="js/jquery.easing.1.3.js"></script>
	<script src="js/jquery.easing.compatibility.js"></script>
	
	<script src="js/chatbots.js"></script>
	<? echo '<script src="js/vis'.$visID.'.js"></script>'; ?>
	
    <link rel="stylesheet" type="text/css" href="css/style.css">
 	<link rel="stylesheet" type="text/css" href="css/visuals.css">
 	<link rel="stylesheet" type="text/css" href="css/jqueryUI/jquery-ui-1.10.4.min.css">

    <title>Chat Visualizations</title>
    
</head>

<body>

<div id="slider"></div>

    <div id="chatwrapper">
        <div id="chatDisplay">
        </div>
        <div id="chatsPerMinute"></div>
    </div>

    <div id="visualchat">
        <div id="vis"></div>
    </div>
</body>
</html>
