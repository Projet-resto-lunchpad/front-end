<?php
require_once('../_load.php');

$r = [];

$stmt = $_sql->prepare('select * from `products` where `categories_id`=:c and `enabled`=1');
$stmt->bindValue('c', $_GET['c']);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach($products as $product) {
    $r[] = [
        'id' => $product['id'],
        'name' => $product['name'],
        'price' => $product['price'],
    ];
}

echo json_encode($r);

exit;
