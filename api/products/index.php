<?php
require_once('../_load.php');

$r = [
    'ok' => $_GET,
];

echo json_encode($r);

exit;
