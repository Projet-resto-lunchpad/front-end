<?php
require_once('../_load.php');

$r = [];

$r['pong'] = microtime(true);

if(!empty($_d['ping'])) {
    $r['diff'] = (microtime(true) - $_d['ping']);
}

echo json_encode($r);

exit;
