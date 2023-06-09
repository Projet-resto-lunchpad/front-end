<?php
require_once('../_load.php');

$r = [];

$ip = $_SERVER['REMOTE_ADDR'];

if($_m == 'GET'){
$stmt = $_sql->prepare('select id from `tables` where `ip`=' $ip);
$stmt->execute();
$id = $stmt->fetchAll(PDO::FETCH_ASSOC);
$r[] = [
    'table' => $id,
    ];
}
elseif($_m == 'POST'){
    
    if($pwd == 'admin'){
        $stmt = $_sql->prepare('insert into tables values ('$id ','$ip')');
        $stmt->execute();
    }

    $r[] = [
        'authorized' => false,
        ];
}

echo json_encode($r);

exit;
