<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

use FastRoute\Dispatcher;
use FastRoute\RouteCollector;

// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Autoloader for controllers
spl_autoload_register(function ($class) {
    $file = __DIR__ . '/src/controllers/' . str_replace('\\', '/', $class) . '.php';
    if (file_exists($file)) {
        require $file;
    }
});

// Define routes
$dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
    $r->addRoute('GET', '/', 'HomeController@index');
    $r->addRoute('GET', '/about', 'AboutController@index');
    $r->addRoute('POST', '/graphql', 'GraphQLController@index');
});

// Process the request
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string and decode URI
$uri = rawurldecode(parse_url($uri, PHP_URL_PATH));

// Dispatch the route
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo '404 Not Found';
        break;

    case Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo '405 Method Not Allowed';
        break;

    case Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        [$class, $method] = explode('@', $handler);

        if (class_exists($class) && method_exists($class, $method)) {
            call_user_func_array([new $class(), $method], $vars);
        } else {
            http_response_code(500);
            echo '500 Internal Server Error';
        }
        break;

    default:
        http_response_code(500);
        echo '500 Internal Server Error';
        break;
}