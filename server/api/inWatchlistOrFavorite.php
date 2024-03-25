<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}

require_once "../Repositories/ProjectRepository.php";
require_once '../models/db.php';
require_once '../Repositories/auth.php';
global $myDB;

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["REQUEST_URI"] == "/api/inWatchlistOrFavorite.php") {
    $body = json_decode(file_get_contents("php://input"), true);
    if (!isset($_SERVER["HTTP_AUTHORIZATION"]) || !isset($body["show_name"])) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing parameters"));
        exit;
    }
    $auth = $_SERVER['HTTP_AUTHORIZATION'];
    $show_name = $body["show_name"];

    $user_id = verifyToken(tokenExtractor($auth));   

    if ($user_id !== false) {
        $inWatchlist = checkInWatchlist($show_name, $user_id);
        $inFavorites = checkInFavorites($show_name, $user_id);

        echo json_encode(array("in_watchlist" => $inWatchlist, "in_favorites" => $inFavorites));
    } else {
        http_response_code(401);
        echo json_encode(array("error" => "Invalid auth token"));
    }
} else {
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
}
?>
