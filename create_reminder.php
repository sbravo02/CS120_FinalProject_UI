<?php
/*
$raw = file_get_contents("php://input");
$reminder = json_decode($raw, true);

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'raw' => $raw,
    'reminder' => $reminder
]);
*/

$raw = file_get_contents("php://input");
$reminder = json_decode($raw, true);

header('Content-Type: application/json');
echo json_encode([ 'success' => true ]);

?>


