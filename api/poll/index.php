<?php
require_once('../_load.php');

$r = [
    'orders' => [],
    'calls' => [],
];
if($_m == 'GET') {
    // poll any untreated order
    $stmt = $_sql->prepare('select o.`id`, o.`table`, l.`quantity`, p.`name` 
     from `orderlines` l 
     left join `orders` o on o.`id`=l.`orders_id` 
     left join `products` p on p.`id`=l.`products_id` 
     where o.`status`=:s 
     order by o.`id` desc limit 10');
    $stmt->bindValue('s', 'valided');
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $groupedOrders = [];
    foreach($orders as $order) {
        if(!array_key_exists($order['id'])) {
            $groupedOrders[$order['id']] = [
                'table' => $order['table'],
                'lines' => [],
            ];
        }
        $groupedOrders[$order['id']]['lines'][] = [
            'product' => $order['name'],
            'qtty' => $order['quantity'],
        ];
    }
    $r['orders'] = array_values($groupedOrders);
    // poll any manual call (one at a time)
    
} elseif($_m == 'POST') {
    if(!empty($_d['o'])) {
        
    }
}

echo json_encode($r);

exit;
