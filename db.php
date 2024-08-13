<?php
$servername = "sql110.infinityfree.com";  // Replace with your database server
$username = "if0_37093939";         // Replace with your MySQL username
$password = "RaxLord19";             // Replace with your MySQL password
$dbname = "if0_37093939_club_database";  // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
