<?php
require_once('../_load.php');

$r = [];

$stmt = $_sql->prepare('select * from `categories`');
$stmt->execute();
$c = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach($c as $l) {
    $r[] = [
        'id' => $l['id'],
        'name' => $l['name'],
    ];
}

echo json_encode($r);

exit;
