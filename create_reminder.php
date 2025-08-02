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

$reminder = file_get_contents("php://input");

// Extract date parts
$date_parts = explode('-', $reminder['date']);  // ['2025', '08', '22']
$year = intval($date_parts[0]);
$month = intval($date_parts[1]);
$day = intval($date_parts[2]);

// Extract time parts
$time_parts = explode(':', $reminder['time']); // ['09', '14']
$hour_24 = intval($time_parts[0]);
$minute = intval($time_parts[1]);

// Determine mode and convert to 12-hour format
if ($hour_24 < 12) {
    $mode = 'AM';
    $hour = $hour_24 === 0 ? 12 : $hour_24;  // 0 hour is 12 AM
} else {
    $mode = 'PM';
    $hour = $hour_24 > 12 ? $hour_24 - 12 : 12;
}
//$reminder_string = json_decode($raw, true);

header('Content-Type: application/json');
echo json_encode([ 'success' => true ]);

?>


