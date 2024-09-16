<?php

require_once '../models/db.php';
require_once "../Repositories/UserRepository.php";
require_once "../Repositories/ProjectRepository.php";
require_once '../Repositories/auth.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["REQUEST_URI"] == "/api/email.php"){
    $body = json_decode(file_get_contents('php://input'), true);
    $to = $body["email"];
    $subject = "Message from Rakcha";
    $message = $body["message"];
    $result = selectUserByEmail($email);
    if ($result->num_rows == 1) {
        if (mail($to, $subject, $message)) {
            echo "Email sent successfully!";
        } else {
            echo "Email sending failed.";
        }
    } else {
        http_response_code(401); 
        echo json_encode(array("error" => "Invalid email"));
    }
}
else {
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
}
?>
