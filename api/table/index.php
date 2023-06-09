<?php
require_once('../_load.php');

$r = [];

$ip = $_SERVER['REMOTE_ADDR'];

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $stmt = $_sql->prepare("SELECT id FROM `tables` WHERE `ip` = ?");
    $stmt->execute([$ip]);
    $id = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $r[] = [
        'table' => $id,
    ];
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $pwd = isset($_POST["pwd"]) ? $_POST["pwd"] : "";
    $id = isset($_POST["t"]) ? $_POST["t"] : "";
    if ($pwd == 'admin') {
        $stmt = $_sql->prepare("INSERT INTO tables VALUES (?, ?)");
        $stmt->execute([$id, $ip]);
    }

    $r[] = [
        'authorized' => false,
    ];
}

echo json_encode($r);

exit;
