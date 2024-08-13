<?php
$servername = "sql110.ezyro.com";  // Replace with your database server
$username = "ezyro_37095098";         // Replace with your MySQL username
$password = "06f45a87d74bf4";             // Replace with your MySQL password
$dbname = "ezyro_37095098_club_database";  // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
