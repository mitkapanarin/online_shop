<?php

require_once __DIR__ . '/vendor/autoload.php';

$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP password is empty
$dbname = "shop_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
