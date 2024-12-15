<?php

error_log("Request received: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI']);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require 'vendor/autoload.php';

use FastRoute\RouteCollector;

// Add the namespace for controllers
spl_autoload_register(function ($class) {
  $file = __DIR__ . '/src/controllers/' . str_replace('\\', '/', $class) . '.php';
  if (file_exists($file)) {
    require $file;
  }
});

$dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
  $r->addRoute('GET', '/', 'HomeController@index');
  $r->addRoute('GET', '/about', 'AboutController@index');
  $r->addRoute('POST', '/graphql', 'GraphQLController@index');
  // Add more routes here
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Debug logging
error_log("Processing request: $httpMethod $uri");

// Strip query string (?foo=bar) and decode URI
if (false !== $pos = strpos($uri, '?')) {
  $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

// Debug logging
error_log("Route info: " . json_encode($routeInfo));

switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
    error_log("404 Not Found: $uri");
    http_response_code(404);
    echo '404 Not Found';
    break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
    error_log("405 Method Not Allowed: $httpMethod $uri. Allowed methods: " . implode(', ', $allowedMethods));
    http_response_code(405);
    echo '405 Method Not Allowed';
    break;
  case FastRoute\Dispatcher::FOUND:
    $handler = $routeInfo[1];
    $vars = $routeInfo[2];
    [$class, $method] = explode('@', $handler);

    error_log("Dispatching to $class@$method with vars: " . json_encode($vars));

    if (class_exists($class) && method_exists($class, $method)) {
      call_user_func_array([new $class(), $method], $vars);
    } else {
      error_log("Class $class or method $method does not exist.");
      http_response_code(500);
      echo '500 Internal Server Error';
    }
    break;
  default:
    error_log("Unexpected routing outcome: " . json_encode($routeInfo));
    http_response_code(500);
    echo '500 Internal Server Error';
    break;
}
