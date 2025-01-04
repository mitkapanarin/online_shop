<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Autoloader
spl_autoload_register(function ($class) {
    $file = __DIR__ . '/src/' . str_replace('\\', '/', $class) . '.php';
    if (file_exists($file)) {
        require $file;
    }
});

use Core\Router;

// Process the request
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string and decode URI
$uri = rawurldecode(parse_url($uri, PHP_URL_PATH));

$router = new Router();
$router->dispatch($httpMethod, $uri);
