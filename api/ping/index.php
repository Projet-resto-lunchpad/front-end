<?php
require_once('../_load.php');

$r = [];

$r['pong'] = microtime(true);

if(!empty($_data['ping'])) {
    $r['diff'] = (microtime(true) - $_data['ping']);
}

echo json_encode($r);

exit;
