<?php
$dsn = 'mysql:host=localhost;dbname=danieldietzel';
$username = 'mysqluser';
$password = 'm49y03lol';
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
); 

$DB = new PDO($dsn, $username, $password, $options);
$DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>